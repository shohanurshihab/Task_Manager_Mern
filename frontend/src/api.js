import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
console.log("API Base URL:", process.env.REACT_APP_BASEURL);
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.authorization = token;
  return req;
});

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const getTasks = () => API.get("/tasks");
export const getUser = (token) => API.get("/auth/user", { headers: { Authorization: token } });
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
