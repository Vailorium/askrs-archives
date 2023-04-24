import mongoose, { Connection } from 'mongoose';
import logger from '../logger';

class DatabaseService {
  private dbURI: string = process.env.NODE_ENV === 'development'
    ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`
    : `mongodb+srv://${process.env.DB_HOST}/`;

  private connection: Connection;

  constructor() {
    this.connection = mongoose.connection;

    this.connection.on('connected', () => {
      logger.info(`Mongoose connected to ${this.dbURI}`);
    });

    this.connection.on('error', (err: Error) => {
      logger.error(`Mongoose connection error: ${err}`);
    });

    this.connection.on('disconnected', () => {
      logger.error('Mongoose disconnected');
    });

    // DB_USER and DB_PASS are undefined in dev
    mongoose.connect(
      this.dbURI,
      {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        autoIndex: process.env.NODE_ENV === 'development',
        authSource: 'admin',
        tls: process.env.NODE_ENV !== 'development',
        dbName: process.env.DB_NAME,
      },
    );
  }

  public initialize = async () => mongoose.connect(
    this.dbURI,
    {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      autoIndex: process.env.NODE_ENV === 'development',
      dbName: process.env.DB_NAME,
    },
  )
}

export default new DatabaseService();
