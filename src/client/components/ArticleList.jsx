/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ArticlePreview from './ArticlePreview';
import { getAllArticles, addArticle } from '../actions/index';

// going to make this stateful for the sake of getting redux up but should probably
// wrap in app or something to update store so we can leave this as a dumb componennt maybe

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
    };
    this.filterSearch = this.filterSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    axios.get('/articles/all')
      .then((response) => {
        this.props.getAllArticles(response.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  filterSearch(text) {
    this.setState({
      filter: text,
    });
  }

  search() {
    // axios request with state.filter asa param
    axios.get('/articles/search', { params: { filter: this.state.filter } }).then((response) => {
      console.log('search results', response);
    });
  }

  render() {
    return (
      <div>
        { this.props.articles.map(a => (<ArticlePreview key={a.title} article={a} />))}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.fetch.articles,
  tags: state.fetch.tags,
});

export default connect(mapStateToProps, { getAllArticles, addArticle })(ArticleList);
