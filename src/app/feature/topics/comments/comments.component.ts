import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { DetailsTopicComponent } from '../details-topic/details-topic.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() commentId: any;
  @Input() comments: any;
  @Input() user: any;
  @Input() topicId!: string;
  @Output() deleteComment = new EventEmitter<string>();

  hasLiked!: boolean;
  isOwner!: boolean;

  constructor(private topicService: TopicService, private detailsComp: DetailsTopicComponent) {}
  
  ngOnInit(): void {

    setTimeout(() => {
      this.hasLiked = this.comments[this.commentId]?.likes?.find((like: string | undefined) => like === this.user?.uid);
      this.isOwner = this.comments[this.commentId].ownerId == this.user?.uid;
      if(this.hasLiked == undefined) {
        this.hasLiked = false;
      }
      
    }, 150);
    
  }
  async likeHandler() {
    try {
      this.topicService.likeComment(this.commentId, this.user.uid);
      this.hasLiked = true;
      console.log(this.topicId);
      
      setTimeout(async () => {
        this.comments = await this.topicService.getCommentsByTopicId(this.topicId);
      }, 220); 
         
    } catch(error) {
      console.error(error);
    }
  }

  async unlikeHandler() {
    try {
      this.topicService.unlikeComment(this.commentId, this.user.uid);
      this.hasLiked = false;
      
      setTimeout(async () => {
        this.comments = await this.topicService.getCommentsByTopicId(this.topicId);
      }, 150); 
      
    } catch(error) {
      console.error(error);
    }
  }

  async deleteHandler() {

    const confirmation = confirm(`Are you sure you want to delete your comment?`);
    if(confirmation) {
      this.deleteComment.emit(this.commentId);
    }

  }




}
