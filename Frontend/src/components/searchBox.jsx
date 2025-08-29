const SearchBox = ({ value, onChange }) => {
  return (
    <div className="modern-search-box">
      <div className="search-input-wrapper">
        <i className="fa fa-search search-icon"></i>
        <input
          placeholder="Search..."
          className="modern-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        {value && (
          <button
            className="clear-search-btn"
            onClick={() => onChange("")}
            type="button"
          >
            <i className="fa fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
