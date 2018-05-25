/* eslint-disable react/prop-types */

import React from 'react';
import { Navbar } from 'react-bootstrap';

const { Component } = React;
const { Header, Brand } = Navbar;

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   expandView: false,
    };
  }

  render() {
    const { article } = this.props;
    return (
        <Navbar>
            <Header>
                <Brand>
                    holla
                </Brand>
            </Header>
        </Navbar>
    );
    // (
    //   <Card title={article.title}>
    //     {article.body}
    //     {article.tags.map(tag => (
    //       <Label> <Icon name="tag" /> { tag } </Label>
    //     ))}
    //   </Card>
    // );
  }
}

export default ArticlePreview;
