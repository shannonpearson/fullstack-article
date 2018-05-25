/* eslint-disable react/prop-types */

import React from 'react';
import { Card } from 'antd';


const { Component } = React;

const cardStyle = {
  border: '1px solid black',
  width: '80%',
  margin: '10px',
};

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandView: false,
    };
  }

  render() {
    const { article } = this.props;
    return (
      <Card title={article.title} style={cardStyle}>
        {article.body}
      </Card>
    );
  }
}

export default ArticlePreview;
