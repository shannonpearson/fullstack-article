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
      loading: false,
      title: this.props.currentArticle ? this.props.currentArticle.title : '',
      author: this.props.currentArticle ? this.props.currentArticle.author : '',
      body: this.props.currentArticle ? this.props.currentArticle.body : '',
      tags: [],
      titleValid: null,
      bodyValid: null,
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleShow() {
    this.setState({
      show: !this.state.show, titleValid: null, bodyValid: null, loading: false,
    });
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
    if (this.state.title.length > 0 && this.state.body.length > 0) {
      cb();
    } else {
      this.setState({
        titleValid: this.state.title.length > 0,
        bodyValid: this.state.body.length > 0,
      });
    }
  }

  saveNew() {
    this.validateForm(() => {
      this.setState({ loading: 'Adding article...' });
      const newArticle = {
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        tags: this.state.tags,
      };
      this.props.addArticle(newArticle, () => {
        this.setState({
          title: '', author: '', body: '', tags: [],
        });
        this.toggleShow();
      });
    });
  }

  saveChange() {
    this.validateForm(() => {
      this.setState({ loading: 'Saving changes...' });
      const data = {
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        lastUpdate: new Date(),
        tags: this.state.tags,
      };
      this.props.updateArticle(this.props.currentArticle._id, data, () => {
        this.toggleShow();
      });
    });
  }

  handleDelete() {
    this.setState({ loading: 'Deleting article...' }, () => {
      this.props.deleteArticle(this.props.currentArticle._id, () => {
        this.toggleShow();
      });
    });
  }

  render() {
    const confirmDelete = (
      <Popover id="confirm-delete-popover" title="Are you sure?">
        <Button onClick={this.handleDelete} bsStyle="danger"> Delete </Button>
      </Popover>
    );

    return (

      <div>
        <Button onClick={this.toggleShow} bsSize="small"> { this.props.currentArticle ? 'Edit/Delete' : 'New' } </Button>

        <Modal show={this.state.show} onHide={this.toggleShow}>
          <Header closeButton>
            <Title>
              {this.props.currentArticle ? 'Edit Article' : 'Write New Article'}
              {this.state.loading && <Alert bsStyle="info"> {this.state.loading} </Alert>}
            </Title>
          </Header>
          <Body>
            {this.props.error &&
              <Alert bsStyle="warning" style={{ width: '90%', margin: 'auto' }}> Error {this.props.error} article </Alert>
            }
            <ArticleForm
              currentArticle={this.props.currentArticle}
              handleChange={this.handleFormChange}
              validTitle={this.state.titleValid}
              validBody={this.state.bodyValid}
            />
          </Body>
          <Footer>
            <Button onClick={this.props.currentArticle ? this.saveChange : this.saveNew}> { 'Save' } </Button>
            <Button onClick={this.toggleShow}> Cancel </Button>
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
  error: state.search.error,
});

export default connect(mapStateToProps, { addArticle, deleteArticle, updateArticle })(ArticleModal);
