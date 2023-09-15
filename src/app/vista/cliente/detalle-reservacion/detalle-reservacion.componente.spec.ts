import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetalleReservacionComponent } from "./detalle-reservacion.component";

describe("DetalleReservacionComponent", () => {
  let component: DetalleReservacionComponent;
  let fixture: ComponentFixture<DetalleReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleReservacionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
