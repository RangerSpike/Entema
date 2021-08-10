// eslint-disable-next-line
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "react-jss";
import { BrowserRouter } from "react-router-dom";
import Theme from "./Components/Dashboard/theme";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
