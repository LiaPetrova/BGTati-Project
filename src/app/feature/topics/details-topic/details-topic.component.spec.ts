import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTopicComponent } from './details-topic.component';

describe('DetailsTopicComponent', () => {
  let component: DetailsTopicComponent;
  let fixture: ComponentFixture<DetailsTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
