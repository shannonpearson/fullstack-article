import { GET_ALL_ARTICLES, IS_LOADING, UPDATE_SEARCH, SEARCH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  articles: [],
  error: null,
};

const FetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case UPDATE_SEARCH:
      return { ...state, articles: action.data };

    case SEARCH_ERROR:
      return { ...state, error: action.err };

    case GET_ALL_ARTICLES:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
};

export default FetchReducer;
