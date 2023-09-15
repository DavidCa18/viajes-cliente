import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListaReservacionComponent } from "./lista-reservacion.component";

describe("ListaReservacionComponent", () => {
  let component: ListaReservacionComponent;
  let fixture: ComponentFixture<ListaReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaReservacionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
