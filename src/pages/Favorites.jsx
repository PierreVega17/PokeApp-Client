import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const favorites = useSelector(state => state.favorites.list);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon Favoritos</h1>

      {favorites.length === 0 && (
        <p className="text-slate-500">No tienes pokémon favoritos aún.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map(p => (
          <Link
            key={p.name}
            to={`/pokemon/${p.name}`}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center hover:scale-105 transition"
          >
            <img src={p.image} alt={p.name} className="w-20 h-20" />
            <p className="capitalize font-medium mt-2">{p.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
