import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ScoreContext } from "../ScoreContext";

const MainGame = () => {
  const { currentScore, setCurrentScore, setBestScore } =
    useContext(ScoreContext);

  const myKey = "d7b192a79d5f4f98adcafc6f90d6e097";
  // GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY

  const [gameList, setGameList] = useState([]);
  const [clickedImages, setClickedImages] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [clickEnabled, setClickEnabled] = useState(true);

  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${myKey}`
        );
        const data = response.data.results;
        setGameList(data);

        // console.log(response.data)
        console.log(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    getGameData();
  }, []);

  // function to shuffle the cards
  const shuffleGameList = () => {
    const shuffleList = [...gameList]; // use spread operator to copy the array of data fetched
    for (let i = shuffleList.length - 1; i > 0; i--) {
      // This for loop iterates over the array in reverse order, starting from the last
      // element (shuffledList.length - 1) and ending at the second element (i > 0).
      // We don't need to swap the first element with any other element, so we stop the loop when i becomes 1.

      const j = Math.floor(Math.random() * (i + 1));

      // uses destructuring to swap the cards
      [shuffleList[i], shuffleList[j]] = [shuffleList[j], shuffleList[i]];
    }

    setGameList(shuffleList); // gameList is now set to the shuffledList
  };

  // check if a card that has is clicked has not been clicked before and add current score plus 1

  const handleImageClick = (id) => {
    if (clickEnabled) {
      if (!clickedImages.includes(id)) {
        // checks if the clicked id is not in the clicked images array
        setCurrentScore(currentScore + 1);
        setClickedImages([...clickedImages, id]); //
      }
      setClickCount(clickCount + 1);
      if (clickCount === 4) {
        setBestScore(currentScore);
        setClickEnabled(false);
      }
    }
  };

  function restartGame() {
    setClickEnabled(true);
    setCurrentScore(0);
    setBestScore(0);
    setClickedImages([]);
    setClickCount(0);
  }

  return (
    <div className="pb-5">
      <h1 className="text-[37px] text-slate-900 font-bold text-center my-5 py-4">
        Choose A Card To Play
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
        {gameList.map((item, index) => (
          <div
            key={index}
            className="bg-slate-200 rounded-md cursor-pointer shadow-lg shadow-slate-200 group hover:scale-125 duration-300 transition-all ease-out"
            onClick={() => {
              shuffleGameList();
              handleImageClick(item.id);
            }}
          >
            <img
              src={item.background_image}
              className="h-[280px] object-cover rounded-t-md"
            />
            <h1 className="text-center font-bold text-slate-900 py-3 text-[15px] px-2">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
      <div className="mt-[4em] flex justify-center">
        <button
          className="font-display text-[20px] bg-yellow-600 rounded-md shadow-lg shadow-slate-500 p-3 hover:bg-yellow-800"
          onClick={restartGame}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default MainGame;
