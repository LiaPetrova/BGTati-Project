import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.currentUser$.subscribe(user => this.userId= user.uid);
    this.getMyTopics();
    
  }

  async getMyTopics() {
    setTimeout(async () => {
      this.topics = await this.topicService.getTopicsByOwnerId(this.userId);
    }, 10);
  }

}
