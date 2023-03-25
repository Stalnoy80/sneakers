import { useContext, useState } from 'react';
// import axios from 'axios';
import { Card } from './components/Card';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  fetch(
    'https://api.jsonstorage.net/v1/json/02352760-94a5-44de-93a4-4db0b35bbafe/2e9dfb81-2862-4dc9-80c4-9e1254a90011',
  )
    .then((res) => res.json())
    .then((json) => {
      setSneakers(json);
    });

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClickCartWillClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="search.svg" alt="search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {sneakers.map((obj) => (
            <Card
              price={obj.price}
              title={obj.title}
              priceTag={obj.priceTag}
              img={obj.img}
              onClickFavoriteButton={() => console.log('Добавили в закладки')}
              onClickPlusButton={() => console.log('Добавили в корзину')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
