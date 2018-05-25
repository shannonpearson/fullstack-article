/* eslint-disable react/prop-types */

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import ArticlePreview from './ArticlePreview';
import getArticles from '../actions/index';

const { Header, Brand } = Navbar;


// going to make this stateful for the sake of getting redux up but should probably wrap in app or something to update store so we can leave this as a dumb componennt maybe

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
    axios.get('all')
      .then((response) => {
        console.log('responseeee', response);
        this.props.getArticles(response.data);
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
    axios.get('/search', { params: { filter: this.state.filter } }).then((response) => {
      console.log('search results', response);
    });
  }

  render() {
    console.log(this.props);
    const { articles } = this.props;
    return (
      <div>
        <Navbar>
          <Header>
            <Brand>
                holla
            </Brand>
          </Header>
        </Navbar>
        { articles.map(article => (<ArticlePreview key={article.title} article={article} />))}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.fetch.articles,
});

export default connect(mapStateToProps, { getArticles })(ArticleList);
