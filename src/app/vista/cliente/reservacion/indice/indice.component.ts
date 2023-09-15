import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AlojamientoComponent } from '../alojamiento/alojamiento.component';
import { GastoViajeComponent } from '../gastos-viaje/gasto-viaje.component';
import { TransporteComponent } from '../transporte/transporte.component';
import { ViajeComponent } from '../viaje/viaje.component';
import { ServicioSesionExterna } from '../../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioPlantillaCorreoDatafast } from '../../../../variable/correo/plantilla-correo-datafast.service';
import { ServicioUsuario } from '../../../../servicios/usuario/usuario.service';
import { ServicioGlobales } from '../../../../metodos/globales/globales.service';
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';
import { ServicioDataInternos } from '../../../../controladores/internos/datos-internos.service';
import { ServicioDataExternos } from '../../../../controladores/externos/datos-externos.service';
import Swal from "sweetalert2";

declare var $: any;
declare var moment: any;
@Component({
  selector: "app-index",
  templateUrl: "./indice.component.html",
  styleUrls: ["./indice.component.css"],
})
export class IndiceComponent implements OnInit {
  @ViewChild(AlojamientoComponent) lodgingComponent: AlojamientoComponent;
  @ViewChild(GastoViajeComponent)
  travelExpensesComponent: GastoViajeComponent;
  @ViewChild(TransporteComponent) transportComponent: TransporteComponent;
  @ViewChild(ViajeComponent) travelComponent: ViajeComponent;

  tipoMenu = 1;
  public mensaje = "Cargando Información...";
  public estiloClaseActiva = "show active";
  public pestaniaTransporte = "#transport";
  public estiloClasePuntero = "pointer-events";
  public textoInformacion = "Información";
  public textoCargoPreaprobador = "PRE-APROBADOR";
  public textoCargoContador = "CONTADOR";
  public textoCargoRegistradoPago = "REGISTRADOR PAGO";
  public textoCargoTesoreria = "TESORERIA";
  lstBuscarProveedorPor: Array<string> = ["Ruc", "Nombre"];

  dtRegistro = {
    codigoCompania: null,
    compania: null,
    nombre: null,
    identificacion: null,
    correo: null,
    departamento: null,
    posicion: null,
    ciudad: null,
    usuario: null,
  };

  vlRegistro: any = {
    compania: null,
    nombre: null,
  };

  dtViaje = {
    fechaInicio: null,
    fechaInicioHora: new Date(),
    fechaFin: null,
    fechaFinHora: new Date(),
    tipoViaje: null,
    nombreCorto: null,
    requiereHospedaje: null,
    numeroNoches: 0,
    viajeCapacitacion: null,
    razonViaje: null,
    bloqueo: null,
  };

  vlViaje = {
    fechaInicio: null,
    fechaInicioHora: null,
    fechaFin: null,
    fechaFinHora: null,
    tipoViaje: null,
    nombreCorto: null,
    requiereHospedaje: null,
    numeroNoches: null,
    viajeCapacitacion: null,
    razonViaje: null,
  };

  dtTransporte = {
    destino: null,
    nombreDestino: null,
    requierePasaje: null,
    requiereMovilizacion: null,
    requiereMovilizacionContratada: null,
    fechaEmision: null,
    nombreAereolinea: null,
    numeroPasaje: null,
    referenciaPago: null,
    valorPago: null,
    impuestoAereo: null,
    impuesto: null,
    valorImpuesto: null,
    valorPasaje: null,
    numeroKilometros: null,
    valorKilometros: null,
    dtImpuesto: null,
    total: null,
  };

  vlTransporte = {
    destino: null,
    requierePasaje: null,
    requiereMovilizacion: null,
    requiereMovilizacionContratada: null,
    fechaEmision: null,
    nombreAereolinea: null,
    numeroPasaje: null,
    referenciaPago: null,
    valorPago: null,
    impuestoAereo: null,
    impuesto: null,
    valorImpuesto: null,
    valorPasaje: null,
    numeroKilometros: null,
    valorKilometros: null,
    total: null,
  };

  dtHotel = {
    hotel: null,
    tarifa: null,
    ubicacion: null,
  };

  vlHotel = {
    hotel: null,
    tarifa: null,
  };

  dtDinero = {
    dias: 1,
    noches: null,
    dineroDias: null,
    dineroNoches: null,
    totalDineroDiasNoches: null,
    seleccionarDinero: null,
    totalDinero: null,
    descripcionDinero: null,
    totalHotel: null,
    total: 0,
    numeroKilometros: null,
    valorKilometros: null,
    requiereMovilizacion: null,
    otroDinero: "No",
    valorOtroDinero: 0,
    justificarDinero: null,
  };

  dtAprobador = {
    usuario: null,
    nombre: null,
    ciudad: null,
  };

  dtPreAprobador = {
    Id: null,
    usuario: null,
    nombre: null,
    ciudad: null,
  };

  dtContador = {
    Id: null,
    usuario: null,
    nombre: null,
    ciudad: null,
  };

  dtRegistradorPago = {
    Id: null,
    usuario: null,
    nombre: null,
    ciudad: null,
  };

  dtBuscarProveedor = {
    buscarPor: null,
    campoIngresado: null,
    ruc: "",
    nombre: "",
    token: null,
  };

  vlAprobador = {
    usuario: null,
    nombre: null,
  };

  dtTesoreria: any;
  seleccionarValorRutaPredeterminada: any = "";
  seleccionarHotel: any;
  lstParametros = [];
  nombres = [];
  apellidos = [];
  RutaBandera = 0;
  lstViaticos = [];
  nombreUsuarioAprobador = "";
  RutaTemporalId: any;
  viajeExistente: any;
  idViaje: any;
  deshabilitarBotonFinalizar = false;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly servicioUsuario: ServicioUsuario,
    public global: ServicioGlobales,
    public validador: ServicioValidaciones,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.idViaje = this.rutaActiva.snapshot.params.id;
    if (this.idViaje == undefined) {
      this.ObtenerRegistro();
    } else {
      this.ObtenerViaje(parseInt(this.idViaje));
    }
  }

  public ObtenerViaje(id: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        if (res != null) {
          this.viajeExistente = res;
          // datos del vieaje
          this.dtViaje.fechaInicio = this.viajeExistente.FechaInicioViaje;
          this.dtViaje.fechaFin = this.viajeExistente.FechaFinViaje;
          this.dtViaje.fechaInicioHora = this.viajeExistente.HoraInicioViaje;
          this.dtViaje.fechaFinHora = this.viajeExistente.HoraFinViaje;
          this.dtViaje.tipoViaje = this.viajeExistente.TipoViaje;
          this.dtViaje.nombreCorto = this.viajeExistente.NombreViaje;
          this.dtViaje.requiereHospedaje = this.viajeExistente.RequiereHospedajeViaje;
          this.dtViaje.bloqueo = false;
          this.dtViaje.numeroNoches = this.viajeExistente.NumeroNochesViaje;
          this.dtViaje.viajeCapacitacion = this.viajeExistente.ViajeCapacitacion;
          this.dtViaje.razonViaje = this.viajeExistente.MotivoViaje;

          // datos del transporte
          this.seleccionarValorRutaPredeterminada =
            this.viajeExistente.Transporte.Ruta.IdRuta;
          if (this.viajeExistente.TipoViaje === "Aéreo") {
            this.dtTransporte.requierePasaje = this.viajeExistente.Transporte.RequierePasajeAereo;
            this.dtTransporte.fechaEmision = this.viajeExistente.Transporte.FechaEmisionAereo;
            this.dtTransporte.nombreAereolinea = this.viajeExistente.Transporte.NombreAerolineaAereo;
            this.dtTransporte.numeroPasaje = this.viajeExistente.Transporte.NumeroPasajeAereo;
            this.dtTransporte.referenciaPago = this.viajeExistente.Transporte.ReferenciaAereo;
            this.dtTransporte.valorPago = this.viajeExistente.Transporte.ValorAereo;
            this.dtTransporte.impuestoAereo = this.viajeExistente.Transporte.ImpuestoAereo;
            this.dtTransporte.impuesto = this.viajeExistente.Transporte.ImpuestoPorcentajeAereo == "" ? 0 : parseFloat(this.viajeExistente.Transporte.ImpuestoPorcentajeAereo);
            this.dtTransporte.valorImpuesto = this.viajeExistente.Transporte.ImpuestoValorAereo;
            this.dtTransporte.valorPasaje = this.viajeExistente.Transporte.TotalAereo;
          } else if (this.viajeExistente.TipoViaje === "Terrestre") {
            this.dtTransporte.requiereMovilizacion = this.viajeExistente.Transporte.MovilizacionTerrestre;
            this.dtTransporte.requiereMovilizacionContratada = this.viajeExistente.Transporte.MovilizacionTerrestreContratada;
            this.dtTransporte.numeroKilometros = this.viajeExistente.Transporte.KilometrosTerrestre == "" ? 0 : parseFloat(this.viajeExistente.Transporte.KilometrosTerrestre);
            this.dtTransporte.valorKilometros = this.viajeExistente.Transporte.ValorTerrestre == "" ? "0" : this.viajeExistente.Transporte.ValorTerrestre;
          }
          this.dtTransporte.nombreDestino = this.viajeExistente.Transporte.Ruta.DestinoRuta;

          //Aprobador
          this.dtAprobador.usuario = this.viajeExistente.Aprobador.Usuario;
          this.nombreUsuarioAprobador = this.viajeExistente.Aprobador.Usuario;
          if (this.viajeExistente.Hotel.EstadoHotel == 0) {
            this.seleccionarHotel = null;
          } else {
            this.seleccionarHotel = this.viajeExistente.Hotel;
          }

          $("#tab1").css(this.estiloClasePuntero, "all");
          $("#tab2").css(this.estiloClasePuntero, "all");
          $("#tab3").css(this.estiloClasePuntero, "all");
          $("#tab4").css(this.estiloClasePuntero, "all");
          $("#tab5").css(this.estiloClasePuntero, "all");
          $("#tab6").css(this.estiloClasePuntero, "all");

          this.ObtenerRegistroEditar();
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerViatico(id: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViatico(id)
      .then((res) => {
        this.spinner.hide();
        this.lstViaticos = res;

        for (var viatico of res) {
          if (viatico.Tipo === "Otros") {
            this.dtDinero.otroDinero = viatico.Cantidad;
            this.dtDinero.valorOtroDinero = parseFloat(viatico.Valor);
            this.dtDinero.justificarDinero = viatico.Justificacion;
            if (viatico.Cantidad === "Sí") {
              this.travelExpensesComponent.estadoOtroDinero = true;
            } else {
              this.travelExpensesComponent.estadoOtroDinero = false;
            }
          }
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerRegistro() {
    var usuario = this.servicioUsuario.ObtenerUsuario();
    this.dtRegistro.nombre = usuario.NombreCompleto.toUpperCase();
    this.dtRegistro.identificacion = usuario.Cedula.toUpperCase();
    this.dtRegistro.correo = usuario.Email;
    this.dtRegistro.departamento = usuario.Departamento.toUpperCase();
    this.dtRegistro.posicion = usuario.Cargo.toUpperCase();
    this.dtRegistro.ciudad = usuario.CiudadDescripcion.toUpperCase();
    this.dtRegistro.usuario = usuario.Usuario;
    this.nombres =
      usuario.Nombres != "" || usuario.Nombres != null || usuario.Nombres != undefined
        ? usuario.Nombres.split(" ")
        : [];
    this.apellidos =
      usuario.Apellidos != "" ||
        usuario.Apellidos != null ||
        usuario.Apellidos != undefined
        ? usuario.Apellidos.split(" ")
        : [];
    this.dtViaje.nombreCorto = `${(this.nombres.length == 0 ? "" :
      this.nombres[0])} ${(this.apellidos.length == 0 ? "" :
        this.apellidos[0])}`;
    this.spinner.hide();
  }

  public ObtenerRegistroEditar() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerUsuario(token, this.viajeExistente.Registrador.Usuario)
      .then((res) => {
        var usuario = res;

        this.dtRegistro.nombre = usuario.NombreCompleto.toUpperCase();
        this.dtRegistro.identificacion = usuario.Cedula.toUpperCase();
        this.dtRegistro.correo = usuario.Email;
        this.dtRegistro.departamento = usuario.Departamento.toUpperCase();
        this.dtRegistro.posicion = usuario.Cargo.toUpperCase();
        this.dtRegistro.ciudad = usuario.CiudadDescripcion.toUpperCase();
        this.dtRegistro.usuario = usuario.Usuario;
        this.nombres =
          usuario.Nombres != "" ||
            usuario.Nombres != null ||
            usuario.Nombres != undefined
            ? usuario.Nombres.split(" ")
            : [];
        this.apellidos =
          usuario.Apellidos != "" ||
            usuario.Apellidos != null ||
            usuario.Apellidos != undefined
            ? usuario.Apellidos.split(" ")
            : [];
        this.dtViaje.nombreCorto = `${(this.nombres.length == 0 ? "" :
          this.nombres[0])} ${(this.apellidos.length == 0 ? "" :
            this.apellidos[0])}`;
        this.spinner.hide();
        this.ObtenerViatico(this.viajeExistente.IdViaje);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EstiloPaso(tab: any) {
    if (tab == 0) {
      $('#navigation-register a[id="register-tab"]').tab("show");
      $("#register").addClass(this.estiloClaseActiva);
      $("#travel").removeClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).removeClass(this.estiloClaseActiva);
      $("#hotel").removeClass(this.estiloClaseActiva);
      $("#money").removeClass(this.estiloClaseActiva);
      $("#approver").removeClass(this.estiloClaseActiva);
    } else if (tab == 1) {
      $('#navigation-register a[id="travel-tab"]').tab("show");
      $("#register").removeClass(this.estiloClaseActiva);
      $("#travel").addClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).removeClass(this.estiloClaseActiva);
      $("#hotel").removeClass(this.estiloClaseActiva);
      $("#money").removeClass(this.estiloClaseActiva);
      $("#approver").removeClass(this.estiloClaseActiva);
    } else if (tab == 2) {
      $('#navigation-register a[id="transport-tab"]').tab("show");
      $("#register").removeClass(this.estiloClaseActiva);
      $("#travel").removeClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).addClass(this.estiloClaseActiva);
      $("#hotel").removeClass(this.estiloClaseActiva);
      $("#money").removeClass(this.estiloClaseActiva);
      $("#approver").removeClass(this.estiloClaseActiva);
    } else if (tab == 3) {
      $('#navigation-register a[id="hotel-tab"]').tab("show");
      $("#register").removeClass(this.estiloClaseActiva);
      $("#travel").removeClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).removeClass(this.estiloClaseActiva);
      $("#hotel").addClass(this.estiloClaseActiva);
      $("#money").removeClass(this.estiloClaseActiva);
      $("#approver").removeClass(this.estiloClaseActiva);
    } else if (tab == 4) {
      $('#navigation-register a[id="money-tab"]').tab("show");
      $("#register").removeClass(this.estiloClaseActiva);
      $("#travel").removeClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).removeClass(this.estiloClaseActiva);
      $("#hotel").removeClass(this.estiloClaseActiva);
      $("#money").addClass(this.estiloClaseActiva);
      $("#approver").removeClass(this.estiloClaseActiva);
    } else if (tab == 5) {
      $('#navigation-register a[id="approver-tab"]').tab("show");
      $("#register").removeClass(this.estiloClaseActiva);
      $("#travel").removeClass(this.estiloClaseActiva);
      $(this.pestaniaTransporte).removeClass(this.estiloClaseActiva);
      $("#hotel").removeClass(this.estiloClaseActiva);
      $("#money").removeClass(this.estiloClaseActiva);
      $("#approver").addClass(this.estiloClaseActiva);
    }
  }

  public SiguientePaso(tab: any) {
    this.Administracion();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if (tab == 1) {
      var validationRegister = this.Validaciones(tab);
      if (validationRegister) {
        $("#tab1").css(this.estiloClasePuntero, "all");
        $("#tab2").css(this.estiloClasePuntero, "all");
        this.EstiloPaso(tab);
      } else {
        $("#tab2").css(this.estiloClasePuntero, "none");
      }
    } else if (tab == 2) {
      var validationTravel = this.Validaciones(tab);
      if (validationTravel) {
        $("#tab3").css(this.estiloClasePuntero, "all");
        this.EstiloPaso(tab);
      } else {
        $("#tab3").css(this.estiloClasePuntero, "none");
      }
    } else if (tab == 3) {
      var validationTransport = this.Validaciones(tab);
      if (validationTransport) {
        setTimeout(() => {
          this.lodgingComponent.ObtenerHotel();
          this.RutaBandera++;
          if (this.transportComponent.dtListaRutaSeleccionada != undefined) {
            if (this.RutaBandera == 1) {
              this.RutaTemporalId =
                this.transportComponent.dtListaRutaSeleccionada.IdRuta;
            }
            if (
              this.RutaTemporalId !=
              this.transportComponent.dtListaRutaSeleccionada.IdRuta
            ) {
              this.lodgingComponent.dtHotel.hotel = null;
              this.lodgingComponent.dtHotel.tarifa = null;
              this.lodgingComponent.dtHotelSeleccionado = null;
              this.RutaTemporalId =
                this.transportComponent.dtListaRutaSeleccionada.IdRuta;
            }
          }
        }, 1000);

        if (this.dtViaje.requiereHospedaje == "No") {
          this.dtHotel.hotel = 23;
          this.dtHotel.tarifa = 0;
          this.dtHotel.ubicacion = "";

          setTimeout(() => {
            $("#tab5").css(this.estiloClasePuntero, "all");
            this.EstiloPaso(tab + 1);
          }, 1000);
        } else {
          setTimeout(() => {
            $("#tab4").css(this.estiloClasePuntero, "all");
            this.EstiloPaso(tab);
          }, 1000);
        }
      } else {
        $("#tab4").css(this.estiloClasePuntero, "none");
      }
    } else if (tab == 4) {
      var validationLodging = this.Validaciones(tab);
      if (validationLodging) {
        $("#tab5").css(this.estiloClasePuntero, "all");
        this.EstiloPaso(tab);
      } else {
        $("#tab5").css(this.estiloClasePuntero, "none");
      }
    } else if (tab == 5) {
      var validationTravelExpenses = this.Validaciones(tab);
      if (validationTravelExpenses) {
        $("#tab6").css(this.estiloClasePuntero, "all");
        this.EstiloPaso(tab);
      } else {
        $("#tab6").css(this.estiloClasePuntero, "none");
      }
    }
  }

  public RegresoNavegacion(tab: any) {
    this.Administracion();
    if (tab == 0) {
      this.EstiloPaso(tab);
    } else if (tab == 1) {
      this.EstiloPaso(tab);
    } else if (tab == 2) {
      this.EstiloPaso(tab);
    } else if (tab == 3) {
      if (this.dtViaje.requiereHospedaje == "No") {
        this.EstiloPaso(tab - 1);
      } else {
        this.EstiloPaso(tab);
      }
    } else if (tab == 4) {
      this.EstiloPaso(tab);
    } else if (tab == 5) {
      this.EstiloPaso(tab);
    }
  }

  public Validaciones(tab: any) {
    var state = true;
    if (tab == 1) {
      var validation = this.validador.ValidacionesRegistro(this.dtRegistro);
      this.vlRegistro = validation.vlRegistro;
      state = validation.state;
    } else if (tab == 2) {
      var validation2 = this.validador.ValidacionesViaje(this.dtViaje);
      this.vlViaje = validation2.vlViaje;
      state = validation2.state;
    } else if (tab == 3) {
      var validation3 = this.validador.ValidacionesTransporte(
        this.dtTransporte,
        this.dtViaje
      );
      this.vlTransporte = validation3.vlTransporte;
      state = validation3.state;
    } else if (tab == 4) {
      var validation4 = this.validador.ValidacionesAlojamiento(this.dtHotel);
      this.vlHotel = validation4.vlHotel;
      state = validation4.state;
    } else if (tab == 5) {
      if (
        this.dtDinero.otroDinero == "Sí" &&
        (this.dtDinero.valorOtroDinero == null ||
          this.dtDinero.valorOtroDinero == 0 ||
          this.dtDinero.valorOtroDinero == undefined)
      ) {
        this.global.Alerta(
          this.textoInformacion,
          "Debe ingresar un valor en viáticos adicionales",
          "info"
        );
        state = false;
      } else if (
        this.dtDinero.otroDinero == "Sí" &&
        (this.dtDinero.justificarDinero == null ||
          this.dtDinero.justificarDinero == undefined ||
          this.dtDinero.justificarDinero == "")
      ) {
        this.global.Alerta(
          this.textoInformacion,
          "Debe ingresar una descripción en el campo justificación",
          "info"
        );
        state = false;
      }
    }
    return state;
  }

  public Administracion() {
    this.travelExpensesComponent.ObtenerCalculos();
  }

  public BorrarTransporteDatos() {
    if (this.travelComponent.dtViaje.tipoViaje == "Aéreo") {
      this.transportComponent.dtTransporte.requiereMovilizacion = null;
      this.transportComponent.dtTransporte.numeroKilometros = null;
      this.transportComponent.dtTransporte.valorKilometros = null;
    } else if (this.travelComponent.dtViaje.tipoViaje == "Terrestre") {
      this.transportComponent.dtTransporte.requierePasaje = null;
      this.transportComponent.dtTransporte.impuesto = null;
      this.transportComponent.dtTransporte.dtImpuesto = null;
      this.transportComponent.dtTransporte.impuestoAereo = null;
      this.transportComponent.dtTransporte.valorPago = null;
      this.transportComponent.dtTransporte.referenciaPago = null;
      this.transportComponent.dtTransporte.numeroPasaje = null;
      this.transportComponent.dtTransporte.nombreAereolinea = null;
      this.transportComponent.dtTransporte.fechaEmision = null;
    }
  }

  public TerminarReserva() {
    this.spinner.show();
    if (
      this.dtAprobador.usuario == null ||
      this.dtAprobador.usuario == undefined ||
      this.dtAprobador.usuario == ""
    ) {
      this.spinner.hide();
      this.global.Alerta(
        this.textoInformacion,
        "Debe seleccionar un aprobador para poder continuar",
        "info"
      );
    } else {
      var token = this.sesionExterna.ObtenerClaveExterna();
      this.dataExterna
        .ObtenerUsuario(token, this.dtAprobador.usuario)
        .then((res) => {
          var data: any = {
            NombreUsuario: res.ApellidosNombres == null ? res.NombreCompleto : res.ApellidosNombres,
            UserUsuario: res.Usuario,
            CiudadUsuario: res.CiudadDescripcion,
            EmailUsuario: res.Email,
          };

          this.dataInterna
            .GestionUsuarioAprobadorViaje(data)
            .then((res) => {
              var usuario = this.servicioUsuario.ObtenerUsuario();

              var dataConsulta = {
                CargoPA: this.textoCargoPreaprobador,
                CargoC: this.textoCargoContador,
                CargoRP: this.textoCargoRegistradoPago,
                CargoT: this.textoCargoTesoreria,
                Ciudad: usuario.CiudadDescripcion,
              };

              this.dataInterna
                .ObtenerDatosUsuario(
                  dataConsulta.CargoPA,
                  dataConsulta.CargoC,
                  dataConsulta.CargoRP,
                  dataConsulta.CargoT,
                  dataConsulta.Ciudad
                )
                .then((res) => {
                  this.spinner.hide();
                  var resultado = res;

                  for (const user of resultado) {
                    if (
                      user.NombreRol == this.textoCargoContador &&
                      user.CiudadUsuario == usuario.CiudadDescripcion
                    ) {
                      this.dtContador.Id = user.IdUsuarioRolViaje;
                      this.dtContador.nombre = user.NombreUsuario;
                      this.dtContador.usuario = user.UserUsuario;
                      this.dtContador.ciudad = user.CiudadUsuario;
                    } else if (
                      user.NombreRol == this.textoCargoPreaprobador &&
                      user.CiudadUsuario == usuario.CiudadDescripcion
                    ) {
                      this.dtPreAprobador.Id = user.IdUsuarioRolViaje;
                      this.dtPreAprobador.nombre = user.NombreUsuario;
                      this.dtPreAprobador.usuario = user.UserUsuario;
                      this.dtPreAprobador.ciudad = user.CiudadUsuario;
                    } else if (
                      user.NombreRol == this.textoCargoRegistradoPago &&
                      user.CiudadUsuario == usuario.CiudadDescripcion
                    ) {
                      this.dtRegistradorPago.Id = user.IdUsuarioRolViaje;
                      this.dtRegistradorPago.nombre = user.NombreUsuario;
                      this.dtRegistradorPago.usuario = user.UserUsuario;
                      this.dtRegistradorPago.ciudad = user.CiudadUsuario;
                    } else if (
                      user.NombreRol == this.textoCargoTesoreria &&
                      user.CiudadUsuario == usuario.CiudadDescripcion
                    ) {
                      this.dtTesoreria = user.UserUsuario;
                    }
                  }

                  if (
                    this.dtContador.usuario == null ||
                    this.dtPreAprobador.usuario == null ||
                    this.dtRegistradorPago.usuario == null ||
                    this.dtTesoreria == undefined
                  ) {
                    if (this.dtContador.usuario == null) {
                      this.global.VerAlerta(
                        this.textoInformacion,
                        `La plataforma de viajes no posee configurado un <b>Usuario Contador</b> para la ciudad: <b>${usuario.CiudadDescripcion}</b><br>Comuníquese con el administrador de la plataforma.`,
                        "warning"
                      );
                    } else if (this.dtPreAprobador.usuario == null) {
                      this.global.VerAlerta(
                        this.textoInformacion,
                        `La plataforma de viajes no posee configurado un <b>Usuario PreAprobador</b> para la ciudad: <b>${usuario.CiudadDescripcion}</b><br>Comuníquese con el administrador de la plataforma.`,
                        "warning"
                      );
                    } else if (this.dtRegistradorPago.usuario == null) {
                      this.global.VerAlerta(
                        this.textoInformacion,
                        `La plataforma de viajes no posee configurado un <b>Usuario Registrador Pago</b> para la ciudad: <b>${usuario.CiudadDescripcion}</b><br>Comuníquese con el administrador de la plataforma.`,
                        "warning"
                      );
                    } else if (this.dtTesoreria == undefined) {
                      this.global.VerAlerta(
                        this.textoInformacion,
                        `La plataforma de viajes no posee configurado un <b>Usuario de Tesorería</b> para la ciudad: <b>${usuario.CiudadDescripcion}</b><br>Comuníquese con el administrador de la plataforma.`,
                        "warning"
                      );
                    }
                  } else {
                    var lstMoney = [
                      {
                        Tipo: "Noches",
                        Cantidad: this.dtViaje.numeroNoches,
                        Valor: Math.round(this.dtDinero.dineroNoches * 100) / 100,
                        Justificacion: "",
                      },
                      {
                        Tipo: "Días",
                        Cantidad: this.dtDinero.dias,
                        Valor: Math.round(this.dtDinero.dineroDias * 100) / 100,
                        Justificacion: "",
                      },
                      {
                        Tipo: "Subtotal",
                        Cantidad: "",
                        Valor:
                          Math.round(this.dtDinero.totalDineroDiasNoches * 100) /
                          100,
                        Justificacion: "",
                      },
                      {
                        Tipo: "Kilometros",
                        Cantidad:
                          this.dtDinero.numeroKilometros == null
                            ? 0
                            : this.dtDinero.numeroKilometros,
                        Valor:
                          Math.round(this.dtDinero.valorKilometros * 100) / 100,
                        Justificacion: "",
                      },
                      {
                        Tipo: "Otros",
                        Cantidad: this.dtDinero.otroDinero,
                        Valor:
                          Math.round(this.dtDinero.valorOtroDinero * 100) / 100,
                        Justificacion:
                          this.dtDinero.justificarDinero == null
                            ? ""
                            : this.dtDinero.justificarDinero,
                      },
                      {
                        Tipo: "Total",
                        Cantidad: "",
                        Valor: Math.round(this.dtDinero.total * 100) / 100,
                        Justificacion: "",
                      },
                      {
                        Tipo: "Hospedaje",
                        Cantidad: "1",
                        Valor: Math.round(this.dtDinero.totalHotel * 100) / 100,
                        Justificacion: "",
                      },
                    ];

                    this.spinner.show();
                    this.dataInterna
                      .ObtenerParametro()
                      .then((res) => {
                        this.spinner.hide();
                        var lstParametros = res;
                        var tmpDiasLiquidar = lstParametros.find(
                          (e:any) => e.NombreParametro == "DiasMaximoLiquidar"
                        );
                        var diasAumentar = tmpDiasLiquidar.ValorParametro;

                        var fechaPosibleLiquidacion = this.AgregarDiasSemanas(
                          moment(this.dtViaje.fechaFin),
                          diasAumentar
                        );
                        var newDateLiquidar = moment(
                          fechaPosibleLiquidacion
                        ).format("YYYY-MM-DD");

                        var travel = {
                          Identificador: 1,
                          Query: JSON.stringify(lstMoney),
                          Viaje: {
                            IdViaje: 0,
                            ComentariosUnoViaje: "",
                            ComentariosDosViaje: "",
                            HoraInicioViaje: this.dtViaje.fechaInicioHora,
                            HoraFinViaje: this.dtViaje.fechaFinHora,
                            CatalogoEstado: {
                              IdEstado: 1,
                            },
                            Registrador: {
                              CodigoEmpresa: this.dtRegistro.codigoCompania,
                              NombreEmpresa: this.dtRegistro.compania,
                              Identificacion: this.dtRegistro.identificacion,
                              Email: this.dtRegistro.correo,
                              Departamento: this.dtRegistro.departamento,
                              Cargo: this.dtRegistro.posicion,
                              Ciudad: this.dtRegistro.ciudad,
                              Usuario: this.dtRegistro.usuario,
                            },
                            FechaInicioViaje: this.dtViaje.fechaInicio,
                            FechaFinViaje: this.dtViaje.fechaFin,
                            FechaMaximaLiquidacionViaje: newDateLiquidar,
                            TipoViaje: this.dtViaje.tipoViaje,
                            NombreViaje: this.dtViaje.nombreCorto,
                            RequiereHospedajeViaje:
                              this.dtViaje.requiereHospedaje,
                            NumeroNochesViaje: this.dtViaje.numeroNoches,
                            ViajeCapacitacion: this.dtViaje.viajeCapacitacion,
                            MotivoViaje: this.dtViaje.razonViaje,
                            Transporte: {
                              Ruta: {
                                IdRuta: this.dtTransporte.destino,
                              },
                              MovilizacionTerrestre:
                                this.dtTransporte.requiereMovilizacion == null
                                  ? ""
                                  : this.dtTransporte.requiereMovilizacion,
                              MovilizacionTerrestreContratada:
                                this.dtTransporte
                                  .requiereMovilizacionContratada == null
                                  ? ""
                                  : this.dtTransporte
                                    .requiereMovilizacionContratada,
                              KilometrosTerrestre:
                                this.dtTransporte.numeroKilometros == null
                                  ? ""
                                  : this.dtTransporte.numeroKilometros,
                              ValorTerrestre:
                                this.dtTransporte.valorKilometros == null
                                  ? ""
                                  : this.dtTransporte.valorKilometros,
                              RequierePasajeAereo:
                                this.dtTransporte.requierePasaje == null
                                  ? ""
                                  : this.dtTransporte.requierePasaje,
                              FechaEmisionAereo:
                                this.dtTransporte.fechaEmision == null
                                  ? ""
                                  : this.dtTransporte.fechaEmision,
                              NombreAerolineaAereo:
                                this.dtTransporte.nombreAereolinea == null
                                  ? ""
                                  : this.dtTransporte.nombreAereolinea,
                              NumeroPasajeAereo:
                                this.dtTransporte.numeroPasaje == null
                                  ? ""
                                  : this.dtTransporte.numeroPasaje,
                              ReferenciaAereo:
                                this.dtTransporte.referenciaPago == null
                                  ? ""
                                  : this.dtTransporte.referenciaPago,
                              ValorAereo:
                                this.dtTransporte.valorPago == null
                                  ? ""
                                  : this.dtTransporte.valorPago,
                              ImpuestoAereo:
                                this.dtTransporte.impuestoAereo == null
                                  ? ""
                                  : this.dtTransporte.impuestoAereo,
                              ImpuestoPorcentajeAereo:
                                this.dtTransporte.impuesto == null
                                  ? ""
                                  : this.dtTransporte.impuesto,
                              ImpuestoValorAereo:
                                this.dtTransporte.valorImpuesto == null
                                  ? ""
                                  : this.dtTransporte.valorImpuesto,
                              TotalAereo:
                                this.dtTransporte.valorPasaje == null
                                  ? ""
                                  : this.dtTransporte.valorPasaje,
                            },
                            Hotel: {
                              IdHotel:
                                this.dtHotel.hotel == null
                                  ? 23
                                  : this.dtHotel.hotel,
                            },
                            Aprobador: {
                              Usuario: this.dtAprobador.usuario,
                              Nombre: this.dtAprobador.nombre,
                              Ciudad: this.dtAprobador.ciudad,
                            },
                            PreAprobador: {
                              IdPreAprobador: this.dtPreAprobador.Id,
                              Usuario: this.dtPreAprobador.usuario,
                              Nombre: this.dtPreAprobador.nombre,
                              Ciudad: this.dtPreAprobador.ciudad,
                            },
                            Contador: {
                              IdContador: this.dtContador.Id,
                              Usuario: this.dtContador.usuario,
                              Nombre: this.dtContador.nombre,
                              Ciudad: this.dtContador.ciudad,
                            },
                            RegistradorPago: {
                              IdRegistradorPago: this.dtRegistradorPago.Id,
                              Usuario: this.dtRegistradorPago.usuario,
                              Nombre: this.dtRegistradorPago.nombre,
                              Ciudad: this.dtRegistradorPago.ciudad,
                            },
                            TipoCuentaViaje: "",
                            DepartamentoUnoViaje: "",
                            DepartamentoDosViaje: "",
                            CentroCostoViaje: "",
                            PropositoViaje: "",
                            TipoGastoViaje: "",
                            RegistroAnticipo: this.dtTesoreria,
                          },
                        };
                        this.spinner.show();
                        this.dataInterna
                          .GestionarViaje(travel)
                          .then((res) => {
                            this.spinner.hide();
                            this.InsertarViatico(
                              lstMoney,
                              res.Resultado.IdViaticos
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                            this.spinner.hide();
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                        this.spinner.hide();
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.spinner.hide();
                });
            })
            .catch((err) => {
              this.spinner.hide();
              console.log(err);
            });
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }
  }

  public AgregarDiasSemanas(fecha: any, dias: any) {
    fecha = moment(fecha);
    while (dias > 0) {
      fecha = fecha.add(1, "days");
      if (fecha.isoWeekday() !== 6 && fecha.isoWeekday() !== 7) {
        dias -= 1;
      }
    }
    return fecha;
  }

  public ModificarReservacion() {

    if (this.dtAprobador.usuario == null || this.dtAprobador.usuario == "") {
      this.global.Alerta(
        this.textoInformacion,
        "Debe seleccionar un aprobador",
        "error"
      );
    } else {

      var dataConsulta = {
        CargoPA: this.textoCargoPreaprobador,
        CargoC: this.textoCargoContador,
        CargoRP: this.textoCargoRegistradoPago,
        CargoT: this.textoCargoTesoreria,
        Ciudad: this.viajeExistente.Registrador.Ciudad,
      };

      this.dataInterna
        .ObtenerDatosUsuario(
          dataConsulta.CargoPA,
          dataConsulta.CargoC,
          dataConsulta.CargoRP,
          dataConsulta.CargoT,
          dataConsulta.Ciudad
        )
        .then((res) => {
          this.spinner.hide();
          var resultado = res;

          for (const usuario of resultado) {
            if (usuario.NombreRol == this.textoCargoContador && usuario.CiudadUsuario.toUpperCase() == this.viajeExistente.Registrador.Ciudad.toUpperCase()) {
              this.dtContador.Id = usuario.IdUsuarioRolViaje;
              this.dtContador.nombre = usuario.NombreUsuario;
              this.dtContador.usuario = usuario.UserUsuario;
              this.dtContador.ciudad = usuario.CiudadUsuario;
            } else if (usuario.NombreRol == this.textoCargoPreaprobador && usuario.CiudadUsuario.toUpperCase() == this.viajeExistente.Registrador.Ciudad.toUpperCase()) {
              this.dtPreAprobador.Id = usuario.IdUsuarioRolViaje;
              this.dtPreAprobador.nombre = usuario.NombreUsuario;
              this.dtPreAprobador.usuario = usuario.UserUsuario;
              this.dtPreAprobador.ciudad = usuario.CiudadUsuario;
            } else if (usuario.NombreRol == this.textoCargoRegistradoPago && usuario.CiudadUsuario.toUpperCase() == this.viajeExistente.Registrador.Ciudad.toUpperCase()) {
              this.dtRegistradorPago.Id = usuario.IdUsuarioRolViaje;
              this.dtRegistradorPago.nombre = usuario.NombreUsuario;
              this.dtRegistradorPago.usuario = usuario.UserUsuario;
              this.dtRegistradorPago.ciudad = usuario.CiudadUsuario;
            } else if (usuario.NombreRol == this.textoCargoTesoreria && usuario.CiudadUsuario.toUpperCase() == this.viajeExistente.Registrador.Ciudad.toUpperCase()) {
              this.dtTesoreria = usuario.UserUsuario;
            }
          }

          if (this.dtContador.usuario == null || this.dtPreAprobador.usuario == null || this.dtRegistradorPago.usuario == null || this.dtTesoreria == undefined) {
            if (this.dtContador.usuario == null) {
              this.global.VerAlerta(this.textoInformacion, `La plataforma de viajes no posee configurado un <b>Usuario Contador</b> para la ciudad: <b>${this.viajeExistente.Registrador.Ciudad}</b><br>Comuníquese con el administrador de la plataforma.`, "warning");
            } else if (this.dtPreAprobador.usuario == null) {
              this.global.VerAlerta(this.textoInformacion, `La plataforma de viajes no posee configurado un <b>Usuario PreAprobador</b> para la ciudad: <b>${this.viajeExistente.Registrador.Ciudad}</b><br>Comuníquese con el administrador de la plataforma.`, "warning");
            } else if (this.dtRegistradorPago.usuario == null) {
              this.global.VerAlerta(this.textoInformacion, `La plataforma de viajes no posee configurado un <b>Usuario Registrador Pago</b> para la ciudad: <b>${this.viajeExistente.Registrador.Ciudad}</b><br>Comuníquese con el administrador de la plataforma.`, "warning");
            } else if (this.dtTesoreria == undefined) {
              this.global.VerAlerta(this.textoInformacion, `La plataforma de viajes no posee configurado un <b>Usuario de Tesorería</b> para la ciudad: <b>${this.viajeExistente.Registrador.Ciudad}</b><br>Comuníquese con el administrador de la plataforma.`, "warning");
            }
          } else {
            var lstMoneyNew = [
              {
                Tipo: "Noches",
                Cantidad: this.dtViaje.numeroNoches,
                Valor: Math.round(this.dtDinero.dineroNoches * 100) / 100,
                Justificacion: "",
              },
              {
                Tipo: "Días",
                Cantidad: this.dtDinero.dias,
                Valor: Math.round(this.dtDinero.dineroDias * 100) / 100,
                Justificacion: "",
              },
              {
                Tipo: "Subtotal",
                Cantidad: "",
                Valor: Math.round(this.dtDinero.totalDineroDiasNoches * 100) / 100,
                Justificacion: "",
              },
              {
                Tipo: "Kilometros",
                Cantidad:
                  this.dtDinero.numeroKilometros == null
                    ? 0
                    : this.dtDinero.numeroKilometros,
                Valor: Math.round(this.dtDinero.valorKilometros * 100) / 100,
                Justificacion: "",
              },
              {
                Tipo: "Otros",
                Cantidad: this.dtDinero.otroDinero,
                Valor: Math.round(this.dtDinero.valorOtroDinero * 100) / 100,
                Justificacion:
                  this.dtDinero.justificarDinero == null
                    ? ""
                    : this.dtDinero.justificarDinero,
              },
              {
                Tipo: "Total",
                Cantidad: "",
                Valor: Math.round(this.dtDinero.total * 100) / 100,
                Justificacion: "",
              },
              {
                Tipo: "Hospedaje",
                Cantidad: "1",
                Valor: Math.round(this.dtDinero.totalHotel * 100) / 100,
                Justificacion: "",
              },
            ];

            this.spinner.show();
            this.dataInterna
              .ObtenerParametro()
              .then((res) => {
                this.spinner.hide();
                var lstParametros = res;
                var tmpDiasLiquidar = lstParametros.find((e: any) => e.NombreParametro == "DiasMaximoLiquidar");
                var diasAumentar = tmpDiasLiquidar.ValorParametro;
                var newDateLiquidar = moment(this.dtViaje.fechaFin).add(diasAumentar, "d");

                var travel = {
                  Identificador: 5,
                  Query: JSON.stringify(lstMoneyNew),
                  Viaje: {
                    IdViaje: this.idViaje == undefined ? 0 : this.idViaje,
                    ComentariosUnoViaje: "",
                    ComentariosDosViaje: "",
                    HoraInicioViaje: this.dtViaje.fechaInicioHora,
                    HoraFinViaje: this.dtViaje.fechaFinHora,
                    CatalogoEstado: {
                      IdEstado: 1,
                    },
                    Registrador: {
                      CodigoEmpresa: this.dtRegistro.codigoCompania,
                      NombreEmpresa: this.dtRegistro.compania,
                      Identificacion: this.dtRegistro.identificacion,
                      Email: this.dtRegistro.correo,
                      Departamento: this.dtRegistro.departamento,
                      Cargo: this.dtRegistro.posicion,
                      Ciudad: this.dtRegistro.ciudad,
                      Usuario: this.dtRegistro.usuario,
                    },
                    FechaInicioViaje: this.dtViaje.fechaInicio,
                    FechaFinViaje: this.dtViaje.fechaFin,
                    FechaMaximaLiquidacionViaje: newDateLiquidar,
                    TipoViaje: this.dtViaje.tipoViaje,
                    NombreViaje: this.dtViaje.nombreCorto,
                    RequiereHospedajeViaje: this.dtViaje.requiereHospedaje,
                    NumeroNochesViaje: this.dtViaje.numeroNoches,
                    ViajeCapacitacion: this.dtViaje.viajeCapacitacion,
                    MotivoViaje: this.dtViaje.razonViaje,
                    Transporte: {
                      Ruta: {
                        IdRuta: this.dtTransporte.destino,
                      },
                      MovilizacionTerrestre: this.dtTransporte.requiereMovilizacion == null ? "" : this.dtTransporte.requiereMovilizacion,
                      MovilizacionTerrestreContratada: this.dtTransporte.requiereMovilizacionContratada == null ? "" : this.dtTransporte.requiereMovilizacionContratada,
                      KilometrosTerrestre: this.dtTransporte.numeroKilometros == null ? "" : this.dtTransporte.numeroKilometros,
                      ValorTerrestre: this.dtTransporte.valorKilometros == null ? "" : this.dtTransporte.valorKilometros,
                      RequierePasajeAereo: this.dtTransporte.requierePasaje == null ? "" : this.dtTransporte.requierePasaje,
                      FechaEmisionAereo: this.dtTransporte.fechaEmision == null ? "" : this.dtTransporte.fechaEmision,
                      NombreAerolineaAereo: this.dtTransporte.nombreAereolinea == null ? "" : this.dtTransporte.nombreAereolinea,
                      NumeroPasajeAereo: this.dtTransporte.numeroPasaje == null ? "" : this.dtTransporte.numeroPasaje,
                      ReferenciaAereo: this.dtTransporte.referenciaPago == null ? "" : this.dtTransporte.referenciaPago,
                      ValorAereo: this.dtTransporte.valorPago == null ? "" : this.dtTransporte.valorPago,
                      ImpuestoAereo: this.dtTransporte.impuestoAereo == null ? "" : this.dtTransporte.impuestoAereo,
                      ImpuestoPorcentajeAereo: this.dtTransporte.impuesto == null ? "" : this.dtTransporte.impuesto,
                      ImpuestoValorAereo: this.dtTransporte.valorImpuesto == null ? "" : this.dtTransporte.valorImpuesto,
                      TotalAereo: this.dtTransporte.valorPasaje == null ? "" : this.dtTransporte.valorPasaje,
                    },
                    Hotel: {
                      IdHotel:
                        this.dtHotel.hotel == null ? 23 : this.dtHotel.hotel,
                    },
                    Aprobador: {
                      Usuario: this.dtAprobador.usuario,
                      Nombre: this.dtAprobador.nombre,
                      Ciudad: this.dtAprobador.ciudad,
                    },
                    PreAprobador: {
                      Usuario: this.dtPreAprobador.usuario,
                      Nombre: this.dtPreAprobador.nombre,
                      Ciudad: this.dtPreAprobador.ciudad,
                    },
                    Contador: {
                      Usuario: this.dtContador.usuario,
                      Nombre: this.dtContador.nombre,
                      Ciudad: this.dtContador.ciudad,
                    },
                    RegistradorPago: {
                      Usuario: this.dtRegistradorPago.usuario,
                      Nombre: this.dtRegistradorPago.nombre,
                      Ciudad: this.dtRegistradorPago.ciudad,
                    },
                    TipoCuentaViaje: "",
                    DepartamentoUnoViaje: "",
                    DepartamentoDosViaje: "",
                    CentroCostoViaje: "",
                    PropositoViaje: "",
                    TipoGastoViaje: "",
                    RegistroAnticipo: "",
                  },
                };

                if (travel.Viaje.TipoViaje === "Aéreo") {
                  travel.Viaje.Transporte.MovilizacionTerrestre = "";
                  travel.Viaje.Transporte.KilometrosTerrestre = "";
                  travel.Viaje.Transporte.ValorTerrestre = "";
                } else if (travel.Viaje.TipoViaje === "Terrestre") {
                  travel.Viaje.Transporte.RequierePasajeAereo = "";
                  travel.Viaje.Transporte.FechaEmisionAereo = "";
                  travel.Viaje.Transporte.NombreAerolineaAereo = "";
                  travel.Viaje.Transporte.NumeroPasajeAereo = "";
                  travel.Viaje.Transporte.ReferenciaAereo = "";
                  travel.Viaje.Transporte.ValorAereo = "";
                  travel.Viaje.Transporte.ImpuestoAereo = "";
                  travel.Viaje.Transporte.ImpuestoPorcentajeAereo = "";
                  travel.Viaje.Transporte.ImpuestoValorAereo = "";
                  travel.Viaje.Transporte.TotalAereo = "";
                }

                if (travel.Viaje.Transporte.MovilizacionTerrestre === "No") {
                  travel.Viaje.Transporte.KilometrosTerrestre = "";
                  travel.Viaje.Transporte.ValorTerrestre = "";
                }
                if (this.dtViaje.requiereHospedaje == "No") {
                  travel.Viaje.Hotel.IdHotel = 23;
                }
                this.spinner.show();
                this.dataInterna
                  .GestionarViaje(travel)
                  .then((res) => {
                    this.spinner.hide();
                    this.ObtenerViajeNuevamente(this.idViaje, lstMoneyNew);
                  })
                  .catch((err) => {
                    this.spinner.hide();
                  });
              })
              .catch((err) => {
                this.spinner.hide();
              });
          }
        })
        .catch((err) => {
          this.spinner.hide();
        });
    }
  }

  public ObtenerViajeNuevamente(id: any, lstDineroNuevoParametro: any) {
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        this.InsertarViaticoModificacion(lstDineroNuevoParametro, id);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public InsertarViatico(lstViaticos: any, idViaje: any) {
    var aux = "";
    for (const viatico of lstViaticos) {
      aux += `('${viatico.Tipo}','${viatico.Cantidad}','${viatico.Valor}','${viatico.Justificacion}',${idViaje}),`;
    }

    var sentencia = aux.substring(0, aux.length - 1);

    var datos = {
      Query: sentencia,
    };

    this.spinner.show();
    this.dataInterna
      .InsertarViatico(datos)
      .then((res) => {
        this.spinner.hide();

        if (res == 0) {
          Swal.fire({
            title: "Solicitud Guardada",
            html:
              `Se ha registrado correctamente la solicitud número <b>${idViaje}</b>.`,
            type: "success",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            this.ObtenerParametros(idViaje);
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public InsertarViaticoModificacion(lstViaticos: any, idViaje: any) {
    this.dataInterna
      .EliminarViaticosExistentes(idViaje)
      .then((res) => {
        var aux = "";
        for (const viatico of lstViaticos) {
          aux += `('${viatico.Tipo}','${viatico.Cantidad}','${viatico.Valor}','${viatico.Justificacion}',${idViaje}),`;
        }

        var sentencia = aux.substring(0, aux.length - 1);

        var datos = {
          Query: sentencia,
        };

        this.spinner.show();
        this.dataInterna
          .InsertarViatico(datos)
          .then((res) => {
            this.spinner.hide();

            if (res == 0) {
              Swal.fire({
                title: "Solicitud Modificada",
                html:
                  `Se ha modificado correctamente la solicitud número <b>${idViaje}</b>.`,
                type: "success",
                showCancelButton: false,
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result) {
                  this.ObtenerModificarParametros(idViaje);
                }
              });
            }
          })
          .catch((err) => {
            this.spinner.hide();
          });
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerParametros(parametro: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.spinner.hide();
        var lstParametros = res;
        var tmpAplicacion = lstParametros.find(
          (e:any) => e.NombreParametro == "IdAplicacion"
        );
        var tmpNombreOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "NombreOrigen"
        );
        var tmpEmailOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "EmailOrigen"
        );
        var tmpTiempoEspera = lstParametros.find(
          (e:any) => e.NombreParametro == "TiempoEspera"
        );

        this.EnviarEmailRegistrador(
          parametro,
          tmpAplicacion.ValorParametro,
          tmpNombreOrigen.ValorParametro,
          tmpEmailOrigen.ValorParametro,
          this.dtRegistro.nombre,
          this.dtRegistro.correo,
          tmpTiempoEspera
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerModificarParametros(parametro: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.spinner.hide();
        var lstParametros = res;
        var tmpAplicacion = lstParametros.find(
          (e:any) => e.NombreParametro == "IdAplicacion"
        );
        var tmpNombreOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "NombreOrigen"
        );
        var tmpEmailOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "EmailOrigen"
        );
        var tmpTiempoEspera = lstParametros.find(
          (e:any) => e.NombreParametro == "TiempoEspera"
        );

        this.EnviarEmailRegistradorModificar(
          parametro,
          tmpAplicacion.ValorParametro,
          tmpNombreOrigen.ValorParametro,
          tmpEmailOrigen.ValorParametro,
          this.dtRegistro.nombre,
          this.dtRegistro.correo,
          tmpTiempoEspera
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EnviarEmailRegistrador(
    idViaje: any,
    _app: any,
    nameOrigin: any,
    emailOrigin: any,
    nombreDestino: any,
    emailDestination: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var usuario = this.servicioUsuario.ObtenerUsuario();

    var correo = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailRegistrador(
          idViaje,
          this.dtViaje.fechaInicio,
          usuario.NombreCompleto,
          this.dtTransporte.nombreDestino,
          this.dtViaje.razonViaje
        ),
        Asunto: "Nueva Solicitud De Viaje",
        IdAplicacion: _app,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nameOrigin,
        EmailOrigen: emailOrigin,
        EmailsDestino: [
          {
            Nombre: nombreDestino,
            Direccion: this.global.Reemplazar(emailDestination)
          },
        ],
        TiempoEspera: tmpTiempoEspera.ValorParametro,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(correo)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });

    setTimeout(() => {
      this.EnviarEmailPreAprobador(
        idViaje,
        _app,
        nameOrigin,
        emailOrigin,
        tmpTiempoEspera
      );
    }, 2000);
  }

  public EnviarEmailPreAprobador(
    idViaje: any,
    _app: any,
    nameOrigin: any,
    emailOrigin: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var usuario = this.servicioUsuario.ObtenerUsuario();


    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtPreAprobador.usuario,
      idViaje: idViaje,
      url: "preaprobador/reservacion/detalle/" + idViaje
    });
    var urlAcceso = "#/" + btoa(datos);

    var correo = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailPreAprobador(
          idViaje,
          this.dtViaje.fechaInicio,
          usuario.NombreCompleto,
          this.dtTransporte.nombreDestino,
          this.dtViaje.razonViaje,
          this.dtPreAprobador.nombre.toUpperCase(),
          urlAcceso
        ),
        Asunto: "Nueva Solicitud De Viaje",
        IdAplicacion: _app,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nameOrigin,
        EmailOrigen: emailOrigin,
        EmailsDestino: [
          {
            Nombre: this.dtPreAprobador.nombre.toUpperCase(),
            Direccion: this.global.Reemplazar(this.dtPreAprobador.usuario + "@saludsa.com.ec")
          },
        ],
        TiempoEspera: tmpTiempoEspera.ValorParametro,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(correo)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
    this.rutaSistema.navigate(["/cliente/reservacion/lista"]);
  }

  public EnviarEmailRegistradorModificar(
    idViaje: any,
    _app: any,
    nameOrigin: any,
    emailOrigin: any,
    nombreDestino: any,
    emailDestination: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var usuario = this.servicioUsuario.ObtenerUsuario();

    var correo = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailRegistradorModificacion(
          idViaje,
          this.dtViaje.fechaInicio,
          usuario.NombreCompleto,
          this.dtTransporte.nombreDestino,
          this.dtViaje.razonViaje
        ),
        Asunto: "Su Solicitud Fue Modificada",
        IdAplicacion: _app,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nameOrigin,
        EmailOrigen: emailOrigin,
        EmailsDestino: [
          {
            Nombre: nombreDestino,
            Direccion: this.global.Reemplazar(emailDestination)
          },
        ],
        TiempoEspera: tmpTiempoEspera.ValorParametro,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(correo)
      .then((res) => {
        this.spinner.hide();

        this.EnviarEmailPreAprobadorModificacion(
          idViaje,
          _app,
          nameOrigin,
          emailOrigin,
          tmpTiempoEspera
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EnviarEmailPreAprobadorModificacion(
    idViaje: any,
    _app: any,
    nameOrigin: any,
    emailOrigin: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var usuario = this.servicioUsuario.ObtenerUsuario();

    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtPreAprobador.usuario,
      idViaje: idViaje,
      url: "preaprobador/reservacion/detalle/" + idViaje,
    });
    var urlAcceso = "#/" + btoa(datos);

    var correo = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailPreAprobadorModificacion(
          idViaje,
          this.dtViaje.fechaInicio,
          usuario.NombreCompleto,
          this.dtTransporte.nombreDestino,
          this.dtViaje.razonViaje,
          this.dtPreAprobador.nombre.toUpperCase(),
          urlAcceso
        ),
        Asunto: "Solicitud de Viaje Modificada para Preaprobación",
        IdAplicacion: _app,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nameOrigin,
        EmailOrigen: emailOrigin,
        EmailsDestino: [
          {
            Nombre: this.dtPreAprobador.nombre.toUpperCase(),
            Direccion: this.global.Reemplazar(this.dtPreAprobador.usuario + "@saludsa.com.ec")
          },
        ],
        TiempoEspera: tmpTiempoEspera.ValorParametro,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(correo)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });

    this.rutaSistema.navigate(["/cliente/reservacion/lista"]);
  }
}
