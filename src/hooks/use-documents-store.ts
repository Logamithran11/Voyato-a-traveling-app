
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

export function useDocuments() {
    const [documents, setDocuments] = useLocalStorage<Document[]>("documents", initialDocuments);

    const addDocument = (doc: Document) => {
        setDocuments(prevDocs => [doc, ...prevDocs]);
    };

    const deleteDocument = (docName: string) => {
        setDocuments(prevDocs => prevDocs.filter(doc => doc.name !== docName));
    };

    return { documents, setDocuments, addDocument, deleteDocument };
}
