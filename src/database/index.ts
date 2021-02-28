import firebase from '../plugins/firebase';
import { DataDocument, UserDocument } from './model';

export const selectCategories = async () => {
  const db = firebase.firestore();
  return db.collection('categories');
};

export const isCreatedUser = async (uid: string) => {
  const db = firebase.firestore();
  const user = await db.collection('users').doc(uid).get();
  return user.exists;
};

export const selectCategory = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`);
};

export const selectRoomDocuments = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`).collection('rooms');
};
export const selectRoomDocument = async (cid: number, docId: string) => {
  const db = firebase.firestore();
  return db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId);
};

export const selectUserDocument = async (id: string) => {
  const db = firebase.firestore();
  return db.collection('users').doc(id);
};

export const updateRoomDocumentWhenJoined = async (
  cid: number,
  docId: string,
  UserDocument: UserDocument,
) => {
  const db = firebase.firestore();
  await db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(UserDocument),
    });
};

export const updateRoomDocumentWhenLeaved = async (
  cid: number,
  docId: string,
  UserDocument: UserDocument,
) => {
  const db = firebase.firestore();
  await db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId)
    .update({
      users: firebase.firestore.FieldValue.arrayRemove(UserDocument),
    });
};

export const insertUser = async (userDoc: UserDocument) => {
  const db = firebase.firestore();
  const docRef = db.collection('users').doc(userDoc.uid);
  await docRef.set(userDoc);
};
