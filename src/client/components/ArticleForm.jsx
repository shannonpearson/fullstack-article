/* eslint-disable react/prop-types */

import React from 'react';
import { without } from 'lodash';

import { form, FormGroup, FormControl, ControlLabel, HelpBlock, Panel, Label, Button } from 'react-bootstrap';

const { Component } = React;

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentArticle ? this.props.currentArticle.title : '',
      author: this.props.currentArticle ? this.props.currentArticle.author : '',
      body: this.props.currentArticle ? this.props.currentArticle.body : '',
      tags: this.props.currentArticle ? this.props.currentArticle.tags : [],
      newTag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  handleChange(e) {
    e.persist();
    const update = { [e.target.id]: e.target.value };
    this.setState(update, () => {
      if (e.target.id !== 'newTag') {
        this.props.handleChange(update)
      }

      // const {
      //   title,
      //   author,
      //   body,
      //   tags,
      // } = this.state;
      // this.props.handleChange({
      //   title,
      //   author,
      //   body,
      //   tags,
      // });
    });
  }

  handleAddTag() {
    if (this.state.newTag.length > 0) {
      this.setState({
        tags: this.state.tags.concat([this.state.newTag.toLowerCase()]),
        newTag: '',
      }, () => {
        this.props.handleChange({ tags: this.state.tags });
      });
    }
  }

  deleteTag(e) {
    this.setState({
      tags: without(this.state.tags, e.target.id),
    }, () => {
      const {
        title,
        author,
        body,
        tags,
      } = this.state;
      this.props.handleChange({
        title,
        author,
        body,
        tags,
      });
    });
  }

  render() {
    const titleValidation = () => {
      switch (this.props.validTitle) {
        case true:
          return 'success';
        case false:
          return 'error';
        default:
          return null;
      }
    };

    const bodyValidation = () => {
      switch (this.props.validBody) {
        case true:
          return 'success';
        case false:
          return 'error';
        default:
          return null;
      }
    }

    return (
      <form>
        <FormGroup>
          <FormGroup validationState={titleValidation()}>
            <ControlLabel> Title </ControlLabel>
            <FormControl
              type="text"
              id="title"
              value={this.state.title}
              placeholder="enter title"
              onChange={this.handleChange}
              style={{ marginBottom: 5 }}
            />
            {titleValidation() === 'error' && (<HelpBlock> Title is required </HelpBlock>)}
          </FormGroup>
          <ControlLabel> Author </ControlLabel>
          <FormControl
            type="text"
            id="author"
            value={this.state.author}
            placeholder="who u?"
            onChange={this.handleChange}
            style={{ marginBottom: 5 }}
          />
          <FormGroup validationState={bodyValidation()}>
            <ControlLabel> Article Body </ControlLabel>
            <FormControl
              type="text"
              id="body"
              componentClass="textarea"
              value={this.state.body}
              placeholder="write something cool..."
              onChange={this.handleChange}
              style={{ marginBottom: 5 }}
            />
            {bodyValidation() === 'error' && (<HelpBlock> Article body is required </HelpBlock>)}
          </FormGroup>
          <ControlLabel> Tags </ControlLabel>
          <FormControl
            type="text"
            id="newTag"
            value={this.state.newTag}
            placeholder="enter tag"
            onChange={this.handleChange}
            style={{ marginBottom: 5 }}
          />
          <Button onClick={this.handleAddTag}> Add Tag </Button>
        </FormGroup>
        <Panel>
          <Panel.Body>
            {this.state.tags.map(tag => (
              <Label key={tag} style={{ marginRight: 10 }}>
                {tag} <span tabIndex={Math.floor(Math.random() * 100)} id={tag} role="button" onClick={this.deleteTag} onKeyPress={null} style={{ color: 'red', cursor: 'pointer' }}>x</span>
              </Label>
            ))}
          </Panel.Body>
        </Panel>
      </form>
    );
  }
}

export default ArticleForm;
