import axiosApiIntances from "../../utils/axios";

export const getPremiereName = () => {
  return {
    type: "PREMIERE_NAME",
    payload: axiosApiIntances.get("premiere/name"),
  };
};

export const getPremiereLocation = () => {
  return {
    type: "PREMIERE_LOC",
    payload: axiosApiIntances.get("premiere/location"),
  };
};

export const deletePremiere = (id) => {
  return {
    type: "DELETE_PREMIERE",
    payload: axiosApiIntances.delete(`premiere/main/${id}`),
  };
};