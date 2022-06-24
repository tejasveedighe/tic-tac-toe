import React from 'react';
import { useState } from 'react';
import { Board } from './components/Board';
import { calculateWinner } from './helper';
import { History } from './components/History';
import Message from './components/Message';

import './styles/root.scss';

const NEW_GAME = { board: Array(9).fill(null), isXNext: false };

export default function App() {
  const [history, setHistory] = useState([NEW_GAME]);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleClick = position => {
    if (current.board[position] || winner) return;

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const setNewGame = () => {
    setHistory([NEW_GAME]);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <Message winner={winner} current={current} />
      <Board
        board={current.board}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />
      <button type="button" onClick={() => setNewGame()}>
        {' '}
        Start New Game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}
