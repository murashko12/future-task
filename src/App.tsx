import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Dialog, DialogContent } from './components/ui/dialog'
import type { Post, CreatePostDTO, UpdatePostDTO } from './types/post'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import futureLogo from '../public/future-logo.svg'

function App() {
    const [posts, setPosts] = useState<Post[]>(() => {
        const saved = localStorage.getItem('posts')
        return saved ? JSON.parse(saved) : []
    })
  
    const [editingPost, setEditingPost] = useState<Post | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)

    // сохраняем в localStorage
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts))
    }, [posts])

    const handleCreatePost = (postData: CreatePostDTO | UpdatePostDTO) => {
    
        if (!postData.title || !postData.content) {
            console.error('Missing required fields')
            return
        }
    
        const newPost: Post = {
            title: postData.title!,
            content: postData.content!,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    
        setPosts([newPost, ...posts])
        setShowCreateForm(false)
    }

    const handleUpdatePost = (postData: CreatePostDTO | UpdatePostDTO) => {
        if (!editingPost) return
    
        const updatedFields: Partial<Post> = {
            updatedAt: new Date(),
        }
    
        if (postData.title !== undefined) {
            updatedFields.title = postData.title
        }
    
        if (postData.content !== undefined) {
            updatedFields.content = postData.content
        }
    
        setPosts(posts.map(post => (
            post.id === editingPost.id ? { ...post, ...updatedFields } : post
        )))
    
        setEditingPost(null)
    }

    const handleDeletePost = (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
            setPosts(posts.filter(post => post.id !== id))
        }
    }

    const handleEditPost = (post: Post) => {
        setEditingPost(post)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8 flex items-center gap-4">
                    <img src={futureLogo} alt="логотип" className="h-20" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Управление постами
                    </h1>
                </header>

                <div className="mb-8">
                    <Button onClick={() => setShowCreateForm(true)}>
                        Создать новый пост
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Список постов</h2>
                        <PostList
                            posts={posts}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                        />
                    </div>
                    
                    <div>
                        {showCreateForm && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Новый пост</h2>
                                <PostForm
                                    onSubmit={handleCreatePost}
                                    onCancel={() => setShowCreateForm(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
                    <DialogContent>
                        {editingPost && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Редактировать пост</h2>
                                <PostForm
                                    initialData={editingPost}
                                    onSubmit={handleUpdatePost}
                                    onCancel={() => setEditingPost(null)}
                                />
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default App