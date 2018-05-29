/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Button, Glyphicon, Popover, Overlay } from 'react-bootstrap';
import { startsWith, each } from 'lodash';

import { searchArticles } from '../actions/index';

const { Component } = React;

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filteredResults: [],
      target: null,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.chooseTag = this.chooseTag.bind(this);
  }

  onTextChange(e) {
    const filteredResults = [];
    each(this.props.tags, (n, key) => {
      if (startsWith(key, e.target.value)) {
        filteredResults.push(key);
      }
    });
    this.setState({
      searchTerm: e.target.value,
      filteredResults,
      target: e.target,
    });
  }

  onSubmit() {
    if (this.state.searchTerm.length > 0) {
      this.props.searchArticles(this.state.searchTerm);
      this.setState({
        searchTerm: '',
      });
    }
  }

  chooseTag(e) {
    this.setState({
      searchTerm: e.target.id,
    }, () => {
      this.onSubmit();
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
        <Overlay
          show={this.state.filteredResults.length > 0}
          target={this.state.target}
          placement="bottom"
        >
          <Popover id="filter search popover">
            <div>
              {this.state.filteredResults.slice(0, 10).map(tag => (
                <Button id={tag} onClick={this.chooseTag} key={tag}> {tag} </Button>
              ))}
            </div>
          </Popover>
        </Overlay>
        <Button onClick={this.onSubmit} bsSize="small"> <Glyphicon glyph="search" /> </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.fetch.tags,
});

export default connect(mapStateToProps, { searchArticles })(TagSearch);
