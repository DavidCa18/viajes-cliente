import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CabeceraPreAprobadorComponent } from "./cabecera-pre-aprobador.component";

describe("CabeceraPreAprobadorComponent", () => {
  let component: CabeceraPreAprobadorComponent;
  let fixture: ComponentFixture<CabeceraPreAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabeceraPreAprobadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraPreAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
