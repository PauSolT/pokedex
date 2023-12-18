import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import ShowPokemon from "./Pages/ShowPokemon";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon/:myParam?" element={<ShowPokemon />}></Route>
      </Routes>
    </div>
  );
}

export default App;
