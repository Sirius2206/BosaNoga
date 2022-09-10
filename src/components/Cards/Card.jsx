import useJsonFetch from "../../hooks/useJsonFetch"

export default function Card() {
    const [product, isLoading] = useJsonFetch("http://localhost:7070/api/items/34");
    console.log(product);
    return (
            <>{!product ? <p>загрузка</p> : <section className="catalog-item">
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
                        .map(o => <span key={o.size} className="catalog-item-size selected">{o.size}</span>)
}                       </p>
                        <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary">-</button>
                                <span className="btn btn-outline-primary">1</span>
                                <button className="btn btn-secondary">+</button>
                            </span>
                        </p>
                    </div>
                    <button className="btn btn-danger btn-block btn-lg">В корзину</button>
                </div>
            </div>
        </section>}</>
        
    )
}