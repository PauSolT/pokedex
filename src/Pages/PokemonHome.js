import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterInSentence,
  NoEndOfLines,
  NoSlash,
} from "../Utils/Utils";
import "../Css/PokemonHome.css";
import typeColors from "../Utils/PokemonTypeColors";

function PokemonHome({ pokemonSpecies, pokemon, language }) {
  const pokemonImgUrl = pokemon.sprites?.front_default;
  const pokemonName = pokemon?.name;
  const pokemonTitle = pokemonSpecies.genera.find(
    (p) => p.language.name === "en"
  )?.genus;
  const languagePokemonDescription = pokemonSpecies?.flavor_text_entries.filter(
    (obj) => obj.language.name === language
  );

  const pokemonDescription =
    languagePokemonDescription[
      Math.floor(Math.random() * languagePokemonDescription.length)
    ];

  const type1Color = typeColors[pokemon.types[0].type.name] || "#ffffff";
  const type2Color =
    typeColors[pokemon?.types[1]?.type.name] || type1Color;

  const gradientStyle = {
    background: `linear-gradient(to right, ${type1Color}, ${type2Color})`,
  };

  return (
    <div className="pokemonHome" style={gradientStyle}>
      <img src={pokemonImgUrl} alt={pokemonName}></img>

      <h2>
        {CapitalizeFirstLetter(pokemonName)} | {pokemonTitle}
      </h2>
      <div className="types" >
        <div className="type" style={{backgroundColor: type1Color}} >{pokemon.types[0].type.name.toUpperCase()}</div>
        {pokemon.types[1] && (
          <div className="type" style={{backgroundColor: type2Color}}>{pokemon.types[1].type.name.toUpperCase()}</div>
        )}
      </div>
      <p>
        {pokemonDescription ? (
          <>
            {NoEndOfLines(pokemonDescription.flavor_text)}
            <br />
            <b>
              {"("}Pokemon{" "}
              {CapitalizeFirstLetterInSentence(
                NoSlash(pokemonDescription.version.name)
              )}
              {")"}
            </b>
          </>
        ) : (
          "No Description"
        )}
      </p>
    </div>
  );
}

export default PokemonHome;
