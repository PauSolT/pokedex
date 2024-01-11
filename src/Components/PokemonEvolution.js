import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterInSentence,
  NoSlash,
} from "../Utils/Utils";
import "../Css/PokemonEvolution.css";

const PokemonEvolution = ({ info, pokemonName }) => {
  if (
    FindEvolutionInfo(info.chain, pokemonName).evolves_to.length === 0 ||
    FindEvolutionInfo(info.chain, pokemonName) === null
  ) {
    return "";
  }
  const evolutionNames = [];
  const evolutionDetails = [];
  FindEvolutionInfo(info.chain, pokemonName).evolves_to.forEach((evo) => {
    evolutionNames.push(evo.species.name);
    evo.evolution_details.forEach((evoDetails) => {
      evolutionDetails.push(evoDetails);
    });
  });

  return (
    <div className="pokemonEvolution">
      <h2>Evolution</h2>
      <div className="evolutionInfo">
        <div className="previousEvolution">
          <h3>{CapitalizeFirstLetter(pokemonName)}</h3>
        </div>
        <div className="evolutionDetails">
          {evolutionDetails.map((evoInfo) => ShowEvolutionInfo(evoInfo))}
        </div>
        <div className="nextEvolution">
          {evolutionNames.map((pokemonEvolutionName) => (
            <h3>{CapitalizeFirstLetter(pokemonEvolutionName)}</h3>
          ))}
        </div>
      </div>
    </div>
  );
};

function FindEvolutionInfo(chain, targetName) {
  // Check if the current species matches the target name
  if (chain.species.name === targetName) {
    return chain;
  }

  // Check each evolves_to branch recursively
  for (const evolution of chain.evolves_to) {
    const nestedInfo = FindEvolutionInfo(evolution, targetName);

    // If the nestedInfo is found, return it
    if (nestedInfo) {
      return nestedInfo;
    }
  }

  // If the target name is not found in the current branch, return null
  return null;
}

function ShowEvolutionInfo(info) {
  console.log(info);

  return (
    <div>
      <p>
        <b><i>{CapitalizeFirstLetterInSentence(NoSlash(info.trigger.name))}</i></b> to evolve
      </p>
      <p>{info.gender && (info.gender === 2 ? "Gender: M" : "Gender: F")}</p>
      <p>{info.held_item && "Held item: " + CapitalizeFirstLetterInSentence(NoSlash(info.held_item.name))}</p>
      <p>{info.item && "Item: " + CapitalizeFirstLetterInSentence(NoSlash(info.item.name))}</p>
      <p>{info.known_move && "Has move: " + CapitalizeFirstLetterInSentence(NoSlash(info.known_move.name))}</p>
      <p>{info.known_move_type && "Has move type: " + CapitalizeFirstLetterInSentence(NoSlash(info.known_move_type))}</p>
      <p>{info.location && "Location: " + CapitalizeFirstLetterInSentence(NoSlash(info.location.name))}</p>
      <p>{info.min_affection && "Affection: " + info.min_affection}</p>
      <p>{info.min_beauty && "Beauty: " + info.min_beauty}</p>
      <p>{info.min_happiness && "Happiness: " + info.min_happiness}</p>
      <p>{info.min_level && "Level: " + info.min_level}</p>
      <p>{info.needs_overworld_rain && "While raining"}</p>
      <p>{info.party_species && "Pokemon at party: " + info.party_species.name}</p>
      <p>{info.party_type && "Pokemon type at party: " + info.party_type}</p>
      <p>{info.time_of_day && "Time of the day: " + info.time_of_day}</p>
      <p>{info.turn_upside_down && "Turn console upside down"}</p>
    </div>
  );
}

export default PokemonEvolution;
