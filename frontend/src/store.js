import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer,
  userUpdateProfileReducer 
} from './reducers/userReducers';
import {
  donorProfileReducer,
  donorUpdateProfileReducer,
  donorEligibleRequestsReducer,
  donorRespondToRequestReducer,
  donorHistoryReducer,
} from './reducers/donorReducers';
import {
  institutionProfileReducer,
  institutionUpdateProfileReducer,
  bloodRequestListReducer,
  bloodRequestCreateReducer,
  bloodRequestDetailsReducer,
  bloodRequestUpdateReducer,
  bloodRequestDeleteReducer,
} from './reducers/institutionReducers';
import {
  bloodRequestsReducer,
  bloodRequestDetailReducer,
} from './reducers/bloodRequestReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  
  donorProfile: donorProfileReducer,
  donorUpdateProfile: donorUpdateProfileReducer,
  donorEligibleRequests: donorEligibleRequestsReducer,
  donorRespondToRequest: donorRespondToRequestReducer,
  donorHistory: donorHistoryReducer,
  
  institutionProfile: institutionProfileReducer,
  institutionUpdateProfile: institutionUpdateProfileReducer,
  bloodRequestList: bloodRequestListReducer,
  bloodRequestCreate: bloodRequestCreateReducer,
  bloodRequestDetails: bloodRequestDetailsReducer,
  bloodRequestUpdate: bloodRequestUpdateReducer,
  bloodRequestDelete: bloodRequestDeleteReducer,
  
  bloodRequests: bloodRequestsReducer,
  bloodRequestDetail: bloodRequestDetailReducer,
});

// Get user info from localStorage if exists
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 