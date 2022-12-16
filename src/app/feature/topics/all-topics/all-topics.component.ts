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
  topics: Promise<{[key:string]: ITopic}> = this.topicService.getTopics();
  topicsCount!: number;
  currentTopicNo: number = 3;
  showNextBtn: boolean = true;
  showPreviousBtn: boolean = false;


  ngOnInit(): void {
    this.topicService.getTopicsCount().then(count => this.topicsCount = count);
  }

  nextPage() {
    this.topics.then(topics =>{ const lastId: any = Object.keys(topics).pop()
      const lastTopic = topics[lastId];
      this.topics = this.topicService.loadNextPage(lastTopic);
      this.currentTopicNo+=3;
      console.log(this.currentTopicNo);
      
      this.showPreviousBtn = true;
      if(this.topicsCount - this.currentTopicNo < 1) {
        this.showNextBtn = false;
      }
      
    });
  }

  previousPage() {
    this.topics.then(topics =>{ const lastId: any = Object.keys(topics).pop()
      const firstTopic = topics[lastId];
      this.topics = this.topicService.loadPreviousPage(firstTopic);
    });
    this.currentTopicNo-=3;
    this.showNextBtn = true;
    if(this.currentTopicNo - 3 <= 0) {
      this.showPreviousBtn = false;
    }
  }

  
}
