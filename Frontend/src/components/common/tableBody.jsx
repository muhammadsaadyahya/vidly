import _ from "lodash";

function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const getFieldClass = (column, item) => {
    if (column.key === "actions") return "card-actions";

    if (columns.indexOf(column) === 0 && column.path) return "card-title-field";

    const cellValue = renderCell(item, column);
    if (typeof cellValue === "number") return "card-numeric-field";

    return "card-field";
  };

  return (
    <div className="modern-grid-container">
      {data.map((item) => (
        <div key={item._id} className="modern-card">
          <div className="card-content">
            {columns.map((column) => {
              const cellContent = renderCell(item, column);
              const fieldClass = getFieldClass(column, item);

              if (!column.label && !cellContent) return null;

              return (
                <div key={createKey(item, column)} className={fieldClass}>
                  {column.label && fieldClass !== "card-actions" && (
                    <span className="field-label">{column.label}:</span>
                  )}
                  <span className="field-value">{cellContent}</span>
                </div>
              );
            })}
          </div>
          <div className="card-overlay"></div>
        </div>
      ))}
    </div>
  );
}

export default TableBody;
