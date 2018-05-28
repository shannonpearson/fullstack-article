/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Alert } from 'react-bootstrap';

import ArticlePreview from './ArticlePreview';
import { getAllArticles, addArticle, searchArticles } from '../actions/index';

// going to make this stateful for the sake of getting redux up but should probably
// wrap in app or something to update store so we can leave this as a dumb componennt maybe

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // filter: null,
    };
    // this.filterSearch = this.filterSearch.bind(this);
    // this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.props.searchArticles();
    // axios.get('/articles/all')
    //   .then((response) => {
    //     this.props.searchArticles(response.data);
    //   })
    //   .catch((err) => {
    //     console.log('error', err);
    //   });
  }

  // filterSearch(text) {
  //   this.setState({
  //     filter: text,
  //   });
  // }

  // search() {
  //   // axios request with state.filter asa param
  //   // axios.get('/articles/search', { params: { filter: this.state.filter } }).then((response) => {
  //   //   console.log('search results', response);
  //   // });
  //   searchArticles(this.state.filter);
  // }

  render() {
    console.log('PROPS LIST', this.props);

    if (this.props.loading) {
      return (<div style={{ textAlign: 'center' }}> Loading... </div>)
    } else if (this.props.articles.length > 0) {
      return <div> {this.props.articles.map(a => (<ArticlePreview key={a.title} article={a} />))} </div>
  }
    return (
      <Alert bsStyle="warning" style={{ width: '80%', margin: 'auto' }}> No articles found :/ </Alert>
    );

    // return (
    //   <div>
    //     { this.props.articles.length > 0 ?
    //   </div>
    // );
  }
}


const mapStateToProps = state => ({
  articles: state.fetch.articles,
  loading: state.fetch.isLoading,
  searchError: state.fetch.error,
});

export default connect(mapStateToProps, {
  getAllArticles, addArticle, searchArticles,
})(ArticleList);
