import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../environments/environment";
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';

@Component({
  selector: "app-componment-header",
  templateUrl: "./cabecera.component.html",
})
export class TodaCabeceraComponent implements OnInit {
  @Input() usuario = {
    Apellidos: "",
    ApellidosNombres: "",
    Cargo: "",
    Cedula: "",
    CiudadCodigo: "",
    CiudadDescripcion: "",
    CompaniaCodigo: "",
    CompaniaDescripcion: "",
    Departamento: "",
    Email: "",
    "": "",
    JefeInmediato: {
      Apellidos: "",
      ApellidosNombres: "",
      Cargo: "",
      Cedula: "",
      CiudadCodigo: "",
      CiudadDescripcion: "",
      CompaniaCodigo: "",
      CompaniaDescripcion: "",
      Departamento: "",
      Email: "",
      Extension: "",
      JefeInmediato: null,
      NombreCompleto: "",
      Nombres: "",
      NombresApellidos: "",
      Telefono: "",
      Usuario: "",
      UsuarioDominio: "",
    },
    NombreCompleto: "",
    Nombres: "",
    NombresApellidos: "",
    Telefono: "",
    Usuario: "",
    UsuarioDominio: "",
  };

  ambiente = environment;
  administrador = false;
  supervisor = false;
  registradorVer = false;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router
  ) {}

  ngOnInit() {
    this.usuario = this.servicioUsuario.ObtenerUsuario();
    var perfil = localStorage.getItem("k-perfil");
    var perfiles: any = localStorage.getItem("k-perfiles");
    var prueba = JSON.parse(perfiles);
    var aux = prueba.find((element:any) => element == "REASIGNADOR");
    var supervisorPerfil = prueba.find((element:any) => element == "SUPERVISOR");
    var administradorPerfil = prueba.find((element:any) => element == "ADMINISTRADOR");
    if (aux == "REASIGNADOR") {
      this.registradorVer = true;
    } else {
      this.registradorVer = false;
    }

    if (administradorPerfil == "ADMINISTRADOR") {
      this.administrador = true;
    } else {
      this.administrador = false;
    }

    if (supervisorPerfil == "SUPERVISOR" && administradorPerfil == undefined) {
      this.supervisor = true;
    } else {
      this.supervisor = false;
    }

  }

  public Navegacion(pagina: any) {
    if (pagina == 1) {
      this.servicioUsuario.EliminarSesionUsuario();
      window.location.href = this.ambiente.urlCompra;
    } else if (pagina == 2) {
      this.servicioUsuario.EliminarSesionUsuario();
      window.location.href = this.ambiente.urlPago;
    }
  }

  public IrA() {
    this.rutaSistema.navigate(["/cliente/reservacion/reasignacion-tareas"]);
  }

  public IrAdministracion() {
    this.rutaSistema.navigate(["/administrador/lista/viajes"]);
  }

  public Administracion() {
    this.rutaSistema.navigate(["/administrador/lista/viajes"]);
  }

  public Reasignador() {
    this.rutaSistema.navigate(["/cliente/reservacion/reasignacion-tareas"]);
  }

  public FueraOficina() {
    this.rutaSistema.navigate(["/cliente/reservacion/outoffice"]);
  }

  public CerrarSesion() {
    var _this = this;
    this.servicioUsuario.EliminarSesionGlobal();
    setTimeout(function () {
      window.history.go(0);
      window.location.href = _this.ambiente.urlPrincipal
    }, 500);
  }
}
