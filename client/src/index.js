import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        overflow:hidden;
    }
`;
ReactDOM.render(
    <div>
  <GlobalStyle/>
    <App />
  </div>,
  document.getElementById("root")
);
