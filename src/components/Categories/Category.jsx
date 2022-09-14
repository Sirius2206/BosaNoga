/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisible, fetchCatalog } from '../../store/slices/catalogListSlice';
import { changeCategory } from '../../store/slices/categoriesSlice';

import { REQUEST_ITEMS_URL } from '../../assets/constants';

export default function Category({ data }) {
  const { currentCategory } = useSelector((state) => state.categories);
  const { searchValue } = useSelector((state) => state.searchInput);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    let requestUrl = `${REQUEST_ITEMS_URL}?categoryId=${data.id}`;
    if (searchValue) requestUrl += `&q=${searchValue}`;
    dispatch(fetchCatalog(requestUrl));
    dispatch(changeCategory(data.id));
    dispatch(toggleVisible(''));
  }
  return (
    <li className="nav-item">
      <a
        className={data.id === currentCategory ? 'nav-link active' : 'nav-link'}
        href="#"
        onClick={handleClick}
      >
        {data.title}
      </a>
    </li>
  );
}
