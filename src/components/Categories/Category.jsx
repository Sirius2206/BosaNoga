import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeCategory, fetchCatalog } from "../../store/slices/catalogListSlice";


export default function Category({ data }) {
  const list = useSelector((state) => state.catalogList.list);
  const dispatch = useDispatch();

  function handleClick(e) {
    
    dispatch(fetchCatalog(`http://localhost:7070/api/items?categoryId=${data.id}`));
    dispatch(changeCategory(`http://localhost:7070/api/items?categoryId=${data.id}`));

  }
  return (
    <li className="nav-item">
      <a className="nav-link" onClick={handleClick}>
        {data.title}
      </a>
    </li>
  );
}
