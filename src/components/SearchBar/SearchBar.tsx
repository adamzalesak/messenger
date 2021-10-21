import './SearchBar.css';

const SearchBar = () => (
    <form className="search-bar" action="">
        <input className="input-field" type="search" placeholder="Search" />
        <button className="button button--input-field" type="submit">
            <img className="button__icon button__icon--input-field" alt="search" src="/icons/search.svg" />
        </button>
    </form>
);

export default SearchBar;