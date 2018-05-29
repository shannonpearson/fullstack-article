/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import { Alert, Pagination, Pager } from 'react-bootstrap';

import ArticlePreview from './ArticlePreview';
import { addArticle, searchArticles } from '../actions/index';

// going to make this stateful for the sake of getting redux up but should probably
// wrap in app or something to update store so we can leave this as a dumb componennt maybe

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.updatePage = this.updatePage.bind(this);
  }

  componentWillMount() {
    this.props.searchArticles();
  }

  updatePage(e) {
    this.setState({ activePage: e.target.id });
  }

  render() {
    const pages = [];
    for (let i = 1; i <= (this.props.articles.length % 8) + 1; i++) {
      pages.push(
        <Pagination.Item
          id={i}
          key={i}
          active={i === this.state.activePage}
          onClick={this.updatePage}
        >
          {i}
        </Pagination.Item>);
    }

    const successAlert = () => (
      <Alert bsStyle="success" style={{ width: '80%', margin: 'auto' }}> Successfully { this.props.success } article! </Alert>
    );


    if (this.props.loading) {
      return (
        <div>
          { this.props.success && successAlert() }
          <div style={{ textAlign: 'center' }}> Loading... </div>;
        </div>);
    } else if (this.props.articles.length > 0) {
      return (
        <div>
          {this.props.success && successAlert()}
          {this.props.articles
            .slice((this.state.activePage - 1) * 8, (this.state.activePage * 8)).map(a => (
              <ArticlePreview key={a.title} article={a} />
            ))}
          <div style={{ width: 'fit-content', margin: 'auto' }}>
            <Pagination bsSize="medium" >{pages}</Pagination>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.props.success && successAlert()}
        <Alert bsStyle="warning" style={{ width: '80%', margin: 'auto' }}> No articles found :/ </Alert>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.fetch.articles,
  loading: state.fetch.isLoading,
  searchError: state.fetch.error === 'search',
  success: state.fetch.success,
});

export default connect(mapStateToProps, { addArticle, searchArticles })(ArticleList);
