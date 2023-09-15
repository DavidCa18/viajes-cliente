import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CabeceraContadorComponent } from "./cabecera-contador.component";

describe("CabeceraContadorComponent", () => {
  let component: CabeceraContadorComponent;
  let fixture: ComponentFixture<CabeceraContadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabeceraContadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
