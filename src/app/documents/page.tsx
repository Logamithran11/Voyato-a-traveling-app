
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRef, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDocuments, type Document } from '@/hooks/use-documents-store';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function DocumentsPage() {
  const { documents, addDocument, deleteDocument, photos, deletePhoto } = useDocuments();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const filteredPhotos = photos.filter(photo => 
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (docName: string, isPhoto: boolean) => {
    if (isPhoto) {
        deletePhoto(docName);
    } else {
        deleteDocument(docName);
    }
    toast({
      title: "Item Deleted",
      description: `${docName} has been removed.`,
    });
  };

  const handleDownload = (docName: string) => {
    const doc = [...photos, ...documents].find(d => d.name === docName);
    if (doc?.dataUrl) {
        const a = document.createElement('a');
        a.href = doc.dataUrl;
        a.download = doc.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Download Started",
          description: `Your download for ${docName} has started.`,
        });
    } else {
       toast({
          title: "Download failed",
          description: `Could not find data for ${docName}.`,
          variant: "destructive"
        });
    }
  };

  const handleShare = async (docName: string) => {
    const shareData = {
      title: 'Travel Document',
      text: `Here is my document: ${docName}`,
      url: window.location.href, // In a real app, this would be a direct link to the file
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
            title: "Item shared successfully!",
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
            console.error("Failed to share:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not share the item.",
            });
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link Copied!",
          description: "A shareable link has been copied to your clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy link:", err);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not copy the link to the clipboard.",
        });
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      const newDocument: Omit<Document, 'dataUrl'> & { dataUrl?: string } = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        date: new Date().toISOString().split('T')[0],
        isImage: isImage,
        isVideo: isVideo,
      };
      
      const saveFile = (dataUrl?: string) => {
          if (isImage || isVideo) {
              addPhoto({
                  ...newDocument,
                  dataUrl: dataUrl,
              });
          } else {
              addDocument(newDocument as Document);
          }
      };

      if ((isImage || isVideo)) {
         if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast({
                title: "File Too Large",
                description: "Images and videos larger than 5MB cannot be permanently saved in this demo.",
                variant: "destructive",
            });
            const tempUrl = URL.createObjectURL(file);
             saveFile(tempUrl);
             setTimeout(() => URL.revokeObjectURL(tempUrl), 60 * 1000); // Revoke after 1 minute
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                saveFile(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
      } else {
         saveFile();
      }

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const renderDocumentCard = (doc: Document, isMedia: boolean) => (
    <Card key={doc.name} className="shadow-lg group">
       {(doc.isImage || doc.isVideo) && doc.dataUrl ? (
         <CardContent className="p-0" onClick={() => setSelectedMedia(doc)}>
            <div className="relative aspect-video cursor-pointer overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
              {doc.isImage && doc.dataUrl ? (
                <Image src={doc.dataUrl} alt={doc.name} layout="fill" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : doc.isVideo ? (
                <Video className="h-16 w-16 text-muted-foreground" />
              ) : null }
            </div>
         </CardContent>
       ) : null}
      <CardContent className="p-4 flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-md mt-1">
          {doc.isImage ? <ImageIcon className="h-6 w-6" /> : (doc.isVideo ? <Video className="h-6 w-6"/> : <FileText className="h-6 w-6" />)}
        </div>
        <div className="flex-grow">
          <p className="font-semibold truncate">{doc.name}</p>
          <p className="text-sm text-muted-foreground">
            {doc.size} - {doc.date}
          </p>
           {doc.location && (
              <Badge variant="outline" className="mt-2">
                <Locate className="mr-1.5 h-3 w-3"/>
                {doc.location.latitude.toFixed(4)}, {doc.location.longitude.toFixed(4)}
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
            <DropdownMenuItem onClick={() => handleDownload(doc.name)} disabled={!doc.dataUrl}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare(doc.name)}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc.name, isMedia)}>
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
        accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx"
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText /> My Files
              </CardTitle>
              <CardDescription>
                Keep your important files, photos, and videos secure and accessible.
              </CardDescription>
            </div>
            <Button onClick={handleUploadClick}>
              <FileUp className="mr-2 h-4 w-4" /> Upload File
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search photos by filename..."
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
                {!isClient ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="shadow-lg">
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
                filteredPhotos.map(photo => renderDocumentCard(photo, true))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {photos.length > 0 && searchTerm ? (
                          <p>No results found for &quot;{searchTerm}&quot;.</p>
                      ) : (
                          <p>You have no saved photos or videos. Capture some from the Camera Spots page!</p>
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
                {!isClient ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="shadow-lg">
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
                ) : documents.length > 0 ? (
                documents.map(doc => renderDocumentCard(doc, false))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                    <p>You have no documents uploaded.</p>
                    </CardContent>
                </Card>
                )}
            </div>
        </div>

      </div>

      <Dialog open={!!selectedMedia} onOpenChange={(isOpen) => !isOpen && setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl p-0 md:max-h-[90vh] overflow-y-auto">
           <DialogHeader className="p-4">
            <DialogTitle>{selectedMedia?.name}</DialogTitle>
            <DialogDescription className="sr-only">A larger view of the selected photo or video.</DialogDescription>
          </DialogHeader>
          {selectedMedia?.isVideo && selectedMedia.dataUrl ? (
             <video src={selectedMedia.dataUrl} controls autoPlay className="w-full rounded-t-lg" />
          ) : selectedMedia?.dataUrl ? (
            <Image 
                src={selectedMedia.dataUrl} 
                alt={selectedMedia.name}
                width={1920}
                height={1080}
                className="w-full h-auto object-contain rounded-t-lg"
            />
          ) : null}
          {selectedMedia?.location && (
            <div className='p-4 border-t'>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><MapPin/> Location</h3>
                <div className='aspect-video w-full rounded-md overflow-hidden bg-muted'>
                     <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedMedia.location.longitude-0.01},${selectedMedia.location.latitude-0.01},${selectedMedia.location.longitude+0.01},${selectedMedia.location.latitude+0.01}&layer=mapnik&marker=${selectedMedia.location.latitude},${selectedMedia.location.longitude}`}>
                    </iframe>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
