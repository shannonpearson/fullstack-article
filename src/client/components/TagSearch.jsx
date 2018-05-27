import React from 'react';
import axios from 'axios';
import { form, FormControl, Button } from 'react-bootstrap';

const { Component } = React;

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    // get all tags
  }

  onTextChange(text) {
    this.setState({
      searchTerm: text,
    });
  }

  onSubmit() {
    // axios get request to search
    // action to update store with all articles from that search
    axios.get('/search', { params: { searchTerm: this.state.searchTerm } })
      .then(() => {
        console.log('successfully got filtered search results by tag');
      })
      .catch((err) => {
        console.log('error on search', err);
      });
  }

  render() {
    return (
      <form>
        <FormControl
          id="searchTerm"
          type="text"
          label="search term"
          placeholder="search tags"
        />
        <Button onClick={this.onSubmit}> Search </Button>
      </form>
    );
  }
}

export default TagSearch;
