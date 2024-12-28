import { CHAMPION_LIST_FAIL, CHAMPION_LIST_REQUEST, CHAMPION_LIST_SUCCESS, ICON_LIST_FAIL, ICON_LIST_REQUEST, ICON_LIST_SUCCESS, RANK_LIST_FAIL, RANK_LIST_REQUEST, RANK_LIST_SUCCESS, RUNE_LIST_FAIL, RUNE_LIST_REQUEST, RUNE_LIST_SUCCESS, SECRUNE_LIST_FAIL, SECRUNE_LIST_REQUEST, SECRUNE_LIST_SUCCESS, SKIN_LIST_FAIL, SKIN_LIST_REQUEST, SKIN_LIST_SUCCESS, SUMS_LIST_FAIL, SUMS_LIST_REQUEST, SUMS_LIST_SUCCESS } from "../constants/championConstants";
import axios from "axios";
export const listChampions = () => async (dispatch) => {
    try {
      dispatch({ type: CHAMPION_LIST_REQUEST });
      const { data } = await axios.get(
        'api/champions/'
      );
      dispatch({
        type: CHAMPION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAMPION_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listSkins = (id) => async (dispatch) => {
    try {
      dispatch({ type: SKIN_LIST_REQUEST });
      const { data } = await axios.get(
        'api/champions/${id}'
      );
      dispatch({
        type: SKIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SKIN_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listRanks = () => async (dispatch) => {
    try {
      dispatch({ type: RANK_LIST_REQUEST });
      const { data } = await axios.get(
        'api/ranks/'
      );
      dispatch({
        type: RANK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RANK_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listIcons = () => async (dispatch) => {
    try {
      dispatch({ type: ICON_LIST_REQUEST });
      const { data } = await axios.get(
        'api/icons/'
      );
      dispatch({
        type: ICON_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ICON_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listRunes = () => async (dispatch) => {
    try {
      dispatch({ type: RUNE_LIST_REQUEST });
      const { data } = await axios.get(
        'api/runes/'
      );
      dispatch({
        type: RUNE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RUNE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listSecrunes = () => async (dispatch) => {
    try {
      dispatch({ type: SECRUNE_LIST_REQUEST });
      const { data } = await axios.get(
        'api/secrunes/'
      );
      dispatch({
        type: SECRUNE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SECRUNE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };

  export const listSums = () => async (dispatch) => {
    try {
      dispatch({ type: SUMS_LIST_REQUEST });
      const { data } = await axios.get(
        'api/sums/'
      );
      dispatch({
        type: SUMS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUMS_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail,
      });
    }
  };