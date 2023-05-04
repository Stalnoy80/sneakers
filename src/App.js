import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './components/Drawer';
import { Header } from './components/Header';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = createContext({});

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [sneakersInTheCart, setSneakersInTheCart] = useState([]);
  const [searchSneakers, setSearchSneakers] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemResponse] = await Promise.all([
          axios.get('https://642046ca25cb65721045ec32.mockapi.io/Cart'),
          axios.get('https://642046ca25cb65721045ec32.mockapi.io/Favorites'),
          axios.get('https://stalnoy80.github.io/sneakers'),
        ]);

        setSneakers(itemResponse.data);
        setSneakersInTheCart(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItemsLoading(false);
      } catch (error) {
        alert('ошибка при запросе данных %(');
        console.error(error);
      }
    }
    setItemsLoading(true);
    fetchData();
  }, []);

  const addToCart = async (obj) => {
    try {
      const findItem = sneakersInTheCart.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setSneakersInTheCart((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Cart/${findItem.id}`);
      } else {
        setSneakersInTheCart((prev) => [...prev, obj]);
        const { data } = await axios.post('https://642046ca25cb65721045ec32.mockapi.io/Cart', obj);
        setSneakersInTheCart((prev) =>
          prev.map((item) => {
            if (item.parentId === data.patentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не получилось добавить в корзину');
      console.error(error);
    }
  };
  const removeFromCart = (id) => {
    try {
      setSneakersInTheCart((prev) => prev.filter((item) => Number(item.parentId) !== Number(id)));

      axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Cart/${id}`);
    } catch (error) {
      alert('Не получилось удалить из корзины');
      console.error(error);
    }
  };

  const addToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://642046ca25cb65721045ec32.mockapi.io/Favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      // setSneakersInTheCart((prev) => [...prev, obj]);

      alert('не удалось добавить в избранное');
    }
  };

  const ifSearchFieldChanged = (event) => {
    setSearchSneakers(event.target.value);
  };

  const isItemAdded = (id) => {
    return sneakersInTheCart.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        sneakersInTheCart,
        favorites,
        isItemAdded,
        addToFavorites,
        setCartOpened,
        setSneakersInTheCart,
        addToCart,
      }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            sneakersInTheCart={sneakersInTheCart}
            onClickCartWillClose={() => setCartOpened(false)}
            onClickWillRemoveItem={removeFromCart}
            opened={cartOpened}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            sneakersInTheCart={sneakersInTheCart}
            searchSneakers={searchSneakers}
            ifSearchFieldChanged={ifSearchFieldChanged}
            setSearchSneakers={setSearchSneakers}
            sneakers={sneakers}
            addToFavorites={addToFavorites}
            addToCart={addToCart}
            itemsLoading={itemsLoading}
          />
        </Route>
        <Route path="/Favorites" exact>
          <Favorites />
        </Route>
        <Route path="/Orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
