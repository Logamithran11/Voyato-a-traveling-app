
"use client";

import { useLocalStorage } from "./use-local-storage";

export type Document = {
    name: string;
    size: string;
    date: string;
    isImage?: boolean;
    dataUrl?: string;
};

const initialDocuments: Document[] = [
  {name: 'Passport_Scan.pdf', size: '1.2 MB', date: '2023-08-15'},
  {name: 'Visa_Confirmation.pdf', size: '850 KB', date: '2023-09-01'},
  {name: 'Flight_Itinerary.pdf', size: '2.5 MB', date: '2023-09-20'},
  {name: 'Hotel_Booking.eml', size: '50 KB', date: '2023-09-21'},
];

const initialPhotos: Document[] = [];


export function useDocuments() {
    const [documents, setDocuments] = useLocalStorage<Document[]>("documents", initialDocuments);
    const [photos, setPhotos] = useLocalStorage<Document[]>("photos", initialPhotos);

    const addDocument = (doc: Document) => {
        if(doc.isImage) {
            addPhoto(doc);
        } else {
            setDocuments(prevDocs => [doc, ...prevDocs]);
        }
    };

    const deleteDocument = (docName: string) => {
        setDocuments(prevDocs => prevDocs.filter(doc => doc.name !== docName));
    };

    const addPhoto = (photo: Document) => {
        setPhotos(prevPhotos => [photo, ...prevPhotos]);
    }

    const deletePhoto = (photoName: string) => {
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.name !== photoName));
    }


    return { documents, addDocument, deleteDocument, photos, addPhoto, deletePhoto };
}
