import React from 'react';


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
    this.setState({
      e.target.id: e.target.value,
    })
  }

  render() {
    return (
      <form>
        <FormGroup>
        <ControlLabel> Title </ControlLabel>
          <FormControl
            type="text"
            id="title"
            value="this.state.title"
            placeholder="enter title"
            onChange={this.handleChange}
          />
          <FormControl
            type="text"
            id="author"
            value={this.state.author}
            placeholder="who u?"
            onChange={this.handleChange}
          />
          <FormControl
            type="text"
            value="body"
            placeholder="write something cool..."
            onChange={this.onChange}
          />
        </FormGroup>
      </form>
    );
  }
}

export default ArticleForm;
