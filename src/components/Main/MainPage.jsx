import React from 'react';
import CardSmall from '../Cards/CardSmall';
import Preloader from '../Preloader/Preloader';
import Catalog from './Catalog';

import useJsonFetch from '../../hooks/useJsonFetch';

import { REQUEST_BESTSELLERS_URL } from '../../assets/constants';

function Main() {
  const [bestsellers] = useJsonFetch(REQUEST_BESTSELLERS_URL);

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {bestsellers ? (
          <div className="row">
            {bestsellers.map((item) => (
              <CardSmall key={item.id} data={item} top />
            ))}
          </div>
        ) : (
          <Preloader />
        )}
      </section>

      <Catalog mainPage />
    </>
  );
}

export default Main;
