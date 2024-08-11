import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  MoviesPage,
  ProfilePage,
  MoviesInfo,
  ActorsInfo,
  Navbar,
} from "./index";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.toolbar}>
        <div className={classes.content}>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/movies/:id" element={<MoviesInfo />} />
            <Route path="/actors/:id" element={<ActorsInfo />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
