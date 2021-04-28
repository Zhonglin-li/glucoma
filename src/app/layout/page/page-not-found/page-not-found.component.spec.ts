import {PageNotFoundComponent} from "./page-not-found.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";


describe('PageNotFoundComponent', () => {
  let comp : PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  })
});
