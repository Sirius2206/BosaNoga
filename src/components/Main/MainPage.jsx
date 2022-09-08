import useJsonFetch from "../../hooks/useJsonFetch";
import Card from "../Cards/Card";
import Catalog from "./Catalog";


function Main() {
  const [bestsellers] = useJsonFetch("http://localhost:7070/api/top-sales");

  return (
    <>
      {bestsellers && (
        <section className="top-sales">
          <h2 className="text-center">
            Хиты продаж!
          </h2>
          <div className="row">
            {bestsellers.map((item) => (
              <Card key={item.id} data={item} top />
            ))}
          </div>
        </section>
      )}
      <Catalog withInput/>
    </>
  );
}

export default Main;
