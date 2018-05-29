/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Button, Glyphicon } from 'react-bootstrap';

import { searchArticles } from '../actions/index';

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
    if (this.state.searchTerm.length > 0) {
      this.props.searchArticles(this.state.searchTerm);
    }
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

export default connect(null, { searchArticles })(TagSearch);
