import { Card } from '../components/Card';

function Home({
  searchSneakers,
  ifSearchFieldChanged,
  setSearchSneakers,
  sneakers,
  addToFavorites,
  addToCart,
  itemsLoading,
}) {
  const filteredSneakers = sneakers?.filter((item) =>
    item.title?.toLowerCase()?.includes(searchSneakers?.toLowerCase()),
  );

  const renderItems = () => {
    return (itemsLoading ? [...Array(10)] : sneakers.length > 0 ? filteredSneakers : []).map(
      (item, index) => (
        <Card
          key={index}
          addToFavorites={(obj) => addToFavorites(obj)}
          onClickPlusButton={(obj) => addToCart(obj)}
          loading={itemsLoading}
          {...item}
        />
      ),
    );
  };

  return (
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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
