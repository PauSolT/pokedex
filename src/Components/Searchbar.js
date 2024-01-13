import { useNavigate } from "react-router-dom";
import "../Css/Searchbar.css"
import P from "../Utils/Pokedex";

function Searchbar() {

  const GetPokemonNames = async() =>
  {
    const names = await P.getResource('https://pokeapi.co/api/v2/pokemon?limit=1500');
    return names.results.map(pokemon => pokemon.name);
  }

  const pokemonNames = GetPokemonNames();

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson.searchedPokemon);

    navigate(`/pokemon/${formJson.searchedPokemon.toLowerCase()}`)
  }

  return (
    <form className="formSearchbar" method="post" onSubmit={handleSubmit}>
      <label>
        Search any Pokemon:{" "}
        <input name="searchedPokemon" placeholder="Name or Id (Pikachu | 25)" />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default Searchbar;
