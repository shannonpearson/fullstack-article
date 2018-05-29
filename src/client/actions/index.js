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


export function addArticle(article, cb) {
  return (dispatch) => {
    axios.post('/articles/new', { article })
      .then((response) => {
        dispatch(updateSearch(response.data, 'added'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 400) { // error creating article
          dispatch(handleError('adding'));
        } else { // 500 error on search
          dispatch(handleError('searching'));
          // call callback to close modal because create article was successful
          cb();
        }
      });
  };
}

export function deleteArticle(id, cb) {
  return (dispatch) => {
    axios.delete('/articles/delete', { params: { id } })
      .then((response) => { // response.data = all articles
        dispatch(updateSearch(response.data, 'deleted'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch(handleError('deleting'));
        } else {
          dispatch(handleError('searching'));
          cb();
        }
      });
  };
}

export function updateArticle(id, changes, cb) {
  return (dispatch) => {
    axios.put('/articles/edit', { id, changes })
      .then((response) => {
        dispatch(updateSearch(response.data, 'updated'));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch(handleError('deleting'));
        } else {
          dispatch(handleError('searching'));
          cb();
        }
      });
  };
}
