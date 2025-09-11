
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
import Link from 'next/link';

export default function DocumentsPage() {
  const { documents, photos, loading, addFile, deleteDocument, deletePhoto } = useDocuments();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPhotos = photos.filter(photo => 
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (doc: Document, isPhoto: boolean) => {
    if (isPhoto) {
        deletePhoto(doc.fullPath);
    } else {
        deleteDocument(doc.fullPath);
    }
  };

  const handleDownload = (doc: Document) => {
    if (doc.dataUrl) {
        // Since these are Firebase storage URLs, we can directly link to them
        // To force download, we can fetch and create a blob URL or use an anchor with download attribute
        const a = document.createElement('a');
        a.href = doc.dataUrl;
        a.target = "_blank"; // Let browser handle PDF/Image view or download
        a.download = doc.name; // Suggest a filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Opening File...",
          description: `${doc.name} will open in a new tab.`,
        });
    } else {
       toast({
          title: "Download failed",
          description: `Could not find data for ${doc.name}.`,
          variant: "destructive"
        });
    }
  };

  const handleShare = async (doc: Document) => {
    if (!doc.dataUrl) return;

    const shareData = {
      title: 'Travel Document',
      text: `Here is my document: ${doc.name}`,
      url: doc.dataUrl,
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const path = (isImage || isVideo) ? 'photos' : 'documents';
      await addFile(file, path);
    }
    // Reset file input
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderDocumentCard = (doc: Document, isMedia: boolean) => (
    <Card key={doc.fullPath} className="shadow-lg group">
       {(doc.isImage || doc.isVideo) && doc.dataUrl ? (
         <CardContent className="p-0" onClick={() => setSelectedMedia(doc)}>
            <div className="relative aspect-video cursor-pointer overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
              {doc.isImage && doc.dataUrl ? (
                <Image src={doc.dataUrl} alt={doc.name} layout="fill" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : doc.isVideo && doc.dataUrl ? (
                 <video src={doc.dataUrl} className="w-full h-full object-cover" muted loop playsInline />
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
        <div className="flex-grow overflow-hidden">
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
            <DropdownMenuItem onClick={() => handleDownload(doc)} disabled={!doc.dataUrl}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare(doc)}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc, isMedia)}>
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
        accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.eml"
      />
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText /> My Cloud Files
              </CardTitle>
              <CardDescription>
                Keep your important files, photos, and videos secure and accessible from anywhere.
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
                filteredPhotos.map(photo => renderDocumentCard(photo, true))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {photos.length > 0 && searchTerm ? (
                          <p>No results found for &quot;{searchTerm}&quot;.</p>
                      ) : (
                          <p>You have no saved photos or videos. Upload some or use the Camera Spots page!</p>
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
                                    <Skeleton className="h-4 w-2/5" />
                                </div>
                                <Skeleton className="h-8 w-8" />
                            </CardContent>
                        </Card>
                    ))
                ) : filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => renderDocumentCard(doc, false))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {documents.length > 0 && searchTerm ? (
                          <p>No results found for &quot;{searchTerm}&quot;.</p>
                      ) : (
                         <p>You have no documents uploaded. Click 'Upload File' to get started.</p>
                      )}
                    </CardContent>
                </Card>
                )}
            </div>
        </div>

      </div>

      <Dialog open={!!selectedMedia} onOpenChange={(isOpen) => !isOpen && setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{selectedMedia?.name}</DialogTitle>
            <DialogDescription className="sr-only">A larger view of the selected photo or video.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[calc(90vh-150px)] overflow-y-auto">
              {selectedMedia?.isVideo && selectedMedia.dataUrl ? (
                <video src={selectedMedia.dataUrl} controls autoPlay className="w-full rounded-t-lg" />
              ) : selectedMedia?.dataUrl ? (
                <Image 
                    src={selectedMedia.dataUrl} 
                    alt={selectedMedia.name || "Selected media"}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain rounded-t-lg"
                />
              ) : null}
              {selectedMedia?.location && (
                <div className='p-4 border-t'>
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
