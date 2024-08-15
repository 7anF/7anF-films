import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import RatedCard from "../RatedCard/RatedCard";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovie } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchListMovie?.results?.length ? (
        <Typography variant="h5">
          Add favorites or whatchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCard title="Favorites Movies" data={favoriteMovies} />
          <RatedCard title="Watchlist" data={watchListMovie} />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
