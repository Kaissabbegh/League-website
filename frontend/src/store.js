import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {championListReducer, iconListReducer, rankListReducer, runeListReducer, secruneListReducer, skinListReducer, sumsListReducer} from './reducers/ChampionReducers'

const reducer = combineReducers({
  championList: championListReducer,
  rankList:rankListReducer,
  skinList:skinListReducer,
  iconList:iconListReducer,
  runeList:runeListReducer,
  secruneList:secruneListReducer,
  sumsList:sumsListReducer,
})


const initialState={}


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