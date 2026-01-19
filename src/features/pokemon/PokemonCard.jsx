import { useNavigate } from 'react-router-dom';
import { useGetPokemonByNameQuery } from './pokemonApi';
import HeartButton from '../../components/ui/HeartButton';

// Colores coherentes para tipos de Pokémon (basados en colores estándar)
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export default function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPokemonByNameQuery(pokemon.name);
  if (isLoading) {
    return (
      <div className='bg-white shadow- rounded-lg p-4 w-40 h-56 flex items-center justify-center'>
        Cargando...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className=' flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-auto hover:scale-90 hover:bg-gray-200 transition ease-in-out duration-300'>
    <div
      className='text-center capitalize cursor-pointer w-50 h-56 grid grid-cols-1 '
      onClick={() => navigate(`/pokemon/${data.name}`)}
    >
      <img
        src={data.sprites.front_default}
        alt={data.name}
        loading='lazy'
        className='w-50 h-40 justify-self-center'
      />
      <span className='text-lg font-medium'>{data.name}</span>
      <div className='flex gap-1 justify-center mt-2'>
        {data.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className='px-2 py-1 text-xs font-semibold text-white rounded-full'
            style={{ backgroundColor: typeColors[typeInfo.type.name] || '#A8A878' }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
    <HeartButton active={isFavorite} size="md" onClick={toggleFavorite} />
    </div>
  );
}
