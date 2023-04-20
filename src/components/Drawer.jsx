import React from 'react';

export const Drawer = ({ sneakersInTheCart, onClickCartWillClose, onClickWillRemoveItem, id }) => {
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 justify-between d-flex ">
          Корзина
          <img
            onClick={onClickCartWillClose}
            className="removeBtn cu-p"
            src="/delete.svg"
            alt="close"
          />
        </h2>

        {sneakersInTheCart.length > 0 ? (
          <div className="items">
            {sneakersInTheCart.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-10">
                <div style={{ backgroundImage: `url(${obj.img})` }} className="cartItemImg"></div>

                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img
                  onClick={() => onClickWillRemoveItem(obj.id)}
                  className="removeBtn cu-p"
                  src="/delete.svg"
                  alt="delete"
                />
              </div>
            ))}
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
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src="./empty-cart.jpg" alt="Empty" />
            <h2>Пустая корзина</h2>
            <p className="opacity-6">Добавьте вкусную пиццу...</p>
            <button onClick={onClickCartWillClose} className="greenButton">
              <img src="./arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
