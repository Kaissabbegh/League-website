import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  cartReducer,
  championListReducer,
  getCorderReducer,
  iconListReducer,
  orderReducer,
  rankListReducer,
  runeListReducer,
  secruneListReducer,
  skinListReducer,
  sumsListReducer,
  userLoginReducer,
  userRegisterReducer,
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
  userRegister:userRegisterReducer,
  CartFromStorage:cartReducer,
  order:orderReducer,
  getCorder:getCorderReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const CartFromStorage = localStorage.getItem("paintingData")
  ? JSON.parse(localStorage.getItem("paintingData"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  CartFromStorage:{ cartInfo:CartFromStorage }
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
