import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";

const MoviesPage = () => {
  const { data } = useGetMoviesQuery();
  console.log(data);

  return <div>Ahmad</div>;
};

export default MoviesPage;
