import React, { useState, useEffect } from "react";

const PokemonMoves = ({ moves }) => {
  const [visibleMoves, setVisibleMoves] = useState(moves);

  const showVersionGroup = (versionGroup) => {
    return moves.filter((move) =>
      move.version_group_details.some(
        (detail) => detail.version_group.name === versionGroup
      )
    );
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
        filteredMoves = [
          ...showVersionGroup("scarlet-violet"),
        ];
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

    setVisibleMoves(filteredMoves);
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
            <th>Move Name</th>
            <th>Level Learned At</th>
            <th>Move Learn Method</th>
            <th>Version Group</th>
          </tr>
        </thead>
        <tbody>
          {visibleMoves.map((move, index) => (
            <tr key={index}>
              <td>{move.move.name}</td>
              <td>{move.version_group_details[0].level_learned_at}</td>
              <td>{move.version_group_details[0].move_learn_method.name}</td>
              <td>{move.version_group_details[0].version_group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonMoves;
