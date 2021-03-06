/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/prop-types */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Pagination } from 'react-bootstrap';

import { addArticle, searchArticles } from '../actions/index';
import ArticleView from './ArticleView';

class ArticlesList extends React.Component {
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
    const { length } = this.props.articles;

    const successAlert = () => (
      <Alert
        bsStyle="info"
        style={{ width: '80%', margin: 'auto', marginTop: 20 }}
      >
        Successfully { this.props.success } article!
      </Alert>
    );

    const pages = [];
    for (let i = 1; i <= Math.ceil((length / 8)); i++) {
      pages.push(<Pagination.Item
        id={i}
        key={i}
        active={i === this.state.activePage}
        onClick={this.updatePage}
      >
        {i}
      </Pagination.Item>);
    }

    return (
      <div>
        {this.props.success && successAlert()}
        {this.props.loading && <div style={{ textAlign: 'center' }}> Loading... </div>}
        {length ?
          (
            <div>
              {this.props.articles
                .slice((this.state.activePage - 1) * 8, (this.state.activePage * 8)).map(a => (
                  <ArticleView key={a.title} article={a} />
                ))}
              <div style={{ width: 'fit-content', margin: 'auto' }}>
                <Pagination bsSize="medium" >{pages}</Pagination>
              </div>
            </div>
          ) : this.props.loading || (
            <Alert bsStyle="warning" style={{ width: '80%', margin: 'auto' }}> No articles found :/ </Alert>
          )
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.search.articles,
  loading: state.search.isLoading,
  success: state.search.success,
  tags: state.search.tags,
});

export default connect(mapStateToProps, { addArticle, searchArticles })(ArticlesList);
