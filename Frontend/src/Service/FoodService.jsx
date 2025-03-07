import axios from "axios";

const BASE_URL = "http://localhost:5000/api/food"; // Update this with your backend URL

export const getall = async () => {
  const { data } = await axios.get(`${BASE_URL}`);  
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`${BASE_URL}/search/${searchTerm}`); 
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get(`${BASE_URL}/${foodId}`); 
  return data;
};
