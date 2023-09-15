import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListaContadorComponent } from "./lista-contador.component";

describe("ListaContadorComponent", () => {
  let component: ListaContadorComponent;
  let fixture: ComponentFixture<ListaContadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaContadorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
