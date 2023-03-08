import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./router";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
