import React from 'react';

import { form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const { Component } = React;

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('form change');
    // this.setState({
    // e.target.id: e.target.value,
    // })
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel> Title </ControlLabel>
          <FormControl
            type="text"
            id="title"
            value={this.state.title}
            placeholder="enter title"
            onChange={this.handleChange}
          />
          <ControlLabel> Author </ControlLabel>
          <FormControl
            type="text"
            id="author"
            value={this.state.author}
            placeholder="who u?"
            onChange={this.handleChange}
          />
          <ControlLabel> Article Body </ControlLabel>
          <FormControl
            type="text"
            value={this.state.body}
            placeholder="write something cool..."
            onChange={this.onChange}
          />
        </FormGroup>
      </form>
    );
  }
}

export default ArticleForm;
