import React from 'react';

import Container from 'react-bootstrap/Container';

import InfiniteScroll from 'react-infinite-scroller';
import config from '../../config';

import { ArticlesModel } from '../../models';
import Article from './Article/Article';

// TODO: this code is cancerous fix it
class Home extends React.Component<{}, { articles: ArticlesModel[], hasMoreItems: boolean }> {
  constructor(props: {}) {
    super(props);
    this.loadItems = this.loadItems.bind(this);

    this.state = {
      hasMoreItems: true,
      articles: [],
    };
  }

  loadItems(page: number) {
    const pageIncrement = page * config.articleScrollLength;
    let maxCount = 0;
    if (pageIncrement > config.articles.length) {
      maxCount = config.articles.length;
      this.setState({ hasMoreItems: false });
    } else {
      maxCount = pageIncrement;
    }
    const { articles } = this.state;
    for (let i = (page - 1) * config.articleScrollLength; i < maxCount; i += 1) {
      articles.push(config.articles[i]);
    }
    this.setState({ articles });
  }

  render() {
    const elements: JSX.Element[] = [];
    const { articles, hasMoreItems } = this.state;
    articles.map((article) => elements.push(
      <Article key={article.id} article={article} />,
    ));

    return (
      <>
        <Container style={{ paddingBottom: '20px', paddingTop: '20px' }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems}
            hasMore={hasMoreItems}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {elements}
          </InfiniteScroll>
        </Container>
      </>
    );
  }
}
export default Home;
