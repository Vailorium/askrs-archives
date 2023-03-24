import 'jest';
import SystemController from '../src/controllers/SystemController';

const express = require('express');
const supertest = require('supertest');

const app = express();
app.use('/', new SystemController().router);

const request = supertest(app);

test('Test ping endpoint', async () => {
  const res = await request.get('/ping');
  expect(res.text).toEqual('Pong!');
});
export {};
