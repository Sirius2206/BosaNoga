import useJsonFetch from "../../hooks/useJsonFetch";
import CardSmall from "../Cards/CardSmall";
import Preloader from "../Preloader/Preloader";
import Catalog from "./Catalog";


function Main() {
  const [bestsellers, loading] = useJsonFetch(process.env.REACT_APP_URL + "/api/top-sales");

  return (
    <>
     
        <section className="top-sales">
          <h2 className="text-center">
            Хиты продаж!
          </h2>
          {bestsellers ?  (
          <div className="row">
            {bestsellers.map((item) => (
              <CardSmall key={item.id} data={item} top />
            ))}
          </div>) : <Preloader />}
        </section>
      
      <Catalog mainPage/>
    </>
  );
}

export default Main;
