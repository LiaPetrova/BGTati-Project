import { Component } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ITopic } from 'src/app/core/interfaces';
import { TopicService } from 'src/app/services/topic.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  topics: any = {};
  objectKeys = Object.keys;

  constructor(private topicService: TopicService) {
    
  }

  async searchTopics (search: NgControl) {
    this.topics = {}
    let result: {[key:string]: ITopic} = {};
    const oldTopics = await this.topicService.getTopics(true);
    const topicsKeys = Object.keys(oldTopics);
    topicsKeys.forEach(key => {
      if(oldTopics[key].title.toLowerCase().includes(search.value.toLowerCase ())) {
        result[key] = oldTopics[key];
      }
    }); 
    if(Object.keys(result).length == 0) {
      this.topics = 'no topics';
    } else {
      this.topics = result;
    }
  }

}
