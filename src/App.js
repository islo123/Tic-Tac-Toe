import React, { useState } from 'react'
import "./App.css"
import Board, { calculateWinner } from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    const winner = calculateWinner(squares)
      if (winner) {
      description = 'Voittaja on: ' + winner
    } else if (move === 9 && !winner) {
      description = 'Tasapeli'
    } else  if (move > 0) {
      description = 'Siirry merkintän #' + move;
    }
    else {
      description = 'Aloita alusta';
    }
    return (
      <li className='description-row' key={move}>
        <p className='description-btns' onClick={() => jumpTo(move)}>{description}</p>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} moves={moves} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
