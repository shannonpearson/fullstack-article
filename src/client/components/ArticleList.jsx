/* eslint-disable react/prop-types */

import React from 'react';
import ArticlePreview from './ArticlePreview';

const ArticleList = ({ articles }) => (
  <div>
    { articles.map(article => (<ArticlePreview key={article.title} article={article} />))}
  </div>);

export default ArticleList;
