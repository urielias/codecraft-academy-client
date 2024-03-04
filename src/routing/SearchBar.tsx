import styling from "./routing.module.css";

const SearchBar = () => {
    return (
        <div className={styling.searchbarContainer}>
            <div className={styling.searchbarMain}>
                <input placeholder="Search" />
            </div>
            <button className={styling.searchbarButton}>
                <h3>Go</h3>
            </button>
        </div>
    );
};

export default SearchBar;
