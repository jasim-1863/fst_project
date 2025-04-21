import axios from 'axios';
import {
  INSTITUTION_PROFILE_REQUEST,
  INSTITUTION_PROFILE_SUCCESS,
  INSTITUTION_PROFILE_FAIL,
  INSTITUTION_UPDATE_PROFILE_REQUEST,
  INSTITUTION_UPDATE_PROFILE_SUCCESS,
  INSTITUTION_UPDATE_PROFILE_FAIL,
  INSTITUTION_BLOOD_REQUESTS_REQUEST,
  INSTITUTION_BLOOD_REQUESTS_SUCCESS,
  INSTITUTION_BLOOD_REQUESTS_FAIL,
  BLOOD_REQUEST_CREATE_REQUEST,
  BLOOD_REQUEST_CREATE_SUCCESS,
  BLOOD_REQUEST_CREATE_FAIL,
  BLOOD_REQUEST_UPDATE_REQUEST,
  BLOOD_REQUEST_UPDATE_SUCCESS,
  BLOOD_REQUEST_UPDATE_FAIL,
  BLOOD_REQUEST_DELETE_REQUEST,
  BLOOD_REQUEST_DELETE_SUCCESS,
  BLOOD_REQUEST_DELETE_FAIL,
  BLOOD_REQUEST_DETAILS_REQUEST,
  BLOOD_REQUEST_DETAILS_SUCCESS,
  BLOOD_REQUEST_DETAILS_FAIL,
} from '../constants/institutionConstants';

// Get institution profile
export const getInstitutionProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INSTITUTION_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/institutions/profile`, config);

    dispatch({
      type: INSTITUTION_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTITUTION_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update institution profile
export const updateInstitutionProfile = (institutionData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INSTITUTION_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(
      `/api/institutions/profile`,
      institutionData,
      config
    );

    dispatch({
      type: INSTITUTION_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTITUTION_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create institution profile
export const createInstitutionProfile = (institutionData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INSTITUTION_PROFILE_REQUEST,
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

    const { data } = await axios.post(
      `/api/institutions`,
      institutionData,
      config
    );

    dispatch({
      type: INSTITUTION_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTITUTION_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get institution blood requests
export const getInstitutionBloodRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INSTITUTION_BLOOD_REQUESTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/institutions/blood-requests`, config);

    dispatch({
      type: INSTITUTION_BLOOD_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INSTITUTION_BLOOD_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create blood request
export const createBloodRequest = (requestData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOOD_REQUEST_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/institutions/blood-requests`, requestData, config);

    dispatch({
      type: BLOOD_REQUEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get blood request by ID
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

    const { data } = await axios.get(`/api/institutions/blood-requests/${id}`, config);

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

// Update blood request
export const updateBloodRequest = (requestData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BLOOD_REQUEST_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/institutions/blood-requests/${requestData._id}`,
      requestData,
      config
    );

    dispatch({
      type: BLOOD_REQUEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete blood request
export const deleteBloodRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOOD_REQUEST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/institutions/blood-requests/${id}`, config);

    dispatch({
      type: BLOOD_REQUEST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BLOOD_REQUEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 