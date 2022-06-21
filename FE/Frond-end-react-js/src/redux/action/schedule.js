import axiosApiIntances from "../../utils/axios";


export const updateSchedule = (id, data) => {
  return {
    type: "UPDATE_SCHEDULE",
    payload: axiosApiIntances.patch(`premiere/${id}`, data),
  };
};

export const postSchedule = (data) => {
  return {
    type: "POST_SCHEDULE",
    payload: axiosApiIntances.post("premiere/schedule", data),
  };
};

