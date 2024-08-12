import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

var tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const page = 1;
// https://api.themoviedb.org/3/movie/343611?api_key=ed18274e3f1da2f27c944161c9be44df
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get movies by [type]
    getMovies: builder.query({
      query: () => {
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
