import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Router } from "@reach/router";

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <SearchParams path="/" />
      </Router>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
