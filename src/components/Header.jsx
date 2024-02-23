import React, {useContext} from 'react';
import { ScoreContext } from '../ScoreContext';

const Header = () => {

    const {currentScore, bestScore} = useContext(ScoreContext)


    

    
       

  return (
    <div className="flex flex-col items-center gap-5 text-slate-900 md:flex-row md:justify-between">
        <h1 className="text-[50px] font-display">NTIRIGAME</h1>
        <div id="scoreboard" className="bg-yellow-600 flex flex-col w-[190px] h-[60px] font-display text-[20px] justify-center items-center rounded-md shadow-lg shadow-slate-500 p-3">
            <h1>Current Score: {currentScore}</h1>
            <h1>Best Score: {bestScore}</h1>
            
        </div>

    </div>
  )
}

export default Header;