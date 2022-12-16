import { FieldValue } from "firebase/firestore";

export interface ITopic {
    title: string,
    content: string,
    imageUrl: string,
    ownerId: string,
    ownerEmail: string,
    createdAt: FieldValue
}