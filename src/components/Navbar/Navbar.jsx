import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Drawer,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  WbSunny,
  NightlightRound,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { useContext, useEffect, useState } from "react";
import { Sidebar, Search } from "../index";
import { fetchToken, moviesApi, createSessionId } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionId = localStorage.getItem("session_id");
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (localStorage.getItem("session_id")) {
          const { data: userDtata } = await moviesApi.get(
            `account?session_id=${sessionId}`
          );
          dispatch(setUser(userDtata));
        } else {
          const session_Id = await createSessionId();
          const { data: userDtata } = await moviesApi.get(
            `account?session_id=${session_Id}`
          );
          dispatch(setUser(userDtata));
        }
      }
    };

    logInUser();
    navigate("/");
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((prev) => !prev)}
              sx={{ outline: "none" }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <NightlightRound /> : <WbSunny />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
