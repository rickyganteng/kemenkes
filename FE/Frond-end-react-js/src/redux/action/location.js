import axiosApiIntances from "../../utils/axios";

export const getDataLocation = () => {
  return {
    type: "GET_ALL_LOCATION",
    payload: axiosApiIntances.get("premiere/location"),
  };
};

export const getLocationById = (id) => {
  return {
    type: "GET_LOCATION_BY_ID",
    payload: axiosApiIntances.get(`premiere/location/${id}`),
  };
};

export const updateLocation = (id, data) => {
  return {
    type: "UPDATE_LOCATION",
    payload: axiosApiIntances.patch(`premiere/location/${id}`, data),
  };
};

export const postLocation = (data) => {
  return {
    type: "POST_LOCATION",
    payload: axiosApiIntances.post("premiere/location", data),
  };
};

export const deleteLocation = (id) => {
  return {
    type: "DELETE_LOCATION",
    payload: axiosApiIntances.delete(`premiere/location/${id}`),
  };
};
