import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';

@Component({
  selector: "app-reservation-globlal-list",
  templateUrl: "./lista-reservacion.component.html",
  styleUrls: ["./lista-reservacion.component.css"],
})
export class ListaReservacionGlobalComponent implements OnInit {

  @Input() Tipo = 0;
  @Input() Estado = null;
  @ViewChild("main")
  main: ElementRef;

  lstViaje = [];
  lstViajesReaignados = [];
  listadoViajesFinal = [];

  fmrFiltros = {
    estado: null,
    codigo: null,
    ruta: null,
    hotel: null,
    aprobador: null,
    ciudad: null,
    perfil: null,
  };

  lstListaRutaSeeccionada: any;
  dtHotelSeleccionado: any;
  dtAprobadorSeleccionado: any;

  lstJefesGrupos = [];
  lstHoteles = [];
  lstRutas: any = [];
  listaEstados = [];
  lstJefesGruposFiltro: Array<{ nombreCompleto: string; usuario: string }>;
  lstPerfiles = [];
  lstCiudades = [];
  dtPerfil = "";
  usuarioSesion: any;

  tareasPendientes = 0;
  tareasGeneradas = 0;
  tareasConfirmadas = 0;
  tareasNegadas = 0;
  tareasCorregir = 0;
  tareasAprobadas = 0;
  tareasRegistradas = 0;
  tareasLiquidadas = 0;
  tareasContabilizar = 0;
  tareasFinalizadas = 0;
  registradorPago="REGISTRADOR PAGO"
  preAprobador="PRE-APROBADOR";

  public p: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly servicioInterno: ServicioDataInternos,
    private readonly servicioExterno: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly rutaSistema: Router,
    private readonly global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.InicializarParametros();
  }

  public InicializarParametros() {
    this.usuarioSesion = this.servicioUsuario.ObtenerUsuario();
    this.lstPerfiles = JSON.parse(localStorage.getItem("k-perfiles"));
    this.lstCiudades = JSON.parse(localStorage.getItem("k-ciudades"));

    this.dtPerfil = localStorage.getItem("k-perfil");
    this.fmrFiltros.estado = this.Estado == null ? "" : this.Estado;
    this.fmrFiltros.perfil =
      this.Tipo == 3 && this.fmrFiltros.estado == "APROBADO"
        ? this.registradorPago
        : this.dtPerfil;

    if (this.lstCiudades.length != 1) {
      this.fmrFiltros.ciudad = "QUITO";
    } else {
      this.fmrFiltros.ciudad =
        this.usuarioSesion.CiudadDescripcion.toUpperCase();
    }

    this.ObtenerEstados();
  }

  public FiltrarViajes() {
    this.fmrFiltros.ruta =
      this.lstListaRutaSeeccionada == undefined
        ? null
        : this.lstListaRutaSeeccionada.NombreRuta;
    this.fmrFiltros.hotel =
      this.dtHotelSeleccionado == undefined
        ? null
        : this.dtHotelSeleccionado.NombreHotel;
    this.fmrFiltros.aprobador =
      this.dtAprobadorSeleccionado == undefined
        ? null
        : this.dtAprobadorSeleccionado.Usuario;
    var parametros = this.ObtenerParametros();
    this.spinner.show();
    this.servicioInterno
      .ObtenerParametrosViaje(parametros)
      .then((res) => {
        this.spinner.hide();
        this.lstViaje = res;
        this.CalcularTareasPendientes(this.lstViaje);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerEstados() {
    this.spinner.show();
    this.servicioInterno
      .ObtenerEstado()
      .then((res) => {
        this.spinner.hide();
        this.listaEstados = res;
        this.ValidarCadenaConsulta();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ValidarCadenaConsulta() {
    var query: any = "";
    const usuarioRegistrador="UsuarioRegistrador";

    for (const perfil of this.lstPerfiles) {
      if (perfil == "REGISTRADOR") {
        query +=
        `(${usuarioRegistrador} = '${this.usuarioSesion.Usuario}' AND IdEstado = 4) OR `;
      }

      if (perfil == "REGISTRADOR") {
        query +=
        `(${usuarioRegistrador} = '${this.usuarioSesion.Usuario}' AND IdEstado = 6) OR `;
      }

      if (perfil == "REGISTRADOR") {
        query +=
        `(${usuarioRegistrador} = '${this.usuarioSesion.Usuario}' AND IdEstado = 10) OR `;
      }

      if (perfil == this.preAprobador) {
        query +=
        `(UsuarioPreAprobador = '${this.usuarioSesion.Usuario}' AND IdEstado = 1) OR `;
      }

      if (perfil == "APROBADOR") {
        query += `(UsuarioAprobador = '${this.usuarioSesion.Usuario}' AND IdEstado = 2) OR `;
      }

      if (perfil == this.registradorPago) {
        query +=
        `(UsuarioRegistradorPago = '${this.usuarioSesion.Usuario}' AND IdEstado = 5) OR `;
      }

      if (perfil == "CONTADOR") {
        query += `(UsuarioContador = '${this.usuarioSesion.Usuario}' AND IdEstado = 7) OR `;
      }
    }

    var cadena = `WHERE (${query.slice(0, -4)}) ORDER BY FechaSolicitudViaje DESC`;
    this.ObtenerListadoViajesCadena(cadena);
  }

  public ObtenerListadoViajesCadena(cadena: any) {
    this.spinner.show();
    this.servicioInterno
      .ObtenerListadoViajesCadena(cadena)
      .then((res) => {
        this.spinner.hide();
        this.lstViaje = res;
        this.ObtenerListadoViajesReasignados(this.usuarioSesion.Usuario);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerListadoViajesReasignados(usuario: any) {
    this.spinner.show();
    this.servicioInterno
      .ObtenerListadoViajesReasignados(usuario)
      .then((res) => {
        this.spinner.hide();
        this.lstViajesReaignados = res;
        this.listadoViajesFinal = this.lstViaje.concat(
          this.lstViajesReaignados
        );
        this.listadoViajesFinal.sort((a: any, b: any) => b.IdViaje - a.IdViaje);
        this.tareasPendientes =
          this.lstViaje.length + this.lstViajesReaignados.length;

        this.ObtenerRutas();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerViajes() {
    var parametros = this.ObtenerParametros();
    this.spinner.show();
    if (this.lstPerfiles.length > 2) {
      this.servicioInterno
        .ObtenerParametrosViajeDistinct(parametros)
        .then((res) => {
          this.spinner.hide();
          this.lstViaje = res;
          this.CalcularTareasPendientes(this.lstViaje);
          this.ObtenerRutas();
        })
        .catch((err) => {
          this.spinner.hide();
        });
    } else {
      this.servicioInterno
        .ObtenerParametrosViaje(parametros)
        .then((res) => {
          this.spinner.hide();
          this.lstViaje = res;
          this.CalcularTareasPendientes(this.lstViaje);
          this.ObtenerRutas();
        })
        .catch((err) => {
          this.spinner.hide();
        });
    }
  }

  public CalcularTareasPendientes(viajes: any) {
    this.tareasGeneradas = 0;
    this.tareasConfirmadas = 0;
    this.tareasNegadas = 0;
    this.tareasCorregir = 0;
    this.tareasAprobadas = 0;
    this.tareasRegistradas = 0;
    this.tareasLiquidadas = 0;
    this.tareasContabilizar = 0;
    this.tareasFinalizadas = 0;

    for (const item of viajes) {
      if (item.Estado.IdEstado == 1) {
        this.tareasGeneradas++;
      }
      if (item.Estado.IdEstado == 2) {
        this.tareasConfirmadas++;
      }
      if (item.Estado.IdEstado == 3) {
        this.tareasNegadas++;
      }
      if (item.Estado.IdEstado == 4) {
        this.tareasCorregir++;
      }
      if (item.Estado.IdEstado == 5) {
        this.tareasAprobadas++;
      }
      if (item.Estado.IdEstado == 6) {
        this.tareasRegistradas++;
      }
      if (item.Estado.IdEstado == 7) {
        this.tareasLiquidadas++;
      }
      if (item.Estado.IdEstado == 8) {
        this.tareasContabilizar++;
      }
      if (item.Estado.IdEstado == 9) {
        this.tareasFinalizadas++;
      }
    }
  }

  public ObtenerRutas() {
    this.spinner.show();
    this.servicioInterno
      .ObtenerRutas()
      .then((res) => {
        this.spinner.hide();
        this.lstRutas = res;
        this.ObtenerGrupoJefe();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerGrupoJefe() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var datos = { Token: token.access_token };
    this.spinner.show();
    this.servicioExterno
      .ObtenerGrupoJefe(datos)
      .then((res) => {
        this.spinner.hide();
        this.lstJefesGrupos = res;
        this.lstJefesGruposFiltro = this.lstJefesGrupos.slice();
      })
      .catch((err) => {
        console.log(err);
        this.spinner.hide();
      });
  }

  public ObtenerHotel() {
    this.spinner.show();
    this.servicioInterno
      .ObtenerHotel(this.lstListaRutaSeeccionada.DestinoRuta)
      .then((res) => {
        this.spinner.hide();
        this.lstHoteles = res;
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public FiltroJefe(value: any) {
    this.lstJefesGruposFiltro = this.lstJefesGrupos.filter(
      (s) => s.NombreCompleto.toLowerCase().indexOf(value.toLowerCase()) !== -1 || s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  public DetalleViaje(viajeSeleccionado: any) {
    var usuario = this.servicioUsuario.ObtenerUsuario();

    var rolRegistrador = this.lstPerfiles.find(
      (element) => element == "REGISTRADOR"
    );
    var rolPreAprobador = this.lstPerfiles.find(
      (element) => element == this.preAprobador
    );
    var rolAprobador = this.lstPerfiles.find(
      (element) => element == "APROBADOR"
    );
    var rolContador = this.lstPerfiles.find((element) => element == "CONTADOR");
    var rolRegistradorPago = this.lstPerfiles.find(
      (element) => element == this.registradorPago
    );

    if (
      this.lstPerfiles.length == 1 &&
      rolRegistrador === "REGISTRADOR" &&
      (viajeSeleccionado.Estado.IdEstado === 1 ||
        viajeSeleccionado.Estado.IdEstado === 3 ||
        viajeSeleccionado.Estado.IdEstado === 4 ||
        viajeSeleccionado.Estado.IdEstado === 10)
    ) {
      this.rutaSistema.navigate([`/cliente/reservacion/detalle/${viajeSeleccionado.IdViaje}`]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolPreAprobador === this.preAprobador &&
      viajeSeleccionado.Estado.IdEstado == 1
    ) {
      this.rutaSistema.navigate([
        "/preaprobador/reservacion/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolAprobador === "APROBADOR" &&
      viajeSeleccionado.Estado.IdEstado === 2
    ) {
      this.rutaSistema.navigate([
        "/aprobador/reservacion/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolRegistradorPago === this.registradorPago &&
      viajeSeleccionado.Estado.IdEstado === 5
    ) {
      this.rutaSistema.navigate([
        "/registrador/pago/viajes/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolRegistrador === "REGISTRADOR" &&
      viajeSeleccionado.Estado.IdEstado === 6 &&
      (viajeSeleccionado.Registrador.Usuario === usuario.Usuario ||
        viajeSeleccionado.SolicitudViajeReasignadaUsuario === usuario.Usuario)
    ) {
      this.rutaSistema.navigate([
        "/cliente/reservacion/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolContador === "CONTADOR" &&
      viajeSeleccionado.Estado.IdEstado === 7
    ) {
      this.rutaSistema.navigate([
        "/contador/reservacion/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else if (
      this.lstPerfiles.length >= 1 &&
      rolRegistrador === "REGISTRADOR" &&
      (viajeSeleccionado.Estado.IdEstado === 3 ||
        viajeSeleccionado.Estado.IdEstado === 4 ||
        viajeSeleccionado.Estado.IdEstado === 10)
    ) {
      this.rutaSistema.navigate([
        "/cliente/reservacion/detalle/" + viajeSeleccionado.IdViaje,
      ]);
    } else {
      this.global.MostrarNotificacion(
        "La solicitud esta siendo procesada por el momento",
        "info",
        "top-end"
      );
    }
  }

  public ObtenerParametros() {
    var parametros = {
      usuario: "",
      preaprobador: "",
      registradorPago: "",
      aprobador: "",
      contador: "",
      viaje: "",
      ruta: "",
      hotel: "",
      estado: "",
      ciudad: "",
    };
    if (this.Tipo == 1) {
      parametros = {
        usuario: this.usuarioSesion.Usuario,
        preaprobador: "",
        registradorPago: "",
        aprobador: "",
        contador: "",
        viaje: this.fmrFiltros.codigo == null ? "" : this.fmrFiltros.codigo,
        ruta: this.fmrFiltros.ruta == null ? "" : this.fmrFiltros.ruta,
        hotel: this.fmrFiltros.hotel == null ? "" : this.fmrFiltros.hotel,
        estado: this.fmrFiltros.estado,
        ciudad: "",
      };
      this.Tipo = 1;
    } else if (this.Tipo == 2) {
      parametros = {
        usuario: this.usuarioSesion.Usuario,
        preaprobador: "",
        registradorPago: "",
        aprobador: "",
        contador: "",
        viaje: this.fmrFiltros.codigo == null ? "" : this.fmrFiltros.codigo,
        ruta: this.fmrFiltros.ruta == null ? "" : this.fmrFiltros.ruta,
        hotel: this.fmrFiltros.hotel == null ? "" : this.fmrFiltros.hotel,
        estado: "REGISTRADO",
        ciudad: "",
      };
      this.Tipo = 2;
    } else if (this.Tipo == 3) {
      parametros = {
        usuario: this.usuarioSesion.Usuario,
        preaprobador: "",
        registradorPago: "",
        aprobador: "",
        contador: "",
        viaje: this.fmrFiltros.codigo == null ? "" : this.fmrFiltros.codigo,
        ruta: this.fmrFiltros.ruta == null ? "" : this.fmrFiltros.ruta,
        hotel: this.fmrFiltros.hotel == null ? "" : this.fmrFiltros.hotel,
        estado: this.fmrFiltros.estado,
        ciudad: "",
      };
      this.Tipo = 3;
    } else if (this.Tipo == 4) {
      parametros = {
        usuario: this.usuarioSesion.Usuario,
        preaprobador: "",
        registradorPago: "",
        aprobador: "",
        contador: "",
        viaje: this.fmrFiltros.codigo == null ? "" : this.fmrFiltros.codigo,
        ruta: this.fmrFiltros.ruta == null ? "" : this.fmrFiltros.ruta,
        hotel: this.fmrFiltros.hotel == null ? "" : this.fmrFiltros.hotel,
        estado: this.fmrFiltros.estado,
        ciudad: "",
      };
      this.Tipo = 4;
    } else if (this.Tipo == 5) {
      parametros = {
        usuario: this.usuarioSesion.Usuario,
        preaprobador: "",
        registradorPago: "",
        aprobador: "",
        contador: "",
        viaje: this.fmrFiltros.codigo == null ? "" : this.fmrFiltros.codigo,
        ruta: this.fmrFiltros.ruta == null ? "" : this.fmrFiltros.ruta,
        hotel: this.fmrFiltros.hotel == null ? "" : this.fmrFiltros.hotel,
        estado: this.fmrFiltros.estado,
        ciudad: "",
      };
      this.Tipo = 5;
    }
    return parametros;
  }

  public ModificarTipo() {
    if (this.fmrFiltros.perfil == "APROBADOR") {
      this.fmrFiltros.estado = "CONFIRMADO";
      this.Tipo = 4;
    } else if (this.fmrFiltros.perfil == this.preAprobador) {
      this.fmrFiltros.estado = "GENERADO";
      this.Tipo = 2;
    } else if (this.fmrFiltros.perfil == "CONTADOR") {
      this.Tipo = 5;
    } else if (this.fmrFiltros.perfil == this.registradorPago) {
      this.Tipo = 3;
      this.fmrFiltros.estado = "APROBADO";
    } else if (this.fmrFiltros.perfil == "REGISTRADOR") {
      this.Tipo = 1;
    }
    this.FiltrarViajes();
  }

  public ModificarTipoDinamico(estado: any) {
    this.fmrFiltros.estado = estado;
    this.FiltrarViajes();
  }
}
