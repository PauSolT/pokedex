import P from "../Utils/Pokedex";
import PokemonHome from "../Components/PokemonHome";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "../Css/Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [pokemonRenders, setPokemonRenders] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let newPokemonRenders = [];
      let newPokemonIds = [];

      for (let index = 0; index < 10; index++) {
        let randomNumber = Math.floor(Math.random() * 1017) + 1;
        while (newPokemonIds.includes(randomNumber)) {
          randomNumber = Math.floor(Math.random() * 1017) + 1;
        }
        newPokemonIds = [...newPokemonIds, randomNumber];
      }

      try {
        const response = await Promise.all([
          Promise.all(newPokemonIds.map((id) => P.getPokemonSpeciesByName(id))),
          Promise.all(newPokemonIds.map((id) => P.getPokemonByName(id))),
        ]);

        for (let index = 0; index < response[0].length; index++) {
          const pokemonSpecies = response[0][index];
          const pokemon = response[1][index];

          newPokemonRenders = [
            ...newPokemonRenders,
            {
              species: pokemonSpecies,
              pokemon: pokemon,
              language: "en",
            },
          ];
        }

        setPokemonRenders(newPokemonRenders);
        setLoading(false);
      } catch (error) {
        console.log("There was an ERROR: ", error);
      }
    };

    fetchPokemonData();
  }, []);

  if (isLoading) {
    return <div className="Home">Loading...</div>;
  }

  return (
    <div className="Home">
      <div className="showPokemons">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={10000} //ms
          width="20%"
          height="15%"
        >
          {pokemonRenders.map((item, index) => (
            <div key={index}>
              <PokemonHome
                pokemonSpecies={item.species}
                pokemon={item.pokemon}
                language={item.language}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
