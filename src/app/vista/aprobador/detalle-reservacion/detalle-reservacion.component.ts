import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../../../controladores/externos/datos-externos.service";
import { ServicioPlantillaCorreoDatafast } from "../../../variable/correo/plantilla-correo-datafast.service";
import { ReplaySubject } from "rxjs";
import Swal from "sweetalert2";

declare var $: any;
declare var google: any;
declare var moment: any;
@Component({
  selector: "app-reservation-detail",
  templateUrl: "./detalle-reservacion.component.html",
  styleUrls: ["./detalle-reservacion.component.css"],
})
export class DetalleReservacionAprobadorComponent implements OnInit {
  tipoMenu = 4;
  Mensaje: ReplaySubject<string>;
  intervaloMsg: any;

  public textoMensajeReintento = "Intente el proceso más tarde.";
  public urlClienteListadoReservas = "/cliente/reservacion/lista";
  public urlAprobadorListadoReservas = "/aprobador/reservacion/lista";
  public dominioCorreo = "@saludsa.com.ec";

  dtContabilidad: any = {
    tipoContabilidad: null,
    departamento1: null,
    departamento1CodigoDescripcion: null,
    departamento1Codigo: null,
    departamento2: null,
    departamento2CodigoDescripcion: null,
    departamento2Codigo: null,
    costoCentro: null,
    costoCentroCodigo: null,
    costoCentroCodigoDescripcion: null,
    proposito: null,
    propositoCodigo: null,
    propositoCodigoDescripcion: null,
    tipoGasto: null,
    tipoCodigoGasto: null,
    tipoCodigoGastoDescripcion: null,
  };

  vlContabilidad: any = {
    tipoContabilidad: null,
    departamento1: null,
    departamento1CodigoDescripcion: null,
    departamento1Codigo: null,
    departamento2: null,
    departamento2CodigoDescripcion: null,
    departamento2Codigo: null,
    costoCentro: null,
    costoCentroCodigo: null,
    costoCentroCodigoDescripcion: null,
    proposito: null,
    propositoCodigo: null,
    propositoCodigoDescripcion: null,
    tipoGasto: null,
    tipoCodigoGasto: null,
    tipoCodigoGastoDescripcion: null,
  };

  idViaje = 0;
  dtViaje: any = {
    Aprobador: { IdAprobador: 0, Identificador: 0, Nombre: "", Usuario: "" },
    CatalogoEstado: null,
    CentroCostoViaje: "",
    ComentariosDosViaje: null,
    ComentariosUnoViaje: null,
    CostoViaje: null,
    DepartamentoDosViaje: "",
    DepartamentoUnoViaje: "",
    DescripcionViaje: null,
    Estado: {
      DescripcionEstado: "",
      Estado: 0,
      IdEstado: 0,
      Identificador: 0,
      IdentificadorEstado: null,
    },
    FechaAprobacionViaje: null,
    FechaFinViaje: "",
    FechaInicioViaje: "",
    FechaMaximaLiquidacionViaje: null,
    FechaSolicitudViaje: "",
    Hotel: {
      CargoAutorizadoHotel: null,
      CiudadHotel: null,
      DescripcionHotel: null,
      EmailHotel: null,
      EstadoHotel: 0,
      IdHotel: 0,
      Identificador: 0,
      Imagen: "",
      LatLongHotel: "",
      NombreHotel: "",
      TarifaHotel: "",
    },
    IdViaje: 0,
    Identificador: 0,
    MotivoViaje: "",
    NombreViaje: "",
    NumeroDiasViaje: null,
    NumeroNochesViaje: "",
    PropositoViaje: "",
    Registrador: {
      Cargo: "",
      Ciudad: "",
      CodigoEmpresa: "",
      Departamento: "",
      Email: "",
      IdRegistrador: 0,
      Identificacion: "",
      Identificador: 0,
      NombreEmpresa: "",
      Usuario: "",
    },
    RequiereHospedajeViaje: "",
    TipoCuentaViaje: "",
    TipoGastoViaje: "",
    TipoViaje: "",
    Transporte: {
      FechaEmisionAereo: "",
      IdTransporte: 0,
      Identificador: 0,
      ImpuestoAereo: "",
      ImpuestoPorcentajeAereo: "",
      ImpuestoValorAereo: "",
      KilometrosTerrestre: "",
      MovilizacionTerrestre: "",
      NombreAerolineaAereo: "",
      NumeroPasajeAereo: "",
      ReferenciaAereo: "",
      RequierePasajeAereo: "",
      Ruta: {
        DescripcionRuta: null,
        DestinoRuta: "",
        EstadoRuta: 0,
        IdRuta: 0,
        Identificador: 0,
        NombreRuta: "",
        OrigenRuta: null,
      },
      Tipo: "",
      TotalAereo: "",
      ValorAereo: "",
      ValorTerrestre: "",
    },
    ViajeCapacitacion: "",
  };
  mapa: any;
  coordenadas: any;
  marcadores = [];
  lstViaticos = [];

  lstTipoCuenta: Array<string> = ["Contabilidad"];
  dtTipoCuenta: any;

  lstDepartamento1: [""];
  dtDepartamento1: any;

  lstDepartamento2: [""];
  dtDepartamento2: any;

  dtCostoCentro: any;
  lstProposito: [""];
  dtProposito: any;

  dtTipoGasto: any = "";

  costoCentro = true;
  proposito = true;
  tipoGasto = true;

  lstCostoCentro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: "" }>;
  lstCostoCentroFiltro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: ""; }>;

  codigoDiario = "";
  colocarDiario = "";
  cerrarDiario = "";

  estadoVista = "";

  tmpAplicacion: any = "";
  tmpNombreOrigen: any = "";
  tmpCorreoOrigen: any = "";
  tmpTiempoEspera: any = "";

  comentario = "";

  lstHoteles = [];
  dtHotel: any;

  lstParametros = [];

  public lstParametrosCuentaAX: any = { "CodigoCompania": "", "CuentaViaticosNoJustificados": "", "DiarioGeneral": "", "DiarioLiquidacion": "", "IdParametroCuenta": 0, "PerfilAnticipoViaticos": "" };

  public estadoProcesoFlujoLiquidacion = true;

  public estadoAdicional = false;

  public formatoFechaLog: any = 'YYYY-MM-DD LTS';

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    public readonly global: ServicioGlobales
  ) {
    this.Mensaje = new ReplaySubject(1);
    this.Mensaje.next("Espere un momento");
  }

  ngOnInit() {
    this.ObtenerDatosInicio();
  }

  public ObtenerDatosInicio() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public ObtenerViaje(id: any) {
    this.spinner.show();
    this.dataInterna.ObtenerViaje(id).then((res) => {
      this.spinner.hide();
      this.dtViaje = res;
      var ubicacion: any;
      if (this.dtViaje.SolicitudViajeReasignada == 1 && this.dtViaje.SolicitudViajeReasignadaUsuario != '') {
        var datosSesion = localStorage.getItem("k-session");
        var objetoSesion: any;
        if (datosSesion != undefined || datosSesion != null) {
          var datosSesionDesencriptados = atob(datosSesion);
          if (datosSesionDesencriptados != "") {
            objetoSesion = JSON.parse(datosSesionDesencriptados);
          }
        }

        if (objetoSesion != undefined) {
          if (objetoSesion.usuario.toLowerCase() != this.dtViaje.SolicitudViajeReasignadaUsuario.toLowerCase()) {
            this.rutaSistema.navigate(["/ingreso/autorizacion"]);
          } else {
            this.estadoVista = this.dtViaje.Estado.DescripcionEstado;
            ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
            this.setMap(ubicacion.lat, ubicacion.lng);
            this.ObtenerViatico(this.dtViaje.IdViaje);
          }
        }
      } else {
        this.estadoVista = this.dtViaje.Estado.DescripcionEstado;
        ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
        this.setMap(ubicacion.lat, ubicacion.lng);
        this.ObtenerViatico(this.dtViaje.IdViaje);
      }
    }).catch((err) => { this.spinner.hide() });
  }

  public setMap(_latitud: any, _longitud: any) {
    const latitude = _latitud;
    const longitude = _longitud;
    const mapEle: HTMLElement | null = document.getElementById("mapa");
    this.coordenadas = { lat: latitude, lng: longitude };
    this.mapa = new google.maps.Map(mapEle, {
      center: this.coordenadas,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      zoom: 18,
    });

    google.maps.event.addListenerOnce(this.mapa, "idle", () => {
      const marker = new google.maps.Marker({
        position: this.coordenadas,
        draggable: true,
        map: this.mapa,
        title: "Mi Ubicación",
      });
      this.marcadores.push(marker);
      mapEle.classList.add("show-mapa");
    });
  }

  public ObtenerViatico(id: any) {
    this.spinner.show();
    this.dataInterna.ObtenerViatico(id).then((res) => {
      this.spinner.hide();
      this.lstViaticos = res;
      this.ObtenerHotel();
    }).catch((err) => { this.spinner.hide() });
  }

  public ObtenerHotel() {
    this.spinner.show();
    this.dataInterna.ObtenerHotel(this.dtViaje.Transporte.Ruta.DestinoRuta).then((res) => {
      this.spinner.hide();
      this.lstHoteles = res;
      for (const hotel of this.lstHoteles) {
        if (this.dtViaje.Hotel.IdHotel == hotel.IdHotel) {
          this.dtHotel = hotel;
          break;
        }
      }
      this.ObtenerDepartamento();
    }).catch((err) => { this.spinner.hide() });
  }

  public ObtenerDepartamento() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna.ObtenerDepartamento(token, this.dtViaje.Registrador.CodigoEmpresa).then((res) => {
      this.spinner.hide();
      this.lstDepartamento1 = res;
      this.lstDepartamento2 = res;

      this.dtDepartamento1 = {
        Nombre: this.dtContabilidad.departamento1CodigoDescripcion == null ? "" : this.dtContabilidad.departamento1CodigoDescripcion,
        Codigo: this.dtContabilidad.departamento1Codigo == null ? "" : this.dtContabilidad.departamento1Codigo,
      };

      this.dtDepartamento2 = {
        Nombre: this.dtContabilidad.departamento2CodigoDescripcion == null ? "" : this.dtContabilidad.departamento2CodigoDescripcion,
        Codigo: this.dtContabilidad.departamento2Codigo == null ? "" : this.dtContabilidad.departamento2Codigo,
      };

      this.dtContabilidad.tipoContabilidad = this.dtViaje.TipoCuentaViaje == "" ? null : this.dtViaje.TipoCuentaViaje;

      if (this.dtViaje.DepartamentoUnoViaje != "") {
        var tmpDepartament1 = JSON.parse(this.dtViaje.DepartamentoUnoViaje);
        this.dtDepartamento1 = tmpDepartament1;
        this.dtContabilidad.departamento1Codigo = tmpDepartament1.Codigo;
      }

      if (this.dtViaje.DepartamentoDosViaje != "") {
        var tmpDepartament2 = JSON.parse(this.dtViaje.DepartamentoDosViaje);
        this.dtDepartamento2 = tmpDepartament2;
        this.dtDepartamento2.Codigo = tmpDepartament2.Codigo;
        this.dtCostoCentro = [];
        this.dtProposito = [];
        this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
      }

      setTimeout(() => {
        this.VerificarRegistroAsientoViaje();
      }, 2000);

    }).catch((err) => { this.spinner.hide() });
  }

  public ObtenerCentroCosto(idDepartament: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna.ObtenerCentroCosto(token, idDepartament, this.dtViaje.Registrador.CodigoEmpresa).then((res) => {
      this.spinner.hide();
      this.lstCostoCentro = res;
      this.lstCostoCentroFiltro = this.lstCostoCentro.slice();

      if (this.dtViaje.CentroCostoViaje != "") {
        var tmpConstCenter = JSON.parse(this.dtViaje.CentroCostoViaje);
        this.dtCostoCentro = tmpConstCenter;
        this.dtCostoCentro.Codigo = tmpConstCenter.Codigo;
        this.ObtenerProposito(this.dtDepartamento2.Codigo, this.dtCostoCentro.Codigo);
      }
    }).catch((err) => { this.spinner.hide() });
  }

  public ObtenerProposito(idDepartament: any, idCostCenter: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna.ObtenerProposito(token, idDepartament, idCostCenter, this.dtViaje.Registrador.CodigoEmpresa).then((res) => {
      this.spinner.hide();
      this.lstProposito = res;
      if (this.dtViaje.PropositoViaje != "") {
        var tmpPurpose = JSON.parse(this.dtViaje.PropositoViaje);
        this.dtProposito = tmpPurpose;
        this.dtProposito.Codigo = tmpPurpose.Codigo;
        this.dtTipoGasto = this.dtViaje.TipoGastoViaje;
      }
    }).catch((err) => { this.spinner.hide(); });
  }

  public VerificarRegistroAsientoViaje() {
    this.dataInterna.ObtenerAsientoViaje(this.dtViaje.IdViaje).then((res) => {
      if (res) {
        if ((res.CodigoDiario != null && res.CodigoDiario != "") && (res.CierreDiario != null && res.CierreDiario != "") && (res.RegistroDiario != null && res.RegistroDiario != "")) {
          this.estadoAdicional = true;
          Swal.fire({
            title: 'Información',
            html: "Se detecto una desconexión al aprobar esta solicitud, por favor finalice el proceso. Presionando el botón.",
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<b>Finalizar Aprobación</b>'
          }).then((result) => {
            if (result.value) {
              this.VerificacionProcesoMovilizacionHospedaje();
            }
          })
        } else if ((res.CodigoDiario != null && res.CodigoDiario != "") && (res.CierreDiario != null && res.CierreDiario == "") && (res.RegistroDiario != null && res.RegistroDiario == "")) {
          // Flujo de Eliminación de Diario e Inicio de Proceso de Aprobación Nuevamente
          Swal.fire({
            title: 'Información',
            html: "Se detecto una diario pendiente en esta solicitud, es necesario finalizar el proceso.",
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<b>Finalizar Aprobación</b>'
          }).then((result) => {
            this.ReactivacionProcesoAprobacion(res.CodigoDiario);
          });
        } else {
          this.estadoAdicional = false;
        }
      }
    }).catch((err) => { console.log(err) });
  }

  public ColocarDepartamento1() {
    this.dtContabilidad.departamento1 = this.dtDepartamento1;
    this.dtContabilidad.departamento1CodigoDescripcion =
      this.dtContabilidad.departamento1.CodigoDescripcion;
    this.dtContabilidad.departamento1Codigo = this.dtContabilidad.departamento1.Codigo;
  }

  public ColocarDepartamento2() {
    this.dtContabilidad.departamento2 = this.dtDepartamento2;
    this.dtContabilidad.departamento2CodigoDescripcion =
      this.dtDepartamento2.CodigoDescripcion;
    this.dtContabilidad.departamento2Codigo = this.dtDepartamento2.Codigo;
    this.dtCostoCentro = [];
    this.dtProposito = [];
    this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
  }

  public ColocarCentroCosto() {
    this.dtContabilidad.costoCentro = this.dtCostoCentro;
    this.dtContabilidad.costoCentroCodigoDescripcion =
      this.dtCostoCentro.CodigoDescripcion;
    this.dtContabilidad.costoCentroCodigo = this.dtCostoCentro.Codigo;
    this.dtProposito = [];
    this.ObtenerProposito(this.dtDepartamento2.Codigo, this.dtCostoCentro.Codigo);
  }

  public ColocarProposito() {
    this.dtContabilidad.proposito = this.dtProposito;
    this.dtContabilidad.propositoCodigoDescripcion =
      this.dtProposito.CodigoDescripcion;
    this.dtContabilidad.propositoCodigo = this.dtProposito.Codigo;
    this.dtTipoGasto = "";
    this.ObtenerTipoGasto();
  }

  public ObtenerTipoGasto() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = {
      Token: token.access_token,
      DataJSON: `?codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}&codigoDepartamento=${this.dtContabilidad.departamento2Codigo}&codigoCentroCosto=${this.dtContabilidad.costoCentroCodigo}&codigoProposito=${this.dtContabilidad.propositoCodigo}`,
    };

    this.spinner.show();
    this.dataExterna
      .ObtenerTipoGasto(data)
      .then((res) => {
        this.spinner.hide();
        var result = JSON.parse(res);

        if (result.Estado == "Error") {
          let mensajes = "";
          for (var item of result.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          this.global.Alerta("Servicio Ax - Obtener Tipo Gasto", mensajes, "info");
          this.dtTipoGasto = "";
        } else {
          this.dtTipoGasto = result.Datos;
        }

      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public FiltrarCentroCosto(value: any) {
    this.lstCostoCentroFiltro = this.lstCostoCentro.filter(
      (s) =>
        s.CodigoDescripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  //////////////////// INICIO DE PROCESO DE APROBACIÓN

  //////////////////// CONSUMO DE SERVICIOS AX

  public ObtenerCuentasDiariosAX() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'Inicio Proceso Aprobación', "", "", "");
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerCuentasDiariosAX', "paso 1", "", "Ingreso a la función");
    this.dataInterna.ObtenerParametrosCuentasAX(this.dtViaje.Registrador.CodigoEmpresa).then((res) => {
      this.lstParametrosCuentaAX = res[0];
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerCuentasDiariosAX', "paso 1", JSON.stringify(this.lstParametrosCuentaAX), "respuesta del servicio");
      this.ObtenerDiarioAvance();
    }).catch((err) => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerCuentasDiariosAX', "paso 1", JSON.stringify(err), "error en la función");
      console.log(err);
    });
  }

  public ObtenerDiarioAvance() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", "", "Ingreso a la función");
    var token = this.sesionExterna.ObtenerClaveExterna();
    Swal.fire({
      title: "Aprobar Solicitud",
      html: "¿Está seguro que desea aprobar la solicitud de viaje?",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Si, Aprobar Solicitud",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", "", "Confirma el inicio del proceso");
        this.dataInterna.VerificarProcesoAprobacion(this.dtViaje.IdViaje).then((res) => {
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(res), "Verificar proceso de aprobación");
          if (res == 0) {
            //Agregar inicio de proceso de Aprobación
            this.dataInterna.AgregarProcesoAprobacion(this.dtViaje.IdViaje).then((response) => {
              this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(response), "Exito al agregar el proceso de aprobación");
              console.log(response);
            }).catch((err) => {
              console.log(err);
              this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(err), "Error al agregar el proceso de aprobación");
            });
            // Fin
            this.spinner.show();
            this.intervaloMsg = setInterval(() => {
              let dataF = "";
              this.Mensaje.subscribe((data) => {
                dataF = data;
              });
              if (dataF == "Esto puede tardar unos minutos") {
                this.Mensaje.next("Espere un momento");
              } else {
                this.Mensaje.next("Esto puede tardar unos minutos");
              }
            }, 5000);

            var data = {
              Token: token.access_token,
              DataJSON: `?nombreDiario=${this.lstParametrosCuentaAX.DiarioGeneral}&descripcionDiario=Viaje ${this.dtViaje.IdViaje} - ${this.dtViaje.FechaFinViaje} ${this.dtViaje.Transporte.Ruta.NombreRuta}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
            };
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(data), "Información enviada al servicio CrearDiario");
            this.dataExterna.CrearDiarioAprobacion(data, this.dtViaje.IdViaje).then((respuesta) => {
              //this.dataExterna.ObtenerDiarioAvance(data).then((respuesta) => {
              var aux = JSON.parse(respuesta);
              this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(aux), "respuesta del servicio CrearDiario");
              if (aux.Estado == "OK") {
                this.codigoDiario = aux.Datos;
                this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(this.codigoDiario), "respuesta de ok del servicio CrearDiario");
                this.EstablecerRegistroDiario(this.codigoDiario);
              } else if (aux.Estado == "Error") {
                clearInterval(this.intervaloMsg);
                let mensajes = "";
                for (var item of aux.Mensajes) {
                  mensajes = `${mensajes + item} \n`;
                }
                this.spinner.hide();
                this.global.VerAlertaTiempo("Error Servicio Crear Diario", "No se pudo crear el diario<br>" + mensajes + "<br>" + this.textoMensajeReintento, "warning");
                this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(mensajes), "respuesta de error del servicio CrearDiario");
                this.DesbloquearSolicitud(this.dtViaje.IdViaje);
              }
            }).catch((err) => {
              this.spinner.hide();
              clearInterval(this.intervaloMsg);
              this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(err), "error en la función de crear diario");
              if (err) {
                this.global.VerAlertaTiempo("Servicio Crear Diario", "No se pudo crear el diario<br>" + this.textoMensajeReintento, "warning");
              }
              this.DesbloquearSolicitud(this.dtViaje.IdViaje);
            });
          } else {
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", "", "alerta de proceso de aprobación existente");
            this.global.VerAlerta("Información", "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha iniciado su proceso de aprobación en otra instancia", "info");
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'Fin Proceso Aprobación', "", "", "");
            this.rutaSistema.navigate([this.urlClienteListadoReservas]);
          }
        }).catch((err) => {
          console.log(err);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", JSON.stringify(err), "error en la función");
        });
      } else {
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerDiarioAvance', "paso 2", "", "No confirma el inicio del proceso, regresa a la pantalla de inicio");
        this.rutaSistema.navigate([this.urlClienteListadoReservas]);
      }
    });
  }

  public EstablecerRegistroDiario(diario: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", "", "ingreso a la función EstablecerRegistroDiario");
    var valor: any = this.lstViaticos.find((e: any) => e.Tipo == "Total");
    var departamento = JSON.parse(this.dtViaje.DepartamentoUnoViaje);

    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${diario}&valor=${valor.Valor}&fechaTransaccion=${this.global.ObtenerFechaAX()}&proveedor=${this.dtViaje.Registrador.Identificacion}&descripcion=Viaje ${this.dtViaje.IdViaje} ${this.dtViaje.FechaInicioViaje} - ${this.dtViaje.FechaFinViaje} ${this.dtViaje.Transporte.Ruta.NombreRuta}&referencia=Solicitud Viaje ${this.dtViaje.IdViaje}&departameto=${departamento.Codigo}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(data), "carga de información para el consumo del servicio LineaProveedorAnticipo");
    this.dataExterna.EstablecerRegistroDiario(data).then((res) => {
      var aux = JSON.parse(res);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(aux), "respuesta del servicio LineaProveedorAnticipo");
      if (aux.Estado == "OK") {
        this.colocarDiario = res;
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(this.colocarDiario), "respuesta de ok en el servicio LineaProveedorAnticipo - continua proceso cerrar acance");
        this.CerrarAvance(diario);
      } else if (aux.Estado == "Error") {
        this.spinner.hide();
        clearInterval(this.intervaloMsg);
        let mensajes = "";
        for (var item of aux.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(mensajes), "respuesta de error en el servicio LineaProveedorAnticipo");
        if (aux.Estado == "Error") {
          Swal.fire({
            title: "Servicio Linea Proveedor Anticipo",
            html: `No se pudo crear la Linea Proveedor Anticipo <br>${mensajes}<br> ¿Desea volver a intentarlo?`,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(result), "Envío a la función BorrarDiario");
            setTimeout(() => {
              this.BorrarDiario(this.codigoDiario);
            }, 1000);
          });
        }
      }
    }).catch((err) => {
      this.spinner.hide();
      clearInterval(this.intervaloMsg);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", JSON.stringify(err), "error en la función EstablecerRegistroDiario (catch)");
      if (err) {
        Swal.fire({
          title: "Servicio Linea Proveedor Anticipo",
          html: `No se pudo crear el Linea Proveedor Anticipo <br> ¿Desea volver a intentarlo?`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EstablecerRegistroDiario', "paso 3", "", "Cambio a función BorrarDiario");
          setTimeout(() => {
            this.BorrarDiario(this.codigoDiario);
          }, 1000);
        });
      }
    });
  }

  public CerrarAvance(diario: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", "", "ingreso a la función CerrarAvance");
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${diario}&autorizacion=''&fechaVigencia=${this.global.ObtenerFechaAX()}&autorizacionElectronica=''&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(data), "carga de información para el envío al servicio RegistraDiario");
    this.dataExterna.RegistraDiario(data).then((res) => {
      this.spinner.hide();
      var aux = JSON.parse(res);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(aux), "respuesta del servicio RegistraDiario");
      if (aux.Estado == "OK") {
        this.cerrarDiario = aux.Datos;
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(this.cerrarDiario), "respuesta de ok en el servicio RegistraDiario");
        this.GestionAsientoViaje();
        clearInterval(this.intervaloMsg);
      } else if (aux.Estado == "Error") {
        clearInterval(this.intervaloMsg);
        this.spinner.hide();
        let mensajes = "";
        for (var item of aux.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(mensajes), "respuesta de error en el servicio RegistraDiario");
        if (aux.Estado == "Error") {
          Swal.fire({
            title: "Registra Diario",
            html: `No se pudo Registrar Diario Anticipo <br>${mensajes}<br> ¿Desea volver a intentarlo?`,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(result), "envío a la función BorrarDiario [res -> error] " + this.codigoDiario + " " + this.colocarDiario);
            setTimeout(() => {
              this.BorrarDiario(diario);
            }, 1000);
          });
        }
      }
    }).catch((err) => {
      setTimeout(() => {
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(err), "error en la función Cerrar Avance");
        this.spinner.hide();
        if (err) {
          Swal.fire({
            title: "Registra Diario",
            html: `No se pudo crear el diario<br>${this.textoMensajeReintento}`,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'CerrarAvance', "paso 4", JSON.stringify(err), "envío a la función BorrarDiario [catch] (diario) -> " + this.codigoDiario + " (lineaproveedoranticipo) ->" + this.colocarDiario);
            setTimeout(() => {
              this.BorrarDiario(diario);
            }, 1000);
          });
        }
      }, 1000);
    });
  }

  public GestionAsientoViaje() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionAsientoViaje', "paso 5", "", "ingreso a la función GestionAsientoViaje");
    var data = {
      Identificador: 1,
      IdAsientoViaje: 0,
      CodigoDiario: this.codigoDiario,
      RegistroDiario: this.colocarDiario,
      CierreDiario: this.cerrarDiario,
      IDAnticipoReferenciaPagoAx: "",
      AnticipoNumeroAsientoAx: "",
      Viaje: {
        IdViaje: this.dtViaje.IdViaje,
        CatalogoEstado: {
          IdEstado: 5,
        },
      },
    };
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionAsientoViaje', "paso 5", JSON.stringify(data), "carga de información para actualizar los datos en la base de la tabla AsientoViaje");
    this.dataInterna.GestionAsientoViaje(data).then((res) => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionAsientoViaje', "paso 5", JSON.stringify(res), "respuesta en el consumo del servicio GestionAsientoViaje");
      clearInterval(this.intervaloMsg);
      if (res.Estado != "ERROR") {
        Swal.fire({
          title: "Guardar solicitud",
          html: "La solicitud a sido guardada exitosamente",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar"
        }).then((result) => {
          this.VerificacionProcesoMovilizacionHospedaje();
        });
      }
    }).catch((err) => {
      console.log(err);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionAsientoViaje', "paso 5", JSON.stringify(err), "error en la función GestionAsientoViaje");
      this.spinner.hide();
    });
  }

  //////////////////// CONSUMO DE SERVICIOS AX

  //////////////////// PROCESO DE CAMBIO DE ESTADO Y ENVÍO DE NOTIFICACIONES

  public VerificacionProcesoMovilizacionHospedaje() {

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'VerificacionProcesoMovilizacionHospedaje', "paso 6", "", "ingreso a la función VerificacionProcesoMovilizacionHospedaje");

    if (this.dtViaje.RequiereHospedajeViaje != "No" && this.dtViaje.TipoViaje == "Aéreo") {
      this.estadoProcesoFlujoLiquidacion = false;
    }

    if (this.dtViaje.RequiereHospedajeViaje != "No" && this.dtViaje.TipoViaje == "Terrestre") {
      this.estadoProcesoFlujoLiquidacion = false;
    }

    if (this.dtViaje.RequiereHospedajeViaje == "No" && this.dtViaje.TipoViaje == "Aéreo") {
      if (this.dtViaje.Transporte.RequierePasajeAereo == "No") {
        this.estadoProcesoFlujoLiquidacion = true;
      } else {
        this.estadoProcesoFlujoLiquidacion = false;
      }
    } else {
      this.estadoProcesoFlujoLiquidacion = false;
    }

    if (this.dtViaje.RequiereHospedajeViaje == "No" && this.dtViaje.TipoViaje == "Terrestre") {
      if (this.dtViaje.Transporte.MovilizacionTerrestre == "No") {
        if (this.dtViaje.Transporte.MovilizacionTerrestreContratada == "No") {
          this.estadoProcesoFlujoLiquidacion = true;
        } else {
          this.estadoProcesoFlujoLiquidacion = false;
        }
      } else {
        this.estadoProcesoFlujoLiquidacion = true;
      }
    }

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'VerificacionProcesoMovilizacionHospedaje', "paso 6", JSON.stringify(this.estadoProcesoFlujoLiquidacion), "validación de proceso para enviar registro de movilización u hospedaje o nó");

    if (this.estadoProcesoFlujoLiquidacion) {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'VerificacionProcesoMovilizacionHospedaje', "paso 6", "", "aprobación de solicitud sin necesidad de registro de movilización u hospedaje");
      this.GestionViaje(6, 15);
    } else {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'VerificacionProcesoMovilizacionHospedaje', "paso 6", "", "aprobación de solicitud con registro de movilización u hospedaje");
      this.GestionViaje(5, 6);
    }

  }

  public GestionViaje(state: any, identificador: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionViaje', "paso 7", "", "ingreso a la función GestionViaje");
    var travel = {
      Identificador: identificador,
      Query: "",
      Viaje: {
        IdViaje: this.dtViaje.IdViaje,
        ComentariosUnoViaje: "",
        ComentariosDosViaje: "",
        HoraInicioViaje: "",
        HoraFinViaje: "",
        CatalogoEstado: {
          IdEstado: state,
        },
        Registrador: {
          CodigoEmpresa: "",
          NombreEmpresa: "",
          Identificacion: "",
          Email: "",
          Departamento: "",
          Cargo: "",
          Ciudad: "",
          Usuario: "",
        },
        FechaInicioViaje: "",
        FechaFinViaje: "",
        FechaMaximaLiquidacionViaje: "",
        TipoViaje: "",
        NombreViaje: "",
        RequiereHospedajeViaje: "",
        NumeroNochesViaje: "",
        ViajeCapacitacion: "",
        MotivoViaje: "",
        Transporte: {
          Ruta: {
            IdRuta: 0,
          },
          MovilizacionTerrestre: "",
          MovilizacionTerrestreContratada: "",
          KilometrosTerrestre: "",
          ValorTerrestre: "",
          RequierePasajeAereo: "",
          FechaEmisionAereo: "",
          NombreAerolineaAereo: "",
          NumeroPasajeAereo: "",
          ReferenciaAereo: "",
          ValorAereo: "",
          ImpuestoAereo: "",
          ImpuestoPorcentajeAereo: "",
          ImpuestoValorAereo: "",
          TotalAereo: "",
        },
        Hotel: {
          IdHotel: 0,
        },
        Aprobador: {
          Usuario: "",
          Nombre: "",
          Ciudad: "",
        },
        PreAprobador: {
          Usuario: "",
          Nombre: "",
          Ciudad: "",
        },
        Contador: {
          Usuario: "",
          Nombre: "",
          Ciudad: "",
        },
        RegistradorPago: {
          Usuario: this.dtViaje.RegistradorPago.Usuario,
          Nombre: "",
          Ciudad: "",
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
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionViaje', "paso 7", JSON.stringify(travel), "carga de información para la actualización de la tabla viaje en la base de datos");
    this.spinner.show();
    this.dataInterna.GestionarViaje(travel).then((res) => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionViaje', "paso 7", JSON.stringify(res), "respuesta del servicio GestionarViaje");
      this.spinner.hide();
      this.ObtenerParametros();
    }).catch((err) => {
      console.log(err);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'GestionViaje', "paso 7", JSON.stringify(err), "error en la función GestionarViaje");
      this.spinner.hide();
    });
  }

  public ObtenerParametros() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerParametros', "paso 8", "", "ingreso a la función ObtenerParametros");
    this.spinner.show();
    this.dataInterna.ObtenerParametro().then((res) => {

      this.spinner.hide();
      this.lstParametros = res;

      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerParametros', "paso 8", JSON.stringify(this.lstParametros), "respuesta del servicio ObtenerParametros");

      var aux1: any = this.lstParametros.find((e: any) => e.NombreParametro == "IdAplicacion");
      var aux2: any = this.lstParametros.find((e: any) => e.NombreParametro == "NombreOrigen");
      var aux3: any = this.lstParametros.find((e: any) => e.NombreParametro == "EmailOrigen");
      var aux4: any = this.lstParametros.find((e: any) => e.NombreParametro == "TiempoEspera");

      this.tmpAplicacion = aux1.ValorParametro;
      this.tmpNombreOrigen = aux2.ValorParametro;
      this.tmpCorreoOrigen = aux3.ValorParametro;
      this.tmpTiempoEspera = aux4.ValorParametro;

      this.EnviarEmailSolicitante();

    }).catch((err) => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ObtenerParametros', "paso 8", JSON.stringify(err), "error en la función ObtenerParametros");
    });
  }

  public EnviarEmailSolicitante() {

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailSolicitante', "paso 9", "", "ingreso a la función EnviarEmailSolicitante");

    var token = this.sesionExterna.ObtenerClaveExterna();

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailSolicitudAprobada(
          this.dtViaje.IdViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.Transporte.Ruta.NombreRuta,
          this.dtViaje.MotivoViaje
        ),
        Asunto: `Solicitud de Viaje ${this.dtViaje.IdViaje} Aprobada`,
        IdAplicacion: this.tmpAplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: this.tmpNombreOrigen,
        EmailOrigen: this.tmpCorreoOrigen,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.NombreViaje,
            Direccion: this.global.Reemplazar(this.dtViaje.Registrador.Email)
          },
        ],
        TiempoEspera: this.tmpTiempoEspera,
      },
    };

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailSolicitante', "paso 9", JSON.stringify(email), "carga de información para el envio de correo");

    this.spinner.show();
    this.dataExterna.EnviarEmail(email).then((res) => {
      console.log(res);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailSolicitante', "paso 9", JSON.stringify(res), "respuesta en el servicio EnviarEmail");
      this.spinner.hide();
    }).catch((err) => {
      console.log(err);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailSolicitante', "paso 9", JSON.stringify(err), "error en el servicio EnviarEmail");
      this.spinner.hide();
    });

    setTimeout(() => {
      this.EnviarEmailTesoreria();
    }, 1000);
  }

  public EnviarEmailTesoreria() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailTesoreria', "paso 10", "", "ingreso a la función EnviarEmailTesoreria");
    var token = this.sesionExterna.ObtenerClaveExterna();
    var aux: any = this.lstViaticos.find((e: any) => e.Tipo == "Total");
    var montoViaticos: any = aux.Valor;

    /* for (var item of this.lstViaticos) {
    if (item.Tipo == "Total") {
    aux = item.Valor;
    }
    } */

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailTesoreria(
          this.dtViaje.NombreUsuarioTesoreria,
          this.dtViaje.IdViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.Registrador.Identificacion,
          montoViaticos
        ),
        Asunto:
          "Solicitud de Registro de Anticipo Viaje " + this.dtViaje.IdViaje,
        IdAplicacion: this.tmpAplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: this.tmpNombreOrigen,
        EmailOrigen: this.tmpCorreoOrigen,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.NombreUsuarioTesoreria,
            Direccion: this.global.Reemplazar(this.dtViaje.UsuarioTesoreria + this.dominioCorreo)
          },
        ],
        TiempoEspera: this.tmpTiempoEspera,
      },
    };

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailTesoreria', "paso 10", JSON.stringify(email), "carga de información para el envio de correo");

    this.spinner.show();
    this.dataExterna.EnviarEmail(email).then((res) => {
      console.log(res);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailTesoreria', "paso 10", JSON.stringify(res), "respuesta en el servicio EnviarEmail");
      this.spinner.hide();
    }).catch((err) => {
      console.log(err);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailTesoreria', "paso 10", JSON.stringify(err), "error en el servicio EnviarEmail");
      this.spinner.hide();
    });

    setTimeout(() => {
      this.EnviarEmailRegistradorPago();
    }, 1000);

  }

  public EnviarEmailRegistradorPago() {

    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailRegistradorPago', "paso 11", "", "ingreso a la función EnviarEmailRegistradorPago");

    this.spinner.show();

    if (!this.estadoProcesoFlujoLiquidacion) {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailRegistradorPago', "paso 11", JSON.stringify(this.estadoProcesoFlujoLiquidacion), "verificar de envío de correo Registrador de Pago");
      var token = this.sesionExterna.ObtenerClaveExterna();

      var datos = JSON.stringify({ tipo: "link", usuario: this.dtViaje.RegistradorPago.Usuario, idViaje: this.dtViaje.IdViaje, url: "registrador/pago/viajes/detalle/" + this.dtViaje.IdViaje });
      var urlAcceso = "#/" + btoa(datos);

      var email = {
        Token: token,
        Email: {
          Cuerpo: this.servicioEmail.GenerarEmailRegistradorPago(
            this.dtViaje.RegistradorPago.Nombre,
            this.dtViaje.IdViaje,
            this.dtViaje.Registrador.Identificacion,
            this.dtViaje.NombreViaje,
            this.dtViaje.Registrador.Email,
            this.dtViaje.Transporte.Ruta.NombreRuta,
            this.dtViaje.FechaInicioViaje + " " + this.dtViaje.HoraInicioViaje,
            this.dtViaje.FechaFinViaje + " " + this.dtViaje.HoraFinViaje,
            this.dtViaje.MotivoViaje,
            urlAcceso
          ),
          Asunto: "Reserva - Pago de movilización o pasajes, Solicitud de Viaje N° " + this.dtViaje.IdViaje,
          IdAplicacion: this.tmpAplicacion,
          IdTransaccion: "",
          NumeroIdentificacion: "",
          Contrato: "",
          NombreOrigen: this.tmpNombreOrigen,
          EmailOrigen: this.tmpCorreoOrigen,
          EmailsDestino: [
            {
              Nombre: this.dtViaje.RegistradorPago.Nombre,
              Direccion: this.global.Reemplazar(this.dtViaje.RegistradorPago.Usuario + this.dominioCorreo)
            },
          ],
          TiempoEspera: this.tmpTiempoEspera,
        },
      };
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailRegistradorPago', "paso 11", JSON.stringify(email), "carga de información para el envío de correo");
      this.dataExterna.EnviarEmail(email).then((res) => {
        console.log(res);
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailRegistradorPago', "paso 11", JSON.stringify(res), "respuesta del servicio EnviarEmail");
      }).catch((err) => {
        console.log(err);
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailRegistradorPago', "paso 11", JSON.stringify(err), "error al consumir el servicio EnviarEmail");
      });

    }

    setTimeout(() => {
      this.EnviarEmailHotel();
    }, 1000);

  }

  public EnviarEmailHotel() {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", "", "ingreso a la función EnviarEmailHotel");

    if (!this.estadoProcesoFlujoLiquidacion) {

      if (this.dtViaje.Hotel.IdHotel != 23) {

        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", JSON.stringify(this.estadoProcesoFlujoLiquidacion), "verificar el envio de correo EnviarEmailHotel");
        var token = this.sesionExterna.ObtenerClaveExterna();

        var email = {
          Token: token,
          Email: {
            Cuerpo: this.servicioEmail.GenerarEmailHotel(
              this.dtViaje.Hotel.NombreHotel,
              this.dtViaje.Registrador.Identificacion,
              this.dtViaje.NombreViaje,
              this.dtViaje.Registrador.Email,
              this.dtViaje.Transporte.Ruta.NombreRuta,
              this.dtViaje.FechaInicioViaje + " " + this.dtViaje.HoraInicioViaje,
              this.dtViaje.FechaFinViaje + " " + this.dtViaje.HoraFinViaje,
              this.dtViaje.NumeroNochesViaje + " noches"),
            Asunto: "Solicitud de Reserva de Habitación",
            IdAplicacion: this.tmpAplicacion,
            IdTransaccion: "",
            NumeroIdentificacion: "",
            Contrato: "",
            NombreOrigen: this.tmpNombreOrigen,
            EmailOrigen: this.tmpCorreoOrigen,
            EmailsDestino: [
              {
                Nombre: this.dtViaje.Hotel.NombreHotel,
                Direccion: this.global.Reemplazar(this.dtViaje.Hotel.EmailHotel)
              },
            ],
            TiempoEspera: this.tmpTiempoEspera,
          },
        };
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", JSON.stringify(email), "carga de información para el envio de correo");

        this.dataExterna.EnviarEmail(email).then((res) => {
          console.log(res);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", JSON.stringify(res), "respuesta del servicio EnviarEmail");
        }).catch((err) => {
          console.log(err);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", JSON.stringify(err), "error en la función EnviarEmail");
        });

      } else {
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'EnviarEmailHotel', "paso 12", "", "no se envía correo, solicitud no requiere hospedaje");
      }

    }

    setTimeout(() => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'Fin Proceso Aprobación', "", "", "");
      this.rutaSistema.navigate([this.urlAprobadorListadoReservas]);
    }, 1000);

  }

  //////////////////// PROCESO DE CAMBIO DE ESTADO Y ENVÍO DE NOTIFICACIONES

  //////////////////// FINALIZACIÓN DE PROCESO DE APROBACIÓN

  public NegarSolicitud() {
    if (this.comentario == undefined || this.comentario == "") {
      this.global.MostrarNotificacion(
        "Debe llenar el campo comentario",
        "info",
        "top-end"
      );
    } else {
      var state = 3;
      var travel = {
        Identificador: 14,
        Query: "",
        Viaje: {
          IdViaje: this.dtViaje.IdViaje,
          ComentariosUnoViaje: this.comentario,
          ComentariosDosViaje: "",
          HoraInicioViaje: "",
          HoraFinViaje: "",
          CatalogoEstado: {
            IdEstado: state,
          },
          Registrador: {
            CodigoEmpresa: "",
            NombreEmpresa: "",
            Identificacion: "",
            Email: "",
            Departamento: "",
            Cargo: "",
            Ciudad: "",
            Usuario: "",
          },
          FechaInicioViaje: "",
          FechaFinViaje: "",
          FechaMaximaLiquidacionViaje: "",
          TipoViaje: "",
          NombreViaje: "",
          RequiereHospedajeViaje: "",
          NumeroNochesViaje: "",
          ViajeCapacitacion: "",
          MotivoViaje: "",
          Transporte: {
            Ruta: {
              IdRuta: 0,
            },
            MovilizacionTerrestre: "",
            MovilizacionTerrestreContratada: "",
            KilometrosTerrestre: "",
            ValorTerrestre: "",
            RequierePasajeAereo: "",
            FechaEmisionAereo: "",
            NombreAerolineaAereo: "",
            NumeroPasajeAereo: "",
            ReferenciaAereo: "",
            ValorAereo: "",
            ImpuestoAereo: "",
            ImpuestoPorcentajeAereo: "",
            ImpuestoValorAereo: "",
            TotalAereo: "",
          },
          Hotel: {
            IdHotel: 0,
          },
          Aprobador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          PreAprobador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          Contador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          RegistradorPago: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
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

      Swal.fire({
        title:
          state === 4
            ? "Modificar Solicitud"
            : state === 6
              ? "Guardar Solicitud de Viaje"
              : "Negar Solicitud",
        html:
          state === 4
            ? "¿Está seguro que desea modificar la solicitud de viaje?"
            : state === 6
              ? "¿Está seguro que desea guardar la solicitud de viaje?"
              : "¿Está seguro que desea negar la solicitud de viaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonText:
          state == 4
            ? "Si, Modificar Solicitud"
            : state == 6
              ? "Si, Guardar Solicitud"
              : "Si, Negar Solicitud",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.dataInterna
            .GestionarViaje(travel)
            .then((res) => {
              this.spinner.hide();
              this.dataInterna
                .ObtenerParametro()
                .then((res) => {
                  this.spinner.hide();
                  this.lstParametros = res;

                  var aux1: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "IdAplicacion"
                  );
                  var aux2: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "NombreOrigen"
                  );
                  var aux3: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "EmailOrigen"
                  );
                  var aux4: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "TiempoEspera"
                  );

                  this.EnviarCorreoNegacion(
                    this.dtViaje.IdViaje,
                    aux1.ValorParametro,
                    aux2.ValorParametro,
                    aux3.ValorParametro,
                    this.dtViaje.NombreViaje,
                    this.dtViaje.Registrador.Usuario + this.dominioCorreo,
                    aux4.ValorParametro
                  );
                })
                .catch((err) => {
                  this.spinner.hide();
                });
            })
            .catch((err) => {
              this.spinner.hide();
            });
        }
      });
    }
  }

  public EnviarCorreoNegacion(
    idViaje: any,
    aplicacion: any,
    nombreOrigen: any,
    emailOrigen: any,
    nombreSolicitante: any,
    emailSolicitante: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtViaje.Registrador.Usuario,
      idViaje: idViaje,
      url: "cliente/reservacion/detalle/" + idViaje,
    });
    var urlAcceso = "#/" + btoa(datos);

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailRechazoSolicitud(
          this.dtViaje.NombreViaje,
          idViaje,
          this.comentario,
          urlAcceso
        ),
        Asunto: "Rechazo Solicitud de Viaje " + idViaje,
        IdAplicacion: aplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nombreOrigen,
        EmailOrigen: emailOrigen,
        EmailsDestino: [
          {
            Nombre: nombreSolicitante,
            Direccion: this.global.Reemplazar(emailSolicitante)
          },
        ],
        TiempoEspera: tmpTiempoEspera,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(email)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });

    $("#exampleNegarSolicitud").modal("toggle");
    this.rutaSistema.navigate([this.urlAprobadorListadoReservas]);
  }

  //////////////////// PROCESO DE BORRADO DE DIARIOS
  public BorrarDiario(diarioCreado: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", "", "ingreso a la función BorrarDiario");
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var dataCabecera = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${diarioCreado}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", JSON.stringify(dataCabecera), "recopilación de datos para el envió al servicio BorrarDiario");
    this.dataExterna.BorrarDiario(dataCabecera).then((res) => {
      this.spinner.hide();
      if (res) {
        this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", JSON.stringify(res), "respuesta del servicio BorrarDiario");
        this.dataInterna.RetirarProcesoAprobacion(this.dtViaje.IdViaje).then((respuesta) => {
          console.log(respuesta);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", JSON.stringify(respuesta), "respuesta del servicio RetirarProcesoAprobacion");
        }).catch((error) => {
          console.log(error);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", JSON.stringify(error), "error en el servicio RetirarProcesoAprobacion - (catch - RetirarProcesoAprobacion)");
        });
        setTimeout(() => {
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'Fin Proceso Aprobación', "", "", "");
          this.rutaSistema.navigate([this.urlClienteListadoReservas]);
        }, 1000);
      }
    }).catch((err) => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarDiario', "paso borrado", JSON.stringify(err), "error en el servicio BorrarDiario - (catch BorrarDiario)");
      if (err) {
        Swal.fire({
          title: "Borrar Linea Diario",
          html: `No se pudo crear el diario<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.BorrarDiario(diarioCreado);
            }, 1000);
          } else {
            this.rutaSistema.navigate([this.urlClienteListadoReservas]);
          }
        });
      }
    });
  }

  public ReactivacionProcesoAprobacion(diarioExistente: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivación", "", "ingreso a la función ReactivacionProcesoAprobacion");
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var dataCabecera = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${diarioExistente}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivación", JSON.stringify(dataCabecera), "recopilación de datos para el envió al servicio BorrarDiario -> [ReactivacionProcesoAprobacion]");
    this.dataExterna.BorrarDiario(dataCabecera).then((res) => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivación", JSON.stringify(res), "respuesta del servicio BorrarDiario -> [ReactivacionProcesoAprobacion]");
      var resultadoServicio = JSON.parse(res);
      this.spinner.hide();
      if (resultadoServicio.Estado == "OK") {
        this.dataInterna.RetirarProcesoAprobacion(this.dtViaje.IdViaje).then((respuesta) => {
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivación", JSON.stringify(respuesta), "respuesta del servicio RetirarProcesoAprobacion");
          //Iniciar nuevamente proceso de aprobación
          this.ObtenerCuentasDiariosAX();
        }).catch((error) => {
          console.log(error);
          this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivación", JSON.stringify(error), "error en el servicio RetirarProcesoAprobacion - (catch - RetirarProcesoAprobacion)");
          this.global.VerAlertaSinTitulo("No se pudo completar el proceso de borrado, es necesario retirar el bloqueo de la solicitud", "error");
          setTimeout(() => { this.rutaSistema.navigate([this.urlClienteListadoReservas]); }, 3000);
        });
      } else {
        let mensajes = "";
        for (var item of resultadoServicio.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }
        this.global.VerAlerta("Servicio Ax - Borrar Diario", "No se pudo completar el borrado del diario: <b>" + diarioExistente + ".</b><br> Mensaje devuelto por el servicio: <br>" + mensajes, "error");
        setTimeout(() => { this.rutaSistema.navigate([this.urlClienteListadoReservas]); }, 3000);
      }
    }).catch((err) => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'ReactivacionProcesoAprobacion', "paso borrado en reactivacion", JSON.stringify(err), "error en el servicio BorrarDiario - (catch ReactivacionProcesoAprobacion)");
      this.rutaSistema.navigate([this.urlClienteListadoReservas]);
    });
  }

  public BorrarLineaDiario(IdLiquidacionDevolucionCreditoAx: any, diarioCreado: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarLineaDiario', "paso borrado", "", "ingreso a la función BorrarLineaDiario");
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var dataDetalle = {
      Token: token.access_token,
      DataJSON: `?idRegistro=${IdLiquidacionDevolucionCreditoAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarLineaDiario', "paso borrado", JSON.stringify(dataDetalle), "recopilación de la información para el borrado");
    this.dataExterna.BorrarLineaDiario(dataDetalle).then((res) => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarLineaDiario', "paso borrado", JSON.stringify(res), "respuesta del servicio BorrarLineaDiario");
      this.spinner.hide();
      if (res != undefined || res != null || res != "") {
        this.BorrarDiario(diarioCreado);
      }
    }).catch((err) => {
      this.spinner.hide();
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'BorrarLineaDiario', "paso borrado", JSON.stringify(err), "erroe en la función BorrarLineaDiario");
      if (err) {
        Swal.fire({
          title: "Borrar Línea Diario",
          html: `No se pudo crear el diario<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.BorrarLineaDiario(IdLiquidacionDevolucionCreditoAx, diarioCreado);
            }, 1000);
          } else {
            this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), this.dtViaje.IdViaje, 'Fin Proceso Aprobación', "", "", "");
            this.rutaSistema.navigate([this.urlClienteListadoReservas]);
          }
        });
      }
    });
  }
  //////////////////// PROCESO DE BORRADO DE DIARIOS

  public AbrirModalNegar() {
    this.comentario = "";
    $("#exampleNegarSolicitud").modal("toggle");
  }

  public ModificarSolicitud() {
    if (this.comentario == undefined || this.comentario == "") {
      this.global.MostrarNotificacion(
        "Debe llenar el campo comentario",
        "info",
        "top-end"
      );
    } else {
      var state = 4;
      var travel = {
        Identificador: 13,
        Query: "",
        Viaje: {
          IdViaje: this.dtViaje.IdViaje,
          ComentariosUnoViaje: this.comentario,
          ComentariosDosViaje: "",
          HoraInicioViaje: "",
          HoraFinViaje: "",
          CatalogoEstado: {
            IdEstado: state,
          },
          Registrador: {
            CodigoEmpresa: "",
            NombreEmpresa: "",
            Identificacion: "",
            Email: "",
            Departamento: "",
            Cargo: "",
            Ciudad: "",
            Usuario: "",
          },
          FechaInicioViaje: "",
          FechaFinViaje: "",
          FechaMaximaLiquidacionViaje: "",
          TipoViaje: "",
          NombreViaje: "",
          RequiereHospedajeViaje: "",
          NumeroNochesViaje: "",
          ViajeCapacitacion: "",
          MotivoViaje: "",
          Transporte: {
            Ruta: {
              IdRuta: 0,
            },
            MovilizacionTerrestre: "",
            MovilizacionTerrestreContratada: "",
            KilometrosTerrestre: "",
            ValorTerrestre: "",
            RequierePasajeAereo: "",

            FechaEmisionAereo: "",
            NombreAerolineaAereo: "",
            NumeroPasajeAereo: "",
            ReferenciaAereo: "",
            ValorAereo: "",
            ImpuestoAereo: "",
            ImpuestoPorcentajeAereo: "",
            ImpuestoValorAereo: "",
            TotalAereo: "",
          },
          Hotel: {
            IdHotel: 0,
          },
          Aprobador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          PreAprobador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          Contador: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
          },
          RegistradorPago: {
            Usuario: "",
            Nombre: "",
            Ciudad: "",
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

      Swal.fire({
        title:
          state == 4
            ? "Modificar Solicitud"
            : state == 6
              ? "Guardar Solicitud de Viaje"
              : "Negar Solicitud",
        html:
          state == 4
            ? "¿Está seguro que desea modificar la solicitud de viaje?"
            : state == 6
              ? "¿Está seguro que desea guardar la solicitud de viaje?"
              : "¿Está seguro que desea negar la solicitud de viaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonText:
          state == 4
            ? "Si, Modificar Solicitud"
            : state == 6
              ? "Si, Guardar Solicitud"
              : "Si, Negar Solicitud",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.dataInterna
            .GestionarViaje(travel)
            .then((res) => {
              this.dataInterna
                .ObtenerParametro()
                .then((res) => {
                  this.spinner.hide();
                  this.lstParametros = res;

                  var aux1: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "IdAplicacion"
                  );
                  var aux2: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "NombreOrigen"
                  );
                  var aux3: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "EmailOrigen"
                  );
                  var aux4: any = this.lstParametros.find(
                    (e: any) => e.NombreParametro == "TiempoEspera"
                  );

                  this.EnviarCorreoCorrecion(
                    this.dtViaje.IdViaje,
                    aux1.ValorParametro,
                    aux2.ValorParametro,
                    aux3.ValorParametro,
                    this.dtViaje.NombreViaje,
                    this.dtViaje.Registrador.Usuario + this.dominioCorreo,
                    aux4.ValorParametro
                  );
                })
                .catch((err) => {
                  this.spinner.hide();
                });
            })
            .catch((err) => {
              this.spinner.hide();
            });
        }
      });
    }
  }

  public EnviarCorreoCorrecion(
    idViaje: any,
    aplicacion: any,
    nombreOrigen: any,
    emailOrigen: any,
    nombreSolicitante: any,
    emailSolicitante: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtViaje.Registrador.Usuario,
      idViaje: idViaje,
      url: "cliente/reservacion/detalle/" + idViaje,
    });
    var urlAcceso = "#/" + btoa(datos);

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailCorreccionSolicitud(
          this.dtViaje.NombreViaje,
          idViaje,
          this.comentario,
          urlAcceso
        ),
        Asunto: "Correción Solicitud de Viaje " + idViaje,
        IdAplicacion: aplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nombreOrigen,
        EmailOrigen: emailOrigen,
        EmailsDestino: [
          {
            Nombre: nombreSolicitante,
            Direccion: this.global.Reemplazar(emailSolicitante)
          },
        ],
        TiempoEspera: tmpTiempoEspera,
      },
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmail(email)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });

    $("#exampleModalCenter").modal("toggle");
    this.rutaSistema.navigate([this.urlAprobadorListadoReservas]);
  }

  public AbrirModalModificar() {
    this.comentario = "";
    $("#exampleModalCenter").modal("toggle");
  }

  public DesbloquearSolicitud(idViaje: any) {
    this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), idViaje, 'DesbloquearSolicitud', "paso de desbloqueo", "", "ingreso a la función DesbloquearSolicitud");
    this.dataInterna.RetirarProcesoAprobacion(idViaje).then((respuesta) => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), idViaje, 'DesbloquearSolicitud', "paso de desbloqueo", JSON.stringify(respuesta), "respuesta del servicio RetirarProcesoAprobacion");
    }).catch((error) => {
      console.log(error);
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), idViaje, 'DesbloquearSolicitud', "paso de desbloqueo", JSON.stringify(error), "error en el servicio RetirarProcesoAprobacion - (catch - RetirarProcesoAprobacion)");
    });
    setTimeout(() => {
      this.dataInterna.GestionLogAprobacion(moment().format(this.formatoFechaLog), idViaje, 'Fin Proceso Aprobación', "", "", "");
      this.rutaSistema.navigate([this.urlClienteListadoReservas]);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervaloMsg);
  }
}
