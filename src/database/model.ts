import { CreateLocalRepository } from './local-database';

export interface Database {
  fetchAllProblems(): Promise<DataDocument[]>;
  fetchUserData(uid: string): Promise<UserDocument>;
  updateUserData(uid: string, newRate: number): Promise<UserDocument>;
  insertUserData(uid: string): Promise<UserDocument>;
}

export interface UserDocument {
  uid: string;
  sum: number;
}

export interface DataDocument {
  level: number;
  title: string;
  url: string;
  problem: Problem[];
}

export interface Problem {
  statement: string;
  answer: boolean;
}

export const NewDatabase = (): Database => {
  // TODO: 後でfirebaseの対応をする。
  return CreateLocalRepository();
};
