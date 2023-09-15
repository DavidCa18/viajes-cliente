import { Component, OnInit } from "@angular/core";
import { ServicioUsuario } from "../../../../servicios/usuario/usuario.service";

@Component({
  selector: "app-administrator-side-bar",
  templateUrl: "./barra-lateral.component.html",
  styleUrls: ["./barra-lateral.component.css"],
})
export class BarraLateralComponent implements OnInit {
  public usuario: any;
  public perfil: any = "";

  public menues: any = {
    viajes: true,
    agencias: true,
    hoteles: true,
    rutas: true,
    tipoDocumentos: true,
    categorias: true,
    parametros: true,
    usuarios: true,
    supervisores: true,
    errores: true
  }

  constructor(private readonly servicioUsuario: ServicioUsuario) { }

  ngOnInit() {
    this.usuario = this.servicioUsuario.ObtenerUsuario();
    this.perfil = localStorage.getItem("k-perfil");
    var perfiles: any = localStorage.getItem("k-perfiles");
    var objetoPerfiles = JSON.parse(perfiles);
    var supervisorPerfil = objetoPerfiles.find((element: any) => element == "SUPERVISOR");
    var administradorPerfil = objetoPerfiles.find((element: any) => element == "ADMINISTRADOR");
    if (supervisorPerfil == "SUPERVISOR" && administradorPerfil == undefined) {
      this.perfil = "SUPERVISOR";
      this.menues = {
        viajes: true,
        agencias: false,
        hoteles: false,
        rutas: false,
        tipoDocumentos: false,
        categorias: false,
        parametros: false,
        usuarios: false,
        supervisores: false,
        errores: false
      }
    } else if (administradorPerfil == "ADMINISTRADOR") {
      this.menues = {
        viajes: true,
        agencias: true,
        hoteles: true,
        rutas: true,
        tipoDocumentos: true,
        categorias: true,
        parametros: true,
        usuarios: true,
        supervisores: true,
        errores: true
      }
    }
  }

}
