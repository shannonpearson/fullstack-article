import { GET_ARTICLES } from '../actions/types';

const INITIAL_STATE = {
  articles: [],
};

const FetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
};

export default FetchReducer;
