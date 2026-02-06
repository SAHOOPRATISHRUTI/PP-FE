import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/locations" });

export const getLocations = () => API.get("/");
export const createLocation = (data) => API.post("/", data);
export const updateLocation = (id, data) => API.put(`/${id}`, data);
export const deleteLocation = (id) => API.delete(`/${id}`);
