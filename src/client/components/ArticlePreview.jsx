/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Panel, Label } from 'react-bootstrap';

import ArticleModal from './ArticleModal';
import { getArticles } from '../actions/index';

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
    this.searchTags = this.searchTags.bind(this);
  }

  searchTags(e) {
    axios.get('/search', { params: { tag: e.target.id } })
      .then((response) => {
        this.props.getArticles(response.data);
      })
      .catch((err) => {
        console.log('error searching', err);
      });
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
      <Panel bsStyle="success" defaultExpanded={false} style={{ width: '80%', margin: 'auto', marginTop: 50 }}>
        <Heading>
          <Title componentClass="h3" toggle> { article.title } </Title>
          <div> { article.author } </div>
        </Heading>
        <Collapse>
          <Body>
            { article.body }
            <div> Posted: { posted.toLocaleDateString('en-US', dateOptions) } </div>
            { posted === update ||
              <div> Last updated: { update.toLocaleDateString('en-US', dateOptions) } </div>
            }
          </Body>
          <Footer>
            { article.tags.map(tag => (<Label key={tag} id={tag} bsStyle="info" onClick={this.searchTags} style={{ marginRight: 5, cursor: 'pointer' }}> {tag} </Label>))
            }
            <ArticleModal currentArticle={article} />
          </Footer>
        </Collapse>
      </Panel>
    );
  }
}

export default connect(null, { getArticles })(ArticlePreview);
