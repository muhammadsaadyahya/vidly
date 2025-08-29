import { data, useNavigate, useParams } from "react-router-dom";
import { useForm } from "./common/form";
import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/moviesService";
import Joi from "joi-browser";
import { saveRentals } from "../services/rentalService";

const RentalForm = () => {
  const [errors, setErrors] = useState({});
  const [moviesData, setMoviesData] = useState([]);
  const [customersData, setCustomerData] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    movieId: "",
  });
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const { data: customersCopy } = await getCustomers();
    setCustomerData(customersCopy);
  };
  const fetchMovies = async () => {
    const { data } = await getMovies();
    setMoviesData(data);
  };
  useEffect(() => {
    fetchMovies();
    fetchCustomers();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];
    const dataCopy = { ...formData };
    dataCopy[input.name] = input.value;
    console.log(input);
    setFormData(dataCopy);
    setErrors(err);
  };

  const doSubmit = async () => {
    //Call the server
    // const customer = customersData.find(
    //   (customer) => customer._id == formData.customerId
    // );
    // const movie = moviesData.find((movie) => movie._id == formData.movieId);
    // const data = {
    //   customer: { ...customer },
    //   movie: { ...movie },
    //   dateOut: new Date().toISOString().split("T")[0],
    // };
    console.log(formData);
    await saveRentals(formData);
    navigate("/Rental");
  };

  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  const { validateProperty, handleSubmit, renderButton, renderSelect } =
    useForm(formData, schema, errors, setErrors, doSubmit, handleChange);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-center">Add a rental record</h3>
        {renderSelect(
          "customerId",
          "Customer",
          customersData,
          formData.customerId
        )}
        {renderSelect("movieId", "Movies", moviesData, formData.movieId)}
        {renderButton("Save")}
      </form>
    </div>
  );
};

export default RentalForm;
