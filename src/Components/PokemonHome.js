import { CapitalizeFirstLetter, CapitalizeFirstLetterInSentence, NoEndOfLines } from "../Utils/Utils";
import "../Css/PokemonHome.css"

function PokemonHome({pokemonSpecies, pokemon, language}) {
    const pokemonImgUrl = pokemon.sprites?.front_default;
    const pokemonName = pokemon?.name;
    const pokemonTitle = pokemonSpecies.genera.find(p => p.language.name === "en")?.genus;
    const languagePokemonDescription = pokemonSpecies?.flavor_text_entries.filter(obj => obj.language.name === language);

    const pokemonDescription = languagePokemonDescription[Math.floor(Math.random() * languagePokemonDescription.length)]

    return(
        <div className="pokemonHome">
            <img src={pokemonImgUrl} alt={pokemonName}></img>
            <h2>{CapitalizeFirstLetter(pokemonName)} | {pokemonTitle}</h2> 
            <p>{NoEndOfLines( pokemonDescription.flavor_text)} (Pokemon {CapitalizeFirstLetterInSentence(pokemonDescription.version.name.replace("-", " "))})</p>
        </div>
    )
}

export default PokemonHome;