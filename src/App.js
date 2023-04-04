import { useEffect, useState } from 'react';
import axios from 'axios';

import { Card } from './components/Card';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [sneakersInTheCart, setSneakersInTheCart] = useState([]);
  const [searchSneakers, setSearchSneakers] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('https://run.mocky.io/v3/1b613964-30f7-48c0-a8c4-c89b7869f27d').then((res) => {
      setSneakers(res.data);
    });
    axios.get('https://642046ca25cb65721045ec32.mockapi.io/Cart').then((res) => {
      setSneakersInTheCart(res.data);
    });
  }, []);

  const addToCart = (obj) => {
    axios
      .post('https://642046ca25cb65721045ec32.mockapi.io/Cart', obj)
      .then((res) => setSneakersInTheCart((prev) => [...prev, res.data]));
    // setSneakersInTheCart((prev) => [...prev, obj]);
  };

  const addToFavorites = (obj) => {
    axios
      .post('https://642046ca25cb65721045ec32.mockapi.io/Favorites', obj)
      .then((res) => setFavorites((prev) => [...prev, res.data]));
    // setSneakersInTheCart((prev) => [...prev, obj]);
  };

  const removeFromCart = (id) => {
    console.log(id);
    axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Cart/${id}`);
    setSneakersInTheCart((prev) => prev.filter((item) => item.id !== id));
  };

  const ifSearchFieldChanged = (event) => {
    setSearchSneakers(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          sneakersInTheCart={sneakersInTheCart}
          onClickCartWillClose={() => setCartOpened(false)}
          onClickWillRemoveItem={removeFromCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchSneakers ? `Поиск по запросу: "${searchSneakers}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="search.svg" alt="search" />
            <input onChange={ifSearchFieldChanged} value={searchSneakers} placeholder="Поиск..." />
            {searchSneakers && (
              <img
                onClick={() => {
                  setSearchSneakers('');
                }}
                className="clearBtn "
                src="/delete.svg"
                alt="clear"
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {sneakers
            .filter((item) => item.title.toLowerCase().includes(searchSneakers.toLowerCase()))
            .map((item, index) => (
              <Card
                price={item.price}
                title={item.title}
                priceTag={item.priceTag}
                key={index}
                img={item.img}
                addToFavorites={(obj) => addToFavorites(obj)}
                onClickPlusButton={(obj) => addToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
