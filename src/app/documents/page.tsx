
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
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRef, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDocuments } from '@/hooks/use-documents-store';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function DocumentsPage() {
  const { documents, addDocument, deleteDocument, photos, deletePhoto } = useDocuments();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    toast({
      title: "Download Started",
      description: `Your download for ${docName} has started.`,
    });
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
      const newDocument = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Date().toISOString().split('T')[0],
        isImage: isImage,
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // When uploading an image, add it to photos, not documents
            addPhoto({
                ...newDocument,
                dataUrl: e.target?.result as string,
            });
        };
        reader.readAsDataURL(file);
      } else {
         addDocument(newDocument);
      }

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const renderDocumentCard = (doc: any, isPhoto: boolean) => (
    <Card key={doc.name} className="shadow-lg group">
       {doc.isImage && doc.dataUrl ? (
         <CardContent className="p-0" onClick={() => setSelectedImage(doc.dataUrl)}>
            <div className="relative aspect-video cursor-pointer overflow-hidden rounded-t-lg">
              <Image src={doc.dataUrl} alt={doc.name} layout="fill" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
         </CardContent>
       ) : null}
      <CardContent className="p-4 flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-md">
          {doc.isImage ? <ImageIcon className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
        </div>
        <div className="flex-grow">
          <p className="font-semibold truncate">{doc.name}</p>
          <p className="text-sm text-muted-foreground">
            {doc.size} - {doc.date}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDownload(doc.name)}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare(doc.name)}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc.name, isPhoto)}>
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
        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText /> My Files
            </CardTitle>
            <CardDescription>
              Keep your important files and photos secure and accessible.
            </CardDescription>
          </div>
          <Button onClick={handleUploadClick}>
            <FileUp className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </CardHeader>
      </Card>

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-headline flex items-center gap-2 mb-4"><Camera /> Saved Photos</h2>
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
                ) : photos.length > 0 ? (
                photos.map(photo => renderDocumentCard(photo, true))
                ) : (
                <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-8 text-center text-muted-foreground">
                    <p>You have no saved photos. Capture some from the Camera Spots page!</p>
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

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0">
          {selectedImage && (
            <Image 
                src={selectedImage} 
                alt="Enlarged view" 
                width={1920} 
                height={1080} 
                className="rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
