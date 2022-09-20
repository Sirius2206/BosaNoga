/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSmall from '../Cards/CardSmall';
import Preloader from '../Preloader/Preloader';
import Catalog from './Catalog';

import { fetchBestsellers } from '../../store/slices/bestsellersListSlice';

import { REQUEST_BESTSELLERS_URL } from '../../assets/constants';

function Main() {
  const { status, error, bestsellersList } = useSelector((state) => state.bestsellersList);
  const dispatch = useDispatch();
  
  let count = 1;
  useEffect(() => {
    if (count) {
      dispatch(fetchBestsellers(REQUEST_BESTSELLERS_URL));
      count--;
    }
  }, []);

  return (
    <>
      {error && <p style={{ textAlign: 'center' }}>{error.message}</p>}
      {status ? (
          <Preloader />
        ) : (
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {bestsellersList && (
              <div className="row">
                {bestsellersList.map((item) => (
                  <CardSmall key={item.id} data={item} top />
                ))}
              </div>
            )}
          </section>
        )}
      <Catalog mainPage />
    </>
  );
}

export default Main;
