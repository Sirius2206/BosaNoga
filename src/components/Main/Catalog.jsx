/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardSmall from '../Cards/CardSmall';
import Category from '../Categories/Category';
import SearchInput from './SearchInput';
import Preloader from '../Preloader/Preloader';

import { fetchCatalog, handleMore } from '../../store/slices/catalogListSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';

import {
  REQUEST_ITEMS_URL,
  REQUEST_CATEGORIES_URL,
} from '../../assets/constants';

function Catalog({ mainPage }) {
  const {
    status: catalogStatus, list, error: catalogError, handleMoreError, loadMoreVisible,
  } = useSelector((state) => state.catalogList);
  const { searchValue } = useSelector((state) => state.searchInput);
  const { currentCategory, categoriesList, error: categoriesError, status: categoriesStatus } = useSelector(
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
  useEffect(() => {
    if (catalogError) {
      setTimeout(() => {
        dispatch(fetchCatalog(REQUEST_ITEMS_URL));
      }, 1000);
    }
  },[catalogError]);

  useEffect(() => {
    if (categoriesError) {
      setTimeout(() => {
        dispatch(fetchCategories(REQUEST_CATEGORIES_URL));
      }, 1000);
    }
  },[categoriesError]);

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
    dispatch(handleMore(requestUrl + addOffset));
  }

  return (
    <section className="list">
      <h2 className="text-center">Каталог</h2>
      {mainPage || (
        <form
          id="catalog-search"
          className="catalog-search-form form-inline"
        >
          <SearchInput />
        </form>
      )}
      {catalogError && <p style={{ textAlign: 'center' }}>{catalogError.message}</p>}
      {catalogStatus === 'loading' ? (
          <Preloader />
        ) : (
          <>
            <ul className="list-categories nav justify-content-center">
            {categoriesError && <p style={{ textAlign: 'center' }}>{categoriesError.message}</p>}
            {categoriesStatus === 'loading' || allCategoriesList.map((category) => (
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
            <div className="text-center">
              <button
                type="button"
                className={`btn btn-outline-primary ${loadMoreVisible}`}
                onClick={onHandleMore}
              >
                Загрузить ещё
              </button>
              {handleMoreError && <p style={{ textAlign: 'center' }}>{handleMoreError.message}</p>}
            </div>
          </>
        )}
    </section>
  );
}

export default Catalog;
