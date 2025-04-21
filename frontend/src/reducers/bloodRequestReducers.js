import {
  BLOOD_REQUEST_LIST_REQUEST,
  BLOOD_REQUEST_LIST_SUCCESS,
  BLOOD_REQUEST_LIST_FAIL,
  BLOOD_REQUEST_LIST_RESET,
  BLOOD_REQUEST_DETAILS_REQUEST,
  BLOOD_REQUEST_DETAILS_SUCCESS,
  BLOOD_REQUEST_DETAILS_FAIL,
  BLOOD_REQUEST_DETAILS_RESET,
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

// Reducer to handle listing of blood requests
export const bloodRequestsReducer = (state = { bloodRequests: [] }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_LIST_REQUEST:
      return { loading: true, bloodRequests: [] };
    case BLOOD_REQUEST_LIST_SUCCESS:
      return {
        loading: false,
        bloodRequests: action.payload.bloodRequests,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case BLOOD_REQUEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_LIST_RESET:
      return { bloodRequests: [] };
    default:
      return state;
  }
};

// Reducer to handle blood request details
export const bloodRequestDetailReducer = (state = { bloodRequest: {} }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BLOOD_REQUEST_DETAILS_SUCCESS:
      return { loading: false, bloodRequest: action.payload };
    case BLOOD_REQUEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BLOOD_REQUEST_DETAILS_RESET:
      return { bloodRequest: {} };
    default:
      return state;
  }
};

export const bloodRequestSearchReducer = (state = { bloodRequests: [] }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_SEARCH_REQUEST:
      return { loading: true, bloodRequests: [] };
    case BLOOD_REQUEST_SEARCH_SUCCESS:
      return { loading: false, bloodRequests: action.payload };
    case BLOOD_REQUEST_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bloodDonationEventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case BLOOD_DONATION_EVENTS_REQUEST:
      return { loading: true, events: [] };
    case BLOOD_DONATION_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case BLOOD_DONATION_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bloodRequestStatsReducer = (state = { stats: {} }, action) => {
  switch (action.type) {
    case BLOOD_REQUEST_STATS_REQUEST:
      return { loading: true, stats: {} };
    case BLOOD_REQUEST_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case BLOOD_REQUEST_STATS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}; 