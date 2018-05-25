/* eslint-disable react/prop-types */

import React from 'react';
import { Panel, Collapse, Label } from 'react-bootstrap';

const { Component } = React;
const {
  Heading, Title, Body, Footer,
} = Panel;

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
      <Panel bsStyle="info">
        <Heading>
          <Title componentClass="h3"> { article.title } </Title>
        </Heading>
        <Body> { article.body} </Body>
        <Footer>
          { article.tags.map(tag => (<Label key={tag} bsStyle="info" style={{ marginRight: '5' }}> {tag} </Label>))
            }
        </Footer>
      </Panel>
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
