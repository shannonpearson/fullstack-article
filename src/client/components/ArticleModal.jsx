/* eslint-disable react/prop-types, class-methods-use-this, no-underscore-dangle */
/* eslint-disable no-prototype-builtins */

import React from 'react';
import { connect } from 'react-redux';

import { Modal, Button, Alert, OverlayTrigger, Popover } from 'react-bootstrap';

import { addArticle, deleteArticle, updateArticle } from '../actions/index';
import ArticleForm from './ArticleForm';

const { Component } = React;
const {
  Header, Title, Body, Footer,
} = Modal;

class ArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: this.props.currentArticle ? this.props.currentArticle.title : '',
      author: this.props.currentArticle ? this.props.currentArticle.author : '',
      body: this.props.currentArticle ? this.props.currentArticle.body : '',
      tags: [],
      titleValid: null,
      bodyValid: null,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }
  // could just do one toggle show method?
  handleShow() {
    this.setState({ show: true, titleValid: null, bodyValid: null });
  }

  handleFormChange(obj) {
    const update = {
      ...obj,
    };
    if (obj.hasOwnProperty('title')) {
      update.titleValid = obj.title.length > 0;
    }
    if (obj.hasOwnProperty('body')) {
      update.bodyValid = obj.body.length > 0;
    }
    this.setState(update);
  }

  validateForm(cb) {
    if (this.state.titleValid && this.state.bodyValid) {
      cb();
    } else {
      this.setState({
        titleValid: this.state.title.length > 0,
        bodyValid: this.state.body.length > 0,
      });
      console.log('missing fields!');
    }
  }

  saveNew() {
    this.validateForm(() => {
      const newArticle = {
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        tags: this.state.tags,
      };
      this.props.addArticle(newArticle, () => {
        this.handleClose();
      });
    });
  }

  saveChange() {
    this.validateForm(() => {
      const data = {
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        lastUpdate: new Date(),
        tags: this.state.tags,
      };
      this.props.updateArticle(this.props.currentArticle._id, data, () => {
        this.handleClose();
      });
    });
  }

  handleDelete() {
    this.props.deleteArticle(this.props.currentArticle._id, () => {
      this.handleClose();
    });
  }

  render() {
    const alert = () => {
      if (this.props.error === 'add') {
        return (
          <Alert bsStyle="warning" style={{ width: '90%', margin: 'auto' }}> Error creating article </Alert>
        );
      } else if (this.props.error === 'delete') {
        return (
          <Alert bsStyle="warning" style={{ width: '90%', margin: 'auto' }}> Error deleting article </Alert>
        );
      } // else error should be error updating
      return (
        <Alert bsStyle="warning" style={{ width: '90%', margin: 'auto' }}> Error updating article </Alert>
      );
    };

    const confirmDelete = (
      <Popover id="confirm-delete-popover" title="Are you sure?">
        <Button onClick={this.handleDelete} bsStyle="danger"> Delete </Button>
      </Popover>
    );

    return (

      <div>
        <Button onClick={this.handleShow} bsSize="small"> { this.props.currentArticle ? 'Edit/Delete' : 'New' } </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Header closeButton>
            <Title>
              {this.props.currentArticle ? 'Edit Article' : 'Write New Article'}
            </Title>
          </Header>
          <Body>
            { this.props.error && alert() }
            <ArticleForm
              currentArticle={this.props.currentArticle}
              handleChange={this.handleFormChange}
              validTitle={this.state.titleValid}
              validBody={this.state.bodyValid}
            />
          </Body>
          <Footer>
            <Button onClick={this.props.currentArticle ? this.saveChange : this.saveNew}> { 'Save' } </Button>
            <Button onClick={this.handleClose}> Cancel </Button>
            {this.props.currentArticle && (
              <OverlayTrigger trigger="click" placement="top" overlay={confirmDelete}>
                <Button> Delete Article </Button>
              </OverlayTrigger>
            )}
          </Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.fetch.error,
});

export default connect(mapStateToProps, { addArticle, deleteArticle, updateArticle })(ArticleModal);
