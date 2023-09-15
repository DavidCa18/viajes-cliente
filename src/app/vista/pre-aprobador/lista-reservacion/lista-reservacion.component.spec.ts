import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListaReservacionPreAprobadorComponent } from "./lista-reservacion.component";

describe("ListaReservacionPreAprobadorComponent", () => {
  let component: ListaReservacionPreAprobadorComponent;
  let fixture: ComponentFixture<ListaReservacionPreAprobadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaReservacionPreAprobadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReservacionPreAprobadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
