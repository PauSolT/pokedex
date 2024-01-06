import React, { useState, useEffect } from "react";
import { CapitalizeFirstLetterInSentence } from "../Utils/Utils";

const PokemonMoves = ({ moves }) => {
  const [visibleMoves, setVisibleMoves] = useState(moves);
  const [sortNameOrder, setSortNameOrder] = useState("asc");
  const [sortMethodOrder, setSortMethodOrder] = useState("asc");
  const [sortLevelOrder, setSortLevelOrder] = useState("asc");

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
    setVisibleMoves(moves);
  }, [moves]);

  return (
    <div>
      <h2>Moves Classification</h2>
      <div>
        <button onClick={() => ShowGenMoves("I")}>Gen I</button>
        <button onClick={() => ShowGenMoves("II")}>Gen II</button>
        <button onClick={() => ShowGenMoves("III")}>Gen III</button>
        <button onClick={() => ShowGenMoves("IV")}>Gen IV</button>
        <button onClick={() => ShowGenMoves("V")}>Gen V</button>
        <button onClick={() => ShowGenMoves("VI")}>Gen VI</button>
        <button onClick={() => ShowGenMoves("VII")}>Gen VII</button>
        <button onClick={() => ShowGenMoves("VIII")}>Gen VIII</button>
        <button onClick={() => ShowGenMoves("IX")}>Gen IX</button>
      </div>
      <table>
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
                  move.move.name.replace("-", " ")
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
