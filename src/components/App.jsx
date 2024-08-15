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
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/movie/:id" element={<MoviesInfo />} />
            <Route path="/actors/:id" element={<ActorsInfo />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
