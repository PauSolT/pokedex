import "../Css/Searchbar.css"

function Searchbar() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
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
