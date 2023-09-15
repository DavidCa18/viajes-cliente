import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioPlantillaCorreoDatafast } from '../../../variable/correo/plantilla-correo-datafast.service';
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { environment } from "../../../../environments/environment";
import { ReplaySubject } from "rxjs";
import Swal from "sweetalert2";

declare var $: any;
declare var google: any;
@Component({
  selector: "app-reservation-detail",
  templateUrl: "./detalle-reservacion.component.html",
  styleUrls: ["./detalle-reservacion.component.css"],
})
export class DetalleReservacionPreAprobadorComponent implements OnInit {
  tipoMenu = 2;
  Tipo = 2;
  Estado = "GENERADO";
  Mensaje: ReplaySubject<string>;

  intervaloMsg: any;
  dtContabilidad = {
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

  vlContabilidad = {
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
  map: any;
  coordenadas: any;
  markers = [];
  lstViaticos = [];

  urlArchivo = "";
  nombreArchivo = "";

  lstTipoCuenta: Array<string> = ["Contabilidad"];
  dtTipoCuenta: any;

  lstDepartamento1: [""];
  dtDepartamento1: any;

  lstDepartamento2: [""];
  dtDepartamento2: any;

  dtCentroCosto: any;
  lstPropositos: [""];
  dtProposito: any;

  dtTipoGasto: any = "";

  costoCentro = true;
  proposito = true;
  tipoGasto = true;

  lstParametros = [];

  lstHotels = [];
  dtHotel: any;
  espereUnMomento = "Espere un momento";
  preAprobacionListaReservacion = "/preaprobador/reservacion/lista";
  postFijoSaludSa = "@saludsa.com.ec";

  modificarSolicitudMensaje = "Modificar Solicitud";
  guardarSolicitudDeViaje = "Guardar Solicitud de Viaje";
  negarSolicitudMensaje = "Negar Solicitud";
  seguroDeseaModificarSolicitud = "¿Está seguro que desea modificar la solicitud de viaje?";
  seguroDeseaGuardarSolicitud = "¿Está seguro que desea guardar la solicitud de viaje?";
  seguroDeseaNegarSolicitud = "¿Está seguro que desea negar la solicitud de viaje?";

  siModificarSolicitud = "Si, Modificar Solicitud";
  siGuardarSolicitud = "Si, Guardar Solicitud";
  siNegarSolicitud = "Si, Negar Solicitud";

  lstCentroCosto: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: "" }>;
  lstCentroCostroFiltro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: ""; }>;
  lstRequerimientosPago = [];
  requerimientoPagoExitoso = [];
  typePaymentRequest = 0;
  content: any;
  uploadData: any;
  buttonPaymentRequest = false;
  comentario: any;
  dtPaymentRequestDocument = {
    ExtensionArray: "",
    GuidArray: null,
    IdArchivoArray: "",
    IdClase: null,
    IdContenido: "",
    IdDocumentoSolicitudPago: 0,
    IdSolicitudPagoCabecera: 0,
    IdTipoObjeto: null,
    IdViaje: 0,
    Identificador: 0,
    NombreArray: "",
    VersionArray: null,
    VersionContenido: null,
  };

  editable = false;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    private readonly dom: DomSanitizer,
    public global: ServicioGlobales
  ) {
    this.Mensaje = new ReplaySubject(1);
    this.Mensaje.next(this.espereUnMomento);
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
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
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
              if (this.dtViaje.Estado.IdEstado == 1) {
                this.editable = false;
              } else {
                this.editable = true;
              }
              ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);

              this.setMap(ubicacion.lat, ubicacion.lng);
              this.ObtenerViatico(this.dtViaje.IdViaje);
            }
          }
        } else {
          if (this.dtViaje.Estado.IdEstado == 1) {
            this.editable = false;
          } else {
            this.editable = true;
          }
          ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);

          this.setMap(ubicacion.lat, ubicacion.lng);
          this.ObtenerViatico(this.dtViaje.IdViaje);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public setMap(_latitud: any, _longitud: any) {
    const latitude = _latitud;
    const longitude = _longitud;
    const mapEle: HTMLElement | null = document.getElementById("map");
    this.coordenadas = { lat: latitude, lng: longitude };
    this.map = new google.maps.Map(mapEle, {
      center: this.coordenadas,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      zoom: 18,
    });

    google.maps.event.addListenerOnce(this.map, "idle", () => {
      const marker = new google.maps.Marker({
        position: this.coordenadas,
        draggable: true,
        map: this.map,
        title: "Mi Ubicación",
      });
      this.markers.push(marker);
      mapEle.classList.add("show-map");
    });
  }

  public ObtenerViatico(id: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViatico(id)
      .then((res) => {
        this.spinner.hide();
        this.lstViaticos = res;
        this.obtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public obtenerParametros() {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.spinner.hide();
        this.lstParametros = res;
        this.ObtenerSolicitudPago();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerHotel() {
    this.spinner.show();
    this.dataInterna
      .ObtenerHotel(this.dtViaje.Transporte.Ruta.DestinoRuta)
      .then((res) => {
        this.spinner.hide();
        this.lstHotels = res;
        for (const hotel of this.lstHotels) {
          if (this.dtViaje.Hotel.IdHotel == hotel.IdHotel) {
            this.dtHotel = hotel;
            break;
          }
        }
        this.ObtenerSolicitudPago();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerSolicitudPago() {
    this.spinner.show();
    this.dataInterna
      .ObtenerListadoDocumentosPago(this.dtViaje.IdViaje)
      .then((res) => {
        this.spinner.hide();
        this.lstRequerimientosPago = res;

        this.requerimientoPagoExitoso = [];
        for (const paymentRequest of this.lstRequerimientosPago) {
          if (paymentRequest.Tipo == 1) {
            this.requerimientoPagoExitoso.push(1);
          } else if (paymentRequest.Tipo == 2) {
            this.requerimientoPagoExitoso.push(2);
          } else if (paymentRequest.Tipo == 3) {
            this.requerimientoPagoExitoso.push(3);
          }
        }

        this.VerificarBotonPagoRespuesta();
        this.ObtenerDepartamento();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerDepartamento() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerDepartamento(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
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

        this.dtTipoGasto = this.dtViaje.TipoGastoViaje == "" ? "" : this.dtViaje.TipoGastoViaje;

        this.dtContabilidad.tipoContabilidad = this.dtViaje.TipoCuentaViaje == "" ? null : this.dtViaje.TipoCuentaViaje;

        if (this.dtViaje.DepartamentoUnoViaje != "") {
          var tmpDepartament1 = JSON.parse(this.dtViaje.DepartamentoUnoViaje);
          this.dtDepartamento1 = tmpDepartament1;
          this.dtContabilidad.departamento1Codigo = tmpDepartament1.Codigo;
          this.dtContabilidad.departamento1 = tmpDepartament1;
          this.dtContabilidad.departamento1CodigoDescripcion = tmpDepartament1.CodigoDescripcion;
        }

        if (this.dtViaje.DepartamentoDosViaje != "") {
          var tmpDepartament2 = JSON.parse(this.dtViaje.DepartamentoDosViaje);
          this.dtDepartamento2 = tmpDepartament2;
          this.dtDepartamento2.Codigo = tmpDepartament2.Codigo;
          this.dtContabilidad.departamento2Codigo = tmpDepartament2.Codigo;
          this.dtContabilidad.departamento2 = tmpDepartament2;
          this.dtContabilidad.departamento2CodigoDescripcion = tmpDepartament2.CodigoDescripcion;
          this.dtCentroCosto = [];
          this.dtProposito = [];
          this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
        }
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Obtener datos AX",
          html:
            "No se ha podido cargar los datos del departamento," +
            "<br>" +
            " vuelva a intentar más tarde, si el problema periste comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          this.rutaSistema.navigate([this.preAprobacionListaReservacion]);
        });
      });
  }

  public ObtenerCentroCosto(idDepartament: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerCentroCosto(
        token,
        idDepartament,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.spinner.hide();
        this.lstCentroCosto = res;
        this.lstCentroCostroFiltro = this.lstCentroCosto.slice();
        if (this.dtViaje.CentroCostoViaje != "") {
          var tmpConstCenter = JSON.parse(this.dtViaje.CentroCostoViaje);
          this.dtCentroCosto = tmpConstCenter;
          this.dtCentroCosto.Codigo = tmpConstCenter.Codigo;
          this.dtContabilidad.costoCentro = this.dtCentroCosto;
          this.dtContabilidad.costoCentroCodigoDescripcion =
            this.dtCentroCosto.CodigoDescripcion;
          this.dtContabilidad.costoCentroCodigo = tmpConstCenter.Codigo;
          this.ObtenerProposito(
            this.dtDepartamento2.Codigo,
            this.dtCentroCosto.Codigo
          );
        }
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Obtener datos AX",
          html:
            "No se ha podido cargar los datos del centro de costo," +
            "<br>" +
            " vuelva a intentar más tarde, si el problema periste comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        });
      });
  }

  public ObtenerProposito(idDepartament: any, idCostCenter: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerProposito(
        token,
        idDepartament,
        idCostCenter,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.spinner.hide();
        this.lstPropositos = res;
        if (this.dtViaje.PropositoViaje != "") {
          var tmpPurpose = JSON.parse(this.dtViaje.PropositoViaje);
          this.dtProposito = tmpPurpose;
          this.dtProposito.Codigo = tmpPurpose.Codigo;
          this.dtTipoGasto = this.dtViaje.TipoGastoViaje;
          this.dtContabilidad.propositoCodigo = tmpPurpose.Codigo;
          this.dtContabilidad.proposito = tmpPurpose;
          this.dtContabilidad.propositoCodigoDescripcion =
            tmpPurpose.CodigoDescripcion;
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ColocarDepartamento1() {
    this.dtContabilidad.departamento1 = this.dtDepartamento1;
    this.dtContabilidad.departamento1CodigoDescripcion =
      this.dtContabilidad.departamento1.CodigoDescripcion;
    this.dtContabilidad.departamento1Codigo = this.dtContabilidad.departamento1.Codigo;
    this.dtDepartamento2 = { Nombre: "", Codigo: "" };
  }

  public ColocarDepartamento2() {
    this.dtContabilidad.departamento2 = this.dtDepartamento2;
    this.dtContabilidad.departamento2CodigoDescripcion =
      this.dtDepartamento2.CodigoDescripcion;
    this.dtContabilidad.departamento2Codigo = this.dtDepartamento2.Codigo;
    this.dtCentroCosto = [];
    this.dtProposito = [];
    this.dtTipoGasto = "";
    this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
  }

  public ColocarCentroCosto() {
    this.dtContabilidad.costoCentro = this.dtCentroCosto;
    this.dtContabilidad.costoCentroCodigoDescripcion =
      this.dtCentroCosto.CodigoDescripcion;
    this.dtContabilidad.costoCentroCodigo = this.dtCentroCosto.Codigo;
    this.dtProposito = [];
    this.dtTipoGasto = "";
    this.ObtenerProposito(this.dtDepartamento2.Codigo, this.dtCentroCosto.Codigo);
  }

  public ColorcarProposito() {
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
    this.lstCentroCostroFiltro = this.lstCentroCosto.filter(
      (s) =>
        s.CodigoDescripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  public ValidarEstadoSolicitudViaje() {
    this.dataInterna.VerificarEstadoSolicitud(this.dtViaje.IdViaje).then((res) => {
      if (res == 1) {
        this.GuardarViaje(2);
      } else {
        this.global.VerAlerta("Información", "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha finalizado este proceso en otra instancia del sistema", "info");
        this.rutaSistema.navigate(["/registrador/pago/viajes/lista"]);
      }
    }).catch((err) => { console.log(err) });
  }

  public GuardarViaje(state: any) {
    const informacion = "Información";
    const info = "info";
    const estoPuedeTardarUnosMinutos = "Esto puede tardar unos minutos";

    if (this.dtContabilidad.tipoContabilidad == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "Debe seleccionar el tipo de cuenta",
        info
      );
    } else if (this.dtContabilidad.departamento1Codigo == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "Debe seleccionar el departamento",
        info
      );
    } else if (this.dtContabilidad.departamento2Codigo == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "Debe seleccionar el departamento",
        info
      );
    } else if (this.dtContabilidad.costoCentroCodigo == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "Debe seleccionar el centro de costos",
        info
      );
    } else if (this.dtContabilidad.propositoCodigo == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "Debe seleccionar el propósito",
        info
      );
    } else if (this.dtTipoGasto == "" || this.dtTipoGasto == null) {
      this.global.VerAlertaTiempo(
        informacion,
        "No se encuentra cargada la información del tipo de gasto. Por favor contecte con el administrador de la plataforma.",
        info
      );
    } else {
      var travel = {
        Identificador: 2,
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
            Usuario: this.dtViaje.Aprobador.Usuario,
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
          TipoCuentaViaje: this.dtContabilidad.tipoContabilidad,
          DepartamentoUnoViaje: JSON.stringify(this.dtContabilidad.departamento1),
          DepartamentoDosViaje: JSON.stringify(this.dtContabilidad.departamento2),
          CentroCostoViaje: JSON.stringify(this.dtContabilidad.costoCentro),
          PropositoViaje: JSON.stringify(this.dtContabilidad.proposito),
          TipoGastoViaje: this.dtTipoGasto,
          RegistroAnticipo: "",
        },
      };

      Swal.fire({
        title: "Aprobar Solicitud",
        html: "¿Está seguro que desea aprobar la solicitud de viaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Si, Aprobar Solicitud",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.spinner.show();

          this.Mensaje.subscribe((value) => {
            console.log(value);
          });

          this.intervaloMsg = setInterval(() => {
            let dataF = "";
            this.Mensaje.subscribe((dataMensaje) => {
              dataF = dataMensaje;
            });
            if (dataF == estoPuedeTardarUnosMinutos) {
              this.Mensaje.next(this.espereUnMomento);
            } else {
              this.Mensaje.next(estoPuedeTardarUnosMinutos);
            }
          }, 5000);

          this.dataInterna
            .GestionarViaje(travel)
            .then((res) => {
              clearInterval(this.intervaloMsg);
              this.spinner.hide();
              if (res.Estado != "ERROR") {
                Swal.fire({
                  title: "Guardar solicitud",
                  html: "La solicitud a sido guardada exitosamente",
                  type: "info",
                  showCancelButton: false,
                  confirmButtonText: "Aceptar",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  this.ObtenerViajeNuevamente(this.dtViaje.IdViaje);
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                type: "error",
                html: "<p>Hubo problemas durante el envío intentalo de nuevo</p>",
              });

              this.spinner.hide();
            });
        }
      });
    }
  }

  public ObtenerViajeNuevamente(id: any) {
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        this.ObtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerParametros() {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.spinner.hide();
        var lstParametros = res;
        var tmpAplicacion = lstParametros.find(
          (e: any) => e.NombreParametro == "IdAplicacion"
        );
        var tmpNombreOrigen = lstParametros.find(
          (e: any) => e.NombreParametro == "NombreOrigen"
        );
        var tmpEmailOrigen = lstParametros.find(
          (e: any) => e.NombreParametro == "EmailOrigen"
        );
        var tmpTiempoEspera = lstParametros.find(
          (e: any) => e.NombreParametro == "TiempoEspera"
        );

        this.EnviarEmailAprobador(
          this.dtViaje.IdViaje,
          tmpAplicacion.ValorParametro,
          tmpNombreOrigen.ValorParametro,
          tmpEmailOrigen.ValorParametro,
          this.dtViaje.Aprobador.Nombre,
          this.dtViaje.Aprobador.Usuario + this.postFijoSaludSa,
          tmpTiempoEspera.ValorParametro
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EnviarEmailAprobador(
    idViaje: any,
    aplicacion: any,
    nombreOrigen: any,
    emailOrigen: any,
    nombreAprobador: any,
    emailAprobador: any,
    tmpTiempoEspera: any
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtViaje.Aprobador.Usuario,
      idViaje: idViaje,
      url: "aprobador/reservacion/detalle/" + idViaje,
    });
    var urlAcceso = "#/" + btoa(datos);

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailAprobador(
          idViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.NombreViaje,
          nombreAprobador,
          this.dtViaje.Transporte.Ruta.NombreRuta,
          this.dtViaje.MotivoViaje,
          urlAcceso
        ),
        Asunto: "Aprobación Solicitud De Viaje " + idViaje,
        IdAplicacion: aplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nombreOrigen,
        EmailOrigen: emailOrigen,
        EmailsDestino: [
          {
            Nombre: nombreAprobador,
            Direccion: this.global.Reemplazar(emailAprobador)
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
    this.rutaSistema.navigate([this.preAprobacionListaReservacion]);
  }

  public AbrirModalModificar() {
    this.comentario = "";
    $("#exampleModalCenter").modal("toggle");
  }

  public AbrirModalNegar() {
    this.comentario = "";
    $("#exampleNegarSolicitud").modal("toggle");
  }

  public ModificarSolicitud() {
    if (this.comentario == undefined || this.comentario == "") {
      this.global.MostrarNotificacion(
        "Debe llenar el campo justificación",
        "info",
        "top-end"
      );
    } else {
      var state = 4;
      var travel = {
        Identificador: 4,
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
            ? this.modificarSolicitudMensaje
            : state == 6
              ? this.guardarSolicitudDeViaje
              : this.negarSolicitudMensaje,
        html:
          state == 4
            ? this.seguroDeseaModificarSolicitud
            : state == 6
              ? this.seguroDeseaGuardarSolicitud
              : this.seguroDeseaNegarSolicitud,
        type: "info",
        showCancelButton: true,
        confirmButtonText:
          state == 4
            ? this.siModificarSolicitud
            : state == 6
              ? this.siGuardarSolicitud
              : this.siNegarSolicitud,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.dataInterna
            .GestionarViaje(travel)
            .then((res) => {
              $("#exampleModalCenter").modal("toggle");

              this.spinner.hide();

              var tmpAplicacion = this.lstParametros.find(
                (e: any) => e.NombreParametro == "IdAplicacion"
              );
              var tmpNombreOrigen = this.lstParametros.find(
                (e: any) => e.NombreParametro == "NombreOrigen"
              );
              var tmpEmailOrigen = this.lstParametros.find(
                (e: any) => e.NombreParametro == "EmailOrigen"
              );
              var tmpTiempoEspera = this.lstParametros.find(
                (e: any) => e.NombreParametro == "TiempoEspera"
              );

              this.EnviarCorreoCorrecion(
                this.dtViaje.IdViaje,
                tmpAplicacion.ValorParametro,
                tmpNombreOrigen.ValorParametro,
                tmpEmailOrigen.ValorParametro,
                this.dtViaje.NombreViaje,
                this.dtViaje.Registrador.Usuario + this.postFijoSaludSa,
                tmpTiempoEspera.ValorParametro
              );
            })
            .catch((err) => {
              this.spinner.hide();
            });
        }
      });
    }
  }

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
        Identificador: 3,
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
            ? this.modificarSolicitudMensaje
            : state == 6
              ? this.guardarSolicitudDeViaje
              : this.negarSolicitudMensaje,
        html:
          state == 4
            ? this.seguroDeseaModificarSolicitud
            : state == 6
              ? this.seguroDeseaGuardarSolicitud
              : this.seguroDeseaNegarSolicitud,
        type: "info",
        showCancelButton: true,
        confirmButtonText:
          state == 4
            ? this.siModificarSolicitud
            : state == 6
              ? this.siGuardarSolicitud
              : this.siNegarSolicitud,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.dataInterna
            .GestionarViaje(travel)
            .then((res) => {
              this.spinner.hide();
              $("#exampleNegarSolicitud").modal("toggle");

              var tmpAplicacion = this.lstParametros.find(
                (e: any) => e.NombreParametro == "IdAplicacion"
              );
              var tmpNombreOrigen = this.lstParametros.find(
                (e: any) => e.NombreParametro == "NombreOrigen"
              );
              var tmpEmailOrigen = this.lstParametros.find(
                (e: any) => e.NombreParametro == "EmailOrigen"
              );
              var tmpTiempoEspera = this.lstParametros.find(
                (e: any) => e.NombreParametro == "TiempoEspera"
              );

              this.EnviarCorreoNegacion(
                this.dtViaje.IdViaje,
                tmpAplicacion.ValorParametro,
                tmpNombreOrigen.ValorParametro,
                tmpEmailOrigen.ValorParametro,
                this.dtViaje.NombreViaje,
                this.dtViaje.Registrador.Usuario + this.postFijoSaludSa,
                tmpTiempoEspera.ValorParametro
              );
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
          nombreSolicitante.toUpperCase(),
          idViaje,
          this.comentario,
          urlAcceso
        ),
        Asunto: "Rechazo solicitud de viaje",
        IdAplicacion: aplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: nombreOrigen,
        EmailOrigen: emailOrigen,
        EmailsDestino: [
          {
            Nombre: nombreSolicitante.toUpperCase(),
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

    this.rutaSistema.navigate([this.preAprobacionListaReservacion]);
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
          nombreSolicitante.toUpperCase(),
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
            Nombre: nombreSolicitante.toUpperCase(),
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

    this.rutaSistema.navigate([this.preAprobacionListaReservacion]);
  }

  public GestionViaje(state: any) {
    var travel = {
      Identificador: 3,
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
          ? this.modificarSolicitudMensaje
          : state == 6
            ? this.guardarSolicitudDeViaje
            : this.negarSolicitudMensaje,
      html:
        state == 4
          ? this.seguroDeseaModificarSolicitud
          : state == 6
            ? this.seguroDeseaGuardarSolicitud
            : this.seguroDeseaNegarSolicitud,
      type: "info",
      showCancelButton: true,
      confirmButtonText:
        state == 4
          ? this.siModificarSolicitud
          : state == 6
            ? this.siGuardarSolicitud
            : this.siNegarSolicitud,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.dataInterna
          .GestionarViaje(travel)
          .then((res) => {
            this.spinner.hide();
            this.rutaSistema.navigate([this.preAprobacionListaReservacion]);
          })
          .catch((err) => {
            this.spinner.hide();
          });
      }
    });
  }

  public ObtenerModalSolicitudPago(type: any) {
    this.typePaymentRequest = type;
    $("#ModalPaymentRequest").modal("toggle");
  }

  public ObtenerContenedor() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoEmpleado,
        IdClase: environment.parametrosMFiles.IdClaseEmpleado,
        Propiedades: [
          {
            Id: environment.parametrosMFiles.CodigoNumeroIdentificacion,
            Valor: this.dtViaje.Registrador.Identificacion,
            Condicion: "Igual",
          },
        ],
        ExcluirEliminados: true,
      }),
    };

    this.spinner.show();
    this.dataExterna
      .ObtenerContenedor(data)
      .then((res) => {
        this.spinner.hide();
        var result = JSON.parse(res);
        var dtContainer: any;
        var idContainer = 0;

        if (result.Estado == "OK") {
          dtContainer = result.Datos[0];
          idContainer = dtContainer.Id;
          this.CargarArchivo(idContainer);
        } else {
          this.ObtenerUsuario();
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerUsuario() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    this.spinner.show();
    this.dataExterna
      .ObtenerUsuario(token, this.dtViaje.Registrador.Usuario)
      .then((res) => {
        this.spinner.hide();

        var userData = res;

        var dtPaymentRequest = {
          IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoEmpleado,
          IdClase: environment.parametrosMFiles.IdClaseEmpleado,
          Titulo: userData.NombresApellidos,
          Propiedades: [
            {
              Id: environment.parametrosMFiles.CodigoNumeroIdentificacion,
              Valor: userData.Cedula,
            },
            {
              Id: environment.parametrosMFiles.CodigoNombresEmpleado,
              Valor: userData.Nombres,
            },
            {
              Id: environment.parametrosMFiles.CodigoApellidosEmpleado,
              Valor: userData.Apellidos,
            },
          ],
        };
        this.CrearContenedor(dtPaymentRequest);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CrearContenedor(param: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = {
      Token: token.access_token,
      DataJSON: JSON.stringify(param),
    };

    this.spinner.show();
    this.dataExterna
      .CargarArchivo(data)
      .then((res) => {
        this.spinner.hide();

        var result = JSON.parse(res);
        var idContainer = 0;

        if (result.Estado == "OK") {
          idContainer = result.Datos.Id;
          this.CargarArchivo(idContainer);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarArchivo(container: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var tipo = "";
    var tipod = 0;
    if (this.typePaymentRequest == 1) {
      tipo = "HOSPEDAJE " + this.dtViaje.IdViaje;
      tipod = 2;
    } else if (this.typePaymentRequest == 2) {
      tipo = "MOVILIZACION AEREO " + this.dtViaje.IdViaje;
      tipod = 3;
    } else if (this.typePaymentRequest == 3) {
      tipo = "MOVILIZACION TERRESTRE " + this.dtViaje.IdViaje;
      tipod = 3;
    }

    var data = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoAdministracionViaje,
        IdClase: environment.parametrosMFiles.IdClaseAdministracionViaje,
        Titulo: tipo,
        Propiedades: [
          {
            Id: environment.parametrosMFiles.AdministracionViajeNumero,
            Valor: this.dtViaje.IdViaje,
          },
          {
            Id: environment.parametrosMFiles.AdministracionViajeRucProveedor,
            Valor: this.dtViaje.Registrador.Identificacion,
          },
          {
            Id: environment.parametrosMFiles.AdministracionViajeIdEmpleado,
            Valor: container,
          },
          {
            Id: environment.parametrosMFiles.AdministracionViajeTipoDocumento,
            Valor: tipod,
          },
        ],
        Documentos: [
          {
            Nombre: tipo + ".PDF",
            Contenido: this.content,
          },
        ],
      }),
    };

    this.spinner.show();
    this.dataExterna
      .CargarArchivo(data)
      .then((res) => {
        this.spinner.hide();
        this.uploadData = JSON.parse(res);
        this.CrearSolicitudPago();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CrearSolicitudPago() {
    var user = this.servicioUsuario.ObtenerUsuario();
    var tempArchivos = this.uploadData.Datos.Archivos;
    var tipo = "";

    if (this.typePaymentRequest == 1) {
      tipo = "HOSPEDAJE";
    } else if (this.typePaymentRequest == 2) {
      tipo = "MOVILIZACION";
    } else if (this.typePaymentRequest == 3) {
      tipo = "MOVILIZACION";
    }

    var Headboard = {
      Identificador: 2,
      SolicitanteUsuario: user.Usuario,
      SolicitanteNombreCompleto: user.NombreCompleto,
      SolicitanteCiudadCodigo: user.CiudadCodigo,
      EmpresaCodigo: this.dtViaje.Registrador.CodigoEmpresa,
      EmpresaNombre: this.dtViaje.Registrador.NombreEmpresa,
      NombreCorto: `FACTURA ${tipo} VIAJE - ${this.dtViaje.IdViaje} - ${this.dtViaje.NombreViaje}`,
      Observacion: "",
      AprobacionJefeArea: this.dtViaje.Aprobador.Usuario,
      EstadoId: 1,
      MontoTotal: ".00",
      IdViaje: this.dtViaje.IdViaje,
      Tipo: this.typePaymentRequest,
      DocumentoSolicitudPagoTemporal: {
        Identificador: 1,
        IdDocumentoSolicitudPago: 0,
        IdTipoObjeto: this.uploadData.Datos.IdTipoObjeto,
        IdClase: this.uploadData.Datos.IdClase,
        IdContenido: this.uploadData.Datos.Id,
        VersionContenido: this.uploadData.Datos.Version,
        IdArchivoArray: tempArchivos[0].Id,
        GuidArray: tempArchivos[0].Guid,
        NombreArray: tempArchivos[0].Nombre,
        ExtensionArray: tempArchivos[0].Extension,
        VersionArray: tempArchivos[0].Version,
        IdViaje: this.dtViaje.IdViaje,
        IdSolicitudPagoCabecera: 0,
      },
    };

    this.spinner.show();
    this.dataExterna
      .CrearSolicitudPago(Headboard)
      .then((res) => {
        this.spinner.hide();

        this.EnviarEmailSolicitudPago();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EnviarEmailSolicitudPago() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var infoTYpe: any;
    var tipo = "";
    var tipod = 0;

    var tmpAplicacion = this.lstParametros.find(
      (e: any) => e.NombreParametro == "IdAplicacion"
    );
    var tmpNombreOrigen = this.lstParametros.find(
      (e: any) => e.NombreParametro == "NombreOrigen"
    );
    var tmpEmailOrigen = this.lstParametros.find(
      (e: any) => e.NombreParametro == "EmailOrigen"
    );
    var tmpTiempoEspera = this.lstParametros.find(
      (e: any) => e.NombreParametro == "TiempoEspera"
    );

    if (this.typePaymentRequest == 1) {
      tipo = "HOSPEDAJE " + this.dtViaje.IdViaje;
      infoTYpe = "Hospedaje";
    } else if (this.typePaymentRequest == 2) {
      tipo = "MOVILIZACION AEREO " + this.dtViaje.IdViaje;
      infoTYpe = "Movilización";
    } else if (this.typePaymentRequest == 3) {
      tipo = "MOVILIZACION TERRESTRE " + this.dtViaje.IdViaje;
      infoTYpe = "Movilización";
    }

    var emailAdjunto = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        Adjuntos: [
          {
            Nombre: tipo + ".pdf",
            Contenido: this.content,
            RutaArchivo: "",
          },
        ],
        Cuerpo: this.servicioEmail.GenerarEmailSolicitudPago(
          this.dtViaje.IdViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.FechaInicioViaje,
          infoTYpe
        ),
        Asunto: `Información de ${infoTYpe}viaje ${this.dtViaje.IdViaje}`,
        IdAplicacion: tmpAplicacion.ValorParametro,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: tmpNombreOrigen.ValorParametro,
        EmailOrigen: tmpEmailOrigen.ValorParametro,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.NombreViaje,
            Direccion: this.global.Reemplazar(this.dtViaje.Registrador.Email)
          },
        ],
        TiempoEspera: tmpTiempoEspera.ValorParametro,
      }),
    };

    this.spinner.show();
    this.dataExterna
      .EnviarEmailAdjunto(emailAdjunto)
      .then((res) => {
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });

    this.ObtenerDatosInicio();
    $("#ModalPaymentRequest").modal("toggle");
  }

  public ObtenerDocumentoSolicitudPago(type: any) {
    var tempLstId: any = this.lstRequerimientosPago.find((e: any) => e.Tipo == type);
    var id = tempLstId.IdDocumentoSolicitudPago;

    this.spinner.show();
    this.dataInterna
      .ObtenerDocumentoSolicitudPagoRegistro(id)
      .then((res) => {
        this.spinner.hide();
        this.dtPaymentRequestDocument = res;
        this.DescargarArchivo();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public DescargarArchivo() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        IdTipoObjeto: "",
        IdContenido: this.dtPaymentRequestDocument.IdContenido,
        VersionContenido: "",
        IdArchivo: this.dtPaymentRequestDocument.IdArchivoArray,
        GuidArchivo: "",
      }),
    };

    this.spinner.show();
    this.dataExterna
      .DescargarArchivo(data)
      .then((res) => {
        this.spinner.hide();
        var result = JSON.parse(res);
        this.urlArchivo = `data:application/${this.dtPaymentRequestDocument.ExtensionArray};base64${result.Datos.Contenido}`;
        this.nombreArchivo = this.dtPaymentRequestDocument.NombreArray;

        $("#ArchivoModal").modal("toggle");
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ConvertirArchivo() {
    return this.dom.bypassSecurityTrustUrl(this.urlArchivo);
  }

  public ObtenerImagen() {
    var files = $("#Archivo").prop("files");
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var base64Large: any = reader.result;
        var base64 = base64Large.split(",");
        this.content = base64[1];
      };
      reader.onerror = function (err) {
        console.log(err);
      };
    }
  }

  public VerificarPagoRespuestaVista(param: any) {
    const result = this.requerimientoPagoExitoso.find((e: any) => e == param);
    if (result == undefined) {
      return false;
    } else {
      return true;
    }
  }

  public VerificarBotonPagoRespuesta() {
    var lstEstados: any = [];
    if (this.dtViaje.RequiereHospedajeViaje == "Sí") {
      if (this.VerificarPagoRespuestaVista(1)) {
        lstEstados.push(true);
      } else {
        lstEstados.push(false);
      }
    }
    if (
      this.dtViaje.TipoViaje == "Aéreo" &&
      this.dtViaje.Transporte.RequierePasajeAereo == "Sí"
    ) {
      if (this.VerificarPagoRespuestaVista(2)) {
        lstEstados.push(true);
      } else {
        lstEstados.push(false);
      }
    }
    if (
      this.dtViaje.TipoViaje == "Terrestre" &&
      this.dtViaje.Transporte.MovilizacionTerrestre == "No"
    ) {
      if (this.VerificarPagoRespuestaVista(3)) {
        lstEstados.push(true);
      } else {
        lstEstados.push(false);
      }
    }

    var validation = lstEstados.find((element) => !element);
    if (validation == undefined) {
      this.buttonPaymentRequest = true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervaloMsg);
  }
}
