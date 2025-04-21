import {
  INSTITUTION_PROFILE_REQUEST,
  INSTITUTION_PROFILE_SUCCESS,
  INSTITUTION_PROFILE_FAIL,
  INSTITUTION_PROFILE_RESET,
  INSTITUTION_UPDATE_PROFILE_REQUEST,
  INSTITUTION_UPDATE_PROFILE_SUCCESS,
  INSTITUTION_UPDATE_PROFILE_FAIL,
  INSTITUTION_UPDATE_PROFILE_RESET,
  INSTITUTION_BLOOD_REQUESTS_REQUEST,
  INSTITUTION_BLOOD_REQUESTS_SUCCESS,
  INSTITUTION_BLOOD_REQUESTS_FAIL,
  INSTITUTION_BLOOD_REQUESTS_RESET,
  BLOOD_REQUEST_CREATE_REQUEST,
  BLOOD_REQUEST_CREATE_SUCCESS,
  BLOOD_REQUEST_CREATE_FAIL,
  BLOOD_REQUEST_CREATE_RESET,
  BLOOD_REQUEST_UPDATE_REQUEST,
  BLOOD_REQUEST_UPDATE_SUCCESS,
  BLOOD_REQUEST_UPDATE_FAIL,
  BLOOD_REQUEST_UPDATE_RESET,
  BLOOD_REQUEST_DELETE_REQUEST,
  BLOOD_REQUEST_DELETE_SUCCESS,
  BLOOD_REQUEST_DELETE_FAIL,
  BLOOD_REQUEST_DELETE_RESET,
  BLOOD_REQUEST_DETAILS_REQUEST,
  BLOOD_REQUEST_DETAILS_SUCCESS,
  BLOOD_REQUEST_DETAILS_FAIL,
  BLOOD_REQUEST_DETAILS_RESET,
  DONOR_APPOINTMENT_CONFIRM_REQUEST,
  DONOR_APPOINTMENT_CONFIRM_SUCCESS,
  DONOR_APPOINTMENT_CONFIRM_FAIL,
  DONOR_APPOINTMENT_CONFIRM_RESET,
  DONATION_COMPLETE_REQUEST,
  DONATION_COMPLETE_SUCCESS,
  DONATION_COMPLETE_FAIL,
  DONATION_COMPLETE_RESET,
} from '../constants/institutionConstants';

export const institutionProfileReducer = (state = { institution: {} }, action) => {
  switch (action.type) {
    case INSTITUTION_PROFILE_REQUEST:
      return { loading: true };
    case INSTITUTION_PROFILE_SUCCESS:
      return { loading: false, institution: action.payload };
    case INSTITUTION_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case INSTITUTION_PROFILE_RESET:
      return { institution: {} };
    default:
      return state;
  }
};

export const institutionUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTITUTION_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case INSTITUTION_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, institution: action.payload };
    case INSTITUTION_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case INSTITUTION_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const bloodRequestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case INSTITUTION_BLOOD_REQUESTS_REQUEST:
      return { loading: true, requests: [] };
    case INSTITUTION_BLOOD_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload };
    case INSTITUTION_BLOOD_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case INSTITUTION_BLOOD_REQUESTS_RESET:
      return { requests: [] };
    default:
      return state;
  }
};

export const bloodRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case BLOOD_REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, request: action.payload };
    case BLOOD_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bloodRequestDetailsReducer = (state = { request: {} }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BLOOD_REQUEST_DETAILS_SUCCESS:
      return { loading: false, request: action.payload };
    case BLOOD_REQUEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_DETAILS_RESET:
      return { request: {} };
    default:
      return state;
  }
};

export const bloodRequestUpdateReducer = (state = { request: {} }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_UPDATE_REQUEST:
      return { loading: true };
    case BLOOD_REQUEST_UPDATE_SUCCESS:
      return { loading: false, success: true, request: action.payload };
    case BLOOD_REQUEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_UPDATE_RESET:
      return { request: {} };
    default:
      return state;
  }
};

export const bloodRequestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_DELETE_REQUEST:
      return { loading: true };
    case BLOOD_REQUEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOOD_REQUEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const donorAppointmentConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case DONOR_APPOINTMENT_CONFIRM_REQUEST:
      return { loading: true };
    case DONOR_APPOINTMENT_CONFIRM_SUCCESS:
      return { loading: false, success: true };
    case DONOR_APPOINTMENT_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_APPOINTMENT_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};

export const donationCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DONATION_COMPLETE_REQUEST:
      return { loading: true };
    case DONATION_COMPLETE_SUCCESS:
      return { loading: false, success: true };
    case DONATION_COMPLETE_FAIL:
      return { loading: false, error: action.payload };
    case DONATION_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
}; 