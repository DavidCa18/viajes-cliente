import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistradorComponent } from "./registrador.component";

describe("RegistradorComponent", () => {
  let component: RegistradorComponent;
  let fixture: ComponentFixture<RegistradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistradorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
