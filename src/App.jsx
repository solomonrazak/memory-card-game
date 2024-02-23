import { useState } from 'react';
import Header from './components/Header';
import MainGame from './components/MainGame';
import { ScoreContext } from './ScoreContext';



function App() {
const [currentScore, setCurrentScore] = useState(0);
const [bestScore, setBestScore] = useState(0)

  return (
    <ScoreContext.Provider value={{currentScore, setCurrentScore, bestScore, setBestScore}}>
   <div className="container w-screen h-screen bg-white p-8 min-h-full">
    <div className="w-[90%] mx-auto min-h-full">
    <Header />
    <MainGame />
    </div>

   </div>
   </ScoreContext.Provider>
    
  )
}

export default App
