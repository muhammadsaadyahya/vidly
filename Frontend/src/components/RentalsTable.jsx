import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import GoldMemberIcon from "./common/GoldMemberIcon";

const RentalsTable = ({ rentals, onReceive, onSort, sortColumn }) => {
  const user = auth.getCurrentUser();
  const columns = [
    {
      path: "customer.name",
      label: "Customer",
      content: (rental) => (
        <Link to={`/Customers/${rental.customer._id}`}>
          {rental.customer.name}
        </Link>
      ),
    },
    { path: "customer.phone", label: "Phone" },
    {
      key: "customer.isGold",
      content: (rental) => {
        if (rental.customer.isGold) return <GoldMemberIcon />;
      },
    },
    {
      path: "movie.title",
      label: "Movie",
    },
    {
      path: "dateOut",
      label: "Date Out",
      content: (rental) => new Date(rental.dateOut).toISOString().split("T")[0],
    },
    {
      path: "returned",
      label: "Returned",
    },
  ];
  if (user && user.isAdmin)
    columns.push({
      key: "recieve",
      content: (rental) => (
        <button
          style={{ width: "100%" }}
          onClick={() => onReceive(rental._id)}
          className="btn btn-info"
        >
          Receive
        </button>
      ),
    });
  return (
    <Table
      data={rentals}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default RentalsTable;
