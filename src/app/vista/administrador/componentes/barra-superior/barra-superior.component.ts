import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-administrator-top-bar",
  templateUrl: "./barra-superior.component.html",
})
export class BarraSuperiorComponent implements OnInit {
  public perfil = "";
  constructor(private readonly rutaSistema: Router) {}

  ngOnInit() {
    var perfiles: any = localStorage.getItem("k-perfiles");
    var objetoPerfiles = JSON.parse(perfiles);
    var supervisorPerfil = objetoPerfiles.find((element:any) => element == "SUPERVISOR");
    var administradorPerfil = objetoPerfiles.find((element:any) => element == "ADMINISTRADOR");
    if (supervisorPerfil == "SUPERVISOR" && administradorPerfil == undefined) {
      this.perfil = "SUPERVISOR";
    }else{
      this.perfil = "ADMINISTRADOR";
    }
  }

  Regresar() {
    this.rutaSistema.navigate(["/cliente/reservacion/lista"]);
  }
}
