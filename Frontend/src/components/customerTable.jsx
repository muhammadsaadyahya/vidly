import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import GoldMemberIcon from "./common/GoldMemberIcon";

const CustomerTable = ({ customers, onDelete, onSort, sortColumn }) => {
  const user = auth.getCurrentUser();
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/Customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    {
      key: "isGold",
      content: (customer) => {
        if (customer.isGold) return <GoldMemberIcon />;
      },
    },
  ];
  if (user && user.isAdmin)
    columns.push({
      key: "delete",
      content: (customer) => (
        <button
          onClick={() => onDelete(customer._id)}
          className="btn btn-danger"
          style={{ width: "100%" }}
        >
          Delete
        </button>
      ),
    });
  return (
    <Table
      data={customers}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default CustomerTable;
