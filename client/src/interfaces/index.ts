/* eslint-disable import/prefer-default-export */
export enum GenshinServer {
  asia = 0,
  europe = 1,
  america = 2,
}

export interface Dictionary<T> {
  [key: string]: T;
}

export * from './GenshinData';
