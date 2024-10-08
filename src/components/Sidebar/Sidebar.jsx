import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useEffect } from "react";

const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const Sidebar = ({ setMobileOpen }) => {
  const { genreOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        {theme.palette.mode === "dark" ? (
          <img src={redLogo} alt="Filmpire logo" className={classes.image} />
        ) : (
          <img src={blueLogo} alt="Filmpire logo" className={classes.image} />
        )}
      </Link>
      <Divider />
      <List>
        <ListSubheader>Gategories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.Links} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.Links} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
