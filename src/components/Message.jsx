import React from 'react';

export default function Message({ winner, current }) {
  const noMovesLeft = current.board.every(el => el !== null);
  return (
    <h2>
      {winner && `Winner is ${winner}`}
      {!winner &&
        !noMovesLeft &&
        `Next Player is ${current.isXNext ? 'X' : 'O'}`}
      {!winner && noMovesLeft && 'X and O are tied'}
    </h2>
  );
}
