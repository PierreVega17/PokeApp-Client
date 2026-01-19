import { useDeletePostMutation } from "./postApi";
import Button from "../../components/ui/Button";

export default function PostDeleteModal({ post, onClose, onDelete, onError }) {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleConfirm = async () => {
    try {
      await deletePost(post.id).unwrap();
      onDelete();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el post:', error);
      onError();
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Eliminar Post</h2>
        <p className="mb-6">¿Estás seguro de que deseas eliminar el post "<strong>{post.title}</strong>"? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white">
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>
    </div>
  );
}