// import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import { IS_LOADING, UPDATE_SEARCH, HANDLE_ERROR, ADD_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE } from './types';


const loading = isLoading => ({
  type: IS_LOADING,
  isLoading,
});

const updateSearch = data => ({
  type: UPDATE_SEARCH,
  data,
});

const handleError = type => ({
  type: HANDLE_ERROR,
  error: type,
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
      .catch(() => {
        dispatch(handleError('search'));
      });
  };
}

export function addArticle(article, cb) {
  return (dispatch) => {
    axios.post('/articles/new', { article })
      .then((response) => {
        dispatch(updateSearch(response.data));
        cb();
      })
      .catch((err) => {
        if (err.response.status === 400) { // error creating article
          dispatch(handleError('add'));
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
        console.log('updated list of articles', response.data)
        dispatch(updateSearch(response.data));
        cb();
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 400) {
          dispatch(handleError('delete'));
        } else {
          dispatch(handleError('search'));
          cb();
        }
      });
  };
}

export function updateArticle(id, changes) {
  return ({
    type: UPDATE_ARTICLE,
    payload: { id, changes },
  });
}
