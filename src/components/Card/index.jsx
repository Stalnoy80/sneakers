import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';

export const Card = ({ title, price, priceTag, img, onClickPlusButton, onClickFavoriteButton }) => {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
  };

  console.log(isAdded);
  return (
    <div className={styles.card}>
      <div className={styles.heart}>
        <img src="/heartU.svg" alt="heartU" onClick={onClickFavoriteButton} />
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
