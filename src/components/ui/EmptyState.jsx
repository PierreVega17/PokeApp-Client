export default function EmptyState({ message = "No hay datos" }) {
  return (
    <div className="p-6 text-center text-gray-400">
      {message}
    </div>
  );
}
