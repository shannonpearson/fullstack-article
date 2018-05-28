import { GET_ARTICLES } from '../actions/types';

const INITIAL_STATE = {
  articles: [],
};

const FetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload.articles, tags: action.payload.tags };
    default:
      return state;
  }
};

export default FetchReducer;
