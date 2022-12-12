import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITopic } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-details-topic',
  templateUrl: './details-topic.component.html',
  styleUrls: ['./details-topic.component.css']
})
export class DetailsTopicComponent implements OnInit{

  topic!: any;
  topicId!: string;
  currentUser$ = this.authService.currentUser$
  userId!: string;
  owner$: any;
  ownerId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.currentUser$.subscribe(user => this.userId = user.uid);
    
    this.activatedRoute.params.subscribe(params => {
      this.topicId = params['topicId'];
    });
    this.topicService.getTopicById(this.topicId).then((data) => {
      this.topic = data.data();
      this.ownerId = this.topic.ownerId;
    });

    // this.authService.getUserById(this.ownerId).then(data => {
    //   console.log(this.ownerId);
      
    //   this.owner$ = data.data();
    //   console.log(this.owner$);
      
    // })



  }

  deleteTopic(): void {
    const confirmation = confirm(`Are you sure you want to delete: ${this.topic.title}?`);
    if(confirmation) {
      this.topicService.deleteTopic(this.topicId);
    }

    this.router.navigate(['/home']);
  }

}
