import React, { useState, useEffect } from "react";
import P from "../Utils/Pokedex";
import { useParams } from "react-router-dom";
import "../Css/PokemonInfo.css";
import typeColors, { darkTypeColors } from "../Utils/PokemonTypeColors";
import xpXalues from "../Utils/PokemonXp";
import generation from "../Utils/PokemonGeneration";
import { CapitalizeFirstLetterInSentence } from "../Utils/Utils";
import PokemonMoves from "./PokemonMoves";
import PokemonTableStats from "./PokemonTableStats";

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

        const evo = await P.getResource(response[1].evolution_chain.url);

        setInfo([...response, evo]);
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

          <PokemonTableStats info={info}/>
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




export default PokemonInfo;
