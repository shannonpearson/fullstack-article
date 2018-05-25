/* eslint-disable react/prop-types, class-methods-use-this */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { getArticles } from '../actions/index';
import ArticleForm from './ArticleForm';

const { Component } = React;
const {
  Header, Title, Body, Footer,
} = Modal;

class ArticleModal extends Component {
  constructor(props) { // props should include article _id
    super(props);
    this.state = {
      show: false,
      title: this.props.currentArticle ? this.props.currentArticle.title : '',
      author: this.props.currentArticle ? this.props.currentArticle.author : '',
      body: this.props.currentArticle ? this.props.currentArticle.body : '',
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }
  // could just do one toggle show method?
  handleShow() {
    this.setState({ show: true });
  }

  handleFormChange(e) {
    console.log('passed to modal', e.target);
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  saveNew() {
    // axios request to send post request to save new article
    const newArticle = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
    };
    axios.post('/new', { article: newArticle })
      .then(() => {
        this.props.getArticles();
      })
      .catch((err) => {
        console.log('error getting articles after saving new', err);
      });
  }

  saveChange() {
    // axios request to send patch request to save changes to article
    axios.patch('/edit', {
      id: this.props.currentArticle._id,
      data: { title: this.state.title, author: this.state.author, body: this.state.body },
    })
      .then((response) => {
        // gotta update the store again
        // guess we need some match dispatch to props...
        this.props.getArticles();
      })
      .catch((error) => {
        console.log('error updating in client');
      });
  }

  render() {
    console.log('modal current article', this.props.currentArticle);
    return (

      <div>
        <Button onClick={this.handleShow}> { this.props.currentArticle ? 'Edit' : 'New' } </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Header closeButton>
            <Title>
              {this.props.currentArticle ? 'Edit Article' : 'Write New Article'}
            </Title>
          </Header>
          <Body>
            <ArticleForm currentArticle={this.props.currentArticle} handleChange={this.handleFormChange} />
          </Body>
          <Footer>
            <Button onClick={this.props.currentArticle ? this.saveChange : this.saveNew}> { this.props.currentArticle ? 'Save' : 'New' } </Button>
            <Button onClick={this.handleClose}> Cancel </Button>
            {this.props.currentArticle && (
              <Button> Delete Article </Button>
            )}
          </Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { getArticles })(ArticleModal);
