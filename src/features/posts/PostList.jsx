import { Link } from 'react-router-dom';
import { useGetPostsQuery, useDeletePostMutation } from './postApi';
import Loader from '../../components/ui/Loader';
import ErrorState from '../../components/ui/ErrorState';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import PostCard from './PostCard';
import { useState } from 'react';
import PostModal from './PostModal';
import PostEditModal from './PostEditModal';
import PostDeleteModal from './PostDeleteModal';
import Toast from '../../components/ui/Toast';

export default function PostList() {
  const { data, isLoading, isError, refetch } = useGetPostsQuery();
  const [deletePost,{isLoading: isDeleting}] = useDeletePostMutation();

  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [toast, setToast] = useState(null);

  const handleDelete = (id) => {
    const post = data.find(p => p.id === id);
    setDeletingPost(post);
  };

  const handleView = (post) => {
  setSelectedPost(post);
};

  const handleEdit = (post) => {
    setEditingPost(post);
  };


  if (isLoading) return <Loader text='Cargando posts...' />;
  if (isError) return <ErrorState message='Error al cargar posts' />;

  const posts = Array.isArray(data) ? data : [];

  return (
    <div className='h-full my-auto'>
      <h2 className='text-2xl font-bold'>Posts</h2>
      <div className='flex flex-col gap-4 mt-4  '>
      {posts.length === 0 && <EmptyState message='No hay posts' />}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} />
      ))}
      </div>
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <PostEditModal post={editingPost} onClose={() => setEditingPost(null)} onSave={() => {}} />
      <PostDeleteModal post={deletingPost} onClose={() => setDeletingPost(null)} onDelete={() => { refetch(); setToast({ message: "Post eliminado exitosamente", type: "success" }); }} onError={() => setToast({ message: "Error al eliminar el post", type: "error" })} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
