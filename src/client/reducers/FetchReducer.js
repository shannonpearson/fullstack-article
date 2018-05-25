import { GET_ARTICLES } from '../actions/types';

const INITIAL_STATE = {
  articles: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return Object.assign({}, state, {
        articles: action.payload.articles,
      });
    default:
      return state;
  }
};
