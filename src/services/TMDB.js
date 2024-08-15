import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

var tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;

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
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        // Get movies by search
        if (searchQuery)
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;

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
    // Get one movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    // Get user spicfic list
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} = tmdbApi;
