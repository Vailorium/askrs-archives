import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import { ArticlesModel } from '../../../models';

interface ArticleProps{
  article: ArticlesModel,
}

class Article extends React.Component<ArticleProps, { image?: string }> {
  constructor(props: ArticleProps) {
    super(props);
    const { article } = this.props;
    this.state = { image: `${process.env.REACT_APP_CDN_URL}/articles/${article.img}` };
  }

  render() {
    const { article } = this.props;
    const { image } = this.state;
    return (
      <Card
        border="dark"
        style={{
          maxWidth: '800px',
        }}
        className="mx-auto mb-3"
      >
        <Card.Header>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle>
            Posted:&nbsp;
            {new Date(parseInt(article.timestamp, 10)).toLocaleString()}
          </Card.Subtitle>
        </Card.Header>
        <Card.Img src={image} />
        <Card.Body>
          <ReactMarkdown>
            hi
            {/* {article.text} */}
          </ReactMarkdown>
        </Card.Body>
      </Card>
    );
  }
}
export default Article;
