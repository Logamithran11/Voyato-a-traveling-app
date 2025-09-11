
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialDocuments = [
  {name: 'Passport_Scan.pdf', size: '1.2 MB', date: '2023-08-15'},
  {name: 'Visa_Confirmation.pdf', size: '850 KB', date: '2023-09-01'},
  {name: 'Flight_Itinerary.pdf', size: '2.5 MB', date: '2023-09-20'},
  {name: 'Hotel_Booking.eml', size: '50 KB', date: '2023-09-21'},
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const { toast } = useToast();

  const handleDelete = (docName: string) => {
    setDocuments(documents.filter(doc => doc.name !== docName));
    toast({
      title: "Document Deleted",
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
            title: "Document shared successfully!",
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
            console.error("Failed to share:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not share the document.",
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


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText /> Travel Documents
            </CardTitle>
            <CardDescription>
              Keep your important documents secure and accessible.
            </CardDescription>
          </div>
          <Button>
            <FileUp className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map(doc => (
          <Card key={doc.name} className="shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-md">
                <FileText className="h-6 w-6" />
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
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(doc.name)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
         {documents.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>You have no documents uploaded.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
