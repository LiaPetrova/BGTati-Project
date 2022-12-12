import { Component } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent {

  constructor(private topicService: TopicService) { }

  
  objectKeys = Object.keys;
  topics = this.topicService.getAllTopics();
  

}
