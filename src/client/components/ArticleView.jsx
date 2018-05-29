/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { Panel, Label } from 'react-bootstrap';

import ArticleModal from './ArticleModal';
import { searchArticles } from '../actions/index';

const { Component } = React;
const {
  Heading, Title, Body, Footer, Collapse,
} = Panel;

class ArticleView extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // //   expandView: false,
    // };
    this.searchTags = this.searchTags.bind(this);
  }

  searchTags(e) {
    this.props.searchArticles(e.target.id);
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
    const posted = new Date(article.dateCreated);
    const update = new Date(article.lastUpdate);
    return (
      <Panel defaultExpanded={false} style={{ width: '80%', margin: 'auto', marginTop: 30 }}>
        <Heading>
          <Title componentClass="h3" toggle> { article.title } </Title>
          <div style={{ fontStyle: 'italic' }}> by { article.author } </div>
        </Heading>
        <Collapse>
          <Body>
            { article.body }
            <div style={{ fontStyle: 'italic' }}> Posted: { posted.toLocaleDateString('en-US', dateOptions) } </div>
            { posted === update ||
              <div style={{ fontStyle: 'italic', marginBottom: 5 }}> Last updated: { update.toLocaleDateString('en-US', dateOptions) } </div>
            }
            { article.tags.map(tag => (<Label key={tag} id={tag} bsStyle="primary" onClick={this.searchTags} style={{ marginRight: 5, cursor: 'pointer' }}> {tag} </Label>))
            }
          </Body>
          <Footer>
            <ArticleModal currentArticle={article} />
          </Footer>
        </Collapse>
      </Panel>
    );
  }
}

export default connect(null, { searchArticles })(ArticleView);
