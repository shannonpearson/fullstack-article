import GET_ARTICLES from './types';

const getArticles = articles => {
    console.log('action', articles)
return {
  type: GET_ARTICLES,
  payload: { articles }
};};

export default getArticles;