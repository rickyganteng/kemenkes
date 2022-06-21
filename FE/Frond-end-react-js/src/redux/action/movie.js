import axiosApiIntances from "../../utils/axios";

export const getAllMovie = (page, limit, sortBy, search) => {
  return {
    type: "GET_ALL_MOVIE",
    payload: axiosApiIntances.get(
      `movie?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
    ),
  };
};

export const updateMovie = (id, data) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axiosApiIntances.patch(`movie/${id}`, data),
  };
};

export const postMovie = (data) => {
  return {
    type: "POST_MOVIE",
    payload: axiosApiIntances.post("movie", data),
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axiosApiIntances.delete(`movie/${id}`),
  };
};

export const getMovieName = () => {
  return {
    type: "MOVIE_NAME",
    payload: axiosApiIntances.get("movie/name"),
  };
};
