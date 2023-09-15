import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RegistroContadorComponent } from "./registro-contador.component";

describe("RegistroContadorComponent", () => {
  let component: RegistroContadorComponent;
  let fixture: ComponentFixture<RegistroContadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroContadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
