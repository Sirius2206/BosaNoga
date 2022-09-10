import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../store/slices/catalogListSlice";
import { changeCategory } from "../../store/slices/categoriesSlice";


export default function Category({data, setVisible}) {
  const { currentCategory } = useSelector((state) => state.categories);
  const { searchValue } = useSelector((state) => state.searchInput)
  const dispatch = useDispatch();
  

  function handleClick(e) {
    e.preventDefault();
    let requestUrl = process.env.REACT_APP_URL + `/api/items?categoryId=${data.id}`;
    if (searchValue) requestUrl += `&q=${searchValue}`;
    dispatch(fetchCatalog(requestUrl));
    dispatch(changeCategory(data.id));
    setVisible("");

  }
  return (
    <li className="nav-item">
      <a className={data.id === currentCategory ? "nav-link active" : "nav-link"} href="#" 
      onClick={handleClick}>
        {data.title}
      </a>
    </li>
  );
}
