import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post } from '@/types/post'

interface PostItemProps {
    post: Post
    onEdit: (post: Post) => void
    onDelete: (id: string) => void
}

const PostItem = ({ post, onEdit, onDelete }: PostItemProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <div className="text-sm text-gray-500">
                    Создан: {new Date(post.createdAt).toLocaleDateString()}
                    {post.updatedAt > post.createdAt && (
                        <span>, Обновлен: {new Date(post.updatedAt).toLocaleDateString()}</span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{post.content}</p>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEdit(post)}
                    >
                        Редактировать
                    </Button>
                    <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onDelete(post.id)}
                    >
                        Удалить
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostItem