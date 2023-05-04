import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { Card } from '../components/Card';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { addToCart, addToFavorites } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://api.jsonbin.io/v3/b/644eab40b89b1e2299948254/');
      setOrders(data.map((obj) => obj.items).flat());
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders.map((item, index) => (
          <Card
            key={index}
            addToFavorites={(obj) => addToFavorites(obj)}
            onClickPlusButton={(obj) => addToCart(obj)}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
