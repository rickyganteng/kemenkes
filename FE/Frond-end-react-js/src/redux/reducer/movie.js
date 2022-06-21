const initialState = {
  dataMovie: [],
  pagination: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataMovie: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataMovie: [],
        msg: action.payload.message,
        pagination: {},
      };
    case "UPDATE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
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
        msg: action.payload.message,
      };
    case "DELETE_MOVIE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_MOVIE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_MOVIE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    default:
      return state;
  }
};

export default movie;