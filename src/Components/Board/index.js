import React, { useEffect, useState } from 'react'
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from '../../Constants/constant'
import Tile from '../Tile';
import './index.css'
import { canSwap, isSolved, shuffle, swap } from '../../Constants/helpers';
import Confetti from 'react-confetti';

const Board = () => {

  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStart,setIsStart]=useState(false);
  const [reset,setReset]=useState(false);
  const [showPapers,setShowPapers]=useState(false);
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE)
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE)

  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
    // gap: '2px',
  };

const goBack=()=>{
  setTime(0)
  setIsRunning(false);
  setTiles([...Array(TILE_COUNT).keys()])
  setIsStart(false)
  setReset(true);

}

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); 
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };
  const SuffleTheBoard=()=>{
    setTime(0)
    const shuffledTiles=shuffle(tiles)
    setTiles(shuffledTiles)
    setIsStart(true)
    setIsRunning(true);

  }

  const tileClick=(index)=>{
      if(canSwap(index,tiles.indexOf(tiles.length-1))){
        const newTiles=swap(tiles,index,tiles.indexOf(tiles.length-1))
        setTiles(newTiles)
      }
  }

  const finish=isSolved(tiles)


  useEffect(()=>{ 

    if(finish && !reset)
    {
      setIsRunning(false);
      setShowPapers(true);
      setReset(false);
      setTimeout(() => setShowPapers(false), 10000);
    }
  },[finish])


  return (
    <div className='container'>
            {(finish && isStart && !reset) && <span className='result'>Puzzle Solved,Congratulations</span>} 

      <span className='heading'>Shuffle & Solve!</span>
      <div style={style} className='board'> 
        {tiles.map((tile, index) => (
          <Tile key={tile} index={index} tile={tile} width={pieceWidth} height={pieceHeight} clickTile={tileClick} isStart={isStart}/>
        ))}
      </div>
       {(isStart && finish && showPapers) && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {/* <span className='result'>Puzzle Solved,Congratulations</span> */}
      <div className='btnBlock'>
      <button className='start' onClick={SuffleTheBoard}> {!isStart ? 'Start Game' : 'Restart Game'}</button>
      {isStart && <button className='start' onClick={goBack}> {'Reset'}</button>}
      </div>

      {isStart && <p className='timer'>{formatTime(time)}</p>}
  
    </div>
  )
}

export default Board