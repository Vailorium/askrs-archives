import App from './app';
import GameDataController from './controllers/DataController';
import HomeController from './controllers/HomeController';

const app = new App(
  [
    new HomeController(),
    new GameDataController(),
  ],
  8080,
);
export default app;

app.listen();
