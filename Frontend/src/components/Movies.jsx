import { useState, useEffect } from "react";
import { deleteMovie, getMovies } from "../services/moviesService";
import { getGenres } from "../services/genresService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Movies({ user }) {
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);
  const [currGenre, setGenre] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [genreFilter, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      let { data: genresCopy } = await getGenres();
      genresCopy = genresCopy.map((genres) => genres.name);
      setGenres(["All Genres", ...genresCopy]);
    };
    const fetchMovies = async () => {
      const { data: moviesCopy } = await getMovies();
      setMovies(moviesCopy);
      setCount(moviesCopy.length);
    };
    fetchMovies();
    fetchGenres();
  }, []);

  const DeleteHandler = async (id) => {
    const originalMovies = movies;

    const updatedMovies = movies.filter((m) => m._id !== id);
    setCount(updatedMovies.length);

    setMovies(updatedMovies);
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status == 404) {
        toast.error("The Item has already been deleted");
      }
      setMovies(originalMovies);
      setCount(originalMovies.length);
    }

    if (
      page >
        updatedMovies.length / pageSize + (updatedMovies.length % pageSize) &&
      page > 0
    )
      setPage(page - 1);
  };

  const handleLike = (movie) => {
    const copyMovies = [...movies];
    const index = copyMovies.indexOf(movie);
    copyMovies[index] = { ...movie };
    copyMovies[index].liked = !copyMovies[index].liked;
    setMovies(copyMovies);
  };

  const getCountContent = (count) => {
    if (count === 0) return "no";
    return count;
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleGenreClick = (genre) => {
    setSearchQuery("");
    setGenre(genre);
    setPage(1);
  };

  const handleSort = (sortCol) => {
    setSortColumn(sortCol);
  };

  const getPageData = () => {
    let copyMovies = null;
    copyMovies = [...movies];

    if (currGenre == 0) {
      copyMovies = copyMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currGenre > 1) {
      copyMovies = copyMovies.filter(
        (copyMovies) => copyMovies.genre.name == genreFilter[currGenre - 1]
      );
    }

    const sorted = _.orderBy(copyMovies, [sortColumn.path], [sortColumn.order]);

    const filteredCount = copyMovies.length;
    copyMovies = paginate(sorted, page, pageSize);
    return { data: copyMovies, count: filteredCount };
  };

  const { data: copyMovies, count: filteredCount } = getPageData();

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setGenre(0);
    setPage(1);
  };

  return (
    <div className="row" style={{ padding: "40px 20px 20px 20px" }}>
      <div className="col-2">
        {count > 0 && (
          <ListGroup
            list={genreFilter}
            currItem={currGenre}
            onClick={handleGenreClick}
          />
        )}
      </div>
      <div className="col">
        <div className="movies-header">
          <div className="header-content">
            <h2 className="section-title">Movie Collection</h2>
            <div className="header-stats">
              <span className="movies-count">
                {getCountContent(filteredCount)}{" "}
                {filteredCount === 1 ? "movie" : "movies"} found
              </span>
            </div>
          </div>

          <div className="search-actions-bar">
            <div className="search-container">
              <SearchBox value={searchQuery} onChange={handleSearch} />
            </div>
            <div className="actions-container">
              {user && (
                <Link className="btn-new-movie" to="/Movies/new">
                  <i className="fa fa-plus"></i>
                  <span>New Movie</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {filteredCount > 0 && (
          <MoviesTable
            movies={copyMovies}
            totalMovies={count}
            onDelete={DeleteHandler}
            onLike={handleLike}
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
    </div>
  );
}

export default Movies;
