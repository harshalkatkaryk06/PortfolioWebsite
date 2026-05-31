const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BACKEND_URI
    : import.meta.env.VITE_PROD_BACKEND_URI;

export default BASE_URL;