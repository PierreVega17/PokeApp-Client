import { useState, useEffect } from "react";
import { useUpdatePostMutation } from "./postApi";
import Button from "../../components/ui/Button";

export default function PostEditModal({ post, onClose, onSave }) {
  const [updatePost] = useUpdatePostMutation();
  const isLoadingUpdate = updatePost.isLoading;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id: post.id, title, body }).unwrap();
      setSuccessMessage("Post actualizado exitosamente");
      setTimeout(() => {
        onSave(); // Llamar onSave para refrescar
        onClose();
      }, 1500); // Cerrar después de mostrar el mensaje
    } catch (error) {
      console.error('Error al actualizar el post:', error);
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editar Post</h2>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoadingUpdate} className="bg-blue-500 hover:bg-blue-600 text-white">
              {isLoadingUpdate ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}