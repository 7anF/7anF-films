import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";

import ToggleColorModeProvider from "./utils/ToggleColorMode";
import App from "./components/App";
import store from "./app/store";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>
);
