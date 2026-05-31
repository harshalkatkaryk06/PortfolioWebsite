const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (error?.message) return error.message;
  return fallback;
};

export default getErrorMessage;