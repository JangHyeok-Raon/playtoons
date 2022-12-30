import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";

const App = () => {
  return (
    <Routes>
      <Route path={"list"} element={<List />} />
    </Routes>
  );
};

export default App;
