import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "./common/form";
import { useEffect, useState } from "react";
import { getMovie, saveMovie } from "../services/moviesService";
import Joi from "joi-browser";
import { getGenres } from "../services/genresService";

const MovieForm = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: null,
    dailyRentalRate: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [genreFilter, setGenres] = useState([]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];
    const dataCopy = { ...data };
    dataCopy[input.name] = input.value;
    setData(dataCopy);
    setErrors(err);
  };

  const doSubmit = async () => {
    //Call the server
    await saveMovie(data);
    navigate("/movies");
  };

  const schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rent"),
  };

  const {
    validateProperty,
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
  } = useForm(data, schema, errors, setErrors, doSubmit, handleChange);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data: genresCopy } = await getGenres();
      setGenres(genresCopy);
    };

    const fetchData = async () => {
      if (id == "new") return;

      try {
        const { data: movie } = await getMovie(id);
        const dataCopy = mapToViewModel(movie);
        dataCopy.genreId = movie.genre._id;
        setData(dataCopy);
      } catch (ex) {
        if (ex.response && ex.response.status == 404) {
          navigate("/not-found");
        }
      }
    };
    fetchGenres();
    fetchData();
  }, []);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-center">Add a new movie</h3>
        {renderInput("title", "Title", "text", true, data.title)}
        {renderSelect("genreId", "Genre", genreFilter, data.genreId)}
        {renderInput(
          "numberInStock",
          "Stock",
          "number",
          false,
          data.numberInStock
        )}
        {renderInput(
          "dailyRentalRate",
          "Rate",
          "number",
          false,
          data.dailyRentalRate
        )}
        {renderButton("Save")}
      </form>
    </div>
  );
};

export default MovieForm;
