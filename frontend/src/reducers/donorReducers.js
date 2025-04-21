import {
  DONOR_PROFILE_REQUEST,
  DONOR_PROFILE_SUCCESS,
  DONOR_PROFILE_FAIL,
  DONOR_PROFILE_RESET,
  DONOR_UPDATE_PROFILE_REQUEST,
  DONOR_UPDATE_PROFILE_SUCCESS,
  DONOR_UPDATE_PROFILE_FAIL,
  DONOR_UPDATE_PROFILE_RESET,
  DONOR_ELIGIBLE_REQUESTS_REQUEST,
  DONOR_ELIGIBLE_REQUESTS_SUCCESS,
  DONOR_ELIGIBLE_REQUESTS_FAIL,
  DONOR_ELIGIBLE_REQUESTS_RESET,
  DONOR_RESPOND_REQUEST,
  DONOR_RESPOND_SUCCESS,
  DONOR_RESPOND_FAIL,
  DONOR_RESPOND_RESET,
  DONOR_HISTORY_REQUEST,
  DONOR_HISTORY_SUCCESS,
  DONOR_HISTORY_FAIL,
  DONOR_HISTORY_RESET,
} from '../constants/donorConstants';

export const donorProfileReducer = (state = { donor: {} }, action) => {
  switch (action.type) {
    case DONOR_PROFILE_REQUEST:
      return { loading: true };
    case DONOR_PROFILE_SUCCESS:
      return { loading: false, donor: action.payload };
    case DONOR_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_PROFILE_RESET:
      return { donor: {} };
    default:
      return state;
  }
};

export const donorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DONOR_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case DONOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, donor: action.payload };
    case DONOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const donorEligibleRequestsReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case DONOR_ELIGIBLE_REQUESTS_REQUEST:
      return { loading: true, requests: [] };
    case DONOR_ELIGIBLE_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload };
    case DONOR_ELIGIBLE_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_ELIGIBLE_REQUESTS_RESET:
      return { requests: [] };
    default:
      return state;
  }
};

export const donorRespondToRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case DONOR_RESPOND_REQUEST:
      return { loading: true };
    case DONOR_RESPOND_SUCCESS:
      return { loading: false, success: true };
    case DONOR_RESPOND_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_RESPOND_RESET:
      return {};
    default:
      return state;
  }
};

export const donorHistoryReducer = (state = { history: [] }, action) => {
  switch (action.type) {
    case DONOR_HISTORY_REQUEST:
      return { loading: true, history: [] };
    case DONOR_HISTORY_SUCCESS:
      return { loading: false, history: action.payload };
    case DONOR_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    case DONOR_HISTORY_RESET:
      return { history: [] };
    default:
      return state;
  }
}; 