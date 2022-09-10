import useJsonFetch from "../../hooks/useJsonFetch";
import CardSmall from "../Cards/CardSmall";
import Catalog from "./Catalog";


function Main() {
  const [bestsellers] = useJsonFetch(process.env.REACT_APP_URL + "/api/top-sales");

  return (
    <>
      {bestsellers && (
        <section className="top-sales">
          <h2 className="text-center">
            Хиты продаж!
          </h2>
          <div className="row">
            {bestsellers.map((item) => (
              <CardSmall key={item.id} data={item} top />
            ))}
          </div>
        </section>
      )}
      <Catalog mainPage/>
    </>
  );
}

export default Main;
