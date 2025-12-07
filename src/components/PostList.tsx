import type { Post } from '@/types/post'
import PostItem from './PostItem'

interface PostListProps {
    posts: Post[]
    onEdit: (post: Post) => void
    onDelete: (id: string) => void
}

const PostList = ({ posts, onEdit, onDelete }: PostListProps) => {
    if (posts.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Пока нет постов. Создайте первый!
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    post={post}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default PostList