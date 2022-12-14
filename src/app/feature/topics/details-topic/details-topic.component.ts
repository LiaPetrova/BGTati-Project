import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ITopic } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-details-topic',
  templateUrl: './details-topic.component.html',
  styleUrls: ['./details-topic.component.css']
})
export class DetailsTopicComponent implements OnInit, OnChanges{

  topic!: any;
  topicId!: string;
  currentUser$ = this.authService.currentUser$
  userId!: string;
  userEmail!: string;
  isOwner!: boolean;
  ownerEmail!: string;
  comments!: any;
  objectKeys = Object.keys;

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.currentUser$.subscribe(user => {
      this.userId = user?.uid;
      this.userEmail = user?.email;
    });
    
    this.activatedRoute.params.subscribe(params => {
      this.topicId = params['topicId'];
    });
    this.topicService.getTopicById(this.topicId).then((data) => {
      this.topic = data.data();
      this.isOwner = this.topic.ownerId == this.userId;
      this.ownerEmail = this.topic.ownerEmail;
    });

    this.getComments();

  }

 ngOnChanges(changes: SimpleChanges): void {
   
 }

  deleteTopic(): void {
    const confirmation = confirm(`Are you sure you want to delete: ${this.topic.title}?`);
    if(confirmation) {
      this.topicService.deleteTopic(this.topicId);
    }

    this.router.navigate(['/topics']);
  }

  postComment(comment: NgControl) {
    const newComment = {
          content: comment.value,
          createdAt: serverTimestamp(),
          ownerId: this.userId,
          ownerEmail: this.userEmail,
          topicId: this.topicId
        }
    
        try {
          const response = this.topicService.AddComment(newComment);
          comment.reset();
          console.log(response);
          setTimeout(() => {
            this.getComments();

          }, 300);
          
        } catch (error) {
          
        }

  }

  async getComments () {
    setTimeout(async () => {
      this.comments = await this.topicService.getCommentsByTopicId(this.topicId);
      console.log(this.comments);
      
    }, 10);
  }

}




