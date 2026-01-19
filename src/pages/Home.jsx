import PokemonList from "../features/pokemon/pokemonList";
export default function Home() {
    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center my-4">PokeApp</h1>
            <PokemonList /> 
        </main>
    )
}