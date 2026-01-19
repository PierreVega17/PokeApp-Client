import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_POKEAPI_BASE_URL}),
    endpoints: () => ({}),
});