import { Component, Input } from '@angular/core';
import { ITopic } from 'src/app/core/interfaces';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent {

  @Input() topic: any;
  @Input() topics: any;
}
