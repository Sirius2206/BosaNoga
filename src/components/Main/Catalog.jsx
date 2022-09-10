import CardSmall from "../Cards/CardSmall";
import Category from "../Categories/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalog,
  handleMore,
} from "../../store/slices/catalogListSlice";

import { useState, useEffect } from "react";
import { changeCategory, fetchCategories } from "../../store/slices/categoriesSlice";
import SearchInput from "./SearchInput";

function Catalog({ mainPage }) {
  const [visible, setVisible] = useState("");

  const {status, list } = useSelector((state) => state.catalogList);
  const { searchValue } = useSelector((state) => state.searchInput)
  const { currentCategory, categoriesList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog(process.env.REACT_APP_URL + "/api/items"));
    dispatch(fetchCategories(process.env.REACT_APP_URL + "/api/categories"))
  }, []);

  const allCategoriesList = [{
    id: 0,
    title: "Все"
  }, ...categoriesList];



  function onHandleMore(e) {
    e.preventDefault();
    const offset = list.length;
    const addOffset = `offset=${offset}`;
    let requestUrl = process.env.REACT_APP_URL + "/api/items?";
    if (searchValue) requestUrl += `q=${searchValue}&`;
    if (currentCategory !== 0) {
      requestUrl += `categoryId=${currentCategory}&`
    }
    fetch(requestUrl + addOffset)
      .then((result) => result.json())
      .then((result) => {
        if (result.length < 6) setVisible(" invisible");
      });
    dispatch(handleMore(requestUrl+ addOffset));
  }

  function handleSearch(e) {
    e.preventDefault();
    setVisible("");
    const requestURL = process.env.REACT_APP_URL + "/api/items?q=" + searchValue;
    fetch(requestURL)
      .then((result) => result.json())
      .then((result) => {
        if (result.length < 6) setVisible(" invisible");
      });
      dispatch(fetchCatalog(requestURL));
      dispatch(changeCategory(0));
  }

  return (
    <section className="list">
      <h2 className="text-center">Каталог</h2>
      {mainPage || (
        <form
        id="catalog-search"
          className="list-search-form form-inline"
          onSubmit={handleSearch}
        >
          <SearchInput />
        </form>
      )}
      <ul className="list-categories nav justify-content-center">
        {allCategoriesList &&
          allCategoriesList.map((category) => (
            <Category
              key={category.id}
              data={category}
              setVisible={setVisible}
            />
          ))}
      </ul>
      <div className="row">
        {!status &&
          list.map((item) => <CardSmall key={item.id} data={item} />)}
      </div>
      <div className="text-center">
        <button
          className={"btn btn-outline-primary" + visible}
          onClick={onHandleMore}
        >
          Загрузить ещё
        </button>
      </div>
    </section>
  );
}

export default Catalog;
