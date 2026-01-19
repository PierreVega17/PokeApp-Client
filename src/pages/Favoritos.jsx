import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favorites/FavoritesSlice';
import PokemonCard from '../features/pokemon/PokemonCard';

export default function Favoritos() {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.list);

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center my-4">Favoritos</h1>
            {favorites.length === 0 ? (
                <p className="text-center">No tienes Pokémon favoritos aún. Haz click en el corazón de un Pokémon para agregarlo.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                    {favorites.map((pokemon) => {
                        const isFavorite = true;
                        const toggleFavorite = (e) => {
                            e.stopPropagation();
                            dispatch(removeFavorite(pokemon.name));
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
            )}
        </main>
    );
}