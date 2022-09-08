import Card from "../Cards/Card";
import Category from "../Categories/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  fetchCatalog,
  loadMore
} from "../../store/slices/catalogListSlice";
import useJsonFetch from "../../hooks/useJsonFetch";
import { useEffect } from "react";

function Catalog({ withInput }) {
  const loadingStatus = useSelector((state) => state.catalogList.status);
  const currentCategory = useSelector((state) => state.catalogList.currentCategory);
  const catalog = useSelector((state) => state.catalogList.list);
  const dispatch = useDispatch();

  const [categories] = useJsonFetch("http://localhost:7070/api/categories");

  useEffect(() => {
    dispatch(fetchCatalog("http://localhost:7070/api/items"));
  }, []);

  useEffect(() => {})

  function onLoadMore(e) {
    
    const offset = catalog.length;
    let addUrl = `&offset=${offset}`;
    if (currentCategory === "http://localhost:7070/api/items") addUrl = `?offset=${offset}`;
    fetch(currentCategory + addUrl).then(result => result.json()).then(result =>{
      if (result.length < 6) e.target.classList.add("invisible");
    })
    dispatch(loadMore(currentCategory + addUrl));
    
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withInput || (
        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" />
        </form>
      )}
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link active"
            onClick={() => {
              dispatch(fetchCatalog("http://localhost:7070/api/items"));
              dispatch(changeCategory(`http://localhost:7070/api/items`));
            }}
          >
            Все
          </a>
        </li>
        {categories &&
          categories.map((category) => (
            <Category key={category.id} data={category} />
          ))}
      </ul>
      <div className="row">
        {!loadingStatus && catalog.map((item) => <Card key={item.id} data={item} />)}
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={onLoadMore}>Загрузить ещё</button>
      </div>
    </section>
  );
}

export default Catalog;
