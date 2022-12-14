import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {

  newTopicForm: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'content': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'imageUrl': new FormControl('')
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.newTopicForm) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  currentUser$ = this.authService.currentUser$
  userId!: any;
  userEmail!: string;


  constructor(private formBuilder: FormBuilder, private topicService: TopicService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.userId = user?.uid;
      this.userEmail = user?.email;
    });
  }
  async submitTopic() {

    const newTopic = {
      title: this.newTopicForm.value.title,
      content: this.newTopicForm.value.content,
      imageUrl: this.newTopicForm.value.imageUrl? this.newTopicForm.value.imageUrl : '/assets/topic.jpg',
      createdAt: serverTimestamp(),
      ownerId: this.userId,
      ownerEmail: this.userEmail
    }
    try {
      await this.topicService.AddTopic(newTopic);      
    } catch (error) {
      console.error(error);
      
    }
    
    this.router.navigate(['/topics']);
  }

}
