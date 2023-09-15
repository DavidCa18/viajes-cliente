import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lista-viajes",
  templateUrl: "./lista-viajes.component.html",
})
export class ListaViajesComponent implements OnInit {
  tipoMenu = 3;
  Tipo = 3;
  Estado = "APROBADO";

  public mensaje = "Cargando Información...";

  ngOnInit() {
    //Función de Inicio
  }
}
