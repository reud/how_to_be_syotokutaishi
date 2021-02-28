import { Database, DataDocument, UserDocument } from './model';
import firebase from '../plugins/firebase';

const dataDocuments: DataDocument[] = [
  {
    level: 1,
    title: '眼鏡男',
    id: '_nGXWE05Fyg',
    problems: [
      {
        statement: '音楽で大事なものはハートか?',
        collectAnswer: true,
      },
      {
        statement: '心が籠もっていなくても面白ければよいか?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 1,
    title: '眼鏡していない男',
    id: 'EQH_vsaW3g0',
    problems: [
      {
        statement:
          '眼鏡していない男にとっての美味しいラーメン二郎は野猿街道店か?',
        collectAnswer: false,
      },
      {
        statement: '小岩店のラーメン二郎は脂っこいか？',
        collectAnswer: true,
      },
    ],
  },
  // 以下，複数レベルの問題をコピペで水増ししました TODO あとでなんとかする
  {
    level: 2,
    title: '画面収録 2021 02 28 14 31 58',
    id: 'zN80wD2O7P4',
    problems: [
      {
        statement: '選んだソースコードはPythonか?',
        collectAnswer: true,
      },
      {
        statement: '言語はHaskellか?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 2,
    title: 'taka_rock',
    id: '9MDUym57oZo',
    problems: [
      {
        statement: '並行処理とはインターフェイスのようなものか?',
        collectAnswer: true,
      },
      {
        statement: '並列処理とは物理的に同時に行っていなくても良いか?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 3,
    title: 'nvme',
    id: 'lP9btIZOF8g',
    problems: [
      {
        statement: 'nvmeとはSSDのことを指す?',
        collectAnswer: true,
      },
      {
        statement: 'mvnoとは国際的な組織の名前であるか?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 3,
    title: 'kabadi',
    id: 'gRbL9FfQWg8',
    problems: [
      {
        statement: 'オフェンスはレーダーという?',
        collectAnswer: true,
      },
      {
        statement: 'アンディは声を出さないといけないか?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 1,
    title: 'kannai',
    id: 'MSsvj6TNZjc',
    problems: [
      {
        statement: 'ラーメン二郎関内店の麺はシュポシュポしている?',
        collectAnswer: true,
      },
      {
        statement: '乳化と醤油の混ざり具合で有名な二郎は野猿街道店である?',
        collectAnswer: false,
      },
    ],
  },
  {
    level: 1,
    title: 'アイマスク',
    id: 'eEntqlnCdy0',
    problems: [
      {
        statement: '商品紹介していたものはアイマスクであるか？',
        collectAnswer: true,
      },
      {
        statement: 'アイマスクに対応しているUSBはAか？',
        collectAnswer: false,
      },
    ],
  },
];

class LocalDatabase implements Database {
  fetchAllDataDocuments(): Promise<DataDocument[]> {
    return Promise.resolve(dataDocuments);
  }

  async fetchUserData(uid: string): Promise<UserDocument> {
    const db = firebase.firestore();
    const docRef = await db.collection('users').doc(uid).get();
    return docRef.data() as UserDocument;
  }

  async updateUserData(
    uid: string,
    newRate: number,
    earnExp: number,
  ): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).update({
      exp: newRate,
      earnExp,
    });
    return this.fetchUserData(uid);
  }

  async insertUserData(uid: string): Promise<UserDocument> {
    const db = firebase.firestore();
    await db.collection('users').doc(uid).set({
      uid,
      exp: 0,
      earnExp: 0,
    });
    return this.fetchUserData(uid);
  }
}

export const CreateLocalRepository = (): Database => {
  return new LocalDatabase();
};
