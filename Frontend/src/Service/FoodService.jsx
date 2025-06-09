import axios from "axios";

const BASE_URL = "http://localhost:5000/api/food"; 

export const getall = async () => {
  const { data } = await axios.get(BASE_URL);
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

export const deleteById = async (foodId) => {
  await axios.delete(`${BASE_URL}/${foodId}`);
};

export const update = async (food) => {
  await axios.put(BASE_URL, food);
};

export const add = async (food) => {
  const { data } = await axios.post(BASE_URL, food);
  return data;
};
