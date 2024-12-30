import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  championListReducer,
  iconListReducer,
  rankListReducer,
  runeListReducer,
  secruneListReducer,
  skinListReducer,
  sumsListReducer,
  userLoginReducer,
} from "./reducers/ChampionReducers";

const reducer = combineReducers({
  championList: championListReducer,
  rankList: rankListReducer,
  skinList: skinListReducer,
  iconList: iconListReducer,
  runeList: runeListReducer,
  secruneList: secruneListReducer,
  sumsList: sumsListReducer,
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});
export default store;
