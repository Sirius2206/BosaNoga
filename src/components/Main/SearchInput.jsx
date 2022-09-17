/* eslint-disable no-use-before-define */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchValue } from '../../store/slices/searchSlice';

import { REQUEST_ITEMS_URL } from '../../assets/constants';

import useDebounce from '../../hooks/useDebounce';

import { toggleVisible, fetchCatalog, changeCategory } from '../../store/slices/catalogListSlice';

export default function SearchInput() {
  const { searchValue } = useSelector((state) => state.searchInput);
  const { currentCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce();

  const handleChange = (evt) => {
    const { value } = evt.target;
    dispatch(changeSearchValue(value));
    debouncedSearch(() => handleSearch(value));
  };

  function handleSearch(text) {
    let requestUrl = `${REQUEST_ITEMS_URL}?q=${text}`;
    if (currentCategory !== 0) requestUrl += `&categoryId=${currentCategory}`;
    dispatch(toggleVisible(''));
    fetch(requestUrl)
      .then((result) => result.json())
      .then((result) => {
        if (result.length < 6) dispatch(toggleVisible(' invisible'));
      });
    dispatch(fetchCatalog(requestUrl));
  }

  return (
    <input
      className="form-control"
      placeholder="Поиск"
      onChange={handleChange}
      value={searchValue}
    />
  );
}
