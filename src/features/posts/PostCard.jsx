import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function PostCard({ post, onDelete, onView, onEdit }) {
  return (
    <div className='bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition'>
      <div>
        <h3 className='text-lg font-bold text-slate-800 mb-2'>{post.title}</h3>
        <p className='text-slate-600 text-sm line-clamp-3'>
          {post.body || post.content}
        </p>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <Button
          onClick={() => onView(post)}
          className='text-blue-600 hover:underline text-sm font-medium'
        >
          Ver
        </Button>

        <div className='flex gap-2'>
          <Button onClick={() => onEdit(post)} className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded'>
            Editar
          </Button>

          <Button
            onClick={() => onDelete(post.id)}
            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
