import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CompoundBySmilesComponent} from "./molecule-drug.component"


describe('CompoundBySmilesComponent', () => {
  let component: CompoundBySmilesComponent;
  let fixture: ComponentFixture<CompoundBySmilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundBySmilesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundBySmilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
