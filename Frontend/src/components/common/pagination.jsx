import _ from "lodash";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  const getPages = () => {
    if (pagesCount === 1) return "";
    return pages.map((page, index) => (
      <li
        key={index}
        className={page === currentPage ? "page-item active" : "page-item"}
      >
        <a className="page-link" onClick={() => onPageChange(page)}>
          {page}
        </a>
      </li>
    ));
  };

  return (
    <nav className="mt-5">
      <ul
        className="pagination pagination-lg"
        style={{ marginLeft: "1rem", cursor: "pointer" }}
      >
        {getPages()}
      </ul>
    </nav>
  );
}

export default Pagination;
