import React, { useState, useEffect } from "react";
import P from "../Utils/Pokedex";
import { useParams } from "react-router-dom";
import "../Css/PokemonInfo.css";
import typeColors from "../Utils/PokemonTypeColors";
import xpXalues from "../Utils/PokemonXp";
import generation from "../Utils/PokemonGeneration";
import {
  CapitalizeFirstLetterInSentence,
} from "../Utils/Utils";

function PokemonInfo() {
  const [info, setInfo] = useState(null);
  const { myParam } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          P.getPokemonByName(myParam),
          P.getPokemonSpeciesByName(myParam),
        ]);

        const response2 = await Promise.all([
          P.getGrowthRateByName(response[1].growth_rate.name),
        ]);

        setInfo(response, response2);
      } catch (error) {
        console.log("Error:", error);
        setInfo("No pokemon by that name");
      }
    };

    fetchData();
  }, [myParam]);
  console.log(info);
  info[0].abilities.map((ability, index) => console.log(ability.ability.name));

  return (
    <div>
      {info && info[0].id && (
        <>
          <div
            style={{
              background: typeColors[info[0].types[0].type.name] || "#ffffff",
            }}
          >
            <h1>{info[0].name.toUpperCase()}</h1>
            <div className="pokemonInfo">
              <img src={info[0].sprites.front_default} alt="pokemonImg"></img>
              <div className="sasd">
                <div className="base">
                  <p>
                    <b>NATIONAL</b>
                  </p>
                  <p>#{info[1].pokedex_numbers[0].entry_number}</p>
                </div>
                <div className="base">
                  <p>
                    <b>CATEGORY</b>
                  </p>
                  <p>
                    {" "}
                    {
                      info[1].genera.filter((g) =>
                        g.language.name.includes("en")
                      )[0].genus
                    }
                  </p>
                </div>
                <div className="base">
                  <p>
                    <b>HEIGHT</b>
                  </p>
                  <p> {info[0].height / 10} m</p>
                </div>
                <div className="base">
                  <p>
                    <b>WEIGHT</b>
                  </p>
                  <p> {info[0].weight / 10} kg</p>
                </div>
                <div className="base">
                  <p>
                    <b>TYPE</b>
                  </p>
                  <p>
                    {" "}
                    {info[0].types[0].type.name.toUpperCase()}{" "}
                    {info[0].types[1] &&
                      info[0].types[1].type.name.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="sasd">
                <div className="base">
                  <p>
                    <b>GENERATION</b>
                  </p>
                  <p>{generation[info[1].generation.name]}</p>
                </div>
                <div className="base">
                  <p>
                    <b>ABILITIES</b>
                  </p>
                  <div className="baseAbilities">
                    {info[0].abilities.map((ability, index) => (
                      <p key={index}>
                        {CapitalizeFirstLetterInSentence(ability.ability.name.replace("-", " "))} {ability.is_hidden && " (hidden)"}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="base">
                  <p>
                    <b>GENDER</b>
                  </p>
                  <div className="baseGender">
                    <p> {((8 - info[1].gender_rate) * 100) / 8}% M</p>
                    <p> {(info[1].gender_rate * 100) / 8}% F</p>
                  </div>
                </div>
                <div className="base">
                  <p>
                    <b>XP TO LV. 100</b>
                  </p>
                  <p> {xpXalues[info[1].growth_rate.name]}</p>
                </div>
                <div className="base">
                  <p>
                    <b>BASE FRIENDSHIP</b>
                  </p>
                  <p>{info[1].base_happiness}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pokemonStats">
            <p>
              {info[0].stats[0].stat.name.toUpperCase()} :{" "}
              {info[0].stats[0].base_stat}
            </p>
            <div
              style={{
                backgroundColor: "#FA5858",
                borderStyle: "1px solid #FF0000",
                width: "calc(100% * 35/257)",
                borderRadius: "5px",
                height: "12px",
              }}
            ></div>
            <p>
              {info[0].stats[1].stat.name.toUpperCase()} :{" "}
              {info[0].stats[1].base_stat}
            </p>
            <p>
              {info[0].stats[2].stat.name.toUpperCase()} :{" "}
              {info[0].stats[2].base_stat}
            </p>
            <p>
              {info[0].stats[3].stat.name.toUpperCase().replace("-", " ")} :{" "}
              {info[0].stats[3].base_stat}
            </p>
            <p>
              {info[0].stats[4].stat.name.toUpperCase().replace("-", " ")} :{" "}
              {info[0].stats[4].base_stat}
            </p>
            <p>
              {info[0].stats[5].stat.name.toUpperCase()} :{" "}
              {info[0].stats[5].base_stat}
            </p>
          </div>
          {/* {info[0].abilities.map((ability, index) => (
            <div key={index}>
              <p>
                {ability.ability.name}
                {ability.is_hidden && <> hidden</>}
              </p>
            </div>
          ))}
          {/* {info[0].moves.map((move, index) => (
              <p key={index}>{move.move.name}</p>
          ))} */}
        </>
      )}
      {info && !info[0].id && (
        <>
          <p>Error searching pokemon</p>
        </>
      )}
      {!info && <p>Loading...</p>}
    </div>
  );
}

export default PokemonInfo;
