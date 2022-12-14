import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, limitToLast, updateDoc} from '@angular/fire/firestore';
import { IComment, ITopic } from '../core/interfaces';
import { AuthService } from './auth.service';
import { addDoc, collection, serverTimestamp, limit, orderBy, query, where } from 'firebase/firestore';
import { map, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService implements OnInit {


  currentUser$ = this.authService.currentUser$;
  topicRef = collection(this.fs, 'topics');
  commentRef = collection(this.fs, 'comments');

  constructor(
    private authService: AuthService, private fs: Firestore) { }


  ngOnInit(): void {
    
  }


  AddTopic(topic: ITopic) {
    const res = addDoc(this.topicRef, topic);
    return res;
  }

  UpdateTopic(updatedTopic: any, oldTopicId: string) {
    return updateDoc(doc(this.fs, `topics/${oldTopicId}`), updatedTopic);
  }

  

  async getAllTopics(forHomePage: boolean = false) {
    const result= {} as any;
    if(forHomePage) {
      const q = query(this.topicRef, orderBy('createdAt', 'desc'), limit(6));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
    });
    } else {
      const q = query(this.topicRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
      });
    }
    return result;
  }

  async getTopicsByOwnerId(ownerId: any) {
    const result = {} as any;
    const q = query(this.topicRef, where("ownerId", "==", ownerId));
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
  AddComment(comment: any) {
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
}
