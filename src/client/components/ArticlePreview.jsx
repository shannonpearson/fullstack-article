/* eslint-disable react/prop-types */

import React from 'react';
import { Panel, Label } from 'react-bootstrap';

import ArticleModal from './ArticleModal';

const { Component } = React;
const {
  Heading, Title, Body, Footer, Collapse,
} = Panel;

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   expandView: false,
    };
  }

  render() {
    const { article } = this.props;
    const dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(article.dateCreated);
    return (
      <Panel bsStyle="success" defaultExpanded={false} style={{ width: '80%', margin: 'auto', marginTop: 50 }}>
        <Heading>
          <Title componentClass="h3" toggle> { article.title } </Title>
          <div> { article.author } </div>
        </Heading>
        <Collapse>
          <Body>
            { article.body }
            <div> Posted: { date.toLocaleDateString('en-US', dateOptions) } </div>
          </Body>
          <Footer>
            { article.tags.map(tag => (<Label key={tag} bsStyle="info" style={{ marginRight: 5 }}> {tag} </Label>))
            }
            <ArticleModal currentArticle={article} />
          </Footer>
        </Collapse>
      </Panel>
    );
  }
}

export default ArticlePreview;
