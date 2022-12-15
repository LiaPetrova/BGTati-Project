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
  topics: Promise<{[key:string]: ITopic}> = this.topicService.getAllTopics();

  ngOnInit(): void {
  }
}
