import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import movie from "./movie";
import updateProfile from "./user";
import premiere from "./premiere";
import ruangan from "./ruangan";
import bookingruangan from "./bookingRuangan";
import laporanruangan from "./laporanRuangan"
import user from "./user"
import waitingList from "./waitingLIst"

export default combineReducers({
  waitingList,
  user,
  laporanruangan,
  bookingruangan,
  counter,
  auth,
  movie,
  updateProfile,
  premiere,
  ruangan,
});