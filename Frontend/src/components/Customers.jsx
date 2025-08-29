import { useState, useEffect } from "react";
import { deleteCustomers, getCustomers } from "../services/customerService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import CustomerTable from "./customerTable";

import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Customers({ user }) {
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState();
  const [search, setSearch] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data: customersCopy } = await getCustomers();
      setCustomers(customersCopy);
      setCount(customersCopy.length);
    };
    fetchCustomers();
  }, []);

  const DeleteHandler = async (id) => {
    const originalCustomers = customers;

    const updatedCustomers = customers.filter((m) => m._id !== id);
    setCount(updatedCustomers.length);

    setCustomers(updatedCustomers);
    try {
      await deleteCustomers(id);
    } catch (ex) {
      if (ex.response && ex.response.status == 404) {
        toast.error("The Item has already been deleted");
      }
      setCustomers(originalCustomers);
      setCount(originalCustomers.length);
    }

    if (
      page >
        updatedCustomers.length / pageSize +
          (updatedCustomers.length % pageSize) &&
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
    let copyCustomers = null;
    copyCustomers = [...customers];

    if (search == 0) {
      copyCustomers = copyCustomers.filter((customer) =>
        customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(
      copyCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    const filteredCount = copyCustomers.length;
    copyCustomers = paginate(sorted, page, pageSize);
    return { data: copyCustomers, count: filteredCount };
  };

  const { data: copyCustomers, count: filteredCount } = getPageData();

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
          <h2 className="section-title">Customer Management</h2>
          <div className="header-stats">
            <span className="items-count">
              {getCountContent(filteredCount)}{" "}
              {filteredCount === 1 ? "customer" : "customers"} found
            </span>
          </div>
        </div>

        <div className="search-actions-bar">
          <div className="search-container">
            <SearchBox value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="actions-container">
            {user && (
              <Link className="btn-new-item" to="/Customers/new">
                <i className="fa fa-plus"></i>
                <span>New Customer</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {filteredCount > 0 && (
        <CustomerTable
          customers={copyCustomers}
          onDelete={DeleteHandler}
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

export default Customers;
