import { useEffect, useState } from "react";

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
  }, [score]);

  function clicked(id) {
    const temp = [];
    if (!pressed.includes.id) {
      if (score > bestscore) {
        setBestscore(score);
      }
      if (score == 15) {
        setScore(score + 1);
      }
      temp.push(id);
      setPressed(temp);
    } else {
      setScore(0);
    }
  }

  return (
    <>
      <div>
        Score: {score} BestScore:{bestscore}
      </div>
      <div>
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
