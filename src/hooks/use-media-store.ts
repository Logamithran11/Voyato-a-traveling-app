
"use client";

import { useLocalStorage } from "./use-local-storage";
import { useToast } from "./use-toast";

export type StoredMedia = {
    name: string;
    size: string;
    date: string;
    type: 'photo' | 'video' | 'document';
    dataUrl: string;
    location?: {
        latitude: number;
        longitude: number;
    };
};

export function useMediaStore() {
    const [media, setMedia] = useLocalStorage<StoredMedia[]>("media", []);
    const { toast } = useToast();

    const addMedia = async (
        blob: Blob,
        type: 'photo' | 'video',
        location?: { latitude: number, longitude: number }
    ) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result as string;
            const timestamp = new Date();
            const newFile: StoredMedia = {
                name: `${type}-${timestamp.toISOString()}.${type === 'photo' ? 'jpg' : 'webm'}`,
                size: `${(blob.size / 1024).toFixed(2)} KB`,
                date: timestamp.toLocaleDateString(),
                dataUrl: base64data,
                type: type,
                location: location,
            };

            setMedia(prev => [newFile, ...prev]);

            toast({
                title: `${type.charAt(0).toUpperCase() + type.slice(1)} Saved`,
                description: `Your ${type} has been saved locally.`,
            });
        };
        reader.onerror = (error) => {
            console.error("Error converting blob to data URL:", error);
            toast({
                variant: "destructive",
                title: "Save Failed",
                description: "Could not read the file to save it locally.",
            });
        };
    };
    
    const addDocument = (file: File) => {
         const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
             const base64data = reader.result as string;
             const timestamp = new Date();
             const newDoc: StoredMedia = {
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                date: timestamp.toLocaleDateString(),
                dataUrl: base64data,
                type: 'document'
             };
             setMedia(prev => [newDoc, ...prev]);
             toast({
                title: "Document Saved",
                description: `${file.name} has been saved locally.`,
            });
        };
        reader.onerror = (error) => {
            console.error("Error converting file to data URL:", error);
            toast({
                variant: "destructive",
                title: "Save Failed",
                description: "Could not read the file to save it locally.",
            });
        };
    }

    const deleteMedia = (dataUrl: string) => {
        setMedia(prev => prev.filter(m => m.dataUrl !== dataUrl));
        toast({
            title: "Media Deleted",
            description: "The file has been removed from local storage.",
        });
    };
    
    const photos = media.filter(m => m.type === 'photo' || m.type === 'video');
    const documents = media.filter(m => m.type === 'document');

    return { photos, documents, addMedia, addDocument, deleteMedia, loading: false };
}
