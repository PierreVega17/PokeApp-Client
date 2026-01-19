export default function PokemonSearch({value, onChange}) {
    return(
    <input 
    type="text"
    placeholder="Buscar Pokemon..."
    value={value}
    onChange={(e) => onChange (e.target.value)}
    className=" border p-2 rounded mb-8 block mx-auto focus:ring-2 focus:ring-blue-500 outline-none"
    />
)
}   