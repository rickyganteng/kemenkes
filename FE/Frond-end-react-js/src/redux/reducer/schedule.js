const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case "POST_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_MOVIE_REJECTED":
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

export default schedule;