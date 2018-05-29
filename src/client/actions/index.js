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


export function searchArticles(tag) {
  return (dispatch) => {
    dispatch(loading(true));

    axios.get('/articles/search/', { params: { tag } })
      .then((response) => {
        dispatch(loading(false));
        return response.data;
      })
      .then((data) => {
        dispatch(updateSearch(data, null));
      })
      .catch(() => {
        dispatch(handleError('search'));
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
          dispatch(handleError('added'));
        } else { // 500 error on search
          dispatch(handleError('search'));
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
          dispatch(handleError('delete'));
        } else {
          dispatch(handleError('search'));
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
          dispatch(handleError('delete'));
        } else {
          dispatch(handleError('search'));
          cb();
        }
      });
  };
}
