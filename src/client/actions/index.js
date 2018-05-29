// import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { IS_LOADING, UPDATE_SEARCH, HANDLE_ERROR } from './types';


const loading = isLoading => ({
  type: IS_LOADING,
  isLoading,
});

const updateSearch = (data, success) => ({
  type: UPDATE_SEARCH,
  data: data.results,
  success,
  tags: data.tags,
});

const handleError = error => ({
  type: HANDLE_ERROR,
  error,
});

// search articles with (optional) tag filter
export function searchArticles(tag) {
  return (dispatch) => {
    dispatch(loading(true)); // state loading while awaiting axios promises

    axios.get('/articles/search/', { params: { tag } })
      .then((response) => {
        dispatch(loading(false));
        return response.data;
      })
      .then((data) => {
        dispatch(updateSearch(data, null));
      })
      .catch(() => {
        dispatch(loading(false));
        dispatch(handleError('searching'));
      });
  };
}

// add article and update store with new list of all articles
export function addArticle(article, cb) {
  return (dispatch) => {
    axios.post('/articles/new', { article })
      .then((response) => {
        dispatch(updateSearch(response.data, 'added'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 503) {
          // server returns 503 after successful add/delete/update but unsuccessful search
          dispatch(handleError('searching'));
          cb(); // call callback to close modal because create article was successful
        } else {
          dispatch(handleError('adding'));
        }
      });
  };
}

// delete article and update store with new list of all articles
export function deleteArticle(id, cb) {
  return (dispatch) => {
    axios.delete('/articles/delete', { params: { id } })
      .then((response) => {
        dispatch(updateSearch(response.data, 'deleted'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 503) {
          dispatch(handleError('searching'));
          cb();
        } else {
          dispatch(handleError('deleting'));
        }
      });
  };
}

// update article and update store with new list of all articles
export function updateArticle(id, changes, cb) {
  return (dispatch) => {
    axios.put('/articles/edit', { id, changes })
      .then((response) => {
        dispatch(updateSearch(response.data, 'updated'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 503) {
          dispatch(handleError('searching'));
          cb();
        } else {
          dispatch(handleError('deleting'));
        }
      });
  };
}
