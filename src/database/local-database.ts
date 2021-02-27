import { Database, DataDocument, Problem, UserDocument } from './model';
import firebase from '../plugins/firebase';

const mockRate = 300;

const problems: DataDocument[] = [
  {
    level: 1,
    title: 'ゴールデンボンバー「キスミー」MV',
    url: 'https://youtu.be/9LFHsTvnPyo',
    problem: [
      {
        statement: 'どちらかの曲のタイトルは「キスミー」',
        answer: true,
      },
      {
        statement: 'どちらかの曲の作曲者にゴールデンポンバー',
        answer: false,
      },
    ],
  },
  {
    level: 1,
    title: 'ゴールデンボンバー「僕クエスト」MV',
    url: 'https://youtu.be/jSaRFcbgCJs',
    problem: [
      {
        statement: 'この曲のタイトルは「僕クエスト」',
        answer: true,
      },
      {
        statement: 'どちらかの曲の作曲者にゴールデンポンバー',
        answer: false,
      },
    ],
  },
];

class LocalDatabase implements Database {
  fetchAllProblems(): Promise<DataDocument[]> {
    return Promise.resolve(problems);
  }

  async fetchUserData(uid: string): Promise<UserDocument> {
    const db = firebase.firestore();
    const docRef = await db.collection('users').doc(uid).get();
    return docRef.data() as UserDocument;
  }

  async updateUserData(uid: string, newRate: number): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).update({
      sum: newRate,
    });
    return this.fetchUserData(uid);
  }

  async insertUserData(uid: string): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).set({
      uid,
      sum: 0,
    });
    return this.fetchUserData(uid);
  }
}

export const CreateLocalRepository = (): Database => {
  return new LocalDatabase();
};
