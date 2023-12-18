import { useNavigate  } from "react-router-dom";
import "../Css/Searchbar.css"
import PokemonInfo from "./PokemonInfo";

function Searchbar() {
  const navigate = useNavigate ();
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    navigate(`/pokemon/${formJson.searchedPokemon}`)
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
