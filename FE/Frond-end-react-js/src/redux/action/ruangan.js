import axiosApiIntances from "../../utils/axios";

export const getAllMovie = (page, limit, sortBy, search) => {
  return {
    type: "GET_ALL_MOVIE",
    payload: axiosApiIntances.get(
      `movie?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
    ),
  };
};
export const getPremiereAll = (page, limit, sortBy, search) => {
  return {
    type: "GET_RUANGAN_ALL",
    payload: axiosApiIntances.get(`ruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`),
  };
};
export const postRuangan = (data) => {
  return {
    type: "POST_RUANGAN",
    payload: axiosApiIntances.post("ruangan", data),
  };
};
// export const getPremiereLocation = () => {
//   return {
//     type: "PREMIERE_LOC",
//     payload: axiosApiIntances.get("premiere/location"),
//   };
// };

export const deleteRuangan = (id) => {
  return {
    type: "DELETE_RUANGAN",
    payload: axiosApiIntances.delete(`ruangan/${id}`),
  };
};