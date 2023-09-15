import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RutasComponentVista } from "./rutas.component";

describe("RoutesComponent", () => {
  let component: RutasComponentVista;
  let fixture: ComponentFixture<RutasComponentVista>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RutasComponentVista],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasComponentVista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
