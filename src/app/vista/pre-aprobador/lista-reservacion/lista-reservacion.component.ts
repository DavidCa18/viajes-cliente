import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reservation-list",
  templateUrl: "./lista-reservacion.component.html",
})
export class ListaReservacionPreAprobadorComponent implements OnInit {
  tipoMenu = 2;
  Tipo = 2;
  Estado = "GENERADO";

  public mensaje = "Cargando Información...";

  ngOnInit() {
    // Inicio del componente
  }
}
