import http from "./http";
import config from "../components/common/config.json";

export const getCustomers = () => {
  return http.get(config.apiUrl + "/customers");
};

const customerUrl = (id) => {
  return `${config.apiUrl}/customers/${id}`;
};

export const getCustomer = async (customerId) => {
  return http.get(customerUrl(customerId));
};

export const saveCustomers = async (customer) => {
  if (customer._id) {
    const customerCopy = { ...customer };
    delete customerCopy._id;

    return http.put(customerUrl(customer._id), customerCopy);
  }

  return http.post(config.apiUrl + "/customers", customer);
};

export const deleteCustomers = async (id) => {
  return http.delete(customerUrl(id));
};
