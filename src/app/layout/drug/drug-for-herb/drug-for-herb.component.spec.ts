import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugForHerbComponent } from './drug-for-herb.component';

describe('DrugForHerbComponent', () => {
  let component: DrugForHerbComponent;
  let fixture: ComponentFixture<DrugForHerbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugForHerbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugForHerbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
