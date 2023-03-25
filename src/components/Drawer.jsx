import React from 'react';

export const Drawer = ({ onClickCartWillClose }) => {
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 justify-between d-flex ">
          Корзина{' '}
          <img
            onClick={onClickCartWillClose}
            className="removeBtn cu-p"
            src="/delete.svg"
            alt="close"
          />
        </h2>

        <div className="items">
          <div className="cartItem d-flex align-center mb-10">
            <div style={{ backgroundImage: 'url(/sneakers/1.jpg)' }} className="cartItemImg"></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/delete.svg" alt="delete" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: 'url(/sneakers/1.jpg)' }} className="cartItemImg"></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/delete.svg" alt="delete" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: 'url(/sneakers/1.jpg)' }} className="cartItemImg"></div>

            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/delete.svg" alt="close" />
          </div>
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>1 074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
