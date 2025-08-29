function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = (path) => {
    const sortCol = { ...sortColumn };
    if (sortCol.path === path) {
      sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
    } else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    onSort(sortCol);
  };

  const renderSortIcon = (column) => {
    if (!column.path || column.path !== sortColumn.path) {
      return <i className="fa fa-sort sort-icon-inactive"></i>;
    }
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc sort-icon-active"></i>;
    } else {
      return <i className="fa fa-sort-desc sort-icon-active"></i>;
    }
  };

  return (
    <div className="modern-table-header">
      <div className="sort-controls">
        <h6 className="sort-label">Sort by:</h6>
        <div className="sort-buttons">
          {columns
            .filter((col) => col.path)
            .map((column) => (
              <button
                key={column.path || column.key}
                className={`sort-btn ${
                  sortColumn.path === column.path ? "active" : ""
                }`}
                onClick={() => raiseSort(column.path)}
              >
                {column.label}
                {renderSortIcon(column)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
