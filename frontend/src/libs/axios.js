import axios from "axios";


const BASEURL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
//api - set with backend address
const api = axios.create({ baseURL: BASEURL });

//interceptor is a function that runs automatically on every request or response

// look for a token in localstorage(browser) with each request then add to the header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//with every respone if token is missing, invalid or expired delete the token & redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || "";
    const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;