import { FieldValue } from "firebase/firestore";

export interface IComment {
    content: string,
    createdAt: FieldValue,
    ownerId: string,
    ownerEmail: string,
    likes: string[],
    topicId: string
}