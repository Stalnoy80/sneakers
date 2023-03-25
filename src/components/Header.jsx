import React from 'react';

export const Header = ({ onClickCart }) => {
  return (
    <header className="d-flex justify-between align-center">
      <div className="d-flex align-center">
        <img width={40} height={40} src="logo.png" alt="logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="cart.svg" alt="cart" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src="user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
};
