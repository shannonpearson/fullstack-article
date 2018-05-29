/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { Panel, Label, Glyphicon } from 'react-bootstrap';

import { searchArticles } from '../actions/index';
import ArticleModal from './ArticleModal';

const { Component } = React;
const {
  Heading, Title, Body, Footer, Collapse,
} = Panel;

class ArticleView extends Component {
  constructor(props) {
    super(props);
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
      <Panel defaultExpanded={false} bsStyle="success" style={{ width: '80%', margin: 'auto', marginTop: 30 }}>

        <Heading>
          <Title componentClass="h3" toggle> { article.title } </Title>
          <div style={{ fontStyle: 'italic' }}> by { article.author } </div>
        </Heading>

        <Collapse>

          <Body>
            <div style={{ fontStyle: 'italic', marginBottom: 5 }}>
              Posted: { posted.toLocaleDateString('en-US', dateOptions) }
            </div>
            { article.body }
            <div style={{ fontStyle: 'italic', marginTop: 5, marginBottom: 8 }}>
              Last updated: { update.toLocaleDateString('en-US', dateOptions) }
            </div>
            <Glyphicon glyph="tags" style={{ marginRight: 8 }} />
            { article.tags.map(tag => (
              <Label
                key={tag}
                id={tag}
                bsStyle="success"
                onClick={this.searchTags}
                style={{ marginRight: 5, cursor: 'pointer' }}
              >
                {tag}
              </Label>
            ))}
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
