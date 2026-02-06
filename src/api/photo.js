import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/photos" });

export const uploadPhoto = (formData) => API.post("/upload", formData);
export const getPhotosByLocation = (locationId) => API.get(`/location/${locationId}`);
export const deletePhoto = (id) => API.delete(`/${id}`);
