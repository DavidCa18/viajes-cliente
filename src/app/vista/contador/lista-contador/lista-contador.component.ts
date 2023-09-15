import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-accountant-list",
  templateUrl: "./lista-contador.component.html",
})
export class ListaContadorComponent implements OnInit {

  tipoMenu = 5;
  Tipo = 5;
  Estado = "LIQUIDADO";

  public mensaje = "Cargando Información...";

  ngOnInit() {
    // Inicio del componente
  }

}
