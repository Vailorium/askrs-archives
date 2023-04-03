import mongoose, { Connection } from 'mongoose';
import HeroBuildModel from '../interfaces/HeroBuildModel';
import IHeroBuild from '../interfaces/IHeroBuild';
import logger from '../logger';

class DatabaseService {
  private dbURI: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;

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
        dbName: process.env.DB_NAME,
      },
    );
  }

  getHeroBuildByBuildId = async (buildId: string): Promise<IHeroBuild> => {
    const build = await HeroBuildModel.findOne({ _id: buildId }).exec();

    if (!build) {
      throw new Error('Build not found');
    }
    return build;
  }

  getHeroBuildsByUid = async (uid: string): Promise<IHeroBuild[]> => {
    const builds = await HeroBuildModel.find({ uid }).exec();
    return builds;
  }

  getHeroBuildsByHeroIdTag = async (heroIdTag: string): Promise<IHeroBuild[]> => {
    const builds = await HeroBuildModel.find({ heroIdTag }).exec();
    return builds;
  }

  createHeroBuild = async (buildData: IHeroBuild): Promise<IHeroBuild> => {
    const build = new HeroBuildModel(buildData);
    return build.save();
  }

  updateHeroBuild = async (buildId: string, buildData: IHeroBuild): Promise<IHeroBuild | null> => {
    const updatedBuild = HeroBuildModel.findOneAndUpdate(
      { _id: buildId }, buildData, { new: true },
    ).exec();
    return updatedBuild;
  }

  deleteHeroBuild = async (buildId: string): Promise<boolean> => {
    const result = await HeroBuildModel.deleteOne({ _id: buildId }).exec();
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }
}

export default new DatabaseService();
