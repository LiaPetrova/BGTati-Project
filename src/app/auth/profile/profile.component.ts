import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser$: Observable<any> = this.authService.currentUser$;
    userId!: string;
    objectKeys = Object.keys;
    topics: any;



    constructor(
        private topicService: TopicService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.currentUser$.subscribe(user => {
            this.userId = user?.uid
            this.getMyTopics();
        });
        
    }

    async getMyTopics() {

        from(this.topicService.getTopicsByOwnerId(this.userId)).subscribe({
            next: data => this.topics = data,
            error: err => console.log(err)
        })
    }

}
