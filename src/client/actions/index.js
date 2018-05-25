import GET_ARTICLES from './types';

const getArticles = articles => ({
    type: GET_ARTICLES,
    payload: { articles },
});

export default getArticles;