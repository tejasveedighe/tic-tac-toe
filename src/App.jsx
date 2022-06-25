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

  const noMovesLeft = current.board.every(el => el !== null);

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <Message winner={winner} current={current} noMovesLeft={noMovesLeft} />
      <Board
        board={current.board}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />
      <button
        className={`btn-reset ${winner || noMovesLeft ? 'active' : ''}`}
        type="button"
        onClick={() => setNewGame()}
      >
        {' '}
        Start New Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
}
