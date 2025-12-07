import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/types/post'

interface PostFormProps {
    onSubmit: (post: CreatePostDTO | UpdatePostDTO) => void
    initialData?: Post
    onCancel?: () => void
}

const PostForm = ({ onSubmit, initialData, onCancel }: PostFormProps) => {
    const [title, setTitle] = useState(initialData?.title || '')
    const [content, setContent] = useState(initialData?.content || '')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        
        if (!title.trim() || !content.trim()) {
            alert('Заполните все поля')
            return
        }

        onSubmit({ title, content })
        setTitle('')
        setContent('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{initialData ? 'Редактировать пост' : 'Создать новый пост'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Заголовок</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите заголовок"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="content">Содержание</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Введите содержание"
                            rows={4}
                        />
                    </div>
                    
                    <div className="flex gap-2">
                        <Button type="submit">
                            {initialData ? 'Обновить' : 'Создать'}
                        </Button>
                        {initialData && onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel}>
                                Отмена
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default PostForm