import React, { useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import { AppContext } from '../../App';

export const Card = ({
  id,
  title,
  price,
  img,
  priceTag,
  onClickPlusButton,

  heartOn = true,
  loading = false,
}) => {
  const { isItemAdded, addToFavorites } = useContext(AppContext);
  const [onFavorite, setInFaforite] = useState(heartOn);
  const itemObj = { title, parentId: id, price, img, id };

  const onClickPlus = () => {
    onClickPlusButton(itemObj);
  };

  const thisWillSetFavorite = () => {
    addToFavorites(itemObj);
    setInFaforite(!onFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={199}
          height={260}
          viewBox="0 0 170 277"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="20" rx="11" ry="11" width="150" height="150" />
          <rect x="0" y="182" rx="0" ry="0" width="170" height="15" />
          <rect x="0" y="205" rx="0" ry="0" width="170" height="15" />
          <rect x="0" y="245" rx="5" ry="5" width="100" height="24" />
          <rect x="138" y="239" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.heart}>
            <img
              onClick={thisWillSetFavorite}
              src={onFavorite ? '/heartU.svg' : '/heartL.svg'}
              alt="heartU"
              // onClick={onClickFavoriteButton}
            />
          </div>
          <img width={155} height={135} src={img} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between">
            <div className="d-flex flex-column">
              <span>{priceTag}</span>
              <b>{price}</b>
            </div>
            <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? '/buttonChecked.svg' : '/buttonPlus.svg'}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
};
