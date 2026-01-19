export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="p-6 text-center text-gray-500">
      {text}
    </div>
  );
}
