/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ArticlePreview from './ArticlePreview';
import { getArticles, addArticle } from '../actions/index';


// const article = {
//   title: 'Harvey Weinstein charged with rape following New York arrest',
//   author: 'Reuters',
//   body: 'Former Hollywood mogul Harvey Weinstein has been charged in New York with rape and several counts of sexual abuse stemming from two separate accusers. Mr Weinstein turned himself in to police in the city earlier in the day. Dozens of women have made allegations against the 66-year - old, including rape and sexual assault, and giving rise to the #MeToo movement. Mr Weinstein has denied committing any non-consensual sex acts.He is now out on bail, wearing a monitoring device. A statement from the New York Police Department said Mr Weinstein was arrested, processed and charged with rape, criminal sex act, sex abuse and sexual misconduct for incidents involving two separate women. He arrived at the police station in lower Manhattan at 07: 30(12: 30 BST) on Friday, carrying three books.After having his mugshot and fingerprints taken, he was led out in handcuffs and taken to court.',
//   tags: ['harvey weinstein', 'hollywood', 'legal'],
// };

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
    axios.get('all')
      .then((response) => {
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
    console.log('les props', this.props);
    return (
      <div>
        { this.props.articles.map(a => (<ArticlePreview key={a.title} article={a} />))}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.fetch.articles,
});

export default connect(mapStateToProps, { getArticles, addArticle })(ArticleList);
