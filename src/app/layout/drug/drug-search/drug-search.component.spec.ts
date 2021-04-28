import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugbankIdSearchComponent } from './drug-search.component';

describe('DrugbankIdSearchComponent', () => {
  let component: DrugbankIdSearchComponent;
  let fixture: ComponentFixture<DrugbankIdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugbankIdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugbankIdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
