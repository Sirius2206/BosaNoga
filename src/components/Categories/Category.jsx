import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeCategory, fetchCatalog } from "../../store/slices/catalogListSlice";


export default function Category({data, setVisible}) {
  const list = useSelector((state) => state.catalogList.list);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.target.classList.add("active");
    dispatch(fetchCatalog(process.env.REACT_APP_URL + `/api/items?categoryId=${data.id}`));
    dispatch(changeCategory(process.env.REACT_APP_URL + `/api/items?categoryId=${data.id}`));
    setVisible("");

  }
  return (
    <li className="nav-item">
      <a className="nav-link" href="#" onClick={handleClick}>
        {data.title}
      </a>
    </li>
  );
}
