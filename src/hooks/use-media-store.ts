
"use client";

import { useToast } from "./use-toast";
import { useState, useEffect } from "react";
import { openDB, DBSchema, IDBPDatabase } from 'idb';

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

const DB_NAME = 'VoyatoDB';
const STORE_NAME = 'media';
const DB_VERSION = 1;

interface MediaDB extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: StoredMedia;
  };
}

async function getDB(): Promise<IDBPDatabase<MediaDB>> {
  return openDB<MediaDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'dataUrl' });
      }
    },
  });
}

export function useMediaStore() {
    const [media, setMedia] = useState<StoredMedia[]>([]);
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMediaFromDB = async () => {
            setLoading(true);
            try {
                const db = await getDB();
                const allMedia = await db.getAll(STORE_NAME);
                setMedia(allMedia.reverse());
            } catch (error) {
                console.error("Failed to load media from IndexedDB", error);
                toast({
                    variant: "destructive",
                    title: "Load Failed",
                    description: "Could not load saved media.",
                });
            } finally {
                setLoading(false);
            }
        };
        loadMediaFromDB();
    }, [toast]);

    const addMedia = async (
        blob: Blob,
        type: 'photo' | 'video',
        location?: { latitude: number, longitude: number }
    ) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64data = reader.result as string;
            const timestamp = new Date();
            const newFile: StoredMedia = {
                name: `${type}-${timestamp.toISOString()}.${type === 'photo' ? 'jpg' : 'webm'}`,
                size: `${(blob.size / 1024 / 1024).toFixed(2)} MB`,
                date: timestamp.toLocaleDateString(),
                dataUrl: base64data,
                type: type,
                location: location,
            };

            try {
                const db = await getDB();
                await db.add(STORE_NAME, newFile);
                setMedia(prev => [newFile, ...prev]);
                toast({
                    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Saved`,
                    description: `Your ${type} has been saved locally.`,
                });
            } catch (error) {
                console.error("Error saving to IndexedDB:", error);
                 toast({
                    variant: "destructive",
                    title: "Save Failed",
                    description: "Could not save the file. The storage might be full.",
                });
            }
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
        reader.onloadend = async () => {
             const base64data = reader.result as string;
             const timestamp = new Date();
             const newDoc: StoredMedia = {
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                date: timestamp.toLocaleDateString(),
                dataUrl: base64data,
                type: 'document'
             };
             
            try {
                const db = await getDB();
                await db.add(STORE_NAME, newDoc);
                setMedia(prev => [newDoc, ...prev]);
                toast({
                    title: "Document Saved",
                    description: `${file.name} has been saved locally.`,
                });
            } catch (error) {
                 console.error("Error saving to IndexedDB:", error);
                 toast({
                    variant: "destructive",
                    title: "Save Failed",
                    description: "Could not save the document. The storage might be full.",
                });
            }
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

    const deleteMedia = async (dataUrl: string) => {
        try {
            const db = await getDB();
            await db.delete(STORE_NAME, dataUrl);
            setMedia(prev => prev.filter(m => m.dataUrl !== dataUrl));
            toast({
                title: "Media Deleted",
                description: "The file has been removed from local storage.",
            });
        } catch (error) {
            console.error("Error deleting from IndexedDB:", error);
             toast({
                variant: "destructive",
                title: "Delete Failed",
                description: "Could not delete the file.",
            });
        }
    };
    
    const photos = media.filter(m => m.type === 'photo' || m.type === 'video');
    const documents = media.filter(m => m.type === 'document');

    return { photos, documents, addMedia, addDocument, deleteMedia, loading };
}
