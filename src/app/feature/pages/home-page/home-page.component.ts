import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@firebase/firestore';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  constructor(private topicService: TopicService) { }

  objectKeys = Object.keys;
  topics = this.topicService.getAllTopics(true);

  // async postComment() {
  //   const comment = {
  //     content: 'jdjsdfdld',
  //     createAt: serverTimestamp(),
  //     ownerId: 'Zpb8FDm62cPGXhvJd9kJbAWbyxq2',
  //   }

  //   try {
  //     const response = await this.topicService.AddComment(comment);
  //     console.log(response);
      
  //   } catch (error) {
      
  //   }
    
    // this.router.navigate(['/home']);
  // }
ngOnInit(): void {
}

}
