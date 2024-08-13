import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

var tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),

    // Get movies by [type]
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page }) => {
        // Get movies by category
        if (genreOrCategoryName && typeof genreOrCategoryName === "string")
          return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;

        // Get movies by genre
        if (genreOrCategoryName && typeof genreOrCategoryName === "number")
          return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;

        // Get movies at the start of page
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
