import axios from 'axios';
import {
  BLOOD_REQUEST_LIST_REQUEST,
  BLOOD_REQUEST_LIST_SUCCESS,
  BLOOD_REQUEST_LIST_FAIL,
  BLOOD_REQUEST_DETAILS_REQUEST,
  BLOOD_REQUEST_DETAILS_SUCCESS,
  BLOOD_REQUEST_DETAILS_FAIL,
  BLOOD_REQUEST_SEARCH_REQUEST,
  BLOOD_REQUEST_SEARCH_SUCCESS,
  BLOOD_REQUEST_SEARCH_FAIL,
  BLOOD_DONATION_EVENTS_REQUEST,
  BLOOD_DONATION_EVENTS_SUCCESS,
  BLOOD_DONATION_EVENTS_FAIL,
  BLOOD_REQUEST_STATS_REQUEST,
  BLOOD_REQUEST_STATS_SUCCESS,
  BLOOD_REQUEST_STATS_FAIL,
} from '../constants/bloodRequestConstants';

// Get list of blood requests with filters
export const getBloodRequests = (
  keyword = '',
  bloodType = '',
  urgencyLevel = '',
  status = 'Open',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: BLOOD_REQUEST_LIST_REQUEST });

    let queryParams = `?status=${status}`;
    if (keyword) queryParams += `&keyword=${keyword}`;
    if (bloodType) queryParams += `&bloodType=${bloodType}`;
    if (urgencyLevel) queryParams += `&urgencyLevel=${urgencyLevel}`;
    if (pageNumber) queryParams += `&pageNumber=${pageNumber}`;

    const { data } = await axios.get(`/api/bloodRequests${queryParams}`);

    dispatch({
      type: BLOOD_REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get blood request details by ID
export const getBloodRequestById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOOD_REQUEST_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/blood-requests/${id}`, config);

    dispatch({
      type: BLOOD_REQUEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Search blood requests by location and blood type
export const searchBloodRequests = (bloodType = '', location = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOOD_REQUEST_SEARCH_REQUEST });

    const { data } = await axios.get(
      `/api/bloodRequests/search?bloodType=${bloodType}&location=${location}`
    );

    dispatch({
      type: BLOOD_REQUEST_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get upcoming blood donation events
export const getBloodDonationEvents = () => async (dispatch) => {
  try {
    dispatch({ type: BLOOD_DONATION_EVENTS_REQUEST });

    const { data } = await axios.get(`/api/bloodRequests/events`);

    dispatch({
      type: BLOOD_DONATION_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_DONATION_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get blood request statistics
export const getBloodRequestStats = () => async (dispatch) => {
  try {
    dispatch({ type: BLOOD_REQUEST_STATS_REQUEST });

    const { data } = await axios.get(`/api/bloodRequests/stats`);

    dispatch({
      type: BLOOD_REQUEST_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 