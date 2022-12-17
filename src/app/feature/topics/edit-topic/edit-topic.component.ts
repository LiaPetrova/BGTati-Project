import { state } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {

  editTopicForm: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'content': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'imageUrl': new FormControl('')
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.editTopicForm) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  currentUser$ = this.authService.currentUser$;
  userId!: string;
  oldTopic!: any;
  topicId!: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private topicService: TopicService, 
    private router: Router, 
    private authService: AuthService) { }


  ngOnInit(): void {
    this.currentUser$.subscribe(user => this.userId = user.uid);

    this.activatedRoute.params.subscribe(params => {
      this.topicId = params['topicId'];
    });
    this.topicService.getTopicById(this.topicId).then((data) => {
      this.oldTopic = data.data();
      this.editTopicForm.controls['title'].setValue(this.oldTopic.title);
      this.editTopicForm.controls['content'].setValue(this.oldTopic.content);
      this.editTopicForm.controls['imageUrl'].setValue(this.oldTopic.imageUrl);
      if(this.oldTopic.ownerId !== this.userId) {  
        this.router.navigate(['/user/login']);
      }
      
    });
  
    
  }

  async editTopic() {

    const newTopic = {
      title: this.editTopicForm.value.title,
      content: this.editTopicForm.value.content,
      imageUrl: this.editTopicForm.value.imageUrl ? this.editTopicForm.value.imageUrl : 'https://i.postimg.cc/zGRHCh7B/topic.jpg',
    }
    try {
      await this.topicService.UpdateTopic(newTopic, this.topicId);
      
    } catch (error) {
      console.error(error);
    }
    
    this.router.navigate([`/topics/${this.topicId}/details`]);

  }

}
