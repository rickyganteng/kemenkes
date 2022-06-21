import axiosApiIntances from "../../utils/axios";

export const getDataShowTime = () => {
  return {
    type: "GET_ALL_SHOWTIME",
    payload: axiosApiIntances.get("show_time"),
  };
};

export const getShowTimeById = (id) => {
  return {
    type: "GET_SHOWTIME_BY_ID",
    payload: axiosApiIntances.get(`show_time/${id}`),
  };
};

export const updateShowtime = (id, data) => {
  return {
    type: "UPDATE_SHOWTIME",
    payload: axiosApiIntances.patch(`show_time/${id}`, data),
  };
};

export const postShowTime = (data) => {
  return {
    type: "POST_SHOWTIME",
    payload: axiosApiIntances.post("show_time", data),
  };
};

export const deleteShowtime = (id) => {
  return {
    type: "DELETE_SHOWTIME",
    payload: axiosApiIntances.delete(`show_time/${id}`),
  };
};

