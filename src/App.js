import React from "react";
import Form from "./screen/Form";
import Tables from "./screen/Tables";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Navigate to="/form-create" replace={true} />}
      />
      <Route path="/form-create" element={<Form />} />
      <Route path="/form" element={<Tables />} />
    </Routes>
  );
};

export default App;
