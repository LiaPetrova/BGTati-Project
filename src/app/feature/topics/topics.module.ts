import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { SingleTopicComponent } from './single-topic/single-topic.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsTopicComponent } from './details-topic/details-topic.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { CommentsComponent } from './comments/comments.component';




@NgModule({
  declarations: [
    NewTopicComponent,
    AllTopicsComponent,
    SingleTopicComponent,
    DetailsTopicComponent,
    EditTopicComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class TopicsModule { }
