export default function PostModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-xl w-full relative max-h-[80vh] overflow-y-auto overflow-x-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
        <p className="text-slate-700 leading-relaxed break-words">{post.body}</p>
      </div>
    </div>
  );
}
