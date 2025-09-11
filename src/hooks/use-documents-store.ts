
"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata } from "firebase/storage";
import { useToast } from "./use-toast";

export type Document = {
    name: string;
    size: string;
    date: string;
    isImage?: boolean;
    isVideo?: boolean;
    dataUrl?: string; // This will now be the Firebase download URL
    location?: {
        latitude: number;
        longitude: number;
    };
    fullPath: string;
};

export function useDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [photos, setPhotos] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchFiles = useCallback(async (path: 'documents' | 'photos') => {
        const listRef = ref(storage, path);
        try {
            const res = await listAll(listRef);
            const files = await Promise.all(
                res.items.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    const metadata = await getMetadata(itemRef);
                    return {
                        name: itemRef.name,
                        size: `${(metadata.size / 1024 / 1024).toFixed(2)} MB`,
                        date: new Date(metadata.timeCreated).toISOString().split('T')[0],
                        dataUrl: downloadURL,
                        fullPath: itemRef.fullPath,
                        isImage: metadata.contentType?.startsWith("image/"),
                        isVideo: metadata.contentType?.startsWith("video/"),
                        location: metadata.customMetadata?.location ? JSON.parse(metadata.customMetadata.location) : undefined,
                    };
                })
            );
            files.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            if (path === 'documents') {
                setDocuments(files);
            } else {
                setPhotos(files);
            }
        } catch (error) {
            console.error(`Error fetching ${path}:`, error);
            toast({
                variant: "destructive",
                title: `Error fetching ${path}`,
                description: "Could not load your files from the cloud. Please check your connection and Firebase setup.",
            });
        }
    }, [toast]);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchFiles('documents'), fetchFiles('photos')])
            .finally(() => setLoading(false));
    }, [fetchFiles]);


    const addFile = async (file: File | Blob, path: 'documents' | 'photos', filename: string, metadata?: { location?: { latitude: number, longitude: number }}) => {
        const storageRef = ref(storage, `${path}/${filename}`);
        
        try {
            const snapshot = await uploadBytes(storageRef, file, {
                customMetadata: metadata?.location ? { location: JSON.stringify(metadata.location) } : undefined,
            });
            console.log('Uploaded a blob or file!', snapshot);
            toast({
                title: "Upload Successful",
                description: `${filename} has been uploaded to the cloud.`,
            });
            // Refresh the list
            await fetchFiles(path);

        } catch (error) {
            console.error("Upload error:", error);
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: "Could not upload your file. Please try again.",
            });
        }
    };

    const deleteFile = async (fullPath: string, isPhoto: boolean) => {
        const fileRef = ref(storage, fullPath);
        try {
            await deleteObject(fileRef);
            toast({
                title: "File Deleted",
                description: "The file has been permanently removed from the cloud.",
            });
             if (isPhoto) {
                setPhotos(prev => prev.filter(p => p.fullPath !== fullPath));
            } else {
                setDocuments(prev => prev.filter(d => d.fullPath !== fullPath));
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast({
                variant: "destructive",
                title: "Delete Failed",
                description: "Could not delete the file. Please try again.",
            });
        }
    };
    
    // Kept for compatibility with Camera page, but now uploads to firebase.
    const addPhoto = async (photo: { dataUrl: string, name: string, location?: {latitude: number, longitude: number}}) => {
        const response = await fetch(photo.dataUrl);
        const blob = await response.blob();
        await addFile(blob, 'photos', photo.name, { location: photo.location });
    }
    
    // Compatibility, now uses fullPath
    const deletePhoto = (fullPath: string) => deleteFile(fullPath, true);
    const deleteDocument = (fullPath: string) => deleteFile(fullPath, false);
    
    return { documents, photos, loading, addFile, deleteDocument, addPhoto, deletePhoto };
}
