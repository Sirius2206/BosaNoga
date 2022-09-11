import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useJsonFetch from "../../hooks/useJsonFetch"
import { addProduct } from "../../store/slices/cartSlice";
import Preloader from "../Preloader/Preloader";

export default function Card() {
    const { id } = useParams();

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [selectedSize, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [product, isLoading] = useJsonFetch(process.env.REACT_APP_URL + `/api/items/${id}`);

    function changeQuantity(n) {
        setQuantity(cur => cur = (cur + n < 1) ? 1 
                                : (cur + n > 10) ? 10 
                                : (cur + n));
    }
    function addToCart() {
        localStorage.setItem(`product#${id}`, JSON.stringify(product));
        dispatch(addProduct({product, selectedSize, quantity}))
    }

    return (
            <>{!product ? <Preloader />: <section className="catalog-item">
            <h2 className="text-center">{product.title}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={product.images[0]}
                        className="img-fluid" alt="" />
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
                        
                        <p>Размеры в наличии:  {product.sizes.filter(o => o.avalible === true)
                        .map(o => <span key={o.size} className={"catalog-item-size" + (selectedSize ? " selected" : '')} onClick={() => setSize(o.size)}>{o.size}</span>)}                       
                        </p>
                        {product.sizes.some(o => o.avalible === true) && <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" onClick={() => changeQuantity(-1)}>-</button>
                                <span className="btn btn-outline-primary">{quantity}</span>
                                <button className="btn btn-secondary" onClick={() => changeQuantity(1)}>+</button>
                            </span>
                        </p>}
                    </div>
                    {selectedSize && <Link to="/cart">
                     <button className="btn btn-danger btn-block btn-lg" onClick={addToCart}>В корзину</button>
                    </Link>}
                </div>
            </div>
        </section>}</>
        
    )
}