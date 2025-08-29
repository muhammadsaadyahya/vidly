import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ data, columns, sortColumn, onSort }) {
  return (
    <div className="modern-table-wrapper">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </div>
  );
}

export default Table;
