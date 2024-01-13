import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterInSentence,
  NoSlash,
} from "../Utils/Utils";
import "../Css/PokemonEvolution.css";
import { useNavigate } from "react-router-dom";
import { darkTypeColors } from "../Utils/PokemonTypeColors";

const PokemonEvolution = ({ info, pokemonName, typeName }) => {

  const baseStyle = {
    backgroundColor:
      darkTypeColors[typeName] || "#ffffff",
    borderRadius: "15px",
    padding: "3%",
    margin:"5%",
  };
  

  const navigate = useNavigate();
  if (
    FindEvolutionInfo(info.chain, pokemonName) === null ||
    FindEvolutionInfo(info.chain, pokemonName).evolves_to.length === 0
  ) {
    return "";
  }
  const evolution = [];
  FindEvolutionInfo(info.chain, pokemonName).evolves_to.forEach((evo) => {
    const evolutionDetails = [];
    evo.evolution_details.forEach((evoDetails) => {
      evolutionDetails.push(evoDetails);
    });
    evolution.push({
      name: evo.species.name,
      details: evolutionDetails,
    });
  });

  return (
    <div className="pokemonEvolution">
      <h2>Evolution</h2>
      <div className="evolutionInfo">
        <div className="previousEvolution">
          <h3>{CapitalizeFirstLetter(pokemonName)}</h3>
        </div>
        <div className="allEvolutions">
          {evolution.map((evoInfo) => (
            <div className="evolutionForm">
              <div className="waysToEvolve">
                {evoInfo.details.map((evoDetails) => (
                  <div className="evolutionDetails" style={baseStyle}>
                    {ShowEvolutionInfo(evoDetails)}
                  </div>
                ))}
              </div>
              <div className="nextEvolution">
                <h3 onClick={() => navigate("/pokemon/" + evoInfo.name)}>
                  {CapitalizeFirstLetter(evoInfo.name)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function FindEvolutionInfo(chain, targetName) {
  if (chain.species.name === targetName) {
    return chain;
  }

  for (const evolution of chain.evolves_to) {
    const nestedInfo = FindEvolutionInfo(evolution, targetName);

    if (nestedInfo) {
      return nestedInfo;
    }
  }

  return null;
}

function ShowEvolutionInfo(info) {
  return (
    <div>
      <p>
        <b>
          <i>{CapitalizeFirstLetterInSentence(NoSlash(info.trigger.name))}</i>
        </b>{" "}
        to evolve
      </p>
      {info.gender &&
        (info.gender === 2 ? <p>{"Gender: M"}</p> : <p>{"Gender: F"}</p>)}
      {info.held_item && (
        <p>
          {"Held item: " +
            CapitalizeFirstLetterInSentence(NoSlash(info.held_item.name))}
        </p>
      )}

      {info.item && (
        <p>
          {"Item: " + CapitalizeFirstLetterInSentence(NoSlash(info.item.name))}
        </p>
      )}

      {info.known_move && (
        <p>
          {"Has move: " +
            CapitalizeFirstLetterInSentence(NoSlash(info.known_move.name))}
        </p>
      )}

      {info.known_move_type && (
        <p>
          {"Has move type: " +
            CapitalizeFirstLetterInSentence(NoSlash(info.known_move_type.name))}
        </p>
      )}

      {info.location && (
        <p>
          {"Location: " +
            CapitalizeFirstLetterInSentence(NoSlash(info.location.name))}
        </p>
      )}

      {info.min_affection && <p>{"Affection: " + info.min_affection}</p>}
      {info.min_beauty && <p>{"Beauty: " + info.min_beauty}</p>}
      {info.min_happiness && <p>{"Happiness: " + info.min_happiness}</p>}
      {info.min_level && <p>{"Level: " + info.min_level}</p>}
      {info.needs_overworld_rain && <p> {"While raining"}</p>}
      {info.party_species && (
        <p>{"Pokemon at party: " + info.party_species.name}</p>
      )}
      {info.party_type && <p>{"Pokemon type at party: " + info.party_type}</p>}
      {info.relative_physical_stats !== null && <p>{RelativePhysicalStats(info.relative_physical_stats)}</p>}
      {info.time_of_day && <p>{"Time of the day: " + info.time_of_day}</p>}
      {info.turn_upside_down && <p>{"Turn console upside down"}</p>}
    </div>
  );
}

function RelativePhysicalStats(info)
{
  console.log(info)

  if(info === -1)
  {
    return "Attack > Defense";
  } else if (info === 0)
  {
    return "Attack = Defense";
  } else if (info === 1)
  {
    return "Attack < Defense";
  }
}

export default PokemonEvolution;
