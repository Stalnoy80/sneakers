import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ onClickCart }) => {
  return (
    <header className="d-flex justify-between align-center">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="cart.svg" alt="cart" />
          <span>1205 руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/Favorites">
            <img width={18} height={18} src="faveIcon.png" alt="Favotites" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="user.svg" alt="user" />
        </li>
      </ul>
    </header>
  );
};
