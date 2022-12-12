
export interface IComment {
    uid: string,
    content: string,
    created_at: string,
    _ownerId: string,
    likes: string[],
    dislikes: string[],
    topicId: string
}