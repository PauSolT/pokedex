import React, { useState, useEffect } from "react";
import { CapitalizeFirstLetterInSentence, NoSlash } from "../Utils/Utils";
import "../Css/PokemonMoves.css"

const PokemonMoves = ({ moves }) => {
  const [visibleMoves, setVisibleMoves] = useState(moves);
  const [sortNameOrder, setSortNameOrder] = useState("asc");
  const [sortMethodOrder, setSortMethodOrder] = useState("asc");
  const [sortLevelOrder, setSortLevelOrder] = useState("asc");
  const [genMovesAvaiable, setGenMovesAvaiable] = useState({
    hasGen1Moves: "",
  hasGen2Moves: "",
  hasGen3Moves: "",
  hasGen4Moves: "",
  hasGen5Moves: "",
  hasGen6Moves: "",
  hasGen7Moves: "",
  hasGen8Moves: "",
  hasGen9Moves: ""
});

  const showVersionGroup = (versionGroup) => {
    const filteredMoves = moves.filter((move) =>
      move.version_group_details.some(
        (detail) => detail.version_group.name === versionGroup
      )
    );

    const filteredMovesByGen = [];
    filteredMoves.forEach((move) => {
      const asdf = move.version_group_details.filter(
        (version) => version.version_group.name === versionGroup
      );
      const obj = {
        move: move.move,
        version_group_details: asdf,
      };
      filteredMovesByGen.push(obj);
    });

    return filteredMovesByGen;
  };

  const ShowGenMoves = (gen) => {
    let filteredMoves;
    switch (gen) {
      case "I":
        filteredMoves = [
          ...showVersionGroup("red-blue"),
          ...showVersionGroup("yellow"),
        ];
        break;
      case "II":
        filteredMoves = [
          ...showVersionGroup("gold-silver"),
          ...showVersionGroup("cristal"),
        ];
        break;
      case "III":
        filteredMoves = [
          ...showVersionGroup("ruby-sapphire"),
          ...showVersionGroup("emerald"),
          ...showVersionGroup("firered-leafgreen"),
        ];
        break;
      case "IV":
        filteredMoves = [
          ...showVersionGroup("diamond-pearl"),
          ...showVersionGroup("platinum"),
          ...showVersionGroup("heartgold-soulsilver"),
        ];
        break;
      case "V":
        filteredMoves = [
          ...showVersionGroup("black-white"),
          ...showVersionGroup("black-2-white-2"),
        ];
        break;
      case "VI":
        filteredMoves = [
          ...showVersionGroup("x-y"),
          ...showVersionGroup("omega-ruby-alpha-sapphire"),
        ];
        break;
      case "VII":
        filteredMoves = [
          ...showVersionGroup("sun-moon"),
          ...showVersionGroup("ultra-sun-ultra-moon"),
          ...showVersionGroup("lets-go-pikachu-lets-go-eevee"),
        ];
        break;
      case "VIII":
        filteredMoves = [
          ...showVersionGroup("sword-shield"),
          ...showVersionGroup("brilliant-diamond-and-shining-pearl"),
          ...showVersionGroup("legends-arceus"),
        ];
        break;
      case "IX":
        filteredMoves = [...showVersionGroup("scarlet-violet")];
        break;

      default:
        filteredMoves = {
          move: {
            name: "no-move",
          },
          version_group_details: [
            {
              level_learned_at: 0,
              move_learn_method: {
                name: "level",
              },
              version_group: {
                name: "none",
              },
            },
          ],
        };
        break;
    }

    const uniqueMoves = filteredMoves.filter(
      (move, index, self) =>
        index === self.findIndex((m) => m.move.name === move.move.name)
    );

    setVisibleMoves(uniqueMoves);
  };


  const HasGenMoves = () => {
        const gen1Moves = [
          ...showVersionGroup("red-blue"),
          ...showVersionGroup("yellow"),
        ];
        const gen2Moves = [
          ...showVersionGroup("gold-silver"),
          ...showVersionGroup("cristal"),
        ];
        const gen3Moves = [
          ...showVersionGroup("ruby-sapphire"),
          ...showVersionGroup("emerald"),
          ...showVersionGroup("firered-leafgreen"),
        ];
        const gen4Moves = [
          ...showVersionGroup("diamond-pearl"),
          ...showVersionGroup("platinum"),
          ...showVersionGroup("heartgold-soulsilver"),
        ];
        const gen5Moves = [
          ...showVersionGroup("black-white"),
          ...showVersionGroup("black-2-white-2"),
        ];
        const gen6Moves = [
          ...showVersionGroup("x-y"),
          ...showVersionGroup("omega-ruby-alpha-sapphire"),
        ];
        const gen7Moves = [
          ...showVersionGroup("sun-moon"),
          ...showVersionGroup("ultra-sun-ultra-moon"),
          ...showVersionGroup("lets-go-pikachu-lets-go-eevee"),
        ];
        const gen8Moves = [
          ...showVersionGroup("sword-shield"),
          ...showVersionGroup("brilliant-diamond-and-shining-pearl"),
          ...showVersionGroup("legends-arceus"),
        ];
        const gen9Moves = [...showVersionGroup("scarlet-violet")];

        const hasGenMoves = {
          hasGen1Moves: gen1Moves.length === 0 ? "none" : "",
          hasGen2Moves: gen2Moves.length === 0 ? "none" : "",
          hasGen3Moves: gen3Moves.length === 0 ? "none" : "",
          hasGen4Moves: gen4Moves.length === 0 ? "none" : "",
          hasGen5Moves: gen5Moves.length === 0 ? "none" : "",
          hasGen6Moves: gen6Moves.length === 0 ? "none" : "",
          hasGen7Moves: gen7Moves.length === 0 ? "none" : "",
          hasGen8Moves: gen8Moves.length === 0 ? "none" : "",
          hasGen9Moves: gen9Moves.length === 0 ? "none" : "",
        }
        setGenMovesAvaiable(hasGenMoves);
    }


  const SortNameMoves = () => {
    const sortedMoves = [...visibleMoves];
    if (sortNameOrder === "asc") {
      sortedMoves.sort((a, b) => (a.move.name < b.move.name ? -1 : 1));
      setSortNameOrder("desc");
    } else if (sortNameOrder === "desc") {
      sortedMoves.sort((a, b) => (a.move.name < b.move.name ? 1 : -1));
      setSortNameOrder("asc");
    }

    setVisibleMoves(sortedMoves);
  };

  const SortLevelMoves = () => {
    const sortedMoves = [...visibleMoves];
    if (sortLevelOrder === "asc") {
      sortedMoves.sort((a, b) =>
        a.version_group_details[0].level_learned_at <
        b.version_group_details[0].level_learned_at
          ? -1
          : 1
      );
      setSortLevelOrder("desc");
    } else if (sortLevelOrder === "desc") {
      sortedMoves.sort((a, b) =>
        a.version_group_details[0].level_learned_at <
        b.version_group_details[0].level_learned_at
          ? 1
          : -1
      );
      setSortLevelOrder("asc");
    }
    const uniqueMoves = sortedMoves.filter(
      (move, index, self) =>
        index === self.findIndex((m) => m.move.name === move.move.name)
    );
    setVisibleMoves(uniqueMoves);
  };

  const SortMethodMoves = () => {
    const sortedMoves = [...visibleMoves];
    if (sortMethodOrder === "asc") {
      sortedMoves.sort((a, b) =>
        a.version_group_details[0].move_learn_method.name <
        b.version_group_details[0].move_learn_method.name
          ? -1
          : 1
      );
      setSortMethodOrder("desc");
    } else if (sortMethodOrder === "desc") {
      sortedMoves.sort((a, b) =>
        a.version_group_details[0].move_learn_method.name <
        b.version_group_details[0].move_learn_method.name
          ? 1
          : -1
      );
      setSortMethodOrder("asc");
    }
    const uniqueMoves = sortedMoves.filter(
      (move, index, self) =>
        index === self.findIndex((m) => m.move.name === move.move.name)
    );
    setVisibleMoves(uniqueMoves);
  };

  const AllLearnMethods = (move) => {
    let allMethods = "";
    let methodNames = [];
    for (let index = 0; index < move.version_group_details.length; index++) {
      const element = move.version_group_details[index];
      const methodName = CapitalizeFirstLetterInSentence(
        element.move_learn_method.name.replaceAll("-", " ")
      );

      if (!methodNames.includes(methodName)) {
        allMethods += methodName;
        if (index + 1 !== move.version_group_details.length) {
          allMethods += "/";
        }
        methodNames.push(methodName);
      }
    }

    if (allMethods[allMethods.length - 1] === "/") {
      allMethods = allMethods.substring(0, allMethods.length - 1);
    }

    return allMethods;
  };

  useEffect(() => {
    // Initialize the table with all moves
    HasGenMoves();
    setVisibleMoves(moves);
  }, [moves]);

  return (
    <div className="pokemonMoves">
      <h2>Moves Classification</h2>
      <div className="genButtons">
        <button style={{display: genMovesAvaiable.hasGen1Moves}} onClick={() => ShowGenMoves("I")}>Gen I</button>
        <button style={{display: genMovesAvaiable.hasGen2Moves}} onClick={() => ShowGenMoves("II")}>Gen II</button>
        <button style={{display: genMovesAvaiable.hasGen3Moves}} onClick={() => ShowGenMoves("III")}>Gen III</button>
        <button style={{display: genMovesAvaiable.hasGen4Moves}} onClick={() => ShowGenMoves("IV")}>Gen IV</button>
        <button style={{display: genMovesAvaiable.hasGen5Moves}} onClick={() => ShowGenMoves("V")}>Gen V</button>
        <button style={{display: genMovesAvaiable.hasGen6Moves}} onClick={() => ShowGenMoves("VI")}>Gen VI</button>
        <button style={{display: genMovesAvaiable.hasGen7Moves}} onClick={() => ShowGenMoves("VII")}>Gen VII</button>
        <button style={{display: genMovesAvaiable.hasGen8Moves}} onClick={() => ShowGenMoves("VIII")}>Gen VIII</button>
        <button style={{display: genMovesAvaiable.hasGen9Moves}} onClick={() => ShowGenMoves("IX")}>Gen IX</button>
      </div>
      <table className="statsTable">
        <thead>
          <tr>
            <th onClick={() => SortNameMoves()}>Name</th>
            <th onClick={() => SortLevelMoves()}>Level</th>
            <th onClick={() => SortMethodMoves()}>Method</th>
          </tr>
        </thead>
        <tbody>
          {visibleMoves.map((move, index) => (
            <tr key={index}>
              <td>
                {CapitalizeFirstLetterInSentence(
                  NoSlash(move.move.name)
                )}
              </td>
              <td>
                {move.version_group_details[0].level_learned_at
                  ? move.version_group_details[0].level_learned_at
                  : "-"}
              </td>
              <td>{AllLearnMethods(move)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonMoves;
