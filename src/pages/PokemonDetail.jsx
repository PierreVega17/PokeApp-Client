import { useParams } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../features/pokemon/pokemonApi';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import PokemonCard from '../features/pokemon/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favorites/FavoritesSlice';
import { useState } from 'react';
import Toast from '../components/ui/Toast';

export default function PokemonDetails() {
  const { name } = useParams();
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const [toast, setToast] = useState(null);

  if (isLoading) return <p className='p-6'>Cargando detalle...</p>;
  if (error)
    return (
      <p className='p-6'>Error al cargar detalle: Pokémon no encontrado</p>
    );
  if (!data) return null;

  // Crear un objeto pokemon para pasar a PokemonCard
  const pokemon = { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` };
  const isFavorite = favorites.some(p => p.name === data.name);
  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(data.name));
      setToast({ message: "Pokémon removido de favoritos", type: "success" });
    } else {
      dispatch(addFavorite(data));
      setToast({ message: "Pokémon agregado a favoritos", type: "success" });
    }
  };

  return (
    <div className='p-6 max-w-[1200px] mx-auto'>
      <Button>
        <Link
          to='/'
          className='text-white-600'
        >
          ← Volver
        </Link>
      </Button>
      <div className='w-full max-w-[1200px] flex flex-col gap-4 grid md:grid-cols-2 sm:grid-cols-1'>
        <div className='flex justify-center'>
          <PokemonCard pokemon={pokemon} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        </div>
        <div className='relative flex flex-col items-center bg-white dark:bg-[#1e293b] rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-transparent overflow-hidden'>
          <h2 className='text-2xl font-bold mb-4'>Detalles</h2>
          <div className='space-y-2'>
            <p><strong>Altura:</strong> {data.height / 10} m</p>
            <p><strong>Peso:</strong> {data.weight / 10} kg</p>
            <p><strong>Experiencia base:</strong> {data.base_experience}</p>
            <p><strong>Habilidades:</strong> {data.abilities.map(a => a.ability.name).join(', ')}</p>
          </div>
          <div className='mt-6 w-full'>
            <p className='font-bold mb-4 text-center'>
              <strong>Estadísticas:</strong>
            </p>
            <div className='mt-6 w-full space-y-3'>
              {data.stats.map((s) => (
                <div
                  key={s.stat.name}
                  className='grid grid-cols-[80px_40px_1fr] items-center gap-3'
                >
                  <span className='text-sm text-slate-500 capitalize'>
                    {s.stat.name}
                  </span>
                  <span className='font-bold'>{s.base_stat}</span>
                  <div className='w-full h-2.5 bg-slate-300 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-green-500 rounded-full'
                      style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
