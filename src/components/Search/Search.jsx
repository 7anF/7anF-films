import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useStyles from "./styles";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovie(query));
    setQuery("");
  };

  if (location.pathname !== "/") return null;
  return (
    <form className={classes.searchContainer} onSubmit={handleSubmit}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        placeholder="Search..."
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default Search;
