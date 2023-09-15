import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { GastoViajeComponent } from "./gasto-viaje.component";

describe("GastoViajeComponent", () => {
  let component: GastoViajeComponent;
  let fixture: ComponentFixture<GastoViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GastoViajeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
