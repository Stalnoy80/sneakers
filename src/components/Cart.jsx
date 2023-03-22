import React from 'react';

export const Cart = () => {
  return (
    <div className="card">
      <div className="heart">
        <img src="/heartU.svg" alt="heartU" />
      </div>
      <img width={133} height={112} src="/sneakers/1.jpg" alt="Sneakers" />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/Plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  );
};
