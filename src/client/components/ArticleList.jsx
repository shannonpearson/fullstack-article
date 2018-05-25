/* eslint-disable react/prop-types */

import React from 'react';
import { Navbar } from 'react-bootstrap';
import ArticlePreview from './ArticlePreview';

const { Header, Brand } = Navbar;


const ArticleList = ({ articles }) => (
  <div>
    <Navbar>
      <Header>
        <Brand>
                    holla
        </Brand>
      </Header>
    </Navbar>
    { articles.map(article => (<ArticlePreview key={article.title} article={article} />))}
  </div>);

export default ArticleList;
