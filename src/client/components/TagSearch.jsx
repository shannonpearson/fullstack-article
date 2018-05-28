/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, FormControl, Button, Glyphicon } from 'react-bootstrap';

import { getArticles } from '../actions/index';

const { Component } = React;

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  onSubmit() {
    // axios get request to search
    // action to update store with all articles from that search
    console.log('term', this.state.searchTerm);
    axios
      .get('/search', { params: { filter: this.state.searchTerm.toLowerCase() } })
      .then((response) => {
        this.setState({
          searchTerm: '',
        });
        this.props.getArticles(response.data);
      })
      .catch((err) => {
        console.log('error searching', err);
      });
  }

  render() {
    return (
      <Form inline>
        <FormControl
          id="searchTerm"
          type="text"
          label="search term"
          placeholder="search tags"
          value={this.state.searchTerm}
          onChange={this.onTextChange}
          style={{ width: 200 }}
          bsSize="small"
        />
        <Button onClick={this.onSubmit} bsSize="small"> <Glyphicon glyph="search" /> </Button>
      </Form>
    );
  }
}

export default connect(null, { getArticles })(TagSearch);
