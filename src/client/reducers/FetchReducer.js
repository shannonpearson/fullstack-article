import { IS_LOADING, UPDATE_SEARCH, HANDLE_ERROR } from '../actions/types';

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

    case HANDLE_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default FetchReducer;
