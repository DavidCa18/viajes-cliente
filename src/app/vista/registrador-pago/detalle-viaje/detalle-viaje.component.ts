import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioPlantillaCorreoDatafast } from '../../../variable/correo/plantilla-correo-datafast.service';
import Swal from "sweetalert2";
import { environment } from "../../../../environments/environment";

declare var $: any;
declare var google: any;
@Component({
  selector: "app-detalle-viaje",
  templateUrl: "./detalle-viaje.component.html",
  styleUrls: ["./detalle-viaje.component.css"],
})
export class DetalleViajeComponent implements OnInit {
  tipoMenu = 3;

  public mensaje = "Cargando Información...";
  public urlRegistradorPago = "/registrador/pago/viajes/lista";

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
  markers: any = [];
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

  lstCentroCosto: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: "" }>;
  lstCentroCostroFiltro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: ""; }>;
  lstRequerimientosPago = [];
  requerimientoPagoExitoso: any = [];
  typePaymentRequest = 0;
  content: any;
  uploadData: any;
  buttonPaymentRequest = false;
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

  lstHotels = [];
  dtHotel: any;

  archivoHospedaje: any;
  archivoMovilizacionAereo: any;
  archivoMovilizacionTerrestre: any;

  nombreArchivoUno: any;
  nombreArchivoDos: any;
  nombreArchivoTres: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly dataExterna: ServicioDataExternos,
    private readonly dataInterna: ServicioDataInternos,
    private readonly rutaActiva: ActivatedRoute,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router,
    private readonly dom: DomSanitizer,
    public global: ServicioGlobales
  ) { }

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
              ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
              this.setMap(ubicacion.lat, ubicacion.lng);
              this.ObtenerViatico(this.dtViaje.IdViaje);
            }
          }
        } else {
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

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement | null = document.getElementById("map");

    // create LatLng object
    this.coordenadas = { lat: latitude, lng: longitude };

    // create map
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
        this.lstParametros = res;
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
          Nombre:
            this.dtContabilidad.departamento1CodigoDescripcion == null
              ? ""
              : this.dtContabilidad.departamento1CodigoDescripcion,
          Codigo:
            this.dtContabilidad.departamento1Codigo == null
              ? ""
              : this.dtContabilidad.departamento1Codigo,
        };
        this.dtDepartamento2 = {
          Nombre:
            this.dtContabilidad.departamento2CodigoDescripcion == null
              ? ""
              : this.dtContabilidad.departamento2CodigoDescripcion,
          Codigo:
            this.dtContabilidad.departamento2Codigo == null
              ? ""
              : this.dtContabilidad.departamento2Codigo,
        };
        if (this.dtViaje.TipoGastoViaje === "") {
          this.dtTipoGasto = ""
        } else {
          this.dtTipoGasto = this.dtViaje.TipoGastoViaje
        }
        this.dtTipoGasto = this.dtViaje.TipoGastoViaje;

        this.dtContabilidad.tipoContabilidad =
          this.dtViaje.TipoCuentaViaje == ""
            ? null
            : this.dtViaje.TipoCuentaViaje;

        if (this.dtViaje.DepartamentoUnoViaje != "") {
          var tmpDepartament1 = JSON.parse(this.dtViaje.DepartamentoUnoViaje);
          this.dtDepartamento1 = tmpDepartament1;
          this.dtContabilidad.departamento1Codigo = tmpDepartament1.Codigo;
        }

        if (this.dtViaje.DepartamentoDosViaje != "") {
          var tmpDepartament2 = JSON.parse(this.dtViaje.DepartamentoDosViaje);
          this.dtDepartamento2 = tmpDepartament2;
          this.dtDepartamento2.Codigo = tmpDepartament2.Codigo;

          this.dtCentroCosto = [];
          this.dtProposito = [];

          this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
        }
      })
      .catch((err) => {
        this.spinner.hide();
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

          this.ObtenerProposito(
            this.dtDepartamento2.Codigo,
            this.dtCentroCosto.Codigo
          );
        }
      })
      .catch((err) => {
        this.spinner.hide();
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
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ColocarDepartamento1() {
    this.dtContabilidad.departamento1 = this.dtDepartamento1;
    this.dtContabilidad.departamento1CodigoDescripcion = this.dtContabilidad.departamento1.CodigoDescripcion;
    this.dtContabilidad.departamento1Codigo = this.dtContabilidad.departamento1.Codigo;
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
      DataJSON:
        `?codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}&codigoDepartamento=${this.dtContabilidad.departamento2Codigo}&codigoCentroCosto=${this.dtContabilidad.costoCentroCodigo}&codigoProposito=${this.dtContabilidad.propositoCodigo}`
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

  public GuardarViaje(state: any) {
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
          Usuario: "",
          Nombre: "",
        },
        PreAprobador: {
          Usuario: "",
          Nombre: "",
        },
        Contador: {
          Usuario: "",
          Nombre: "",
        },
        RegistradorPago: {
          Usuario: "",
          Nombre: "",
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
        this.dataInterna
          .GestionarViaje(travel)
          .then((res) => {
            this.spinner.hide();
            this.ObtenerDatosInicio();
          })
          .catch((err) => {
            this.spinner.hide();
          });
      }
    });
  }

  public GestionViaje(state: any) {
    var travel = {
      Identificador: 4,
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
            this.spinner.hide();
            Swal.fire({
              title: "Guardar Información",
              html: "La información a sido cargada exitosamente",
              type: "success",
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              this.rutaSistema.navigate([this.urlRegistradorPago]);
            });
          })
          .catch((err) => {
            this.spinner.hide();
          });
      }
    });
  }

  public ObtenerContenedor(tipo: any) {
    const noSePuedeGuardarSinAntesCargar = "No se puede guardar sin antes cargar el archivo";

    if (tipo == 1 && this.nombreArchivoUno == undefined) {
      this.global.Alerta(
        "Advertencia",
        noSePuedeGuardarSinAntesCargar,
        "error"
      );
    } else if (tipo == 2 && this.archivoMovilizacionAereo == undefined) {
      this.global.Alerta(
        "Advertencia",
        noSePuedeGuardarSinAntesCargar,
        "error"
      );
    } else if (tipo == 3 && this.archivoMovilizacionTerrestre == undefined) {
      this.global.Alerta(
        "Advertencia",
        noSePuedeGuardarSinAntesCargar,
        "error"
      );
    } else {
      var token = this.sesionExterna.ObtenerClaveExterna();
      this.typePaymentRequest = tipo;
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
  }

  public CargarArchivo(container: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var tipo = "";
    var tipod = 0;
    if (this.typePaymentRequest == 1) {
      tipo = "HOSPEDAJE " + this.dtViaje.IdViaje;
    } else if (this.typePaymentRequest == 2) {
      tipo = "MOVILIZACION AEREO " + this.dtViaje.IdViaje;
    } else if (this.typePaymentRequest == 3) {
      tipo = "MOVILIZACION TERRESTRE " + this.dtViaje.IdViaje;
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
    var usuario = this.servicioUsuario.ObtenerUsuario();
    var tempArchivos = this.uploadData.Datos.Archivos;
    var tipo = "";

    if (this.typePaymentRequest == 1) {
      tipo = "HOSPEDAJE";
    } else if (this.typePaymentRequest == 2) {
      tipo = "MOVILIZACION AÉREA";
    } else if (this.typePaymentRequest == 3) {
      tipo = "MOVILIZACION TERRESTRE";
    }

    var Headboard = {
      Identificador: 2,
      SolicitanteUsuario: usuario.Usuario,
      SolicitanteNombreCompleto: usuario.NombreCompleto,
      SolicitanteCiudadCodigo: usuario.CiudadCodigo,
      EmpresaCodigo: this.dtViaje.Registrador.CodigoEmpresa,
      EmpresaNombre: this.dtViaje.Registrador.NombreEmpresa,
      NombreCorto: `${this.dtViaje.IdViaje} - ${this.dtViaje.NombreViaje}`,
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
        if (res) {
          this.EnviarEmail();
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public EnviarEmail() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var infoTYpe: any;
    var tipo = "";


    var tmpAplicacion: any = this.lstParametros.find(
      (e: any) => e.NombreParametro == "IdAplicacion"
    );
    var tmpNombreOrigen: any = this.lstParametros.find(
      (e: any) => e.NombreParametro == "NombreOrigen"
    );
    var tmpEmailOrigen: any = this.lstParametros.find(
      (e: any) => e.NombreParametro == "EmailOrigen"
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
        Asunto: "Información de " + infoTYpe.toString(),
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
        TiempoEspera: "1",
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
        this.urlArchivo = `data:image/${result.Datos.Extension};base64,${result.Datos.Contenido}`;
        this.nombreArchivo = result.Datos.Nombre + "." + result.Datos.Extension;
        this.DescargarArchivoBase64(this.nombreArchivo, this.urlArchivo);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public DescargarArchivoBase64(nombreArchivo: any, base64Data: any) {
    const linkSource = base64Data;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = nombreArchivo;
    downloadLink.click();
  }

  public ConvertirArchivo() {
    return this.dom.bypassSecurityTrustUrl(this.urlArchivo);
  }

  public Cerrarmodal() {
    $("#Archivo").val("");
    $("#ModalPaymentRequest").modal("toggle");
  }

  public AbrirModalSolicitudPago(type: any) {
    this.typePaymentRequest = type;
    $("#ModalPaymentRequest").modal({ backdrop: "static", keyboard: false });
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

        if (this.typePaymentRequest == 1) {
          this.archivoHospedaje = this.content;
          this.nombreArchivoUno =
            `${this.global.Aleatorio(1, 10000)}-${files[0].name}`;
        } else if (this.typePaymentRequest == 2) {
          this.archivoMovilizacionAereo = this.content;
          this.nombreArchivoDos =
            `${this.global.Aleatorio(1, 10000)}-${files[0].name}`;
        } else if (this.typePaymentRequest == 3) {
          this.archivoMovilizacionTerrestre = this.content;
          this.nombreArchivoTres =
            `${this.global.Aleatorio(1, 10000)}-${files[0].name}`;
        }
      };
      reader.onerror = function (err) {
        console.log(err)
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

  public SeleccionarHotel() {
    this.dtViaje.Hotel.IdHotel = this.dtHotel.IdHotel;
    this.dtViaje.Hotel.Imagen = this.dtHotel.Imagen;
    this.dtViaje.Hotel.TarifaHotel = this.dtHotel.TarifaHotel;
    this.dtViaje.Hotel.LatLongHotel = this.dtHotel.LatLongHotel;
    this.dtViaje.Hotel.NombreHotel = this.dtHotel.NombreHotel;

    var coordenadas = JSON.parse(this.dtViaje.Hotel.LatLongHotel);

    setTimeout(() => {
      this.setMap(coordenadas.lat, coordenadas.lng);
    }, 2000);
  }

  public ActualizarHotel() {
    var data = {
      Identificador: 1,
      IdViaje: this.dtViaje.IdViaje,
      Hotel: {
        IdHotel: this.dtViaje.Hotel.IdHotel,
      },
    };

    this.dataInterna
      .ActualizarHotel(data)
      .then((res) => {
        this.spinner.hide();

        if (res != null) {
          this.spinner.show();
          this.dataInterna
            .ObtenerViatico(this.dtViaje.IdViaje)
            .then((res) => {
              this.spinner.hide();
              this.lstViaticos = res;
            })
            .catch((err) => {
              this.spinner.hide();
            });

          Swal.fire({
            title: "Cambiar Hotel",
            html: "Hotel actualizado correctamente",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
          })
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ValidarEstadoSolicitudViaje() {
    this.dataInterna.VerificarEstadoSolicitud(this.dtViaje.IdViaje).then((res) => {
      if (res == 5) {
        this.FinalizacionProcesoRegistroPago();
      } else {
        this.global.VerAlerta("Información", "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha finalizado este proceso en otra instancia del sistema", "info");
        this.rutaSistema.navigate([this.urlRegistradorPago]);
      }
    }).catch((err) => { console.log(err) });
  }

  public FinalizacionProcesoRegistroPago() {

    var dato = false;

    if (this.requerimientoPagoExitoso.length > 0) {

      if (this.dtViaje.RequiereHospedajeViaje == "Sí") {
        const informacion = this.requerimientoPagoExitoso.find((e: any) => e == 1);
        if (informacion != undefined) {
          dato = true;
        } else {
          dato = false;
        }
      }

      if (this.dtViaje.TipoViaje == "Aéreo" && this.dtViaje.Transporte.RequierePasajeAereo == "Sí") {
        const informacion = this.requerimientoPagoExitoso.find((e: any) => e == 2);
        if (informacion != undefined) {
          dato = true;
        } else {
          dato = false;
        }
      }

      if (this.dtViaje.TipoViaje == "Terrestre" && this.dtViaje.Transporte.MovilizacionTerrestre == "No" && this.dtViaje.Transporte.MovilizacionTerrestreContratada == "Sí") {
        const informacion = this.requerimientoPagoExitoso.find((e: any) => e == 3);
        if (informacion != undefined) {
          dato = true;
        } else {
          dato = false;
        }
      }

    }

    if (!dato) {
      //verificación de archivos
      if (this.dtViaje.RequiereHospedajeViaje == "Sí" && (this.nombreArchivoUno == undefined || this.nombreArchivoUno == "")) {
        this.global.Alerta("Atención", "Se debe cargar la <b>Información de Hospedaje</b>", "warning");
      } else if (this.dtViaje.TipoViaje == "Aéreo" && this.dtViaje.Transporte.RequierePasajeAereo == "Sí" && (this.nombreArchivoDos == undefined || this.nombreArchivoDos == "")) {
        this.global.Alerta("Atención", "Se debe cargar la <b>Información de Movilización Aérea</b>", "warning");
      } else if (this.dtViaje.TipoViaje == "Terrestre" && this.dtViaje.Transporte.MovilizacionTerrestre == "No" && this.dtViaje.Transporte.MovilizacionTerrestreContratada == "Sí" && (this.nombreArchivoTres == undefined || this.nombreArchivoTres == "")) {
        this.global.Alerta("Atención", "Se debe cargar la <b>Información de Movilización Terrestre</b>", "warning");
      } else {
        Swal.fire({
          title: "Guardar Solicitud de Viaje",
          html: "¿Está seguro que desea guardar la solicitud de viaje?",
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Si, Guardar Solicitud",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.value) {
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
            this.dataExterna.ObtenerContenedor(data).then((res) => {
              this.spinner.hide();
              var result = JSON.parse(res);
              if (result.Estado == "OK") {
                var lista = result.Datos;
                lista.sort((a: any, b: any) => a.FechaCreacion - b.FechaCreacion);
                var dtContainer = lista[0];
                var idContainer = dtContainer.Id;
                this.CargarArchivosSolicitudPago(idContainer);
              } else {
                this.ObtenerUsuario();
              }
            }).catch((err) => { this.spinner.hide(); });
          }
        });
      }
    } else {
      this.GestionViajeArchivosAdicional(6);
    }


  }

  public ObtenerUsuario() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    this.spinner.show();
    this.dataExterna
      .ObtenerUsuario(token, this.dtViaje.Registrador.Usuario)
      .then((res) => {
        this.spinner.hide();

        var informacionUsuario = res;

        var dtPaymentRequest = {
          IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoEmpleado,
          IdClase: environment.parametrosMFiles.IdClaseEmpleado,
          Titulo: informacionUsuario.NombresApellidos,
          Propiedades: [
            {
              Id: environment.parametrosMFiles.CodigoNumeroIdentificacion,
              Valor: informacionUsuario.Cedula,
            },
            {
              Id: environment.parametrosMFiles.CodigoNombresEmpleado,
              Valor: informacionUsuario.Nombres,
            },
            {
              Id: environment.parametrosMFiles.CodigoApellidosEmpleado,
              Valor: informacionUsuario.Apellidos,
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
          this.CargarArchivosSolicitudPago(idContainer);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarArchivosSolicitudPago(container: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var documentos: any = [];
    var informacionAdicional: any = [];

    if (this.nombreArchivoUno != undefined && this.nombreArchivoUno != null && this.nombreArchivoUno != "") {
      documentos.push({
        Nombre: this.nombreArchivoUno,
        Contenido: this.archivoHospedaje,
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
            Valor: 2,
          },
        ],
      });
      informacionAdicional.push({ Nombre: this.nombreArchivoUno, Tipo: 1, Especie: "hospedaje" });
    }

    if (this.nombreArchivoDos != undefined && this.nombreArchivoDos != null && this.nombreArchivoDos != "") {
      documentos.push({
        Nombre: this.nombreArchivoDos,
        Contenido: this.archivoMovilizacionAereo,
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
            Valor: 3,
          },
        ],
      });
      informacionAdicional.push({ Nombre: this.nombreArchivoDos, Tipo: 2, Especie: "aereo" });
    }

    if (this.nombreArchivoTres != undefined && this.nombreArchivoTres != null && this.nombreArchivoTres != "") {
      documentos.push({
        Nombre: this.nombreArchivoTres,
        Contenido: this.archivoMovilizacionTerrestre,
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
            Valor: 3,
          },
        ],
      });
      informacionAdicional.push({ Nombre: this.nombreArchivoTres, Tipo: 3, Especie: "terrestre" });
    }

    var data: any = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoAdministracionViaje,
        IdClase: environment.parametrosMFiles.IdClaseAdministracionViaje,
        Documentos: documentos,
      }),
    };

    var archivos: any = [];
    this.spinner.show();
    this.dataExterna.CargarArchivoMultiple(data).then((res) => {
      this.spinner.hide();
      var resultado = JSON.parse(res);
      if (resultado.Estado == "OK") {
        var lstArchivos = resultado.Datos;
        for (const contenedor of lstArchivos) {
          if (contenedor.Archivos) {

            var nombre = `${contenedor.Archivos[0].Nombre}.${contenedor.Archivos[0].Extension}`;

            /* var tipo = 0;
            
            if (this.nombreArchivoUno == nombre) {
            tipo = 1;
            } else if (this.nombreArchivoDos == nombre) {
            tipo = 2;
            } else if (this.nombreArchivoTres == nombre) {
            tipo = 3;
            } */

            var objetoAdicional: any = informacionAdicional.find((e: any) => e.Nombre == nombre);
            var objeto: any = objetoAdicional;

            archivos.push({
              Identificador: 1,
              IdDocumentoSolicitudPago: 0,
              IdTipoObjeto: contenedor.IdTipoObjeto,
              IdClase: contenedor.IdClase,
              IdContenido: contenedor.Id,
              VersionContenido: contenedor.Version,
              IdArchivoArray: contenedor.Archivos[0].Id,
              GuidArray: contenedor.Archivos[0].Guid,
              NombreArray: contenedor.Archivos[0].Nombre,
              ExtensionArray: contenedor.Archivos[0].Extension,
              VersionArray: contenedor.Archivos[0].Version,
              IdViaje: this.dtViaje.IdViaje,
              IdSolicitudPagoCabecera: 0,
              Tipo: objeto.Tipo,
              Especie: objeto.Especie,
              NombreEspecie: objeto.Nombre
            });
          }
        }

      } else if (resultado.Estado == "Error") {
        let mensajes = "";
        for (var item of resultado.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }
        this.global.VerMensajeError(mensajes, "error", "top-end");
      }

      setTimeout(() => {
        this.CrearSolicitudesPago(archivos);
      }, 1500);

    }).catch((err) => { this.spinner.hide(); });

  }

  public CrearSolicitudesPago(archivos: any) {
    var usuario = this.servicioUsuario.ObtenerUsuario();

    var Headboard = {
      Identificador: 2,
      SolicitanteUsuario: usuario.Usuario,
      SolicitanteNombreCompleto: usuario.NombreCompleto,
      SolicitanteCiudadCodigo: usuario.CiudadCodigo,
      EmpresaCodigo: this.dtViaje.Registrador.CodigoEmpresa,
      EmpresaNombre: this.dtViaje.Registrador.NombreEmpresa,
      NombreCorto: `${this.dtViaje.IdViaje} - ${this.dtViaje.NombreViaje}`,
      Observacion: "",
      AprobacionJefeArea: this.dtViaje.Aprobador.Usuario,
      EstadoId: 1,
      MontoTotal: ".00",
      IdViaje: this.dtViaje.IdViaje,
      Tipo: this.typePaymentRequest,
      DocumentoSolicitudPagoTemporal: {},
      JSONSolicitudPago: JSON.stringify(archivos),
    };

    this.spinner.show();
    this.dataExterna.CrearSolicitudPago(Headboard).then((res) => {
      this.spinner.hide();
      if (res) {
        this.EnviarEmails();
      }
    }).catch((err) => { this.spinner.hide(); });

  }

  public EnviarEmails() {

    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var infoTYpe = "";
    var documentos: any = [];
    var tmpAplicacion: any = this.lstParametros.find((e: any) => e.NombreParametro == "IdAplicacion");
    var tmpNombreOrigen: any = this.lstParametros.find((e: any) => e.NombreParametro == "NombreOrigen");
    var tmpEmailOrigen: any = this.lstParametros.find((e: any) => e.NombreParametro == "EmailOrigen");

    if (this.nombreArchivoUno != undefined && this.nombreArchivoUno != null && this.nombreArchivoUno != "") {
      infoTYpe += "Hospedaje | ";
      documentos.push({ Nombre: this.nombreArchivoUno, Contenido: this.archivoHospedaje, RutaArchivo: "" });
    }

    if (this.nombreArchivoDos != undefined && this.nombreArchivoDos != null && this.nombreArchivoDos != "") {
      infoTYpe += "Movilización | ";
      documentos.push({ Nombre: this.nombreArchivoDos, Contenido: this.archivoMovilizacionAereo, RutaArchivo: "" });
    }

    if (this.nombreArchivoTres != undefined && this.nombreArchivoTres != null && this.nombreArchivoTres != "") {
      infoTYpe += "Movilización | ";
      documentos.push({ Nombre: this.nombreArchivoTres, Contenido: this.archivoMovilizacionTerrestre, RutaArchivo: "" });
    }

    var emailAdjunto = {
      Token: token.access_token,
      DataJSON: JSON.stringify({
        Adjuntos: documentos,
        Cuerpo: this.servicioEmail.GenerarEmailSolicitudPago(
          this.dtViaje.IdViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.FechaInicioViaje,
          infoTYpe.substring(0, infoTYpe.length - 2)
        ),
        Asunto: "Información de " + infoTYpe.substring(0, infoTYpe.length - 2),
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
        TiempoEspera: "1",
      }),
    };

    this.dataExterna.EnviarEmailAdjunto(emailAdjunto).then((res) => {
      setTimeout(() => {
        this.GestionViajeArchivos(6);
      }, 2000);
    }).catch((err) => {
      setTimeout(() => {
        this.GestionViajeArchivos(6);
      }, 2000);
    });
  }

  public GestionViajeArchivos(state: any) {
    var travel = {
      Identificador: 12,
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

    this.spinner.show();
    this.dataInterna.GestionarViaje(travel).then((res) => {
      this.spinner.hide();
      Swal.fire({
        title: "Guardar Información",
        html: "La información a sido cargada exitosamente",
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        this.rutaSistema.navigate([this.urlRegistradorPago]);
      });
    }).catch((err) => { this.spinner.hide(); });
  }

  public GestionViajeArchivosAdicional(state: any) {
    var travel = {
      Identificador: 18,
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

    this.spinner.show();
    this.dataInterna.GestionarViaje(travel).then((res) => {
      this.spinner.hide();
      Swal.fire({
        title: "Información de Movilización u Hospedaje",
        html: "La plataforma ha validado la información cargada y ha completado el proceso de movilización u hospedaje pendiente.",
        type: "success",
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        this.rutaSistema.navigate([this.urlRegistradorPago]);
      });
    }).catch((err) => {
      this.spinner.hide();
      this.rutaSistema.navigate([this.urlRegistradorPago]);
    });
  }
}
