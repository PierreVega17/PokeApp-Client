import { useParams } from 'react-router-dom';
import { useGetPostQuery } from './postApi';

export default function PostDetail() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useGetPostQuery(id, { skip: !id });
  if (!id) return <p>Cargando...</p>;

  if (isLoading) return <p>Cargando post...</p>;

  if (error) return <p>Error al cargar el post</p>;

  if (!post) return <p>No se encontró el post</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
