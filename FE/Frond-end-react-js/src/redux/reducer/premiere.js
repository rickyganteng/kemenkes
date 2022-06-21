const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
};

const premiere = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PREMIERE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_PREMIERE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_PREMIERE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    default:
      return state;
  }
};

export default premiere;