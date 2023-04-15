import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { Util } from 'src/app/shared/util/util';

@Component({
    selector: 'app-details-topic',
    templateUrl: './details-topic.component.html',
    styleUrls: ['./details-topic.component.css']
})
export class DetailsTopicComponent implements OnInit {

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
        private router: Router,
        private util: Util
    ) { }

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


    async deleteTopic() {
        const confirmation = confirm(`Are you sure you want to delete: ${this.topic.title}?`);
        if (confirmation) {
            this.util.openSuccessSnackBar('You deleted your topic successfully.', 'dismiss');
            this.topicService.deleteTopic(this.topicId);

            let commentsToDelete: { key: {} } = await this.topicService.getCommentsByTopicId(this.topicId);
            Object.keys(commentsToDelete).forEach(commentId => {
                this.topicService.deleteComment(commentId);
            });

            this.router.navigate(['/topics']);
        }

    }

    postComment(comment: NgControl) {
        const newComment = {
            content: comment.value,
            createdAt: serverTimestamp(),
            ownerId: this.userId,
            ownerEmail: this.userEmail,
            topicId: this.topicId,
            likes: []
        }

        this.topicService.AddComment(newComment);
        comment.reset();
        this.getComments();

    }

    async getComments() {
        from(this.topicService.getCommentsByTopicId(this.topicId)).subscribe({
            next: data => this.comments = data,
            error: (err) => console.log(err)
        });
    }


    deleteComment(commentId: string) {

        this.topicService.deleteComment(commentId);
        this.util.openSuccessSnackBar('You deleted your comment successfully.', 'dismiss');
        from(this.topicService.getCommentsByTopicId(this.topicId)).subscribe({
            next: data => this.comments = data,
            error: (err) => console.log(err)
        });

    }
}




