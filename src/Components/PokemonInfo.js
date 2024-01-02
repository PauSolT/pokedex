import React, { useState, useEffect } from "react";
import P from "../Utils/Pokedex";
import { useParams } from "react-router-dom";
import "../Css/PokemonInfo.css";
import typeColors, { darkTypeColors } from "../Utils/PokemonTypeColors";
import xpXalues from "../Utils/PokemonXp";
import generation from "../Utils/PokemonGeneration";
import { CapitalizeFirstLetterInSentence } from "../Utils/Utils";
import PokemonMoves from "./PokemonMoves";

function PokemonInfo() {
  const [info, setInfo] = useState(null);
  const [baseStyle, setBaseStyle] = useState({});
  const { myParam } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // setMovesByMethod({});
      // setMovesByVersionGroup({});
      try {
        const response = await Promise.all([
          P.getPokemonByName(myParam),
          P.getPokemonSpeciesByName(myParam),
        ]);

        setInfo(response);
        setBaseStyle({
          backgroundColor:
            darkTypeColors[response[0].types[0].type.name] || "#ffffff",
          borderRadius: "15px",
          paddingLeft: "2%",
          paddingRight: "2%",
          margin: "5%",
        });

      } catch (error) {
        console.log("Error:", error);
        setInfo("No pokemon by that name");
      }
    };

    fetchData();
  }, [myParam]);
  console.log(info);

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
              {PokemonStats(baseStyle, info)}
              {PokemonInformation(baseStyle, info)}
            </div>
          </div>
          {PokemonTableStats(info)}
          <div className="pokemonMoves">
            <PokemonMoves moves={info[0].moves} />
          </div>
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

function PokemonStats(baseStyle, info) {
  return (
    <div className="sasd">
      <div className="base" style={baseStyle}>
        <p>
          <b>NATIONAL</b>
        </p>
        <p>#{info[1].pokedex_numbers[0].entry_number}</p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>CATEGORY</b>
        </p>
        <p style={{ textAlign: "end" }}>
          {
            info[1].genera.filter((g) => g.language.name.includes("en"))[0]
              .genus
          }
        </p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>HEIGHT</b>
        </p>
        <p> {info[0].height / 10} m</p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>WEIGHT</b>
        </p>
        <p> {info[0].weight / 10} kg</p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>TYPE</b>
        </p>
        <div className="baseTypes">
          <div
            className="baseType"
            style={{
              backgroundColor:
                typeColors[info[0].types[0].type.name] || "#ffffff",
            }}
          >
            {info[0].types[0].type.name.toUpperCase()}
          </div>
          {info[0].types[1] && (
            <div
              className="baseType"
              style={{
                backgroundColor:
                  typeColors[info[0].types[1].type.name] || "#ffffff",
              }}
            >
              {info[0].types[1].type.name.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PokemonInformation(baseStyle, info) {
  return (
    <div className="sasd">
      <div className="base" style={baseStyle}>
        <p>
          <b>GENERATION</b>
        </p>
        <p>{generation[info[1].generation.name]}</p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>ABILITIES</b>
        </p>
        <div className="baseAbilities">
          {info[0].abilities.map((ability, index) => (
            <p key={index}>
              {CapitalizeFirstLetterInSentence(
                ability.ability.name.replace("-", " ")
              )}{" "}
              {ability.is_hidden && " (hidden)"}
            </p>
          ))}
        </div>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>GENDER</b>
        </p>
        {info[1].gender_rate > 0 && (
          <div className="baseGender">
            <p> {((8 - info[1].gender_rate) * 100) / 8}% M</p>
            <p> {(info[1].gender_rate * 100) / 8}% F</p>
          </div>
        )}
        {info[1].gender_rate < 0 && (
          <div className="baseGender">
            <p>Unknown</p>
          </div>
        )}
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>XP TO LV. 100</b>
        </p>
        <p> {xpXalues[info[1].growth_rate.name]}</p>
      </div>
      <div className="base" style={baseStyle}>
        <p>
          <b>BASE FRIENDSHIP</b>
        </p>
        <p>{info[1].base_happiness}</p>
      </div>
    </div>
  );
}

function PokemonTableStats(info) {
  return (
    <div className="pokemonStats">
      <table className="statsTable">
        <thead>
          <tr>
            <th style={{ width: "8rem" }}>Stat</th>
            <th>Value</th>
            <th style={{ width: "3rem" }}>EV</th>
          </tr>
        </thead>
        <tbody>
          {info[0].stats.map((stat) => (
            <tr key={stat.stat.name}>
              <td>
                <b>
                  {CapitalizeFirstLetterInSentence(
                    stat.stat.name.replace("-", " ")
                  )}
                </b>
              </td>
              <td>
                <div className="valueCell">
                  <span style={{ width: "2rem" }}>{stat.base_stat}</span>
                  <div
                    style={{
                      backgroundColor: ChooseColorForStatBar(stat.base_stat),
                      // borderStyle: "1px solid #FF0000",
                      width: `calc(100% * ${stat.base_stat}/257)`,
                      borderRadius: "5px",
                      height: "15px",
                      marginLeft: "2%",
                    }}
                  ></div>
                </div>
              </td>
              <td>{stat.effort}</td>
            </tr>
          ))}
          <tr key={"total"}>
            <td>
              <b>Total</b>
            </td>
            <td>
              <div className="valueCell">
                <span style={{ width: "2rem" }}>
                  {info[0].stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </span>
                <div
                  style={{
                    backgroundColor: ChooseColorForTotalStatBar(
                      info[0].stats.reduce(
                        (sum, stat) => sum + stat.base_stat,
                        0
                      )
                    ),
                    // borderStyle: "1px solid #FF0000",
                    width: `calc(100% * ${info[0].stats.reduce(
                      (sum, stat) => sum + stat.base_stat,
                      0
                    )}/1150)`,
                    borderRadius: "5px",
                    height: "15px",
                    marginLeft: "2%",
                  }}
                ></div>
              </div>
            </td>
            <td>{info[0].stats.reduce((sum, stat) => sum + stat.effort, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ChooseColorForStatBar(value) {
  if (value < 50) return "#FA5858";
  else if (value >= 50 && value < 75) return "#FAAC58";
  else if (value >= 75 && value < 100) return "#F4FA58";
  else if (value >= 100 && value < 125) return "#82FA58";
  else if (value >= 125) return "#B7FBFF";
}

function ChooseColorForTotalStatBar(value) {
  if (value < 300) return "#FA5858";
  else if (value >= 300 && value < 400) return "#FAAC58";
  else if (value >= 400 && value < 500) return "#F4FA58";
  else if (value >= 500 && value < 600) return "#82FA58";
  else if (value >= 600) return "#B7FBFF";
}

export default PokemonInfo;
