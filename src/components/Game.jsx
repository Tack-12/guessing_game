import { useEffect, useState } from "react";
import "./Game.css";

export default function Game() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestscore, setBestscore] = useState(0);
  const [pressed, setPressed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = [];

        for (let i = 1; i <= 15; i++) {
          const res = await fetch(url + i + "/");
          const data = await res.json();
          results.push(data);
        }
        setPokemon(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    setPokemon(pokemons.sort(() => Math.random() - 0.5));
  }, [score]);

  function clicked(id) {
    console.log("This has been called with ", id);
    console.log(pressed);
    if (!pressed.includes(id)) {
      if (score >= bestscore) {
        setBestscore(score);
      }
      if (score == 15) {
        setScore("You Win");
      }
      setScore(score + 1);
      setPressed((prevItem) => [...prevItem, id]);
    } else {
      setScore(0);
      setPressed([]);
    }
  }

  return (
    <>
      <div>
        Score: {score} BestScore:{bestscore}
      </div>
      <div className="Main">
        {pokemons.map((data) => {
          return (
              <div
                key={data.id}
                onClick={() => {
                  clicked(data.id);
                }}
                className="divs"
              >
                <img src={data.sprites.front_default} alt="" />
                <div>{data.name}</div>
              </div>
          );
        })}
      </div>
    </>
  );
}
