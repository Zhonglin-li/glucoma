import {ContactComponent} from "./contact.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe("ContactComponent", () => {
  let comp : ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(()=> {
    TestBed.configureTestingModule({
      declarations: [ContactComponent]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be create', () => {
    expect(comp).toBeTruthy();
  })

})
