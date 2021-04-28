import {HelpComponent} from "./help.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe('HelpComponent', () => {
  let comp : HelpComponent;
  let fixture : ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent]
    })
    .compileComponents()
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HelpComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(comp).toBeTruthy()
  })

})
