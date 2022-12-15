import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ITopic } from 'src/app/core/interfaces';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent implements OnInit {

  constructor(private topicService: TopicService) { }

  
  objectKeys = Object.keys;
  topics: {[key:string]: ITopic} = {};

  ngOnInit(): void {
    this.topicService.getAllTopics().then(topics => this.topics = topics);
  }

  async searchTopics (search: NgControl) {
    this.topics = {}
    let result: {[key:string]: ITopic} = {};
    const oldTopics = await this.topicService.getAllTopics();
    const topicsKeys = Object.keys(oldTopics);
    topicsKeys.forEach(key => {
      if(oldTopics[key].title.toLowerCase().includes(search.value.toLowerCase ())) {
        result[key] = oldTopics[key];
      }
    });
    this.topics = result;
  }

}
