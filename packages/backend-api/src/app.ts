import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import { Route } from './types/routes.type';
import errorMiddleware from './middlewares/error.middleware';
import corsMiddleware from './middlewares/cors.middleware';
import {
  sequelize,
  initModels,
  initAssociation,
} from './db/models/index.model';

class App {
  public app: express.Application;

  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    App.initializeSequelize();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  public static async initializeSequelize() {
    await initModels(sequelize);
    await initAssociation();
  }

  private initializeMiddlewares() {
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use(logger('dev'));
    this.app.use(corsMiddleware());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
