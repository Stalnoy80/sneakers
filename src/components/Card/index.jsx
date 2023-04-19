import React, { useState } from 'react';
import styles from './Card.module.scss';

export const Card = ({
  id,
  title,
  price,
  img,
  priceTag,
  onClickPlusButton,
  addToFavorites,
  heartOn = true,
}) => {
  const [isAdded, setIsAdded] = useState(0);
  const [onFavorite, setInFaforite] = useState(heartOn);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onClickPlusButton({ title, price, img, id });
  };

  const thisWillSetFavorite = () => {
    addToFavorites({ title, price, img, id });
    setInFaforite(!onFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.heart}>
        <img
          onClick={thisWillSetFavorite}
          src={onFavorite ? '/heartU.svg' : '/heartL.svg'}
          alt="heartU"
          // onClick={onClickFavoriteButton}
        />
      </div>
      <img width={133} height={112} src={img} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between">
        <div className="d-flex flex-column">
          <span>{priceTag}</span>
          <b>{price}</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/buttonChecked.svg' : '/buttonPlus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
};
