
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
  FileText,
  FileUp,
  MoreVertical,
  Download,
  Trash2,
  Share2,
  ImageIcon,
  Camera,
  Video,
  Locate,
  MapPin,
  Search,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRef, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMediaStore, type StoredMedia } from '@/hooks/use-media-store';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function DocumentsPage() {
  const { documents, photos, loading, addDocument, deleteMedia } = useMediaStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<StoredMedia | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMedia(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  const filteredPhotos = photos.filter(photo => 
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (media: StoredMedia) => {
    deleteMedia(media.dataUrl);
  };

  const handleDownload = (media: StoredMedia) => {
    if (media.dataUrl) {
        const a = document.createElement('a');
        a.href = media.dataUrl;
        a.download = media.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Downloading File...",
          description: `${media.name} will be downloaded.`,
        });
    } else {
       toast({
          title: "Download failed",
          description: `Could not find data for ${media.name}.`,
          variant: "destructive"
        });
    }
  };

  const handleShare = async (media: StoredMedia) => {
     if (!media.dataUrl) return;
     try {
        const response = await fetch(media.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], media.name, { type: blob.type });

        if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: media.name,
                text: `Check out ${media.name}`,
            });
            toast({ title: "Shared successfully!" });
        } else {
            // Fallback for browsers that don't support sharing files
            await navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link Copied!",
              description: "Sharing not supported. A link to this page has been copied to your clipboard.",
            });
        }
    } catch (err) {
        console.error("Failed to share:", err);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not share the item.",
        });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isDoc = !file.type.startsWith('image/') && !file.type.startsWith('video/');
      if (isDoc) {
        addDocument(file);
      } else {
         toast({
            title: "Wrong Upload Area",
            description: "Please upload photos and videos from the Camera Spots page.",
            variant: "destructive"
        });
      }
    }
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderMediaCard = (media: StoredMedia) => (
    <Card key={media.dataUrl} className="shadow-lg group">
       {(media.type === 'photo' || media.type === 'video') && media.dataUrl ? (
         <CardContent className="p-0" onClick={() => setSelectedMedia(media)}>
            <div className="relative aspect-video cursor-pointer overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
              {media.type === 'photo' && media.dataUrl ? (
                <Image src={media.dataUrl} alt={media.name} layout="fill" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : media.type === 'video' && media.dataUrl ? (
                 <video src={media.dataUrl} className="w-full h-full object-cover" muted loop playsInline />
              ) : media.type === 'video' ? (
                <Video className="h-16 w-16 text-muted-foreground" />
              ) : null }
            </div>
         </CardContent>
       ) : null}
      <CardContent className="p-4 flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-md mt-1">
          {media.type === 'photo' ? <ImageIcon className="h-6 w-6" /> : (media.type === 'video' ? <Video className="h-6 w-6"/> : <FileText className="h-6 w-6" />)}
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="font-semibold truncate">{media.name}</p>
          <p className="text-sm text-muted-foreground">
            {media.size} - {media.date}
          </p>
           {media.location && (
              <Badge variant="outline" className="mt-2">
                <Locate className="mr-1.5 h-3 w-3"/>
                {media.location.latitude.toFixed(4)}, {media.location.longitude.toFixed(4)}
              </Badge>
           )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDownload(media)} disabled={!media.dataUrl}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare(media)}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(media)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="application/pdf,.doc,.docx,.xls,.xlsx,.eml,text/plain"
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText /> My Local Files
              </CardTitle>
              <CardDescription>
                Keep your important files, photos, and videos secure in your browser's local storage.
              </CardDescription>
            </div>
            <Button onClick={handleUploadClick}>
              <FileUp className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search files by filename..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-headline flex items-center gap-2 mb-4"><Camera /> Saved Photos & Videos</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="shadow-lg">
                             <CardContent className="p-0">
                                <Skeleton className="w-full aspect-video rounded-t-lg" />
                             </CardContent>
                            <CardContent className="p-4 flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-md" />
                                <div className="flex-grow space-y-2">
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-4 w-2/5" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </CardContent>
                        </Card>
                    ))
                ) : filteredPhotos.length > 0 ? (
                filteredPhotos.map(photo => renderMediaCard(photo))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {photos.length > 0 && searchTerm ? (
                          <p>No results found for &quot;{searchTerm}&quot;.</p>
                      ) : (
                          <p>You have no saved photos or videos. Use the Camera Spots page to capture some!</p>
                      )}
                    </CardContent>
                </Card>
                )}
            </div>
        </div>

        <Separator />

        <div>
            <h2 className="text-2xl font-headline flex items-center gap-2 mb-4"><FileText /> Uploaded Documents</h2>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="shadow-lg">
                            <CardContent className="p-4 flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-md" />
                                <div className="flex-grow space-y-2">
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-4 w-2/f" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </CardContent>
                        </Card>
                    ))
                ) : filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => renderMediaCard(doc))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {documents.length > 0 && searchTerm ? (
                          <p>No results found for &quot;{searchTerm}&quot;.</p>
                      ) : (
                         <p>You have no documents uploaded. Click 'Upload Document' to get started.</p>
                      )}
                    </CardContent>
                </Card>
                )}
            </div>
        </div>

      </div>

      {selectedMedia && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMedia(null)}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white h-10 w-10"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="h-8 w-8" />
          </Button>
          <div className="relative w-full h-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {selectedMedia.type === 'video' ? (
                  <video src={selectedMedia.dataUrl} controls autoPlay className="max-w-full max-h-full rounded-lg" />
                ) : (
                  <Image 
                      src={selectedMedia.dataUrl} 
                      alt={selectedMedia.name || "Selected media"}
                      width={1920}
                      height={1080}
                      className="max-w-full max-h-full h-auto w-auto object-contain"
                  />
                )}
                {selectedMedia.location && (
                    <div className='mt-4 p-4 rounded-lg bg-background/80 max-w-md w-full'>
                        <h3 className="font-semibold flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2"><MapPin/> Location</div>
                             <Button variant="outline" size="sm" asChild>
                                <Link href={`https://www.google.com/maps?q=${selectedMedia.location.latitude},${selectedMedia.location.longitude}`} target="_blank" rel="noopener noreferrer">
                                    View on Google Maps
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            Lat: {selectedMedia.location.latitude.toFixed(6)}, Lng: {selectedMedia.location.longitude.toFixed(6)}
                        </p>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

    