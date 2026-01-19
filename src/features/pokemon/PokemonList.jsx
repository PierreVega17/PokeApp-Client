import { useState, useEffect } from 'react';
import { useGetPokemonsQuery, useGetPokemonNamesQuery } from './pokemonApi';
import ReactPaginate from 'react-paginate';
import PokemonSearch from './PokemonSearch';
import PokemonCard from './PokemonCard';
import PokemonSkeleton from './PokemonSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../favorites/FavoritesSlice';
import Toast from '../../components/ui/Toast';
export default function PokemonList() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem('pokemonPage');
    return saved ? parseInt(saved, 10) : 0;
  });
  const limit = 30;
  const [search, setSearch] = useState(() => {
    return localStorage.getItem('pokemonSearch') || '';
  });
  const isSearching = search.trim().length > 0;
  const { data: allNames } = useGetPokemonNamesQuery();
  const {
  data: pageData,
  isLoading: isLoadingPage,
  error: pageError,
} = useGetPokemonsQuery(
  { limit, offset: page * limit },
  { skip: isSearching }
);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    localStorage.setItem('pokemonPage', page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem('pokemonSearch', search);
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoadingPage) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center'>
        {Array.from({ length: 30 }).map((_, i) => (
          <PokemonSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pageError) {
    return <div>Error al cargar pokemons</div>;
  }

  const filteredPokemons = isSearching
  ? allNames?.results.filter(p =>
      p.name.startsWith(search.toLowerCase())
    ) || []
  : pageData?.results || [];

  const pokemonsToRender = filteredPokemons.slice(0, 30);


    const totalPages = isSearching
  ? 1
  : Math.ceil((pageData?.count || 0) / limit);

  return (
    <div>
      <div className='mb-8 flex justify-center'>
        <PokemonSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center mx-auto my-0'>
        {pokemonsToRender.map((pokemon) => {
          const isFavorite = favorites.some(p => p.name === pokemon.name);
          const toggleFavorite = (e) => {
            e.stopPropagation();
            if (isFavorite) {
              dispatch(removeFavorite(pokemon.name));
              setToast({ message: "Pokémon removido de favoritos", type: "success" });
            } else {
              dispatch(addFavorite(pokemon));
              setToast({ message: "Pokémon agregado a favoritos", type: "success" });
            }
          };
          return (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
      {!isSearching && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          forcePage={page}
          onPageChange={({ selected }) => setPage(selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          containerClassName='flex justify-center gap-2 mt-6'
          pageClassName='px-3 py-1 border rounded cursor-pointer'
          previousLabel='←'
          nextLabel='→'
          previousClassName='px-3 py-1 border rounded cursor-pointer'
          nextClassName='px-3 py-1 border rounded cursor-pointer'
          breakLabel='...'
          activeClassName='bg-blue-500 text-white'
          disabledClassName='opacity-50 cursor-not-allowed'
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
