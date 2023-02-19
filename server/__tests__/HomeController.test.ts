import 'jest';
import HomeController from '../src/controllers/HomeController';

const express = require('express');
const supertest = require('supertest');

const app = express();
app.use('/', new HomeController().router);

const request = supertest(app);

test('Test get home domains', async () => {
  const res = await request.get('/home?lang=english');
  console.log(res.body.domains);
  expect(res.body.domains.characters).toBeInstanceOf(Array);
  expect(res.body.domains.weapons).toBeInstanceOf(Array);
});
export {};