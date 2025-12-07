export interface Post {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export type CreatePostDTO = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePostDTO = Partial<CreatePostDTO>