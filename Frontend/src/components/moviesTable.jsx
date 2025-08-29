import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

const MoviesTable = ({ movies, onLike, onDelete, onSort, sortColumn }) => {
  const user = auth.getCurrentUser();
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
  ];
  if (user && user.isAdmin)
    columns.push({
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          style={{ width: "100%" }}
          onClick={() => onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    });
  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
