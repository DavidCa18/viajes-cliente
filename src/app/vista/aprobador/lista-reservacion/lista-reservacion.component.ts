import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reservation-list",
  templateUrl: "./lista-reservacion.component.html",
})
export class ListaReservacionAprobadorCompoenente implements OnInit {
  tipoMenu = 4;
  Tipo = 4;
  Estado = "CONFIRMADO";

  public mensaje = "Cargando Información...";

  ngOnInit() {
    //función de inicio
  }
}
