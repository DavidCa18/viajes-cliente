import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';

@Component({
  selector: "app-header-pre-approver",
  templateUrl: "./cabecera-pre-aprobador.component.html",
})
export class CabeceraPreAprobadorComponent implements OnInit {
  @Input() userData = {
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

  variables = environment;
  constructor(private readonly servicioUsuario: ServicioUsuario, private readonly rutaSistema: Router) {}

  ngOnInit() {
    //función de inicio
  }

  public Navegacion(pagina:any) {
    if (pagina == 1) {
      this.rutaSistema.navigate(["/preaprobador/reservacion/lista"]);
    } else if (pagina == 3) {
      this.servicioUsuario.EliminarSesionUsuario();
      window.location.href = this.variables.urlCompra;
    } else if (pagina == 4) {
      this.servicioUsuario.EliminarSesionUsuario();
      window.location.href = this.variables.urlPago;
    }
  }
}
