/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Button, Glyphicon, Popover, Overlay } from 'react-bootstrap';
import { startsWith } from 'lodash';

import { searchArticles } from '../actions/index';

const { Component } = React;

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filteredResults: [],
      filterTarget: null,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchAll = this.searchAll.bind(this);
    this.chooseTag = this.chooseTag.bind(this);
  }

  onTextChange(e) {
    const filteredResults = [];
    this.props.tags.forEach((tag) => {
      if (startsWith(tag, e.target.value)) {
        filteredResults.push(tag);
      }
    });
    this.setState({
      searchTerm: e.target.value,
      filteredResults,
      filterTarget: e.target,
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

  searchAll() {
    this.props.searchArticles();
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
        <Button onClick={this.searchAll} style={{ marginRight: 15 }}> View All </Button>
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
          target={this.state.filterTarget}
          placement="bottom"
        >
          <Popover id="filter search popover">
            <div>
              {this.state.filteredResults.slice(0, 30).map(tag => (
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
  tags: state.search.tags,
});

export default connect(mapStateToProps, { searchArticles })(TagSearch);
