import Card from "../Cards/Card";
import Category from "../Categories/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,

  fetchCatalog,
  loadMore,
} from "../../store/slices/catalogListSlice";
import { changeSearchValue } from "../../store/slices/searchSlice";
import useJsonFetch from "../../hooks/useJsonFetch";
import { useState, useEffect } from "react";

function Catalog({ withInput }) {
  const [visible, setVisible] = useState("");

  const loadingStatus = useSelector((state) => state.catalogList.status);
  const currentCategory = useSelector(
    (state) => state.catalogList.currentCategory
  );
  const catalog = useSelector((state) => state.catalogList.list);
  const searchValue = useSelector((state) => state.searchInput.searchValue);
  const dispatch = useDispatch();

  const [categories] = useJsonFetch(
    process.env.REACT_APP_URL + "/api/categories"
  );

  useEffect(() => {
    dispatch(fetchCatalog(process.env.REACT_APP_URL + "/api/items"));
  }, []);

  const handleChange = (evt) => {
    const { value } = evt.target;
    dispatch(changeSearchValue(value));
  };

  function onLoadMore(e) {
    const offset = catalog.length;
    let addUrl = `&offset=${offset}`;
    if (currentCategory === process.env.REACT_APP_URL + "/api/items")
      addUrl = `?offset=${offset}`;
    fetch(currentCategory + addUrl)
      .then((result) => result.json())
      .then((result) => {
        if (result.length < 6) setVisible(" invisible");
      });
    dispatch(loadMore(currentCategory + addUrl));
  }

  function handleSearch(e) {
    e.preventDefault();
    setVisible("");
    const searchRequest = process.env.REACT_APP_URL + "/api/items?q=" + searchValue;
    fetch(searchRequest)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        if (result.length < 6) setVisible(" invisible");
      });
      dispatch(fetchCatalog(searchRequest));
      dispatch(changeCategory(searchRequest));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withInput || (
        <form
          className="catalog-search-form form-inline"
          onSubmit={handleSearch}
          
        >
          <input
            className="form-control"
            placeholder="Поиск"
            onChange={handleChange}
            value={searchValue}
          />
        </form>
      )}
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link active"
            onClick={() => {
              dispatch(fetchCatalog(process.env.REACT_APP_URL + "/api/items"));
              dispatch(
                changeCategory(process.env.REACT_APP_URL + "/api/items")
              );
              setVisible("");
            }}
          >
            Все
          </a>
        </li>
        {categories &&
          categories.map((category) => (
            <Category
              key={category.id}
              data={category}
              setVisible={setVisible}
            />
          ))}
      </ul>
      <div className="row">
        {!loadingStatus &&
          catalog.map((item) => <Card key={item.id} data={item} />)}
      </div>
      <div className="text-center">
        <button
          className={"btn btn-outline-primary" + visible}
          onClick={onLoadMore}
        >
          Загрузить ещё
        </button>
      </div>
    </section>
  );
}

export default Catalog;
