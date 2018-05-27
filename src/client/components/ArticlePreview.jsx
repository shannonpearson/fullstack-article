/* eslint-disable react/prop-types */

import React from 'react';
import { Panel, Label } from 'react-bootstrap';

import ArticleModal from './ArticleModal';

const { Component } = React;
const {
  Heading, Title, Body, Footer, Collapse,
} = Panel;

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   expandView: false,
    };
  }

  // componentDidMount() {
  //   axios.get('/all').then((response) => {
  //     // console.log('success response', response);
  //   }).catch((err) => {
  //     console.log('error', err);
  //   });
  // }

  render() {
    const { article } = this.props;
    return (
      <Panel bsStyle="success" defaultExpanded={false} style={{ width: '80%', margin: 'auto', marginTop: 50 }}>
        <Heading>
          <Title componentClass="h3" toggle> { article.title } </Title>
          <div> { article.author } </div>
        </Heading>
        <Collapse>
          <Body>
            { article.body }
            <ArticleModal currentArticle={article} />
          </Body>
          <Footer>
            { article.tags.map(tag => (<Label key={tag} bsStyle="info" style={{ marginRight: 5 }}> {tag} </Label>))
              }
          </Footer>
        </Collapse>
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
