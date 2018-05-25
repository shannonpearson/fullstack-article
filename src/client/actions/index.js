import { GET_ARTICLES, ADD_ARTICLE } from './types';

export function getArticles(articles) {
  return ({
    type: GET_ARTICLES,
    payload: articles,
  });
}

export function addArticle(article) {
  return ({
    type: ADD_ARTICLE,
    payload: article,
  });
}

