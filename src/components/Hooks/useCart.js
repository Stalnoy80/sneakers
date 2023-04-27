import { useContext } from 'react';
import { AppContext } from '../../App';

export const useCart = () => {
  const { sneakersInTheCart, setSneakersInTheCart } = useContext(AppContext);
  const totalPrice = sneakersInTheCart.reduce((sum, obj) => Number(obj.price) + Number(sum), 0);

  return { setSneakersInTheCart, sneakersInTheCart, totalPrice };
};
