import { uniq } from 'lodash';
import { GET_ARTICLES, ADD_ARTICLE } from './types';

export function getArticles(articles) {
  console.log('getting articles');
  let tags = [];
  articles.forEach((article) => {
    tags = uniq(tags.concat(article.tags));
  });

  return ({
    type: GET_ARTICLES,
    payload: { articles, tags },
  });
}

export function addArticle(article) {
  return ({
    type: ADD_ARTICLE,
    payload: article,
  });
}

