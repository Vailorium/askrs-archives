/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function DailyReset() {
  const [milliseconds, setMilliseconds] = useState(
    () => {
      const dayInMS = 86400000;
      const sevenHoursInMS = 25200000;
      const timeTodayInMS = new Date().getTime() % dayInMS;
      let timeToSevenAM = sevenHoursInMS - timeTodayInMS;
      if (timeToSevenAM < 0) {
        timeToSevenAM += dayInMS;
      }
      return timeToSevenAM;
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds((p) => p - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (milliseconds < 0) {
    useEffect(() => {
      // inshallah this code will run - i have not tested it
      setMilliseconds(8.64e+7);
    }, [milliseconds]);
  }

  const seconds = (milliseconds / 1000) % 60 | 0;
  const minutes = (milliseconds / 60000) % 60 | 0;
  const hours = milliseconds / 3600000 | 0;

  return (
    <Card>
      <Card.Header>Time until Next Reset</Card.Header>
      <Card.Body>
        <h2>
          {(`0${hours}`).slice(-2)}
          :
          {(`0${minutes}`).slice(-2)}
          :
          {(`0${seconds}`).slice(-2)}
        </h2>
      </Card.Body>
    </Card>
  );
}
export default DailyReset;
