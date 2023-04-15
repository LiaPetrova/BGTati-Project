import { EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { DetailsTopicComponent } from '../details-topic/details-topic.component';
import { from } from 'rxjs';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges {

    @Input() commentId: any;
    @Input() comments: any;
    @Input() user: any;
    @Input() topicId!: string;
    @Output() deleteComment = new EventEmitter<string>();

    hasLiked!: boolean;
    isOwner!: boolean;

    constructor(private topicService: TopicService, private detailsComp: DetailsTopicComponent) { }


    ngOnChanges(): void {
        this.isOwner = this.comments[this.commentId].ownerId == this.user?.uid;
        this.hasLiked = this.comments[this.commentId]?.likes?.find((like: string | undefined) => like === this.user?.uid);
        if (this.hasLiked == undefined) {
            this.hasLiked = false;
        }
    }
    async likeHandler() {
       
            this.topicService.likeComment(this.commentId, this.user.uid);
            from(this.topicService.getCommentsByTopicId(this.topicId)).subscribe({
                next: data => {
                  this.comments = data;
                },
                error: err => console.error(err.message)
              });

            this.hasLiked = true;
    }

    async unlikeHandler() {
            this.topicService.unlikeComment(this.commentId, this.user.uid);
            from(this.topicService.getCommentsByTopicId(this.topicId)).subscribe({
                next: data => {
                    this.comments = data;
                },
                error: err => console.error(err.message)
            });
            this.hasLiked = false;
    }

    async deleteHandler() {

        const confirmation = confirm(`Are you sure you want to delete your comment?`);
        if (confirmation) {
            this.deleteComment.emit(this.commentId);
        }

    }




}
