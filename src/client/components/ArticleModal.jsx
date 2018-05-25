import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const { Component } = React;
const { Header, Title, Body, Footer } = Modal;

class ArticleModal extends Component {
  constructor(props) { // props should include article _id
    super(props);
    this.state = {
      show: false,
      title: '', // this.props.article.title...
      author: '',
      body: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.saveChange = this.saveChange.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }
  // could just do one toggle show method?
  handleOpen() {
    this.setState({ show: true });
  }

  saveNew() {
    // axios request to send post request to save new article
  }

  saveChange() {
    // axios request to send patch request to save changes to article
  }

  render() {
    return (

      <Button onClick={this.handleShow}> { this.currentArticle ? 'Edit' : 'New' } </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Header closeButton> 
          <Title>
            {this.props.currentArticle ? 'Edit Article' : 'Write New Article'} 
          </Title>
        </Header>
        <Body>
          This is a modal body
        </Body>
        <Footer>
          <Button onClick={this.props.currentArticle ? this.saveChange : this.saveNew}> Save </Button>
          <Button onClick={this.handleClose}> Cancel </Button>
          {this.props.currentArticle && (
            <Button> Delete Article </Button>
          )}
        </Footer>
      </Modal>
    );
  }

}

export default ArticleModal;
