import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reservation-list",
  templateUrl: "./lista-reservacion.component.html",
})
export class ListaReservacionComponent implements OnInit {
  tipoMenu = 1;
  Tipo = 1;
  Estado = null;

  public mensaje = "Cargando Información...";

  ngOnInit() {
    //función de inicio
  }
}
