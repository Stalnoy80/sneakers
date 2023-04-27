import React, { useState } from 'react';
import Info from './Info';
import axios from 'axios';
import { useCart } from './Hooks/useCart';

export const Drawer = ({ onClickCartWillClose, onClickWillRemoveItem, id }) => {
  const { setSneakersInTheCart, sneakersInTheCart, totalPrice } = useCart();
  const [orderFinished, setOrderFinished] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onOrderButtonClick = async () => {
    try {
      setIsLoading(true);
      // const { data } = await axios.post(
      //   'https://mocki.io/v1/fb3f6862-9b00-4257-a19b-cb8d465f0da6',
      //   {
      //     items: sneakersInTheCart,
      //   },
      // );
      // setOrderId(data.id);
      setOrderFinished(true);
      setSneakersInTheCart([]);
    } catch (error) {
      alert('не удалось создать заказ');
    }
    setIsLoading(false);
  };
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
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.2)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} className="greenButton" onClick={onOrderButtonClick}>
                Оформить заказ <img src="/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={orderFinished ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              orderFinished
                ? `Ваш заказ скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кросовок, чтобы сдлеать заказ...'
            }
            image={orderFinished ? '../order.jpg' : '../empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
};
