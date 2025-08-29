import { useState, useEffect } from "react";
import { getRentals, saveRentals } from "../services/rentalService";
import { processReturn } from "../services/returnService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import RentalsTable from "./RentalsTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Rentals({ user }) {
  const [rentals, setRentals] = useState([]);
  const [count, setCount] = useState();
  const [search, setSearch] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const fetchRentals = async () => {
      const { data: rentalsCopy } = await getRentals();

      setRentals(rentalsCopy);

      setCount(rentalsCopy.length);
    };
    fetchRentals();
  }, []);

  const handleRecieve = async (id) => {
    const originalRentals = rentals;
    let x = -1;
    const index = rentals.map((m, index) => {
      if (m._id === id) {
        x = index;
      }
    });
    const rental = { ...originalRentals[x] };
    rental.returned = new Date().toISOString().split("T")[0];
    const updatedRentals = [...originalRentals];
    updatedRentals[x] = { ...rental };
    setRentals(updatedRentals);

    try {
      await processReturn(
        updatedRentals[x].customer._id,
        updatedRentals[x].movie._id
      );
    } catch (ex) {
      if (ex.response && ex.response.status == 404) {
        toast.error("The Item has already been returned");
      }
      setRentals(originalRentals);
      setCount(originalRentals.length);
    }

    if (
      page >
        updatedRentals.length / pageSize + (updatedRentals.length % pageSize) &&
      page > 0
    )
      setPage(page - 1);
  };

  const getCountContent = (count) => {
    if (count === 0) return "no";
    return count;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSort = (sortCol) => {
    setSortColumn(sortCol);
  };

  const getPageData = () => {
    let copyRentals = null;
    copyRentals = [...rentals];

    if (search == 0) {
      copyRentals = copyRentals.filter((rental) =>
        rental.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(
      copyRentals,
      [sortColumn.path],
      [sortColumn.order]
    );

    const filteredCount = copyRentals.length;
    copyRentals = paginate(sorted, page, pageSize);
    return { data: copyRentals, count: filteredCount };
  };

  const { data: copyRentals, count: filteredCount } = getPageData();

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    if (searchQuery == "") setSearch(1);
    setSearch(0);
    setPage(1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h2 className="section-title">Rental Management</h2>
          <div className="header-stats">
            <span className="items-count">
              {getCountContent(filteredCount)}{" "}
              {filteredCount === 1 ? "rental" : "rentals"} found
            </span>
          </div>
        </div>

        <div className="search-actions-bar">
          <div className="search-container">
            <SearchBox value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="actions-container">
            {user && (
              <Link className="btn-new-item" to="/Rental/new">
                <i className="fa fa-plus"></i>
                <span>New Rental</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {filteredCount > 0 && (
        <RentalsTable
          rentals={copyRentals}
          onReceive={handleRecieve}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
      )}
      <Pagination
        itemsCount={filteredCount}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Rentals;
