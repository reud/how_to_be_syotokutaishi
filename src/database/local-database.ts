import { Database, DataDocument, UserDocument } from './model';
import firebase from '../plugins/firebase';

const problems: DataDocument[] = [
  {
    level: 1,
    title: 'ゴールデンボンバー「キスミー」MV',
    id: '8UP7V0UGR4c',
    problems: [
      {
        statement: 'どちらかの曲のタイトルは「キスミー」',
        collectAnswer: true,
      },
      {
        statement: 'どちらかの曲の作曲者にゴールデンポンバー',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 1,
    title: 'ゴールデンボンバー「僕クエスト」MV',
    id: 'NyUTYwZe_l4',
    problems: [
      {
        statement: 'この曲のタイトルは「僕クエスト」',
        collectAnswer: true,
      },
      {
        statement: 'どちらかの曲の作曲者にゴールデンポンバー',
        collectAnswer: false,
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

  async updateUserData(
    uid: string,
    newRate: number,
    solvedNum: number,
  ): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).update({
      exp: newRate,
      solvedNum,
    });
    return this.fetchUserData(uid);
  }

  async insertUserData(uid: string): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).set({
      uid,
      exp: 0,
      solvedNum: 0,
    });
    return this.fetchUserData(uid);
  }
}

export const CreateLocalRepository = (): Database => {
  return new LocalDatabase();
};
