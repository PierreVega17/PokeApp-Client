export default function ErrorState({ message = "Ocurrió un error" }) {
  return (
    <div className="p-6 text-center text-red-600">
      {message}
    </div>
  );
}
