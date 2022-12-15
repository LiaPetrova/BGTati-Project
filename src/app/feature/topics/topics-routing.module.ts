import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { DetailsTopicComponent } from './details-topic/details-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllTopicsComponent
},
  {
      path: 'new',
      canActivate: [AuthGuard],
      component: NewTopicComponent 
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: ':topicId',
    component: DetailsTopicComponent,
  },
  {
    path: ':topicId/edit',
    component: EditTopicComponent
  },

  // {
  //     path: 'profile',
  //     // canActivate: [AuthGuard],
  //     component: ProfileComponent
  // }
];

export const TopicsRoutingModule = RouterModule.forChild(routes);