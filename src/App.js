import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import { Drawer } from './components/Drawer';
import { Header } from './components/Header';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

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
    axios.get('https://642046ca25cb65721045ec32.mockapi.io/Favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const addToCart = (obj) => {
    axios
      .post('https://642046ca25cb65721045ec32.mockapi.io/Cart', obj)
      .then((res) => setSneakersInTheCart((prev) => [...prev, res.data]));
    // setSneakersInTheCart((prev) => [...prev, obj]);
  };

  const removeFromCart = (id) => {
    console.log(id);
    axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Cart/${id}`);
    setSneakersInTheCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://642046ca25cb65721045ec32.mockapi.io/Favorites/${obj.id}`);
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

      <Route path="/" exact>
        <Home
          searchSneakers={searchSneakers}
          ifSearchFieldChanged={ifSearchFieldChanged}
          setSearchSneakers={setSearchSneakers}
          sneakers={sneakers}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      </Route>
      <Route path="/Favorites" exact>
        <Favorites sneakers={favorites} addToFavorites={addToFavorites} />
      </Route>
    </div>
  );
}

export default App;
