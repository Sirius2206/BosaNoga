/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisible, fetchCatalog, handleMore } from '../../store/slices/catalogListSlice';

import CardSmall from '../Cards/CardSmall';
import Category from '../Categories/Category';
import SearchInput from './SearchInput';
import Preloader from '../Preloader/Preloader';

import {
  fetchCategories,
} from '../../store/slices/categoriesSlice';

import {
  REQUEST_ITEMS_URL,
  REQUEST_CATEGORIES_URL,
} from '../../assets/constants';

function Catalog({ mainPage }) {
  const { status, list, loadMoreVisible } = useSelector((state) => state.catalogList);
  const { searchValue } = useSelector((state) => state.searchInput);
  const { currentCategory, categoriesList } = useSelector(
    (state) => state.categories,
  );
  const dispatch = useDispatch();

  //  Почему-то при тестах useEffect вызывается дважды. В интернете нашел,
  //  что это фича реакта и в деплое такого нет, но для сдачи диплома
  //  штуку с count пока оставляю
  let count = 1;
  useEffect(() => {
    if (count) {
      dispatch(fetchCatalog(REQUEST_ITEMS_URL));
      dispatch(fetchCategories(REQUEST_CATEGORIES_URL));

      count--;
    }
  }, []);

  const allCategoriesList = [
    {
      id: 0,
      title: 'Все',
    },
    ...categoriesList,
  ];

  function onHandleMore(e) {
    e.preventDefault();
    const offset = list.length;
    const addOffset = `offset=${offset}`;
    let requestUrl = `${REQUEST_ITEMS_URL}?`;
    if (searchValue) requestUrl += `q=${searchValue}&`;
    if (currentCategory !== 0) {
      requestUrl += `categoryId=${currentCategory}&`;
    }
    fetch(requestUrl + addOffset)
      .then((result) => result.json())
      .then((result) => {
        if (result.length < 6) dispatch(toggleVisible(' invisible'));
      });
    dispatch(handleMore(requestUrl + addOffset));

  }

  return (
    <section className="list">
      <h2 className="text-center">Каталог</h2>
      {mainPage || (
        <form
          id="catalog-search"
          className="list-search-form form-inline"
        >
          <SearchInput />
        </form>
      )}
      {status ? (
        <Preloader />
      ) : (
        <>
          <ul className="list-categories nav justify-content-center">

            {allCategoriesList
              && allCategoriesList.map((category) => (
                <Category
                  key={category.id}
                  data={category}
                />
              ))}
          </ul>
          <div className="row">
            {list.map((item) => (
              <CardSmall key={item.id} data={item} />
            ))}
          </div>
        </>
      )}
      <div className="text-center">
        <button
          type="button"
          className={`btn btn-outline-primary ${loadMoreVisible}`}
          onClick={onHandleMore}
        >
          Загрузить ещё
        </button>
      </div>
    </section>
  );
}

export default Catalog;
