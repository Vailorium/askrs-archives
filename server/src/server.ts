import App from './app';
import AuthController from './controllers/AuthController';
import HeroBuildController from './controllers/HeroBuildController';
import SystemController from './controllers/SystemController';
import RequestLoggerMiddleware from './middleware/RequestLoggerMiddleware';

const app = new App(
  [
    new SystemController(),
    new AuthController(),
    new HeroBuildController(),
  ],
  [
    new RequestLoggerMiddleware(),
  ],
  8080,
);
export default app;

app.listen();
