import { createStore, combineReducers } from 'redux';
const initialState = {
  email: '',
  user_name: '',
  password: '',
  accountType: '',
  csrf: 'aaa',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_REGISTER':
      return {
        email: state.email = action.payload.email,
        user_name: state.user_name = action.payload.user_name,
        password : state.password = action.payload.password,
        accountType: state.accountType = action.payload.accountType,
      };
    case 'SET_TOKEN':
      return {
        csrf: state.csrf = action.payload.csrf,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;