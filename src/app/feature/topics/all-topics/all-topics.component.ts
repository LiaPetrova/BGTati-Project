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
  topics!: {[key:string]: ITopic};
  topicsCount!: number;
  currentTopicNo: number = 6;
  showLoadMoreBtn: boolean = true;


  ngOnInit(): void {
    this.topicService.getTopics(6).then(topics => this.topics = topics);
    this.topicService.getTopicsCount().then(count => this.topicsCount = count);
  }

  async loadMore () {
    const lastId: any = Object.keys(this.topics).pop()
          const lastTopic = this.topics[lastId];
          const newTopics = await this.topicService.loadMoreTopics(lastTopic);
          this.topics =  Object.assign(this.topics, newTopics);
          this.currentTopicNo+=3;
          if(this.topicsCount - this.currentTopicNo < 1) {
            this.showLoadMoreBtn = false;
          }

  }

}
