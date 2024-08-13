import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useState } from "react";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const { genreOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreOrCategoryName,
    page,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4em" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that className
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return "An error has accured";

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default MoviesPage;
