import { api } from "../../app/api";

export const pokemonApi = api.injectEndpoints({
  endpoints: (builder) => ({
  getPokemons: builder.query({
  query: ({ limit = 100, offset = 0 }) =>
    `pokemon?limit=${limit}&offset=${offset}`,
}),
getPokemonNames: builder.query({
  query: () => `pokemon?limit=1350&offset=0`,
}),

  getPokemonByName: builder.query({
  query: (name) => `pokemon/${name.toLowerCase()}`,
  keepUnusedDataFor: 300,
}),

}),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonNamesQuery,
} = pokemonApi;