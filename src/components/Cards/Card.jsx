/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useJsonFetch from '../../hooks/useJsonFetch';
import { addProduct } from '../../store/slices/cartSlice';
import Preloader from '../Preloader/Preloader';

import { REQUEST_ITEMS_URL } from '../../assets/constants';

export default function Card() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedSize, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product] = useJsonFetch(`${REQUEST_ITEMS_URL}/${id}`);

  function changeQuantity(n) {
    setQuantity((cur) => {
      cur + n < 1
        ? 1
        : cur + n > 10
          ? 10
          : cur + n;
    });
  }

  function addToCart() {
    dispatch(addProduct({ product, selectedSize, quantity }));
  }

  return (
    <>
      {!product ? (
        <Preloader />
      ) : (
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {' '}
                  {product.sizes
                    .filter((o) => o.avalible === true)
                    .map((o) => (
                      <span
                        key={o.size}
                        className={
                          `catalog-item-size${
                            selectedSize ? ' selected' : ''}`
                        }
                        onClick={() => setSize(o.size)}
                      >
                        {o.size}
                      </span>
                    ))}
                </p>
                {product.sizes.some((o) => o.avalible === true) && (
                  <p>
                    Количество:
                    {' '}
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => changeQuantity(-1)}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => changeQuantity(1)}
                      >
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>
              {selectedSize && (
                <Link to="/cart">
                  <button
                    type="button"
                    className="btn btn-danger btn-block btn-lg"
                    onClick={addToCart}
                  >
                    В корзину
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
