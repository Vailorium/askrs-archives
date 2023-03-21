/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Accordion, ButtonGroup, Card, Col, Row, Spinner, ToggleButton,
} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';

import InfiniteScroll from 'react-infinite-scroller';
import api from '../../api/api';
import config from '../../config';

import { ArticlesModel } from '../../models';
import { useGetGameDataQuery } from '../../services/FEHDataApi';
import HeroName from '../common/Hero/HeroName';
import HeroFull from '../common/Hero/HeroFull';
import Article from './Article/Article';
import HeroTitle from '../common/Hero/HeroTitle';
import HeroDescription from '../common/Hero/HeroDescription';
import SkillName from '../common/Skill/SkillName';
import HeroOfTheDay from './HoTD/HeroOfTheDay';
import DailyReset from './DailyReset/DailyReset';

function Home() {
  const [dailyHeroID, setDailyHeroID] = useState(-1);

  useEffect(() => {
    (async () => {
      const { heroID } = await api.getHomepageData();
      setDailyHeroID(heroID);
    })();
  }, []);

  return (
    <Container style={{ paddingBottom: '20px', paddingTop: '20px' }}>
      <Row>
        <Col md="6">
          <HeroOfTheDay dailyHeroID={dailyHeroID} />
        </Col>
        <Col md="6">
          <DailyReset />
        </Col>
      </Row>
    </Container>
  );
}
// // TODO: this code is cancerous fix it
// class Home extends React.Component<{}, { articles: ArticlesModel[], hasMoreItems: boolean }> {
//   constructor(props: {}) {
//     super(props);
//     this.loadItems = this.loadItems.bind(this);

//     this.state = {
//       hasMoreItems: true,
//       articles: [],
//     };
//   }

//   loadItems(page: number) {
//     const pageIncrement = page * config.articleScrollLength;
//     let maxCount = 0;
//     if (pageIncrement > config.articles.length) {
//       maxCount = config.articles.length;
//       this.setState({ hasMoreItems: false });
//     } else {
//       maxCount = pageIncrement;
//     }
//     const { articles } = this.state;
//     for (let i = (page - 1) * config.articleScrollLength; i < maxCount; i += 1) {
//       articles.push(config.articles[i]);
//     }
//     this.setState({ articles });
//   }

//   render() {
//     const elements: JSX.Element[] = [];
//     const { articles, hasMoreItems } = this.state;
//     articles.map((article, i) => elements.push(
//       // eslint-disable-next-line react/no-array-index-key
//       <Article key={`article-${i}`} article={article} />,
//     ));

//     return (
//       <>
//         <Container style={{ paddingBottom: '20px', paddingTop: '20px' }}>
//           <InfiniteScroll
//             pageStart={0}
//             loadMore={this.loadItems}
//             hasMore={hasMoreItems}
//             loader={<div className="loader" key={0}>Loading ...</div>}
//           >
//             {elements}
//           </InfiniteScroll>
//         </Container>
//       </>
//     );
//   }
// }
export default Home;
