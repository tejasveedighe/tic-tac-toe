import React from 'react';

export const Square = ({ value, onClick }) => {
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};
