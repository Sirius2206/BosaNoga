import { changeSearchValue } from "../../store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchInput() {
    const { searchValue } = useSelector((state) => state.searchInput);
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        const { value } = evt.target;
        dispatch(changeSearchValue(value));
      };

    return (
        <input
            className="form-control"
            placeholder="Поиск"
            onChange={handleChange}
            value={searchValue}
          />
    )
}