import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetalleContadorComponent } from "./detalle-contador.component";


describe("AccountantDetailComponent", () => {
  let component: DetalleContadorComponent;
  let fixture: ComponentFixture<DetalleContadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleContadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
