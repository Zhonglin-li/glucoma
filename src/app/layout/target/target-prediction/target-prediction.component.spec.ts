import {TargetPredictionComponent} from "./target-prediction.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe('TargetPredictionComponent', () => {
  let component: TargetPredictionComponent;
  let fixture: ComponentFixture<TargetPredictionComponent>;

  beforeEach(async(()=> {
    TestBed.configureTestingModule( {
      declarations: [TargetPredictionComponent]
    })
      .compileComponents();
  }));

  beforeEach( ()=> {
    fixture = TestBed.createComponent(TargetPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
})
