// import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { IS_LOADING, UPDATE_SEARCH, SEARCH_ERROR, GET_ALL_ARTICLES, ADD_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE } from './types';


const loading = isLoading => ({
  type: IS_LOADING,
  isLoading,
});

const updateSearch = data => ({
  type: UPDATE_SEARCH,
  data,
});

const searchError = err => ({
  type: SEARCH_ERROR,
  err,
});


export function searchArticles(tag) {
  return (dispatch) => {
    dispatch(loading(true));

    axios.get('/articles/search/', { params: { tag } })
      .then((response) => {
        dispatch(loading(false));
        return response.data;
      })
      .then((data) => {
        dispatch(updateSearch(data));
      })
      .catch((err) => {
        dispatch(searchError(err));
      });
  };
}


export function getAllArticles(articles) {
  return ({
    type: GET_ALL_ARTICLES,
    payload: articles,
  });
}

export function addArticle(article) {
  return ({
    type: ADD_ARTICLE,
    payload: article,
  });
}

// export function searchArticles(tag) {
//   return ({
//     type: SEARCH_ARTICLES,
//     payload: tag,
//   });
// }

export function deleteArticle(id) {
  return ({
    type: DELETE_ARTICLE,
    payload: id,
  });
}

export function updateArticle(id, changes) {
  return ({
    type: UPDATE_ARTICLE,
    payload: { id, changes },
  });
}
