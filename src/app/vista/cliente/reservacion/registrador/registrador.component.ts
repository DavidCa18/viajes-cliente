import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { ServicioDataExternos } from '../../../../controladores/externos/datos-externos.service';
import { ServicioSesionExterna } from '../../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';
import { ServicioUsuario } from '../../../../servicios/usuario/usuario.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-reservation-register",
  templateUrl: "./registrador.component.html",
})
export class RegistradorComponent implements OnInit {
  @Input() dtRegistro = {
    codigoCompania: null,
    compania: null,
    nombre: null,
    identificacion: null,
    correo: null,
    departamento: null,
    posicion: null,
    ciudad: null,
  };

  @Input() vlRegistro = {
    compania: null,
    nombre: null,
  };

  dtBuscarProveedor = {
    buscarPor: null,
    campoIngresado: null,
    ruc: "",
    nombre: "",
    token: null,
  };

  usuario = {
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
    ip: "",
    sistemaOperativo: "",
    navegador: "",
  };

  dtCompania = { Codigo: null, Nombre: null };
  lstCompania = [];
  sesion: any;
  public ambiente = environment;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router,
    public validador: ServicioValidaciones,
  ) {}

  ngOnInit() {
    this.sesion = this.servicioUsuario.ObtenerUsuario();
    this.ObtenerCompania();
  }

  public ObtenerCompania() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerCompania(token)
      .then((res) => {
        this.lstCompania = res;
        this.dtCompania.Codigo = this.ambiente.companiaCodigoDefecto;
        this.dtCompania.Nombre = this.ambiente.companiaNombreDefecto;
        this.ColocarCompania();
      })
      .catch((err) => {
        Swal.fire({
          title: "Obtener datos AX",
          html:
            "No se ha podido cargar los datos de la compañia," +
            "<br>" +
            " vuelva a intentar más tarde, si el problema periste comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          this.rutaSistema.navigate(["/cliente/reservacion/lista"]);
        });
      });
  }

  public ColocarCompania() {
    var compania = this.dtCompania;
    this.dtRegistro.compania = compania.Nombre;
    this.dtRegistro.codigoCompania = compania.Codigo;
    this.Validaciones();
  }

  public Validaciones() {
    var validation = this.validador.ValidacionesRegistro(this.dtRegistro);
    this.vlRegistro = validation.vlRegistro;
  }

  public SeleccionBuscarPor() {
    this.dtBuscarProveedor.campoIngresado = "";
  }
}
