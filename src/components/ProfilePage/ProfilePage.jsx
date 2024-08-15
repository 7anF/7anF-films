import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const favoriteMovies = 1;

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
      {!favoriteMovies.length ? (
        <Typography variant="h5">
          Add favorites or whatchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>Favorites Movies</Box>
      )}
    </Box>
  );
};

export default ProfilePage;
