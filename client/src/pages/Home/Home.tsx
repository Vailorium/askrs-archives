import React from 'react';
import {
  Col, Row,
} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';

import HeroOfTheDay from './HoTD/HeroOfTheDay';
import DailyReset from './DailyReset/DailyReset';

const Home: React.FC<{}> = () => (
  <Container style={{ paddingBottom: '20px', paddingTop: '20px' }}>
    <Row>
      <Col md="6">
        <HeroOfTheDay />
      </Col>
      <Col md="6">
        <DailyReset />
      </Col>
    </Row>
  </Container>
);
export default Home;
