import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterInSentence,
  NoEndOfLines,
} from "../Utils/Utils";
import "../Css/PokemonHome.css";
import typeColors from "../Utils/PokemonTypeColors";

function PokemonHome({ pokemonSpecies, pokemon, language }) {
  console.log(pokemonSpecies);
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

  const backgroundColor = typeColors[pokemon.types[0].type.name] || "#000000";
  const borderColor =
    typeColors[pokemon?.types[1]?.type.name] || backgroundColor;
  return (
    <div className="pokemonHome" style={{ backgroundColor, borderColor }}>
      <img src={pokemonImgUrl} alt={pokemonName}></img>
      <h2>
        {CapitalizeFirstLetter(pokemonName)} | {pokemonTitle}
      </h2>
      <p>
        {pokemonDescription ? (
          <>
            {NoEndOfLines(pokemonDescription.flavor_text)}
            <br />
            <b>
              {"("}Pokemon{" "}
              {CapitalizeFirstLetterInSentence(
                pokemonDescription.version.name.replace("-", " ")
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
