const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  dataRuangan: [],
  paginationn: []
};

const ruangan = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RUANGAN_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_RUANGAN_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataRuangan: action.payload.data.data,
        paginationn: action.payload.data.pagination
      };
    case "GET_RUANGAN_ALL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataRuangan: []
      };
    case "POST_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_RUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_RUANGAN_REJECTED":
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

export default ruangan;