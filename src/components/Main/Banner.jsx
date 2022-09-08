import banner from "../../assets/img/banner.jpg";

function Banner( props ) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          {props.children}
        </div>
      </div>
    </main>
  );
}

export default Banner;
