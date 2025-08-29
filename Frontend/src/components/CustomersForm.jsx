import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "./common/form";
import { useEffect, useState } from "react";

import Joi from "joi-browser";
import { getCustomer, saveCustomers } from "../services/customerService";

const CustomersForm = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    phone: null,
    isGold: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    };
  };

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];
    const dataCopy = { ...data };
    dataCopy[input.name] =
      input.type === "checkbox" ? input.checked : input.value;
    setData(dataCopy);
    setErrors(err);
  };

  const doSubmit = async () => {
    //Call the server
    await saveCustomers(data);
    navigate("/Customers");
  };

  const schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).required().label("Name"),
    phone: Joi.string().min(5).required().label("Phone"),
    isGold: Joi.boolean().label("Gold Membership"),
  };

  const {
    validateProperty,
    handleSubmit,
    renderButton,
    renderInput,
    renderCheckBox,
  } = useForm(data, schema, errors, setErrors, doSubmit, handleChange);

  useEffect(() => {
    const fetchData = async () => {
      if (id == "new") return;

      try {
        const { data: customer } = await getCustomer(id);
        const dataCopy = mapToViewModel(customer);
        setData(dataCopy);
      } catch (ex) {
        if (ex.response && ex.response.status == 404) {
          navigate("/not-found");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-center">Add a customer</h3>
        {renderInput("name", "Name", "text", true, data.title)}
        {renderInput("phone", "Phone", "text", false, data.numberInStock)}
        {renderCheckBox("isGold", "Gold Membership", data.isGold)}
        {renderButton("Save")}
      </form>
    </div>
  );
};

export default CustomersForm;
