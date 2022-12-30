import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"list"} element={<List />} />
        <Route path={"Detail"} element={<Detail />} />
      </Routes>
    </>
  );
};

export default App;
