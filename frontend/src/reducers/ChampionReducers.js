import {
  CHAMPION_LIST_FAIL,
  CHAMPION_LIST_REQUEST,
  CHAMPION_LIST_SUCCESS,
  ICON_LIST_FAIL,
  ICON_LIST_REQUEST,
  ICON_LIST_SUCCESS,
  RANK_LIST_FAIL,
  RANK_LIST_REQUEST,
  RANK_LIST_SUCCESS,
  RUNE_LIST_FAIL,
  RUNE_LIST_REQUEST,
  RUNE_LIST_SUCCESS,
  SECRUNE_LIST_FAIL,
  SECRUNE_LIST_REQUEST,
  SECRUNE_LIST_SUCCESS,
  SKIN_LIST_FAIL,
  SKIN_LIST_REQUEST,
  SKIN_LIST_SUCCESS,
  SUMS_LIST_FAIL,
  SUMS_LIST_REQUEST,
  SUMS_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
} from "../constants/championConstants";

export const championListReducer = (state = { champions: [] }, action) => {
  switch (action.type) {
    case CHAMPION_LIST_REQUEST:
      return { loading: true, champions: [] };
    case CHAMPION_LIST_SUCCESS:
      return { loading: false, champions: action.payload };
    case CHAMPION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rankListReducer = (state = { ranks: [] }, action) => {
  switch (action.type) {
    case RANK_LIST_REQUEST:
      return { loading: true, ranks: [] };
    case RANK_LIST_SUCCESS:
      return { loading: false, ranks: action.payload };
    case RANK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const skinListReducer = (state = { skins: [] }, action) => {
  switch (action.type) {
    case SKIN_LIST_REQUEST:
      return { loading: true, skins: [] };
    case SKIN_LIST_SUCCESS:
      return { loading: false, skins: action.payload };
    case SKIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const iconListReducer = (state = { icons: [] }, action) => {
  switch (action.type) {
    case ICON_LIST_REQUEST:
      return { loading: true, icons: [] };
    case ICON_LIST_SUCCESS:
      return { loading: false, icons: action.payload };
    case ICON_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const runeListReducer = (state = { runes: [] }, action) => {
  switch (action.type) {
    case RUNE_LIST_REQUEST:
      return { loading: true, runes: [] };
    case RUNE_LIST_SUCCESS:
      return { loading: false, runes: action.payload };
    case RUNE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const secruneListReducer = (state = { secrunes: [] }, action) => {
  switch (action.type) {
    case SECRUNE_LIST_REQUEST:
      return { loading: true, secrunes: [] };
    case SECRUNE_LIST_SUCCESS:
      return { loading: false, secrunes: action.payload };
    case SECRUNE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sumsListReducer = (state = { sums: [] }, action) => {
  switch (action.type) {
    case SUMS_LIST_REQUEST:
      return { loading: true, sums: [] };
    case SUMS_LIST_SUCCESS:
      return { loading: false, sums: action.payload };
    case SUMS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_REGISTER_RESET:
      return { user: {} };

    default:
      return state;
  }
};

