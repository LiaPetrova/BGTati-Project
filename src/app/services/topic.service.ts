import { Injectable } from '@angular/core';
import {  deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc} from '@angular/fire/firestore';
import { IComment, ITopic } from '../core/interfaces';
import { AuthService } from './auth.service';
import { addDoc, collection, limit, orderBy, query, where, arrayUnion, arrayRemove, startAt, startAfter, endBefore, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TopicService  {


  currentUser$ = this.authService.currentUser$;
  topicRef = collection(this.fs, 'topics');
  commentRef = collection(this.fs, 'comments');

  constructor(
    private authService: AuthService, private fs: Firestore) { }


  AddTopic(topic: ITopic) {
    const res = addDoc(this.topicRef, topic);
    return res;
  }

  UpdateTopic(updatedTopic: any, oldTopicId: string) {
    return updateDoc(doc(this.fs, `topics/${oldTopicId}`), updatedTopic);
  }

  

  async getTopics(all: boolean = false) {

    const result= {} as any;
    let q;
    if(all) {
      q = query(this.topicRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(this.topicRef, orderBy('createdAt', 'desc'), limit(3));
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    const id = doc.id;
    result[id] = doc.data();
      });
    return result;
  }

  async getTopicsCount() {

    const querySnapshot = await getDocs(this.topicRef);
    return Object.keys(querySnapshot.docs).length;
  }

  

  async loadNextPage(lastTopic: any) {
    const result: {[key:string]: any} = {};
    const q = query(this.topicRef, orderBy('createdAt', 'desc'), startAfter(lastTopic['createdAt']), limit(3));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
      });

    return result;
  }

  async loadPreviousPage(firstTopic: any) {
    const result= {} as any;
    const q = query(this.topicRef, orderBy('createdAt', 'desc'), endBefore(firstTopic['createdAt'] - 1), limit(3));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
      });

    return result;
  }

  

  async getTopicsByOwnerId(ownerId: string) {
    const result = {} as any;
    const q = query(this.topicRef, where("ownerId", "==", ownerId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
      });
      
    return result;
  }

  getTopicById(topicId: string) {
    return getDoc(doc(this.fs, `topics/${topicId}`));
  }

  deleteTopic(id: string) {
    return deleteDoc(doc(this.fs, `topics/${id}`));
  }

  AddComment(comment: IComment) {
    const res = addDoc(this.commentRef, comment);
    return res;
  }


  async getCommentsByTopicId (topicId: string) {
    const result = {} as any;
    const q = query(this.commentRef, where("topicId", "==", topicId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
      });
      
    return result;
  }

  async getCommentById (commentId: string) {
    return getDoc(doc(this.fs, `comments/${commentId}`));
  }

  async likeComment(commentId: string, userId: string) {

    const currentTopicRef = doc(this.fs, "comments", commentId);
      await updateDoc(currentTopicRef, {
        likes: arrayUnion(userId)
      });
    
  }

  async unlikeComment(commentId: string, userId: string) {

    const currentTopicRef = doc(this.fs, "comments", commentId);
      await updateDoc(currentTopicRef, {
        likes: arrayRemove(userId)
      });
    
  }

  async deleteComment(commentId: string) {
    return deleteDoc(doc(this.fs, `comments/${commentId}`));
  }


}

