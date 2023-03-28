import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [sneakersInTheCart, setSneakersInTheCart] = useState([]);
  const [searchSneakers, setSearchSneakers] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  console.log(sneakers);

  useEffect(() => {
    fetch('https://642046ca25cb65721045ec32.mockapi.io/Sneakers')
      .then((res) => res.json())
      .then((json) => {
        setSneakers(json);
      });
  }, []);

  const addToCart = (obj) => {
    setSneakersInTheCart((prev) => [...prev, obj]);
  };
  const removeFromCart = (index) => {
    sneakers.filter((item) => item.id !== index);
    console.log(index);
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
                onClickFavoriteButton={() => console.log('Добавили в закладки')}
                onClickPlusButton={(obj) => addToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
