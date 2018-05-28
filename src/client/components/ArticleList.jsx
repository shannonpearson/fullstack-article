/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import { Alert } from 'react-bootstrap';

import ArticlePreview from './ArticlePreview';
import { getAllArticles, addArticle, searchArticles } from '../actions/index';

// going to make this stateful for the sake of getting redux up but should probably
// wrap in app or something to update store so we can leave this as a dumb componennt maybe

class ArticleList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     success: null;
  //   }
  // }

  componentWillMount() {
    this.props.searchArticles();
  }

  // handleModalSuccess(type) {
  //   this.setState({
  //     success: type,
  //   });
  // }

  render() {
    console.log('PROPS LIST', this.props);

    const successAlert = () => (
      <Alert bsStyle="success" style={{ width: '80%', margin: 'auto' }}> Successfully { this.props.success } article! </Alert>
    );


    if (this.props.loading) {
      
      return (
        <div>
          { this.props.success && successAlert() }
          <div style={{ textAlign: 'center' }}> Loading... </div>;
        </div>)
    } else if (this.props.articles.length > 0) {
      return (
        <div>
          {this.props.success && successAlert()}
          {this.props.articles.map(a => (<ArticlePreview key={a.title} article={a} />))}
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

export default connect(mapStateToProps, {
  getAllArticles, addArticle, searchArticles,
})(ArticleList);
