import axios from 'axios';
import {
  DONOR_PROFILE_REQUEST,
  DONOR_PROFILE_SUCCESS,
  DONOR_PROFILE_FAIL,
  DONOR_UPDATE_PROFILE_REQUEST,
  DONOR_UPDATE_PROFILE_SUCCESS,
  DONOR_UPDATE_PROFILE_FAIL,
  DONOR_ELIGIBLE_REQUESTS_REQUEST,
  DONOR_ELIGIBLE_REQUESTS_SUCCESS,
  DONOR_ELIGIBLE_REQUESTS_FAIL,
  DONOR_RESPOND_REQUEST,
  DONOR_RESPOND_SUCCESS,
  DONOR_RESPOND_FAIL,
  DONOR_HISTORY_REQUEST,
  DONOR_HISTORY_SUCCESS,
  DONOR_HISTORY_FAIL,
} from '../constants/donorConstants';

// Get donor profile
export const getDonorProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/donors/profile`, config);

    dispatch({
      type: DONOR_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update donor profile
export const updateDonorProfile = (donorData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/donors/profile`, donorData, config);

    dispatch({
      type: DONOR_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get eligible blood requests for donor
export const getEligibleRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_ELIGIBLE_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/donors/eligible-requests`, config);

    dispatch({
      type: DONOR_ELIGIBLE_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_ELIGIBLE_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Respond to blood request
export const respondToRequest = (requestData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DONOR_RESPOND_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/donors/respond/${requestData.requestId}`,
      { 
        response: requestData.response,
        availabilityDate: requestData.availabilityDate 
      },
      config
    );

    dispatch({
      type: DONOR_RESPOND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_RESPOND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get donor donation history
export const getDonorHistory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_HISTORY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/donors/donation-history`, config);

    dispatch({
      type: DONOR_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update donor availability status
export const updateAvailabilityStatus = (status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/donors/availability`, { availabilityStatus: status }, config);

    dispatch({
      type: DONOR_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create donor profile
export const createDonorProfile = (donorData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DONOR_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/donors`, donorData, config);

    dispatch({
      type: DONOR_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DONOR_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 