import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  MoviesPage,
  ProfilePage,
  MoviesInfo,
  ActorsInfo,
  Navbar,
} from "./index";

import "./styles.css";

function App() {
  return (
    <div className="root">
      <CssBaseline />
      <Navbar />
      <main className="content">
        <div className="toolbar">
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
