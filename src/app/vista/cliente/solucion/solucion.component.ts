import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioUsuario } from "../../../servicios/usuario/usuario.service";
import { ServicioPlantillaCorreoDatafast } from "../../../variable/correo/plantilla-correo-datafast.service";
import Swal from "sweetalert2";
import { environment } from "../../../../environments/environment";

declare var $: any;
declare var moment: any;
@Component({
  selector: "app-settlement",
  templateUrl: "./solucion.component.html",
  styleUrls: ["./solucion.component.css"],
})
export class SolucionComponent implements OnInit {

  tipoMenu = 1;
  idViaje = 0;
  IdArchivo = 0;

  public mensaje = "Cargando Información...";
  public urlListadoReservas = "/cliente/reservacion/lista";
  public textoInformacion = "Información";
  public textoGestionDocumento = "Gestión Documento";
  public modalCrearProveedor = "#modalCrearProveedor";
  public modalActualizarEmailProveedor = "#modalActualizarEmailProveedor";
  public modalRegistroFactura = "#modalRegistroFactura";
  public textoCampoObligatorio = "Campo obligatorio";
  public textoMensajeReintento = "¿Desea volver a intentarlo?";
  public modalBusquedaFactura = "#modalBusquedaFactura";

  dtViaje: any = {
    Aprobador: { IdAprobador: 0, Identificador: 0, Nombre: "", Usuario: "" },
    Estado: {
      DescripcionEstado: "",
      Estado: 0,
      IdEstado: 0,
      Identificador: 0,
      IdentificadorEstado: null,
    },
    CatalogoEstado: null,
    CentroCostoViaje: null,
    ComentariosViaje: null,
    CostoViaje: null,
    DepartamentoViaje: null,
    DescripcionViaje: null,
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
    PropositoViaje: null,
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
    TipoGastoViaje: null,
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

  frmFiltroProveedor = {
    identificacion: "",
    nombre: "",
  };

  dtLiquidacionAutomatica = {
    IdLiquidacionDevolucionCabeceraAx: "",
    IdLiquidacionDevolucionCreditoAx: "",
    IdLiquidacionDevolucionDebitoAx: "",
    IdLiquidacionDevolucionCierreAx: "",
  };

  dtArchivo = {
    IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoEmpleado,
    IdClase: environment.parametrosMFiles.IdClaseEmpleado,
    Titulo: "",
    Propiedades: [
      {
        Id: "0",
        Valor: {},
      },
    ],
    Documentos: null,
  };

  lstTipoImpuesto = [];

  tipoFactura = 0;
  tipoBusqueda = 0;
  dtProovedor: any = {
    Bloqueado: null,
    Correo: null,
    Direccion: null,
    EsExtranjero: null,
    Grupo: null,
    Identificacion: null,
    Nombre: null,
    RazonSocial: null,
    RegionPais: null,
    Telefono: null,
    TipoIdentificacion: null,
  };
  lstArchivos = [];
  urlArchivo = "";
  nombreArchivo = "";
  lstTipoProveedores = [
    { codigo: 0, nombre: "SELECCIONAR" },
    { codigo: 1, nombre: "R.U.C" },
    { codigo: 2, nombre: "RAZÓN SOCIAL" },
  ];
  tipoProveedor = 0;
  agregarProveedor = 0;
  lstCategorias = [];
  lstTiposDocumentos = [];
  lstTipoIdentificacion: Array<string> = ["R.U.C"];
  lstViaticos = [];
  lstTipoFactura = [
    { codigo: 0, nombre: "SELECCIONAR" },
    { codigo: 1, nombre: "ELECTRÓNICA" },
    { codigo: 2, nombre: "FÍSICA" },
  ];
  lstTipoBusqueda = [
    { codigo: 0, nombre: "SELECCIONAR" },
    { codigo: 1, nombre: "R.U.C" },
    { codigo: 2, nombre: "Número de Autorización" },
  ];

  numeroRuc: any = "";
  numeroFactura: any = "";
  numeroAutorizacion: any = "";

  lstFacturasElectronicas = [];
  visualizarFacturasELectronicas = false;

  detallesFacturaElectronica: any = {
    InfoTributaria: {
      Ambiente: 0,
      AmbienteNombre: "",
      TipoEmision: 0,
      TipoEmisionNombre: "",
      RazonSocial: "",
      NombreComercial: "",
      Ruc: "",
      ClaveAcceso: "",
      TipoDocumento: "",
      TipoDocumentoNombre: "",
      Establecimiento: "",
      PuntoEmision: "",
      Secuencial: "",
      NumeroDocumento: "",
      DireccionMatriz: "",
    },
    InfoFactura: {
      FechaEmision: "",
      DireccionEstablecimiento: "",
      ContribuyenteEspecial: "",
      ObligadoContabilidad: false,
      TipoIdentificacionComprador: "",
      IdentificacionCompradorNombre: "",
      RazonSocialComprador: "",
      IdentificacionComprador: "",
      TotalSinImpuestos: 0,
      TotalDescuento: 0,
      TotalConImpuestos: [
        { Codigo: 0, CodigoPorcentaje: 0, BaseImponible: 0, Valor: 0 },
      ],
      Propina: 0,
      ImporteTotal: 0,
      Moneda: "",
      Pagos: [{ FormaPago: "", Total: 0, Plazo: 0, UnidadTiempo: "" }],
    },
    InfoDetalle: {
      Detalles: [
        {
          CodigoPrincipal: "",
          CodigoAuxiliar: "",
          Descripcion: "",
          Cantidad: 0,
          PrecioUnitario: 0,
          Descuento: 0,
          PrecioTotalSinImpuesto: 0,
          DetallesAdicionales: [],
          Impuestos: [
            {
              Codigo: 0,
              CodigoNombre: "",
              CodigoPorcentaje: 0,
              CodigoPorcentajeNombre: "",
              Tarifa: 0,
              BaseImponible: 0,
              Valor: 0,
              CodigoRetencion: null,
              PorcentajeRetener: 0,
              ValorRetenido: 0,
              CodigoDocumentoSustento: null,
              NumeroDocumentoSustento: null,
              FechaEmisionDocumentoSustento: null,
            },
          ],
        },
      ],
    },
    InfoAdicional: { CamposAdicionales: [{ Nombre: "", Valor: "" }] },
  };
  facturaElectronica: any = {
    Ruc: "",
    RazonSocial: "",
    Establecimiento: "",
    PuntoEmision: "",
    Secuencial: "",
    NumeroDocumento: "",
    TipoDocumento: "",
    TipoDocumentoNombre: "",
    NumeroAutorizacion: "",
    FechaAutorizacion: "",
    ClaveAcceso: "",
    EstadoNombre: "",
    Estado: 0,
    FechaEmisionRetencion: "",
    BaseImponibleCero: 0,
    BaseImponibleIva: 0,
    BaseSinCargos: 0,
    CodigoImpuestoIva: 0,
    Iva: 0,
    Observaciones: "",
    PorcentajeRetencion: 0,
    ValorRetencion: 0,
    ValorTotal: 0,
    InfoAdicional: [{ Nombre: "", Valor: "" }],
  };

  dtProveedor = {
    correo: null,
    direccion: null,
    identificacion: null,
    tipoIdentificacion: null,
    telefono: null,
    nombre: null,
    correoActualizar: null,
  };

  vlProveedor = {
    correo: null,
    direccion: null,
    identificacion: null,
    tipoIdentificacion: null,
    telefono: null,
    nombre: null,
    correoActualizar: null,
  };

  frmFactura : any = {
    categorias: null,
    TipoDocumento: null,
    numeroFactura: null,
    numeroAutorizacion: null,
    fechaEmision: null,
    fechaVencimiento: null,
    concepto: null,
    ciudad: null,
    subtotal: null,
    total: null,
    tipoImpuesto: {
      Codigo: "2",
      Porcentaje: 12.0,
      Descripcion: "12 %",
    },
    impuesto: null,
    valorAdicional: 0,
    liquidacionTotal: null,
    rucProovedor: null,
    establecimiento: null,
    puntoEmision: null,
    secuencial: null,
    trim: null,
  };

  frmFacturaElectronica = {
    mensaje: null,
    estado: null,
  };

  fmrDetalles = {
    justificacion: 0,
    viaticos: 0,
    creditoPendiente: 0,
    diferencia: 0,
  };

  lstViajeHecho = [
    { codigo: 1, nombre: "Sí" },
    { codigo: 2, nombre: "No" },
  ];
  lstRetorno = [
    { codigo: 1, nombre: "Sí" },
    { codigo: 2, nombre: "No" },
  ];
  validaRuc = false;
  validaDatosProveedor = false;
  validateRucProveedor = false;

  textoValidacion: any = "";

  textoValidacion1: any = "";
  textoValidacion2: any = "";
  textoValidacion3: any = "";
  textoValidacion4: any = "";
  textoValidacion5: any = "";

  validarIdentificacion = false;
  validarNombre = false;
  validarCorreo = false;
  validarDireccion = false;
  validarTelefono = false;

  viajeHecho = null;
  _retorno = null;
  finFechaViaje: Date;
  lstParametros = [];
  dtAsientoViaje = {
    CierreDiario: "",
    CodigoDiario: "",
    IdAsientoViaje: 0,
    Identificador: 0,
    RegistroDiario: "",
    Viaje: null,
  };

  lstViaticosAvance = [];
  lstFacturaConceptos = [];
  valorAdicional = 0;

  tmpAplicacion: any = "";
  tmpNombreOrigen: any = "";
  tmpEmailOrigen: any = "";
  tmpTiempoEspera: any = "";

  facturaElectronicaBloqueo: boolean;
  bloqueoGenerico: boolean;

  validaLiquidacionAutomatica: any = false;

  validarEditar = 0;
  valorEditar = 0;

  public liquidacionMaxima: any = 0;

  public cantidadBaseCero: any = 0;
  public cantidadBaseDoce: any = 0;
  public cantidadTotalCero: any = 0;
  public cantidadTotalDoce: any = 0;

  public busquedaRuc = false;
  public busquedaFactura = false;
  public busquedaAutorizacion = false;

  valorAdicionalAcreditacion: any = 0.0;
  valorTotalLiquidacion: any = 0.0;
  visualizacionEdicionLiquidacion = false;
  visualizacionTipoImpuesto = true;
  public lstParametrosCuentaAX: any = { "CodigoCompania": "", "CuentaViaticosNoJustificados": "", "DiarioGeneral": "", "DiarioLiquidacion": "", "IdParametroCuenta": 0, "PerfilAnticipoViaticos": "" };

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly dom: DomSanitizer,
    public global: ServicioGlobales
  ) { }

  ngOnInit() {
    this._retorno = null;
    this.ObtenerInicio();
  }

  public ObtenerInicio() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public ObtenerViaje(id: number) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        var objetoSesion: any;
        if (this.dtViaje.SolicitudViajeReasignada == 1 && this.dtViaje.SolicitudViajeReasignadaUsuario != '') {
          var datosSesion = localStorage.getItem("k-session");
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
              if (this.dtViaje.Estado.IdEstado == 6 || this.dtViaje.Estado.IdEstado == 10) {
                this.visualizacionEdicionLiquidacion = true;
              } else {
                this.visualizacionEdicionLiquidacion = false;
              }
              this.viajeHecho = parseInt(res.RealizoViaje);
              this._retorno = parseInt(res.Regreso);
              this.finFechaViaje = this.dtViaje.RegresoFecha;
              this.ObtenerViatico(this.dtViaje.IdViaje);
            }
          }
        } else {
          if (this.dtViaje.Estado.IdEstado == 6 || this.dtViaje.Estado.IdEstado == 10) {
            this.visualizacionEdicionLiquidacion = true;
          } else {
            this.visualizacionEdicionLiquidacion = false;
          }
          this.viajeHecho = parseInt(res.RealizoViaje);
          this._retorno = parseInt(res.Regreso);
          this.finFechaViaje = this.dtViaje.RegresoFecha;
          this.ObtenerViatico(this.dtViaje.IdViaje);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerViatico(id: any) {
    this.dataInterna
      .ObtenerViatico(id)
      .then((res) => {
        this.lstViaticos = res;
        var tmpViatics = this.lstViaticos.find((e: any) => e.Tipo == "Total");
        this.fmrDetalles.viaticos = parseFloat(tmpViatics.Valor);

        if (isNaN(this.viajeHecho) || this.viajeHecho == 2) {
          this.valorTotalLiquidacion = this.fmrDetalles.viaticos;
        }

        this.VerificarCantidadAdicionalAcreditacion();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerArchivo() {
    this.spinner.show();
    this.dataInterna.ObtenerArchivo(this.dtViaje.IdViaje).then((res) => {
      this.lstArchivos = res;
      this.Calculos();
      var valor = 0;
      if (res.length > 0) {
        for (const item of res) {
          valor = valor + parseFloat(item.TotalLiquidar);
        }
      }
      this.liquidacionMaxima = this.global.FormatearNumero(valor, 2);
      this.spinner.hide();
      this.ObtenerCategorias();
    }).catch((err) => {
      this.spinner.hide();
    });
  }

  public ObtenerCategorias() {
    this.spinner.show();
    this.dataInterna
      .ObtenerCategoria()
      .then((res) => {
        this.spinner.hide();
        this.lstCategorias = res;
        this.ObtenerTipoDocumento();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerTipoDocumento() {
    this.spinner.show();
    this.dataInterna
      .ObtenerTipoDocumento()
      .then((res) => {
        this.spinner.hide();
        this.lstTiposDocumentos = res;
        this.obtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public obtenerParametros() {
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.lstParametros = res;
        setTimeout(() => {
          this.ObtenerImpuesto();
        }, 1000);
      })
      .catch((err) => { console.log(err) });
  }

  public ObtenerImpuesto() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerImpuesto(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.lstTipoImpuesto = res;
        this.ObtenerAsientoViaje();
      })
      .catch((err) => {
        Swal.fire({
          title: "Obtener Datos AX",
          html: err.error,
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.urlListadoReservas]);
        });
      });
  }

  public ObtenerAsientoViaje() {
    this.spinner.show();
    this.dataInterna
      .ObtenerAsientoViaje(this.idViaje)
      .then((res) => {
        this.spinner.hide();
        this.dtAsientoViaje = res;
        var tempSeatTravel = JSON.parse(res.RegistroDiario);
        this.lstViaticosAvance = JSON.parse(`[${tempSeatTravel.Datos}]`);
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Obtener Datos AX",
          html: "No se pudo consultar la referencia de pago",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.urlListadoReservas]);
        });
      });
  }

  public CambiarInformacionInicial() {
    this._retorno = null;

    if (this.viajeHecho == 2) {
      this._retorno = 0;
      this.finFechaViaje = null;
    }
    if (this._retorno == 1) {
      this.finFechaViaje = null;
    }
  }

  public GestionSolicitudPagoViaje() {
    if (this.viajeHecho == 2) {
      this._retorno = 0;
      this.finFechaViaje = null;
    }

    if (this._retorno == 1) {
      this.finFechaViaje = this.dtViaje.FechaFinViaje;
    }

    if (this.viajeHecho == 1 && this._retorno == 1) {
      this.finFechaViaje = this.dtViaje.FechaFinViaje;
    }

    this.dtViaje.RegresoFecha = this.finFechaViaje;

    var data = {
      Identificador: 1,
      IdViaje: this.dtViaje.IdViaje,
      RealizoViaje: this.viajeHecho,
      Regreso: this._retorno,
      RegresoFecha:
        this.finFechaViaje == null
          ? this.dtViaje.FechaFinViaje
          : this.finFechaViaje,
    };

    this.dataInterna
      .GestionSolicitudPagoViaje(data)
      .then((res) => {
        this.ObtenerViaje(this.idViaje);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public BuscarProveedor(tipoProveedor: any) {
    if (this.tipoProveedor == 1) {
      if (this.frmFiltroProveedor.identificacion.length != 13) {
        this.validaRuc = true;
      } else {
        this.ObtenerProveedorAdicional(tipoProveedor);
        this.validaRuc = false;
      }
    } else if (this.tipoProveedor == 2) {
      if (this.frmFiltroProveedor.nombre.length <= 5) {
        this.global.Alerta(
          this.textoInformacion,
          "Ingresar una razón social o nombre correcto",
          "info"
        );
      } else {
        this.ObtenerProveedorAdicional(tipoProveedor);
      }
    } else {
      this.global.Alerta(this.textoInformacion, "Seleccionar opción de filtro", "info");
    }
  }

  public ObtenerProveedor() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerProveedor(
        token,
        this.frmFiltroProveedor.identificacion,
        this.frmFiltroProveedor.nombre,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.spinner.hide();
        this.ValidarEstadoProveedor(res[0]);
        this.agregarProveedor = 1;
      })
      .catch((err) => {
        this.spinner.hide();
        this.agregarProveedor = 2;
        console.log(err)
        this.LimpiarInformacionProveedor();
        this.dtProveedor.tipoIdentificacion =
          this.frmFiltroProveedor.identificacion.length == 10
            ? "CÉDULA"
            : "R.U.C";
        $(this.modalCrearProveedor).modal({
          backdrop: "static",
          keyboard: false,
        });
      });
  }

  public ObtenerProveedorAdicional(tipo: any) {

    var token = this.sesionExterna.ObtenerClaveExterna();
    var urlContinuacion = tipo == 1 ? `&identificacion=${this.frmFiltroProveedor.identificacion}` : tipo == 2 ? `&nombresApellidos=${this.frmFiltroProveedor.nombre}` : "";

    var data = {
      Token: token.access_token,
      DataJSON: `?codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}${urlContinuacion}`
    };

    this.dataExterna
      .BuscarProveedorAdicional(data
      )
      .then((res) => {
        var respuestaServicio = JSON.parse(res);
        if (respuestaServicio.Datos != null) {
          this.agregarProveedor = 1;
          this.ValidarEstadoProveedor(respuestaServicio.Datos[0]);
        } else {
          this.agregarProveedor = 2;
          this.LimpiarInformacionProveedor();
          this.dtProveedor.tipoIdentificacion =
            this.frmFiltroProveedor.identificacion.length == 10
              ? "CÉDULA"
              : "R.U.C";
          $(this.modalCrearProveedor).modal({
            backdrop: "static",
            keyboard: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public ValidarEstadoProveedor(datosProveedor: any) {

    var token = this.sesionExterna.ObtenerClaveExterna();
    var razonSocial: any;
    var ruc: any;
    this.spinner.show();

    if (datosProveedor != null) {
      ruc = datosProveedor.Identificacion;
      razonSocial = datosProveedor.RazonSocial;
    }

    var data = {
      Token: token.access_token,
      DataJSON: `?proveedor=${ruc}&razonSocial=${razonSocial}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BuscarProveedor(token, data)
      .then((res) => {
        var aux = JSON.parse(res);
        this.spinner.hide();
        if (aux.Estado == "OK") {
          if (aux.Datos == 0) {
            this.dtProovedor = datosProveedor;
          } else if (aux.Datos == 1) {
            Swal.fire({
              title: "Proveedor bloqueado sin correo",
              html: "Se debe actualizar la información de actualización de correo",
              type: "info",
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              $(this.modalActualizarEmailProveedor).modal({
                backdrop: "static",
                keyboard: false,
              });
            });
          } else if (aux.Datos == 2) {
            Swal.fire({
              title: "Proveedor bloqueado",
              html: "Se debe regularizar el proveedor por el área contable en AX",
              type: "info",
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            });
          } else if (aux.Datos == 4) {
            Swal.fire({
              title: "Proveedor sin correo",
              html: "Se debe actualizar el correo",
              type: "info",
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              $(this.modalActualizarEmailProveedor).modal({
                backdrop: "static",
                keyboard: false,
              });
            });
          }
        } else {
          Swal.fire({
            title: "Obtener Estado Proveedor",
            html: "No se pudo validar el estado del proveedor",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
        }

        this.agregarProveedor = 1;
      })
      .catch((err) => {
        this.spinner.hide();
        this.agregarProveedor = 2;
        this.LimpiarInformacionProveedor();
        this.dtProveedor.tipoIdentificacion =
          this.frmFiltroProveedor.identificacion.length == 10
            ? "CÉDULA"
            : "R.U.C";
        $(this.modalCrearProveedor).modal({
          backdrop: "static",
          keyboard: false,
        });
      });
  }

  public ActualizarCorreoProveedor() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    var data = {
      Token: token.access_token,
      DataJSON: `?proveedor=${this.frmFiltroProveedor.identificacion}&email=${this.dtProveedor.correoActualizar}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };
    this.dataExterna
      .ActualizarCorreoProveedor(token, data)
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          Swal.fire({
            title: "Servicio Actualizar Correo Proveedor",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {
              $(this.modalActualizarEmailProveedor).modal("toggle");
            }
          });
        } else {
          Swal.fire({
            title: "Actualizar Correo Proveedor",
            html: "Se actualizó correctamente la información del proveedor",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            $(this.modalActualizarEmailProveedor).modal("toggle");
            this.ObtenerProveedorAdicional(1);
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public BuscarFactura() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: `?claveAcceso=${this.numeroAutorizacion}`,
    };

    this.spinner.show();
    this.dataExterna.ObtenerDetalleFactura(data).then((res) => {
      this.spinner.hide();
      if (res.Estado.estado == 1) {
        this.detallesFacturaElectronica = res.Factura;

        this.tipoProveedor = 1;

        this.frmFactura.TipoDocumento =
          this.detallesFacturaElectronica.InfoTributaria.TipoDocumento;
        this.frmFactura.rucProovedor =
          this.detallesFacturaElectronica.InfoTributaria.Ruc;
        this.frmFactura.establecimiento =
          this.detallesFacturaElectronica.InfoTributaria.Establecimiento;
        this.frmFactura.puntoEmision =
          this.detallesFacturaElectronica.InfoTributaria.PuntoEmision;
        this.frmFactura.secuencial =
          this.detallesFacturaElectronica.InfoTributaria.Secuencial;

        this.frmFiltroProveedor.identificacion =
          this.detallesFacturaElectronica.InfoTributaria.Ruc;
        this.frmFiltroProveedor.nombre =
          this.detallesFacturaElectronica.InfoTributaria.RazonSocial;

        this.dtProveedor.direccion =
          this.detallesFacturaElectronica.InfoTributaria.DireccionMatriz;
        this.dtProveedor.correo = "";
        this.dtProveedor.telefono = "";
        this.dtProveedor.identificacion =
          this.detallesFacturaElectronica.InfoTributaria.Ruc;
        this.dtProveedor.nombre =
          this.detallesFacturaElectronica.InfoTributaria.RazonSocial;

        this.ObtenerProveedorAdicional(1);

        this.frmFactura.numeroFactura =
          this.detallesFacturaElectronica.InfoTributaria.NumeroDocumento;

        this.frmFactura.fechaEmision = this.global.ObtenerFechaParametroDiaEspecifico(
          this.detallesFacturaElectronica.InfoFactura.FechaEmision
        );
        this.frmFactura.numeroAutorizacion =
          this.detallesFacturaElectronica.InfoTributaria.ClaveAcceso;
        this.frmFactura.fechaVencimiento = this.global.ObtenerFechaEmision();

        this.frmFactura.total =
          this.detallesFacturaElectronica.InfoFactura.ImporteTotal;
        this.frmFactura.liquidacionTotal =
          this.detallesFacturaElectronica.InfoFactura.ImporteTotal;

        this.frmFactura.tipoImpuesto = {
          Codigo: "2",
          Porcentaje: 12.0,
          Descripcion: "12 %",
        };

        var conceptTemp = "";
        this.lstFacturaConceptos = [];

        var baseImponible12 = 0;
        var valorImpuesto12 = 0;
        var existe12 = false;

        var baseImponible0 = 0;
        var valorImpuesto0 = 0;
        var existe0 = false;

        var lstDetalles12: {
          Id: number;
          Descripcion: string;
          BaseImponible: number;
          TipoImpuesto: number;
          ValorImpuesto: number;
          Total: number;
        };
        var lstDetalles0: {
          Id: number;
          Descripcion: string;
          BaseImponible: number;
          TipoImpuesto: number;
          ValorImpuesto: number;
          Total: number;
        };

        for (const dataFacturaElectro of this.detallesFacturaElectronica.InfoDetalle.Detalles) {
          if (dataFacturaElectro.Impuestos[0].Tarifa == 12) {
            existe12 = true;
            baseImponible12 += parseFloat(dataFacturaElectro.Impuestos[0].BaseImponible);
            valorImpuesto12 += parseFloat(dataFacturaElectro.Impuestos[0].Valor);
          } else if (dataFacturaElectro.Impuestos[0].Tarifa == 0) {
            existe0 = true;
            baseImponible0 += parseFloat(dataFacturaElectro.Impuestos[0].BaseImponible);
            valorImpuesto0 += parseFloat(dataFacturaElectro.Impuestos[0].Valor);
          }
          conceptTemp += `* Cantidad: ${dataFacturaElectro.Cantidad} - Descripcion: ${dataFacturaElectro.Descripcion}\n`;
        }

        if (existe12) {
          lstDetalles12 = {
            Id: 1,
            Descripcion: "CONSUMOS BASE 12",
            BaseImponible: Math.round(baseImponible12 * 100) / 100,
            TipoImpuesto: 12,
            ValorImpuesto: Math.round(valorImpuesto12 * 100) / 100,
            Total:
              Math.round((baseImponible12 + valorImpuesto12) * 100) / 100,
          };
          this.lstFacturaConceptos.push(lstDetalles12);
        }

        if (existe0) {
          lstDetalles0 = {
            Id: 2,
            Descripcion: "CONSUMOS BASE 0",
            BaseImponible: Math.round(baseImponible0 * 100) / 100,
            TipoImpuesto: 0,
            ValorImpuesto: Math.round(valorImpuesto0 * 100) / 100,
            Total: Math.round((baseImponible0 + valorImpuesto0) * 100) / 100,
          };
          this.lstFacturaConceptos.push(lstDetalles0);
        }

        this.frmFactura.concepto = conceptTemp;

        this.CalcularValores();
      } else if (res.Estado.estado == 2) {
        this.global.Alerta(
          this.textoInformacion,
          "No se han encontrado facturas que correspondan al criterio de su búsqueda.",
          "info"
        );
        this.numeroAutorizacion = "";
      } else {
        this.global.Alerta(
          this.textoInformacion,
          "Estado de la factura: " + res.Estado.mensaje,
          "info"
        );
        this.numeroAutorizacion = "";
      }
    }).catch((err) => {
      this.spinner.hide();
    });
  }

  public EliminarArchivo(IdArchivo: any) {
    var data = {
      Identificador: 4,
      IdArchivo: IdArchivo,
      IdTipoObjeto: "",
      IdClase: "",
      IdContenido: "",
      VersionContenido: "",
      IdArchivoArray: "",
      GuidArray: "",
      NombreArray: "",
      ExtensionArray: "",
      VersionArray: "",
      Viaje: {
        IdViaje: 0,
      },
      TipoDocumento: {
        IdTipoDocumento: 0,
      },
      Categorias: {
        IdCategorias: 0,
      },
      TipoFactura: "",
      NumeroAutorizacion: "",
      DatosProveedor: "",
      NumeroFactura: "",
      Autorizacion: "",
      FechaEmision: "",
      FechaVencimiento: "",
      Concepto: "",
      Ciudad: "",
      TotalFactura: "",
      ValorAdicional: "",
      TotalLiquidar: "",
      SubtotalFactura: "",
      ImpuestoFactura: "",
      TipoImpuestoFactura: "",
      ValorRecortar: "",
      Documento: "",
      DocumentoEstado: this.tipoFactura == 1 ? 2 : 1,
    };

    this.spinner.show();
    this.dataInterna
      .GestionArchivo(data)
      .then((res) => {
        this.spinner.hide();
        this.ObtenerInicio();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarArchivo(datos: any) {
    var documento = JSON.parse(datos.Documento);

    this.urlArchivo = "data:application/pdf;base64," + documento[0].Contenido;
    this.nombreArchivo = documento[0].Nombre;

    this.dtArchivo.Titulo = documento[0].Nombre;
    this.dtArchivo.Documentos = documento;

    Swal.fire({
      title: this.textoGestionDocumento,
      html: "¿Desea subir el documento?",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        var token = this.sesionExterna.ObtenerClaveExterna();
        var _result;
        var data = {
          Token: token.access_token,
          DataJSON: JSON.stringify(this.dtArchivo),
        };

        this.spinner.show();
        this.dataExterna
          .CargarArchivo(data)
          .then((res) => {
            this.spinner.hide();
            _result = JSON.parse(res);

            if (_result.Estado == "OK") {
              this.ModificarArchivoInterno(datos, _result.Datos);
            } else {
              Swal.fire({
                title: this.textoGestionDocumento,
                html: "Existió un problema al subir el documento",
                type: "info",
                showCancelButton: false,
                confirmButtonText: "Aceptar",
              });
            }
          })
          .catch((err) => {
            this.spinner.hide();
          });
      }
    });
  }

  public ModificarArchivoInterno(
    datos: { IdArchivo: any },
    archivo: {
      Archivos: any[];
      IdTipoObjeto: any;
      IdClase: any;
      Id: any;
      Version: any;
    }
  ) {
    var documento = archivo.Archivos[0];

    var data = {
      Identificador: 3,
      IdArchivo: datos.IdArchivo,
      IdTipoObjeto: archivo.IdTipoObjeto,
      IdClase: archivo.IdClase,
      IdContenido: archivo.Id,
      VersionContenido: archivo.Version,
      IdArchivoArray: documento.Id,
      GuidArray: documento.Guid,
      NombreArray: documento.Nombre,
      ExtensionArray: documento.Extension,
      VersionArray: documento.Version,
      Viaje: {
        IdViaje: 0,
      },
      TipoDocumento: {
        IdTipoDocumento: 0,
      },
      Categorias: {
        IdCategorias: 0,
      },
      TipoFactura: "",
      NumeroAutorizacion: "",
      DatosProveedor: "",
      NumeroFactura: "",
      Autorizacion: "",
      FechaEmision: "",
      FechaVencimiento: "",
      Concepto: "",
      Ciudad: "",
      TotalFactura: "",
      ValorAdicional: "",
      TotalLiquidar: "",
      SubtotalFactura: "",
      ImpuestoFactura: "",
      TipoImpuestoFactura: "",
      ValorRecortar: "",
      Documento: "",
      DocumentoEstado: this.tipoFactura == 1 ? 2 : 1,
    };

    this.spinner.show();
    this.dataInterna
      .GestionArchivo(data)
      .then((res) => {
        this.spinner.hide();
        Swal.fire({
          title: this.textoGestionDocumento,
          html: "Documento subido exitosamente",
          type: "success",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        });
        this.ObtenerInicio();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GestionArchivo() {
    if (this.tipoFactura == 0) {
      this.global.MostrarNotificacion(
        "Seleccionar el Tipo de Factura",
        "info",
        "top-end"
      );
    } else if (this.tipoFactura == 1 && this.tipoBusqueda == 0) {
      this.global.MostrarNotificacion(
        "Debe seleccionar un criterio para la búsqueda de facturas electrónicas",
        "info",
        "top-end"
      );
    } else if (
      this.tipoFactura == 1 &&
      this.tipoBusqueda == 2 &&
      (this.numeroAutorizacion == "" ||
        this.numeroAutorizacion == null ||
        this.numeroAutorizacion == undefined)
    ) {
      this.global.MostrarNotificacion(
        "Debe realizar la búsqueda de la factura electrónica con el número de autorización",
        "info",
        "top-end"
      );
    } else if (
      this.tipoFactura == 1 &&
      this.tipoBusqueda == 1 &&
      (this.numeroRuc == "" ||
        this.numeroRuc == undefined ||
        this.numeroRuc == null)
    ) {
      this.global.MostrarNotificacion(
        "Debe realizar la búsqueda de la factura electrónica con el número de ruc",
        "info",
        "top-end"
      );
    } else if (this.frmFactura.categorias == null) {
      this.global.MostrarNotificacion(
        "Debe seleccionar una categoría para la factura",
        "info",
        "top-end"
      );
    } else if (this.frmFactura.TipoDocumento == null) {
      this.global.MostrarNotificacion(
        "Debe seleccionar el campo tipo de documento",
        "info",
        "top-end"
      );
    } else if (
      this.tipoProveedor == 0 &&
      this.frmFactura.TipoDocumento != "03"
    ) {
      this.global.MostrarNotificacion(
        "Debe cargar los datos del proveedor de la factura",
        "info",
        "top-end"
      );
    } else if (
      this.tipoProveedor == 1 &&
      this.frmFiltroProveedor.identificacion == ""
    ) {
      this.global.MostrarNotificacion(
        "Llene el campo ruc para realizar la búsqueda del proveedor.",
        "info",
        "top-end"
      );
    } else if (this.tipoProveedor == 2 && this.frmFiltroProveedor.nombre == "") {
      this.global.MostrarNotificacion(
        "Llene el campo razón social para realizar la búsqueda del proveedor.",
        "info",
        "top-end"
      );
    } else if (
      (this.dtProovedor.Identificacion == null ||
        this.dtProovedor.Identificacion == undefined ||
        this.dtProovedor.Identificacion == "") &&
      this.frmFactura.TipoDocumento != "03"
    ) {
      this.global.MostrarNotificacion(
        "Realice la búsqueda del proveedor para poder continuar.",
        "info",
        "top-end"
      );
    } else if (
      this.frmFactura.numeroFactura == null ||
      this.frmFactura.numeroFactura == undefined ||
      this.frmFactura.numeroFactura == ""
    ) {
      this.global.MostrarNotificacion(
        "Llene el campo número de factura",
        "info",
        "top-end"
      );
    } else if (
      this.tipoFactura == 2 &&
      this.frmFactura.numeroFactura.length != 15
    ) {
      this.global.MostrarNotificacion(
        "La longitud del número de factura debe tener 15 dígitos",
        "info",
        "top-end"
      );
    } else if (
      this.frmFactura.numeroAutorizacion == null ||
      this.frmFactura.numeroAutorizacion == undefined ||
      this.frmFactura.numeroAutorizacion == ""
    ) {
      this.global.MostrarNotificacion(
        "Llene el campo número de autorización",
        "info",
        "top-end"
      );
    } else if (
      this.tipoFactura == 2 &&
      this.frmFactura.numeroAutorizacion.length != 10
    ) {
      this.global.MostrarNotificacion(
        "La longitud del número de autorización debe tener 10 dígitos",
        "info",
        "top-end"
      );
    } else if (
      this.frmFactura.fechaEmision == null ||
      this.frmFactura.fechaEmision == undefined ||
      this.frmFactura.fechaEmision == ""
    ) {
      this.global.MostrarNotificacion(
        "Debe seleccioanr la fecha de emisión de la factura.",
        "info",
        "top-end"
      );
    } else if (
      this.frmFactura.fechaVencimiento == null ||
      this.frmFactura.fechaEmision == undefined ||
      this.frmFactura.fechaEmision == ""
    ) {
      this.global.MostrarNotificacion(
        "La fecha de vencimiento no puede estar vacía",
        "info",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaEmision) <
      Date.parse(this.dtViaje.FechaInicioViaje)
    ) {
      this.global.MostrarNotificacion(
        "La fecha de emisión de la factura no puede ser menor a la fecha del inicio del viaje",
        "info",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaEmision) >
      Date.parse(this.dtViaje.RegresoFecha)
    ) {
      this.global.MostrarNotificacion(
        "La fecha de emisión de la factura no puede ser mayor a la fecha del fin del viaje",
        "info",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaVencimiento) <
      Date.parse(this.frmFactura.fechaEmision)
    ) {
      this.global.MostrarNotificacion(
        "La fecha de vencimiento de la factura no puede ser mayor a fecha de emisión de la factura",
        "info",
        "top-end"
      );
    } else if (
      this.tipoFactura == 1 &&
      Date.parse(this.frmFactura.fechaEmision) <
      Date.parse(this.dtViaje.FechaInicioViaje)
    ) {
      this.global.MostrarNotificacion(
        this.textoInformacion,
        "La fecha de emisión de la factura electrónica ingresada no correcponde a las fechas del viaje",
        "info"
      );
    } else if (
      this.tipoFactura == 1 &&
      Date.parse(this.frmFactura.fechaEmision) >
      Date.parse(this.dtViaje.RegresoFecha)
    ) {
      this.global.MostrarNotificacion(
        this.textoInformacion,
        "La fecha de emisión de la factura electrónica ingresada no correcponde a las fechas del viaje",
        "info"
      );
    } else if (this.lstFacturaConceptos.length == 0) {
      this.global.MostrarNotificacion(
        "Debe ingresar por lo menos un concepto en la sección <b>&nbsp;Detalle Factura</b>",
        "info",
        "top-end"
      );
    } else if (this.tipoFactura == 2 && this.dtArchivo.Titulo == null) {
      this.global.MostrarNotificacion(
        "Debe cargar un archivo correspondiente a la factura ingresada.",
        "info",
        "top-end"
      );
    } else {
      var tipo = 0;
      if (this.IdArchivo == 0) {
        tipo = 1;
      } else {
        tipo = 2;
      }

      if (this.frmFactura.TipoDocumento == "03") {
        this.dtProovedor = {
          Bloqueado: 0,
          Correo: null,
          Direccion: null,
          EsExtranjero: null,
          Grupo: null,
          Identificacion: "9999999999999",
          Nombre: "CONSUMIDOR FINAL",
          RazonSocial: "Proveeedor Genérico",
          RegionPais: "Ecuador",
          Telefono: "0999999999",
          TipoIdentificacion: "R",
        };
      }
      let id: any;
      if (this.lstFacturaConceptos[0].IdArchivoDetalle != undefined) {
        id = this.lstFacturaConceptos[0].IdArchivoDetalle;
      } else {
        id = this.lstFacturaConceptos[0].Id;
      }

      this.CalcularConceptoLinea(id);
      var data = {
        Identificador: tipo,
        IdArchivo: this.IdArchivo,
        IdTipoObjeto: "",
        IdClase: "",
        IdContenido: "",
        VersionContenido: "",
        IdArchivoArray: "",
        GuidArray: "",
        NombreArray: "",
        ExtensionArray: "",
        VersionArray: "",
        Viaje: {
          IdViaje: this.idViaje,
        },
        TipoDocumento: {
          IdTipoDocumento: this.frmFactura.TipoDocumento,
        },
        Categorias: {
          IdCategorias: this.frmFactura.categorias,
        },
        TipoFactura: this.tipoFactura,
        NumeroAutorizacion: this.frmFactura.numeroAutorizacion,
        DatosProveedor: JSON.stringify(this.dtProovedor),
        NumeroFactura: this.frmFactura.numeroFactura,
        Autorizacion: this.frmFactura.numeroAutorizacion,
        FechaEmision: this.frmFactura.fechaEmision,
        FechaVencimiento: this.frmFactura.fechaVencimiento,
        Concepto: "",
        Ciudad: "",
        TotalFactura: this.frmFactura.total,
        ValorAdicional: this.frmFactura.valorAdicional,
        TotalLiquidar: this.frmFactura.liquidacionTotal,
        SubtotalFactura: this.frmFactura.subtotal,
        ImpuestoFactura: this.frmFactura.impuesto,
        TipoImpuestoFactura: JSON.stringify(this.frmFactura.tipoImpuesto),
        ValorRecortar: "",
        Documento: this.dtArchivo.Documentos == null ? "" : JSON.stringify(this.dtArchivo.Documentos),
        DocumentoEstado: this.tipoFactura == 1 ? 2 : 1
      };

      this.spinner.show();
      this.dataInterna
        .GestionArchivo(data)
        .then((res) => {
          this.spinner.hide();
          this.GuardarFacturaDetalle(res.IdArchivo);
        })
        .catch((err) => {
          this.spinner.hide();
        });
    }
  }

  public GuardarFacturaDetalle(idArchivo: any) {

    if (this.IdArchivo == 0) {
      var consulta = "";
      for (const concepto of this.lstFacturaConceptos) {
        consulta += `('${concepto.Descripcion}', '${concepto.BaseImponible}', '${concepto.TipoImpuesto}', '${concepto.ValorImpuesto}', '${concepto.Total}', '${idArchivo}'),`;
      }

      var sentencia = consulta.substring(0, consulta.length - 1);

      this.spinner.show();
      this.dataInterna
        .GestionFacturaDetalle(sentencia)
        .then((res) => {
          this.spinner.hide();
          $(this.modalRegistroFactura).modal("toggle");
          this.ObtenerArchivo();
          window.location.reload();
        })
        .catch((err) => {
          this.spinner.hide();
        });
    } else {
      this.spinner.show();
      for (const concepto of this.lstFacturaConceptos) {
        if (concepto.IdArchivoDetalle != undefined) {
          var datos = {
            Identificador: 0,
            IdArchivoDetalle: concepto.IdArchivoDetalle,
            Descripcion: concepto.Descripcion,
            BaseImponible: concepto.BaseImponible,
            TipoImpuesto: concepto.TipoImpuesto,
            ValorImpuesto: concepto.ValorImpuesto,
            Total: concepto.Total,
          };
          this.dataInterna
            .ModificarFacturaDetalle(datos)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          var data = {
            Identificador: 0,
            IdArchivoDetalle: idArchivo,
            Descripcion: concepto.Descripcion,
            BaseImponible: concepto.BaseImponible,
            TipoImpuesto: concepto.TipoImpuesto,
            ValorImpuesto: concepto.ValorImpuesto,
            Total: concepto.Total,
          };
          this.spinner.show();
          this.dataInterna
            .InsertarArchivoDetalle(data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      $(this.modalRegistroFactura).modal("toggle");

      setTimeout(() => {
        this.spinner.hide();
        this.global.VerMensajeError(
          "Detalle Modificado exitosamente",
          "success",
          "top-end"
        );
        window.location.reload();
      }, 200);
    }
  }

  public ObtenerImagen() {
    var files = $("#Archivo").prop("files");
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var base64Large: any = reader.result;
        var base64 = base64Large.split(",");

        //Correción de nombres de pdf con punto
        var docNombre = files[0].name.split(".");
        var ext = docNombre.pop();
        var docNombreParsed = docNombre.join("") + "."+ ext;

        var tmpFile = [
          {
            Nombre: `${this.global.Aleatorio(1, 10000)} ${docNombreParsed}`,
            Contenido: base64[1],
          },
        ];
        this.dtArchivo.Titulo = files[0].name;
        this.dtArchivo.Documentos = tmpFile;
      };
      reader.onerror = function (err) {
        console.log(err)
      };
    }
  }

  public DescargarArchivo(param: any) {
    this.LimpiarFormulario();
    if (param.TipoFactura == 1) {
      this.facturaElectronicaBloqueo = true;
      this.ObtenerInformacionFactura(param);
    } else if (param.DocumentoEstado == "1") {
      var documento = JSON.parse(param.Documento);
      this.urlArchivo = "data:application/pdf;base64," + documento[0].Contenido;
      this.nombreArchivo = documento[0].Nombre;
      this.dtArchivo.Titulo = documento[0].Nombre;
      this.dtArchivo.Documentos = documento;
      this.ObtenerInformacionFactura(param);
    } else {
      var token = this.sesionExterna.ObtenerClaveExterna();
      var data = {
        Token: token.access_token,
        DataJSON: JSON.stringify({
          IdTipoObjeto: param.IdTipoObjeto,
          IdContenido: param.IdContenido,
          VersionContenido: param.VersionContenido,
          IdArchivo: param.IdArchivoArray,
          GuidArchivo: param.GuidArray,
        }),
      };
      this.spinner.show();
      this.dataExterna.DescargarArchivo(data).then((res) => {
        this.spinner.hide();
        var result = JSON.parse(res);
        this.urlArchivo =
          `data:application/${param.ExtensionArray};base64,${result.Datos.Contenido}`;
        this.nombreArchivo = param.NombreArray;

        this.dtArchivo.Titulo = param.NombreArray;
        this.dtArchivo.Documentos = result.Datos.Contenido;

        this.ObtenerInformacionFactura(param);
      }).catch((err) => {
        this.spinner.hide();
      });
    }
  }

  public ConvertirArchivo() {
    return this.dom.bypassSecurityTrustUrl(this.urlArchivo);
  }

  public BloquearPantalla(modal: any) {
    $(modal).modal({ backdrop: "static", keyboard: false });
  }

  public CambiarTipoId() {
    this.dtProveedor.identificacion = "";
    this.dtProveedor.tipoIdentificacion =
      this.dtProveedor.identificacion.length == 10 ? "CÉDULA" : "R.U.C";
  }

  public ValidacionDatosProveedor() {
    this.dtProveedor.identificacion =
      this.dtProveedor.identificacion == null
        ? ""
        : this.dtProveedor.identificacion.trim();
    this.dtProveedor.nombre =
      this.dtProveedor.nombre == null ? "" : this.dtProveedor.nombre.trim();
    this.dtProveedor.correo =
      this.dtProveedor.correo == null ? "" : this.dtProveedor.correo.trim();
    this.dtProveedor.direccion =
      this.dtProveedor.direccion == null
        ? ""
        : this.dtProveedor.direccion.trim();
    this.dtProveedor.telefono =
      this.dtProveedor.telefono == null ? "" : this.dtProveedor.telefono.trim();

    if (
      this.dtProveedor.identificacion == null ||
      this.dtProveedor.identificacion == ""
    ) {
      this.validarIdentificacion = true;

      this.textoValidacion1 = this.textoCampoObligatorio;
    }
    if (this.dtProveedor.identificacion.length != 13) {
      this.validarIdentificacion = true;
      this.textoValidacion1 = "El ruc debe tener 13 dígitos";
    }
    if (this.dtProveedor.nombre == null || this.dtProveedor.nombre == "") {
      this.validarNombre = true;
      this.textoValidacion2 = this.textoCampoObligatorio;
    }
    if (!this.global.ValidarEmail(this.dtProveedor.correo)) {
      this.validarCorreo = true;
      this.textoValidacion3 = "El correo ingresado no es válido";
    }
    if (
      this.dtProveedor.direccion == null ||
      this.dtProveedor.direccion == ""
    ) {
      this.validarDireccion = true;
      this.textoValidacion4 = "campo obligatorio";
    }
    if (this.dtProveedor.direccion.length < 4) {
      this.validarDireccion = true;
      this.textoValidacion4 = "Ingrese una dirección válida";
    }
    if (this.dtProveedor.telefono == null) {
      this.validarTelefono = true;
      this.textoValidacion5 = "campo obligatorio";
    }
    if (
      this.dtProveedor.telefono.length < 7 ||
      this.dtProveedor.telefono.length > 10
    ) {
      this.validarTelefono = true;
      this.textoValidacion5 = "Ingrese un número de telefono válido";
    }
    if (
      !this.validarIdentificacion &&
      !this.validarNombre &&
      !this.validarCorreo &&
      !this.validarDireccion &&
      !this.validarTelefono
    ) {
      this.validarIdentificacion = false;
      this.validarNombre = false;
      this.validarCorreo = false;
      this.validarDireccion = false;
      this.validarTelefono = false;
      this.GuadarProveedor();
    }
  }

  public ValidaEntrada2() {
    this.dtProveedor.nombre =
      this.dtProveedor.nombre == null ? "" : this.dtProveedor.nombre.trim();
    if (this.dtProveedor.nombre == null || this.dtProveedor.nombre == "") {
      this.validarNombre = true;
      this.textoValidacion2 = this.textoCampoObligatorio;
    } else {
      this.validarNombre = false;
      this.textoValidacion2 = "";
    }
  }

  public ValidaEntrada3() {
    this.dtProveedor.correo =
      this.dtProveedor.correo == null ? "" : this.dtProveedor.correo.trim();
    if (!this.global.ValidarEmail(this.dtProveedor.correo)) {
      this.validarCorreo = true;
      this.textoValidacion3 = "El correo ingresado no es válido";
    } else {
      this.validarCorreo = false;
      this.textoValidacion3 = "";
    }
  }

  public ValidaEntrada4() {
    this.dtProveedor.direccion =
      this.dtProveedor.direccion == null
        ? ""
        : this.dtProveedor.direccion.trim();
    if (
      this.dtProveedor.direccion == null ||
      this.dtProveedor.direccion == ""
    ) {
      this.validarDireccion = true;
      this.textoValidacion4 = this.textoCampoObligatorio;
    } else {
      this.validarDireccion = false;

      this.textoValidacion4 = "";
    }
    if (this.dtProveedor.direccion.length < 4) {
      this.validarDireccion = true;
      this.textoValidacion4 = "Ingrese una dirección válida";
    } else {
      this.validarDireccion = false;

      this.textoValidacion4 = "";
    }
  }

  public ValidaEntrada5() {
    this.dtProveedor.telefono =
      this.dtProveedor.telefono == null ? "" : this.dtProveedor.telefono.trim();
    if (this.dtProveedor.telefono == null) {
      this.validarTelefono = true;
      this.textoValidacion5 = this.textoCampoObligatorio;
    } else {
      this.validarTelefono = false;
      this.textoValidacion5 = "";
    }
    if (
      this.dtProveedor.telefono.length < 7 ||
      this.dtProveedor.telefono.length > 10
    ) {
      this.validarTelefono = true;
      this.textoValidacion5 = "Ingrese un número de telefono válido";
    } else {
      this.validarTelefono = false;
      this.textoValidacion5 = "";
    }
  }

  public ValidaEntradas() {
    this.dtProveedor.identificacion =
      this.dtProveedor.identificacion == null
        ? ""
        : this.dtProveedor.identificacion.trim();
    this.dtProveedor.nombre =
      this.dtProveedor.nombre == null ? "" : this.dtProveedor.nombre.trim();
    this.dtProveedor.correo =
      this.dtProveedor.correo == null ? "" : this.dtProveedor.correo.trim();
    this.dtProveedor.direccion =
      this.dtProveedor.direccion == null
        ? ""
        : this.dtProveedor.direccion.trim();
    this.dtProveedor.telefono =
      this.dtProveedor.telefono == null ? "" : this.dtProveedor.telefono.trim();

    if (
      this.dtProveedor.identificacion == null ||
      this.dtProveedor.identificacion == ""
    ) {
      this.validarIdentificacion = true;

      this.textoValidacion1 = this.textoCampoObligatorio;
    }

    if (this.dtProveedor.identificacion.length != 13) {
      this.validarIdentificacion = true;
      this.textoValidacion1 = "El ruc debe tener 13 dígitos";
    } else {
      this.validarIdentificacion = false;
      this.textoValidacion1 = "";
    }
  }

  public GuadarProveedor() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var tipoId;
    if (this.dtProveedor.tipoIdentificacion == "CÉDULA") {
      tipoId = "C";
    } else {
      tipoId = "R";
    }

    var data = {
      Token: token.access_token,
      DataJSON: `?direccion=${this.dtProveedor.direccion}&email=${this.dtProveedor.correo}&telefono=${this.dtProveedor.telefono}&proveedor=${this.dtProveedor.identificacion}&tipoProveedor=${tipoId}&nombre=${this.dtProveedor.nombre}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.spinner.show();
    this.dataExterna
      .GuadarProveedor(data)
      .then((res) => {
        this.spinner.hide();
        var resultado = JSON.parse(res);
        if (resultado.Estado == "Error") {
          let mensajes = "";
          for (var item of resultado.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: "Servicio Registrar Proveedor",
            html: mensajes,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          });
        } else if (resultado.Estado == "OK") {
          this.frmFiltroProveedor.identificacion =
            this.dtProveedor.identificacion;
          this.frmFiltroProveedor.nombre = this.dtProveedor.nombre;
          this.ObtenerProveedorAdicional(1);
          Swal.fire({
            title: "Registro Exitoso de Proveedor",
            html: "" + resultado.Datos,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            $(this.modalCrearProveedor).modal("hide");
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GestionViaje(state: number, tipo: number, identificador: any) {
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

    if (tipo == 1) {

      if (this.lstArchivos.length == 0) {
        Swal.fire({
          title: this.textoInformacion,
          html: " Usted no ha cargado ningún documento de soporte (factura, nota de venta),etc. <br> <b>¿Está seguro de que quiere continuar?</b> <br> si acepta continuar se descontará el 100% del valor de los viáticos depositados.",
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              title: "Liquidar Viaje",
              html: "¿Está seguro que desea liquidar el viaje?",
              type: "info",
              showCancelButton: true,
              confirmButtonText: "Si, Liquidar Solicitud",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.value) {
                this.spinner.show();
                // Cuando la persona finalize una liquidación sin haber seleccionado el campo ¿Realizó el viaje?                
                if(isNaN(this.viajeHecho)){
                  var data = {
                    Identificador: 1,
                    IdViaje: this.dtViaje.IdViaje,
                    RealizoViaje: 2,
                    Regreso: 0,
                    RegresoFecha: this.dtViaje.FechaFinViaje
                  };              
                  this.dataInterna.GestionSolicitudPagoViaje(data).then((resp) => { console.log(resp); }) .catch((error) => { console.log(error) });
                }
                //
                this.dataInterna.GestionarViaje(travel).then((res) => {
                  this.spinner.hide();
                  Swal.fire({
                    title: "Liquidación Exitosa",
                    html: "Todos los datos fueron guardados exitosamente",
                    type: "info",
                    showCancelButton: false,
                    confirmButtonText: "Aceptar",
                  }).then((result) => {
                    this.ObtenerParametros(2);
                  });
                }).catch((err) => { this.spinner.hide() });
              }
            });
          }
        });
      } else {

        var validacion = true;
        for (const archivo of this.lstArchivos) {
          if (archivo.DocumentoEstado == 1) {
            validacion = false;
            break;
          }
        }

        if (!validacion) {
          Swal.fire({
            title: "Validación Liquidar Viaje",
            html: "Una de las facturas no se encuentran subidas al repositorio de archivos",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
        } else {
          //////////////////////////////////////////////////////////////////////////////

          var token = this.sesionExterna.ObtenerClaveExterna();
          const facturasElectronicasSolicitud = this.lstArchivos.filter((f: any) => f.TipoFactura == 1);

          let facturasElectronicasSolicitudValidacion = true;
          let cantidadFcaturasDisponibles = 0;
          let facturasInactivas = "";
          for (const facturaElectronicaCargada of facturasElectronicasSolicitud) {

            let respuesta: any;
            const establecimiento = facturaElectronicaCargada.NumeroFactura.substr(0, 3);
            const puntoEmision = facturaElectronicaCargada.NumeroFactura.substr(3, 3);
            const secuencial = facturaElectronicaCargada.NumeroFactura.substr(6, 9);

            const proveedorSeleccionado = JSON.parse(facturaElectronicaCargada.DatosProveedor);

            const dataAdicionalFE = {
              Token: token.access_token,
              DataJSON: `?tipoDocumento=01&ruc=${proveedorSeleccionado.Identificacion}&establecimiento=${establecimiento}&puntoEmision=${puntoEmision}&secuencial=${secuencial}&numeroPagina=1`
            }

            this.spinner.show();
            this.dataExterna.ObtenerFactura(dataAdicionalFE).then((res) => {
              this.spinner.hide();
              respuesta = JSON.parse(res);
              if (respuesta.Estado == "Error") {
                let mensajes = "";
                for (var item of respuesta.Mensajes) {
                  mensajes = `${mensajes + item} \n`;
                }
                this.global.VerAlerta("Error en la validación de estado de facturas", mensajes, "info");
                facturasElectronicasSolicitudValidacion = false;
                cantidadFcaturasDisponibles = 0;
              } else if (respuesta.Estado == "OK") {

                const nuevoListadoFacturasElectronicas = respuesta.Datos.Entidades;

                let nuevaFacturaEstado: any;

                for (const fact of nuevoListadoFacturasElectronicas) {
                  if (fact.NumeroAutorizacion == facturaElectronicaCargada.Autorizacion) {
                    nuevaFacturaEstado = fact;
                  }
                }

                if (nuevaFacturaEstado.Estado == 1) {
                  facturasElectronicasSolicitudValidacion = true;
                  cantidadFcaturasDisponibles++;
                } else {
                  facturasElectronicasSolicitudValidacion = false;
                  cantidadFcaturasDisponibles--;
                  facturasInactivas = facturasInactivas + "" + nuevaFacturaEstado.NumeroDocumento + "<br>";
                }

              }
            }).catch((err) => { this.spinner.hide() });

          }

          setTimeout(() => {

            if (cantidadFcaturasDisponibles == facturasElectronicasSolicitud.length) {

              Swal.fire({
                title: "Liquidar Viaje",
                html: "¿Está seguro que desea liquidar el viaje?",
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Si, Liquidar Solicitud",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.value) {
                  // Cambio de estado de facturas electrónicas
                  if (facturasElectronicasSolicitud.length != 0) {
                    for (const facturaElectronicaModificar of facturasElectronicasSolicitud) {
                      const proveedorNuevo = JSON.parse(facturaElectronicaModificar.DatosProveedor);
                      this.CambiarEstadoFactura(proveedorNuevo.Identificacion, facturaElectronicaModificar.TipoDocumento.Codigo, facturaElectronicaModificar.NumeroFactura);
                      facturasElectronicasSolicitudValidacion = true;
                    }
                  }
                  // Cabio de estado fin

                  if (facturasElectronicasSolicitudValidacion) {
                    this.spinner.show();
                    this.dataInterna.GestionarViaje(travel).then((res) => {
                      this.spinner.hide();
                      Swal.fire({
                        title: "Liquidación Exitosa",
                        html: "Todos los datos fueron guardados exitosamente",
                        type: "info",
                        showCancelButton: false,
                        confirmButtonText: "Aceptar",
                      }).then((result) => {
                        this.ObtenerParametros(2);
                      });
                    }).catch((err) => { this.spinner.hide() });
                  }
                }
              });

            } else {
              this.global.VerAlerta("Alerta", "Revise las facturas electrónicas ingresadas, Se verificó que las siguientes facturas se encuentran en uso. <br>" + facturasInactivas, "warning");
              this.spinner.hide();
            }

          }, 2500);
          //////////////////////////////////////////////////////////////////////////////
        }

      }

    } else {
      this.spinner.show();
      this.dataInterna.GestionarViaje(travel).then((res) => {
        this.spinner.hide();
        Swal.fire({
          title: "Liquidación Automática Exitosa",
          html: "La liquidación fue generada exitosamente",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.ObtenerParametros(1);
        });
      }).catch((err) => { this.spinner.hide() });
    }
  }

  public FinalizarLiquidacion() {
    for (const file of this.lstArchivos) {
      if (file.NombreTipoFactura == "ELECTRÓNICA") {
        var proveedor = JSON.parse(file.DatosProveedor);
        this.CambiarEstadoFactura(proveedor.Identificacion, file.TipoDocumento.Codigo, file.NumeroFactura);
      }
    }
  }

  public CambiarEstadoFactura(
    Identificacion: string,
    tipoDocumento: string,
    autorizacion: string
  ) {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var usuario = this.servicioUsuario.ObtenerUsuario();

    var establecimiento = autorizacion.substring(0, 3);
    var puntoEmision = autorizacion.substring(3, 3);
    var secuencial = autorizacion.substring(6, autorizacion.length);

    var data = {
      Token: token.access_token,
      DataJSON: `?ruc=${Identificacion}&establecimiento=${establecimiento}&puntoEmision=${puntoEmision}&secuencial=${secuencial}&tipoDocumento=${tipoDocumento}&estadoDocumento=5&codigoSistema=3&usuario=${usuario.Usuario}`,
    };

    this.spinner.show();
    this.dataExterna.CambiarEstadoFactura(data).then((res) => {
      this.spinner.hide();
    }).catch((err) => {
      this.spinner.hide();
    });
  }

  public Calculos() {
    var justificacion = 0;
    for (const invoice of this.lstArchivos) {
      justificacion += parseFloat(invoice.TotalLiquidar);
    }
    this.fmrDetalles.justificacion = this.global.FormatearNumero(justificacion, 2);
    this.fmrDetalles.creditoPendiente =
      Math.round((this.fmrDetalles.justificacion - this.fmrDetalles.viaticos) * 100) /
      100;
  }

  public CerrarModalProveedor() {
    this.tipoProveedor = 0;
    this.agregarProveedor = 0;
    $(this.modalCrearProveedor).modal("toggle");
  }

  public CerrarModalActualizaInfoProveedor() {
    $(this.modalActualizarEmailProveedor).modal("toggle");
  }

  public LimpiarInformacionProveedor() {
    this.dtProveedor = {
      correo: null,
      direccion: null,
      identificacion: null,
      tipoIdentificacion: null,
      telefono: null,
      nombre: null,
      correoActualizar: null,
    };
  }

  public FechaMinima() {
    var newDate = moment(this.dtViaje.FechaFinViaje).add(1, "d");
    return new Date(moment(newDate).format("YYYY-MM-DD LT"));
  }

  public MinimoFechaViaje() {
    var newDate = moment(this.dtViaje.FechaInicioViaje).add(0, "d");
    return new Date(moment(newDate).format("YYYY-MM-DD LT"));
  }

  public VerificarCreditoPendiente() {
    return Math.sign(this.fmrDetalles.creditoPendiente);
  }

  public CambiarCategorias() {
    if (this.frmFactura.categorias == "02") {
      this.frmFactura.tipoImpuesto = {
        Codigo: "0",
        Descripcion: "0 %",
        Porcentaje: 0,
      };
    } else {
      this.frmFactura.tipoImpuesto = {
        Codigo: "2",
        Porcentaje: 12.0,
        Descripcion: "12 %",
      };
    }
    this.CalcularValores();
  }

  public CalcularValores() {
    var tmpParameter : any = this.lstParametros.find((e: any) => e.NombreParametro == "ValorSubtotal");
    var valueSubtotal = parseFloat(tmpParameter.ValorParametro);
    var temTypeTax: any = this.frmFactura.tipoImpuesto == null ? 0 : this.frmFactura.tipoImpuesto.Porcentaje;
    
    var valueTotal = this.valorTotalLiquidacion;

    if (this.validarEditar == 1) {
      var temp1 = Math.round((valueTotal - parseFloat(this.fmrDetalles.justificacion.toString())) * 100) / 100;
      this.valorAdicional = Math.round((temp1 + this.valorEditar) * 100) / 100;
    } else {
      this.valorAdicional = Math.round((valueTotal - this.fmrDetalles.justificacion) * 100) / 100;
    }

    if (this.frmFactura.tipoImpuesto != null) {
      if (temTypeTax == 0) {
        this.frmFactura.subtotal = this.frmFactura.total;
        this.frmFactura.impuesto = 0;
        this.frmFactura.liquidacionTotal = parseFloat(this.frmFactura.total);
      } else {
        var valueTypeTax = parseFloat(temTypeTax) / 100;
        this.frmFactura.subtotal = Math.round((parseFloat(this.frmFactura.total) / valueSubtotal) * 100) / 100;
        this.frmFactura.impuesto = Math.round(parseFloat(this.frmFactura.subtotal) * valueTypeTax * 100) / 100;
        this.frmFactura.liquidacionTotal = parseFloat(this.frmFactura.total);
      }
    }

    if (this.frmFactura.valorAdicional != 0) {
      this.frmFactura.liquidacionTotal = Math.round((this.frmFactura.valorAdicional + parseFloat(this.frmFactura.total)) * 100) / 100;
    }
  }

  public ObtenerCuentasDiariosAX() {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametrosCuentasAX(this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.lstParametrosCuentaAX = res[0];
        this.LiquidacionAutomatica();
      })
      .catch((err) => {
        console.log(err)
        this.spinner.hide();
      });
  }

  public LiquidacionAutomatica() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var liquidacionAutomatica = {
      NombreDiario: this.lstParametrosCuentaAX.DiarioGeneral,
      PerfilAnticipoViaticos: this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
      CuentaContablePVNJ: this.lstParametrosCuentaAX.CuentaViaticosNoJustificados,
      DescripcionDiario: `Viaje ${this.dtViaje.IdViaje} ${this.dtViaje.FechaInicioViaje}-${this.dtViaje.FechaFinViaje} ${this.dtViaje.Transporte.Ruta.NombreRuta} Ref. Pago:${this.lstViaticosAvance[0]}`,
    };
    this.spinner.show();
    var data = {
      Token: token.access_token,
      DataJSON: `?nombreDiario=${liquidacionAutomatica.NombreDiario}&descripcionDiario=${liquidacionAutomatica.DescripcionDiario}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };
    this.dataExterna
      .ObtenerDiarioAvance(data)
      .then((res) => {
        var aux = JSON.parse(res);

        this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx =
          aux.Datos;

        this.GestionLiquidacionViaje("IdLiquidacionDevolucionCabeceraAx", this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx, false);
        this.LineaProveedorLiquidaAnticipo(liquidacionAutomatica);
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Crear Diario",
          html:
            `No se pudo crear el diario<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.LiquidacionAutomatica();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public LineaProveedorLiquidaAnticipo(liquidacionAutomatica: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var departament = JSON.parse(this.dtViaje.DepartamentoUnoViaje);
    var data = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx}&valor=${this.fmrDetalles.viaticos}&fechaTransaccion=${this.global.ObtenerFechaAX()}&proveedor=${this.dtViaje.Registrador.Identificacion}&descripcion=${liquidacionAutomatica.DescripcionDiario}&referencia=${this.dtAsientoViaje.CodigoDiario}&departameto=${departament.Codigo}&perfilAsiento=${liquidacionAutomatica.PerfilAnticipoViaticos}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.spinner.show();
    this.dataExterna.LineaProveedorLiquidaAnticipo(data).then((res) => {
      var result = JSON.parse(res);
      var aux;
      if (result.Estado == "Error") {
        let mensajes = "";
        for (var item of result.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }

        Swal.fire({
          title: "Servicio Línea Proveedor Liquida Anticipo",
          html: mensajes,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarDiario();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      } else {
        aux = JSON.parse(res);

        this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCreditoAx =
          aux.Datos;

        this.GestionLiquidacionViaje(
          "IdLiquidacionDevolucionCreditoAx",
          this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCreditoAx,
          false
        );
        this.LineaLiquidacion(liquidacionAutomatica);
      }
    })
      .catch((err: any) => {
        this.spinner.hide();
        Swal.fire({
          title: "Línea Proveedor Liquida Anticipo",
          html:
            `No se pudo crear la línea de proveedor de anticipo<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarDiario();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public BorrarDiario() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    var dataCabecera = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BorrarDiario(dataCabecera)
      .then((res) => {
        this.spinner.hide();
        this.LiquidacionAutomatica();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Borrar Linea Diario",
          html:
            `No se pudo borrar el diaro<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarDiario();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public LineaLiquidacion(liquidacionAutomatica: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var departament = JSON.parse(this.dtViaje.DepartamentoUnoViaje);

    var ParametrosLiquidacionDevolucion = `${this.dtViaje.Registrador.CodigoEmpresa}|${this.dtViaje.TipoCuentaViaje}|${this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx}|${liquidacionAutomatica.CuentaContablePVNJ}|${departament.Codigo}| | | |`;
    var data = {
      Token: token.access_token,
      DataJSON: `?parametros=${ParametrosLiquidacionDevolucion}&valor=${this.fmrDetalles.viaticos}&descripcion=${liquidacionAutomatica.DescripcionDiario}&fechaTransaccion=${this.global.ObtenerFechaAX()}`,
    };
    var aux;
    this.spinner.show();
    this.dataExterna
      .LineaLiquidacion(data)
      .then((res) => {
        aux = JSON.parse(res);
        this.dtLiquidacionAutomatica.IdLiquidacionDevolucionDebitoAx = aux.Datos;
        this.GestionLiquidacionViaje(
          "IdLiquidacionDevolucionDebitoAx",
          this.dtLiquidacionAutomatica.IdLiquidacionDevolucionDebitoAx,
          false
        );
        this.CerrarAvance();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Línea Liquidación",
          html:
            `No se pudo crear la línea de liquidación<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarLineaDiario();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public BorrarLineaDiario() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    var dataDetalle = {
      Token: token.access_token,
      DataJSON: `?idRegistro=${this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCreditoAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BorrarLineaDiario(dataDetalle)
      .then((res) => {
        this.spinner.hide();
        this.BorrarDiario();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Borrar Línea Diario",
          html:
            `No se pudo borrar la línea de diaro<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarLineaDiario();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public CerrarAvance() {


    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCabeceraAx}&autorizacion=''&fechaVigencia=${this.global.ObtenerFechaAX()}&autorizacionElectronica=''&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .RegistraDiario(data)
      .then((res) => {
        var aux = JSON.parse(res);
        this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCierreAx = aux.Datos;
        this.GestionLiquidacionViaje(
          "IdLiquidacionDevolucionCierreAx",
          this.dtLiquidacionAutomatica.IdLiquidacionDevolucionCierreAx,
          true
        );
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Cerrar Avance",
          html:
            `No se pudo cerrar el avance en AX<br>${this.textoMensajeReintento}`,
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.CerrarAvance();
          } else {
            this.rutaSistema.navigate([this.urlListadoReservas]);
          }
        });
      });
  }

  public GestionLiquidacionViaje(tipo: string, valor: string, fin: boolean) {
    var data = {
      Identificador: 1,
      IdLiquidacionViaje: 0,
      IdViaje: this.idViaje,
      Identificador_: "L_AUTOMATICA",
      Lista: "0",
      ListaValor: "",
      Tipo: tipo,
      Valor: valor,
      Estado: 0,
    };
    this.spinner.show();
    this.dataInterna.GestionLiquidacionViaje(data).then((res) => {
      if (fin) {
        this.spinner.hide();
        this.GestionViaje(9, 2, 9);
      }
    }).catch((err) => { this.spinner.hide() });
  }

  public CambiarValor() {
    if (this.tipoFactura == 1) {
      this.facturaElectronicaBloqueo = true;
      this.tipoProveedor = 1;
      this.tipoBusqueda = 1;
      this.ValidarTipoBusqueda();
      this.bloqueoGenerico = false;
    } else {
      this.tipoProveedor = 0;
      this.facturaElectronicaBloqueo = false;
      this.busquedaRuc = false;
      this.busquedaFactura = false;
      this.busquedaAutorizacion = false;
    }

    this.lstFacturaConceptos = [];
    this.frmFactura = {
      categorias: null,
      TipoDocumento: null,
      numeroFactura: null,
      numeroAutorizacion: null,
      fechaEmision: null,
      fechaVencimiento: null,
      concepto: null,
      ciudad: null,
      subtotal: null,
      total: null,
      tipoImpuesto: null,
      impuesto: null,
      valorAdicional: 0,
      liquidacionTotal: null,
      rucProovedor: null,
      establecimiento: null,
      puntoEmision: null,
      secuencial: null,
      trim: null,
    };
    this.dtProovedor = {
      Bloqueado: null,
      Correo: null,
      Direccion: null,
      EsExtranjero: null,
      Grupo: null,
      Identificacion: null,
      Nombre: null,
      RazonSocial: null,
      RegionPais: null,
      Telefono: null,
      TipoIdentificacion: null,
    };
    this.frmFiltroProveedor = {
      identificacion: "",
      nombre: "",
    };
    this.numeroAutorizacion = "";
  }

  public GenerarVectorDinamico() {
    var id = 0;
    this.lstFacturaConceptos.push({
      Id: this.lstFacturaConceptos.length + 1,
      Descripcion: "",
      BaseImponible: "",
      TipoImpuesto: 0,
      ValorImpuesto: 0,
      Total: 0,
    });
  }

  public EliminarConcepto(concepto: any) {
    let id: any;
    if (concepto.IdArchivoDetalle != undefined) {
      id = concepto.IdArchivoDetalle;
    } else {
      id = concepto.Id;
    }
    var thisIncluido = this;
    var eliminarMarcadorVector = function (lista: any[]) {
      var items = [];
      lista.forEach((e: { Id: any }) => {
        items.push(e.Id);
      });
      var posicion = items.indexOf(id);
      if (posicion > -1) {
        lista.splice(posicion, 1);
        thisIncluido.CalcularConceptoLinea(id);
      }
    };
    eliminarMarcadorVector(this.lstFacturaConceptos);

    if (concepto.IdArchivoDetalle != undefined) {
      this.spinner.show();
      this.dataInterna
        .EliminarFacturaDetalle(concepto.IdArchivoDetalle)
        .then((res) => {
          this.spinner.hide();
          this.CalcularConceptoLinea(concepto.IdArchivoDetalle);
          this.ListarFacturaDetalle();
          this.global.VerMensajeError(
            "Detalle Eliminado exitosamente",
            "success",
            "top-end"
          );
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }

  }

  public CalcularConceptoLinea(id: any) {
    var total = null;
    for (const concepto of this.lstFacturaConceptos) {
      if (concepto.Id == id) {
        concepto.ValorImpuesto =
          Math.round(
            ((parseFloat(concepto.BaseImponible) *
              parseFloat(concepto.TipoImpuesto)) /
              100) *
            100
          ) / 100;
        concepto.Total =
          Math.round(
            (parseFloat(concepto.BaseImponible) +
              parseFloat(concepto.ValorImpuesto)) *
            100
          ) / 100;
      }
      total += Math.round(concepto.Total * 100) / 100;
    }
    this.frmFactura.total = Math.round(parseFloat(total) * 100) / 100;
    this.CalcularValores();
  }

  public ObtenerInformacionFactura(data: {
    IdArchivo: number;
    TipoFactura: string;
    Categorias: { Codigo: any };
    TipoDocumento: { Codigo: any };
    DatosProveedor: string;
    NumeroFactura: any;
    FechaEmision: any;
    Autorizacion: string;
    FechaVencimiento: any;
    Concepto: any;
    SubtotalFactura: any;
    TipoImpuestoFactura: string;
    ImpuestoFactura: any;
    TotalFactura: any;
    ValorAdicional: string;
    Ciudad: any;
    ValorRecortar: any;
    TotalLiquidar: string;
  }) {
    this.IdArchivo = data.IdArchivo;
    this.tipoFactura = parseInt(data.TipoFactura);

    if (this.tipoFactura == 1) {
      this.tipoBusqueda = 2;
      this.busquedaAutorizacion = true;
    }

    this.frmFactura.categorias = data.Categorias.Codigo;
    this.frmFactura.TipoDocumento = data.TipoDocumento.Codigo;

    var tempDatosProveedor = JSON.parse(data.DatosProveedor);
    this.tipoProveedor = 1;
    this.frmFiltroProveedor.identificacion = tempDatosProveedor.Identificacion;
    this.frmFiltroProveedor.nombre = tempDatosProveedor.RazonSocial;
    this.dtProovedor.Identificacion = tempDatosProveedor.Identificacion;
    this.dtProovedor.Nombre = tempDatosProveedor.RazonSocial;
    this.dtProveedor.identificacion = tempDatosProveedor.Identificacion;
    this.dtProveedor.nombre = tempDatosProveedor.RazonSocial;
    this.frmFactura.numeroFactura = data.NumeroFactura;
    this.frmFactura.fechaEmision = data.FechaEmision;
    this.frmFactura.numeroAutorizacion = data.Autorizacion;
    this.frmFactura.fechaVencimiento = data.FechaVencimiento;

    this.frmFactura.concepto = data.Concepto;

    this.frmFactura.subtotal = data.SubtotalFactura;
    this.frmFactura.tipoImpuesto = JSON.parse(data.TipoImpuestoFactura);
    this.frmFactura.impuesto = data.ImpuestoFactura;
    this.frmFactura.total = data.TotalFactura;
    this.frmFactura.valorAdicional = parseFloat(data.ValorAdicional);

    this.frmFactura.ciudad = data.Ciudad;

    this.frmFactura.trim = data.ValorRecortar;
    this.numeroAutorizacion = data.Autorizacion;

    this.validarEditar = 1;
    this.valorEditar = parseFloat(data.TotalLiquidar);

    this.agregarProveedor = 1;
    this.frmFactura.liquidacionTotal = parseFloat(data.TotalLiquidar);
    $(this.modalRegistroFactura).modal("toggle");

    this.ListarFacturaDetalle();
  }

  public ListarFacturaDetalle() {
    this.spinner.show();
    this.dataInterna
      .ListarFacturaDetalle(this.IdArchivo)
      .then((res) => {
        this.spinner.hide();
        this.lstFacturaConceptos = res;

        this.CalcularValores();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public AbrirModalFactura() {
    $("#Archivo").val("");
    this.cantidadBaseCero = 0;
    this.cantidadBaseDoce = 0;
    this.cantidadTotalCero = 0;
    this.cantidadTotalDoce = 0;
    this.IdArchivo = 0;
    this.validarEditar = 0;
    this.busquedaAutorizacion = false;
    this.numeroAutorizacion = "";
    this.dtProovedor = {
      Bloqueado: null,
      Correo: null,
      Direccion: null,
      EsExtranjero: null,
      Grupo: null,
      Identificacion: null,
      Nombre: null,
      RazonSocial: null,
      RegionPais: null,
      Telefono: null,
      TipoIdentificacion: null,
    };
    this.tipoProveedor = 0;
    this.agregarProveedor = 0;
    this.LimpiarFormulario();
    this.CalcularValores();
    $(this.modalRegistroFactura).modal("toggle");
  }

  public LimpiarFormulario() {
    this.tipoFactura = 0;
    this.lstFacturaConceptos = [];
    this.frmFiltroProveedor = {
      identificacion: "",
      nombre: "",
    };
    this.frmFactura = {
      categorias: null,
      TipoDocumento: null,
      numeroFactura: null,
      numeroAutorizacion: null,
      fechaEmision: null,
      fechaVencimiento: null,
      concepto: null,
      ciudad: null,
      subtotal: null,
      total: null,
      tipoImpuesto: {
        Codigo: "2",
        Porcentaje: 12.0,
        Descripcion: "12 %",
      },
      impuesto: null,
      valorAdicional: 0,
      liquidacionTotal: null,
      rucProovedor: null,
      establecimiento: null,
      puntoEmision: null,
      secuencial: null,
      trim: null,
    };
    this.dtArchivo = {
      IdTipoObjeto: null,
      IdClase: null,
      Titulo: null,
      Propiedades: [
        {
          Id: null,
          Valor: null,
        },
      ],
      Documentos: null,
    };
    this.validarEditar = 0;
  }

  public ValidarFechas() {
    if (this.frmFactura.fechaEmision == null) {
      this.global.VerMensajeError(
        "La fecha de emisión no puede ser vacía",
        "error",
        "top-end"
      );
    } else if (this.frmFactura.fechaVencimiento == null) {
      this.global.VerMensajeError(
        "La fecha de vencimiento no puede ser vacía",
        "error",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaEmision) <
      Date.parse(this.dtViaje.FechaInicioViaje)
    ) {
      this.global.VerMensajeError(
        "La fecha de emisión de la factura no puede ser menor a la fecha del inicio del viaje",
        "error",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaEmision) >
      Date.parse(this.dtViaje.FechaFinViaje)
    ) {
      this.global.VerMensajeError(
        "La fecha de emisión de la factura no puede ser mayor a la fecha del fin del viaje",
        "error",
        "top-end"
      );
    } else if (
      Date.parse(this.frmFactura.fechaVencimiento) <
      Date.parse(this.frmFactura.fechaEmision)
    ) {
      this.global.VerMensajeError(
        "La fecha de vencimiento de la factura no puede ser mayor a fecha de emisión de la factura",
        "error",
        "top-end"
      );
    }
  }

  public ObtenerParametros(tipo: any) {
    this.spinner.show();
    this.dataInterna.ObtenerParametro().then((res) => {
      this.spinner.hide();
      var lstParametros = res;

      var aux1 = lstParametros.find((e: { NombreParametro: string }) => e.NombreParametro == "IdAplicacion");
      var aux2 = lstParametros.find((e: { NombreParametro: string }) => e.NombreParametro == "NombreOrigen");
      var aux3 = lstParametros.find((e: { NombreParametro: string }) => e.NombreParametro == "EmailOrigen");
      var aux4 = lstParametros.find((e: { NombreParametro: string }) => e.NombreParametro == "TiempoEspera");

      this.tmpAplicacion = aux1.ValorParametro;
      this.tmpNombreOrigen = aux2.ValorParametro;
      this.tmpEmailOrigen = aux3.ValorParametro;
      this.tmpTiempoEspera = aux4.ValorParametro;

      if (tipo == 1) {
        this.EnviarEmailDescuentoARol();
      } else if (tipo == 2) {
        this.EnviarEmailContador();
      }
    }).catch((err) => { this.spinner.hide(); });
  }

  public EnviarEmailDescuentoARol() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailDescuentoRol(
          this.dtViaje.IdViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.NombreViaje,
          this.dtViaje.Transporte.Ruta.NombreRuta,
          this.dtViaje.MotivoViaje,
          this.fmrDetalles.viaticos
        ),
        Asunto: "Liquidacion Automática - Descuento a Rol",
        IdAplicacion: this.tmpAplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: this.tmpNombreOrigen,
        EmailOrigen: this.tmpEmailOrigen,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.NombreViaje,
            Direccion: this.global.Reemplazar(this.dtViaje.Registrador.Email)
          },
        ],
        TiempoEspera: this.tmpTiempoEspera,
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

    this.rutaSistema.navigate([this.urlListadoReservas]);
  }

  public EnviarEmailContador() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var datos = JSON.stringify({
      tipo: "link",
      usuario: this.dtViaje.Contador.Usuario,
      idViaje: this.dtViaje.IdViaje,
      url: "contador/reservacion/detalle/" + this.dtViaje.IdViaje,
    });
    var urlAcceso = "#/" + btoa(datos);

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailContador(
          this.dtViaje.IdViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.Contador.Nombre,
          this.dtViaje.Transporte.Ruta.NombreRuta,
          this.dtViaje.MotivoViaje,
          this.dtViaje.NombreViaje,
          urlAcceso
        ),
        Asunto: "Contabilizar Solicitud Viaje N° " + this.dtViaje.IdViaje,
        IdAplicacion: this.tmpAplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: this.tmpNombreOrigen,
        EmailOrigen: this.tmpEmailOrigen,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.Contador.Nombre,
            Direccion: this.global.Reemplazar(this.dtViaje.Contador.Usuario + "@saludsa.com.ec")
          },
        ],
        TiempoEspera: this.tmpTiempoEspera,
      },
    };

    this.spinner.show();
    this.dataExterna.EnviarEmail(email).then((res) => {
      this.spinner.hide();
    }).catch((err) => {
      this.spinner.hide();
    });

    this.rutaSistema.navigate([this.urlListadoReservas]);
  }

  public CambiarTipoDocumentoValores() {
    if (this.frmFactura.TipoDocumento == "03") {
      this.bloqueoGenerico = true;
      this.frmFiltroProveedor.identificacion = "9999999999999";
      this.frmFiltroProveedor.nombre = "CONSUMIDOR FINAL";
      this.frmFactura.numeroFactura = "999-999-999999999";
      this.frmFactura.numeroAutorizacion = "9999999999";
      this.frmFactura.fechaEmision = "";
      this.frmFactura.fechaVencimiento = this.global.ObtenerFechaEmision();
    } else {
      this.bloqueoGenerico = false;
      this.frmFiltroProveedor.identificacion = "";
      this.frmFiltroProveedor.nombre = "";
      this.frmFactura.numeroFactura = "";
      this.frmFactura.numeroAutorizacion = "";
      this.frmFactura.fechaEmision = "";
      this.frmFactura.fechaVencimiento = this.global.ObtenerFechaEmision();
    }

    if (
      this.frmFactura.TipoDocumento == "02" ||
      this.frmFactura.TipoDocumento == "03"
    ) {
      this.visualizacionTipoImpuesto = false;
    } else {
      this.visualizacionTipoImpuesto = true;
    }
  }

  public ValidarMaximoLiquidacion() {

    let facturaExistente: any;

    if (this.validarEditar == 0) {
      facturaExistente = this.lstArchivos.find((element: any) => element.NumeroFactura == this.frmFactura.numeroFactura);
      if (facturaExistente != undefined) {
        this.global.VerAlerta("Alerta", "La factura que trata de ingresar, ya se encuentra en uso en esta liquidación. No puede utilizarse nuevamente", "warning");
      } else {
        var cantidad: any;
        var anteriorTotal: any;
        var liquidacionMaxima: any;
        var cantidadEntregada: any;
        var valorLiquidacion: any;
        if (this.viajeHecho == 1 && this._retorno == 1) {
          cantidad = 0;
          for (const concepto of this.lstFacturaConceptos) {
            cantidad = cantidad + parseFloat(concepto.Total);
          }

          anteriorTotal = 0;
          for (const file of this.lstArchivos) {
            if (file.IdArchivo == this.IdArchivo) {
              anteriorTotal = parseFloat(file.TotalFactura);
            }
          }

          liquidacionMaxima =
            parseFloat(this.liquidacionMaxima) - anteriorTotal;

          cantidadEntregada = 0;
          for (var viatico of this.lstViaticos) {
            if (viatico.Tipo == "Total") {
              cantidadEntregada = parseFloat(viatico.Valor);
            }
          }

          valorLiquidacion = liquidacionMaxima + cantidad;

          if (valorLiquidacion > cantidadEntregada) {
            this.global.VerAlerta(
              this.textoInformacion,
              `<div style="text-align: justificacion !important">No se puede ingresar esta factura porque supera el valor de liquidación permitido.<br><br><b>Valor justificado hasta el momento: </b>${this.global.FormatearNumero(valorLiquidacion, 2)}<b>$</b><br><b>Valor máximo de liquidación permitido: </b> ${this.global.FormatearNumero(cantidadEntregada, 2)}<b>$</b></div>`,
              "error"
            );
          } else {
            this.GestionArchivo();
          }
        } else if (this.viajeHecho == 1 && this._retorno == 2) {
          var diferencia = moment(this.dtViaje.RegresoFecha)
            .startOf("day")
            .diff(moment(this.dtViaje.FechaFinViaje).startOf("day"), "days");
          this.spinner.show();
          this.dataInterna
            .ObtenerParametro()
            .then((res) => {
              var lstParametros = res;
              var valueNight: any;
              var valueDay: any;

              if (this.dtViaje.ViajeCapacitacion == "Sí") {
                valueNight = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorNocheCapacitacion"
                );
                valueDay = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorDiaCapacitacion"
                );
              } else if (this.dtViaje.ViajeCapacitacion == "No") {
                valueNight = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorNocheSinCapacitacion"
                );
                valueDay = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorDiaSinCapacitacion"
                );
              }

              const dineroDias = parseFloat(valueDay.ValorParametro) * 1;
              const dineroNoches = parseFloat(valueNight.ValorParametro) * diferencia;
              var totalDineroDiasNoches =
                dineroDias + dineroNoches - parseFloat(valueDay.ValorParametro);

              cantidad = 0;
              for (const concepto of this.lstFacturaConceptos) {
                cantidad = cantidad + parseFloat(concepto.Total);
              }

              anteriorTotal = 0;
              for (const file of this.lstArchivos) {
                if (file.IdArchivo == this.IdArchivo) {
                  anteriorTotal = parseFloat(file.TotalFactura);
                }
              }

              liquidacionMaxima =
                parseFloat(this.liquidacionMaxima) - anteriorTotal;

              cantidadEntregada = 0;
              for (var viatico of this.lstViaticos) {
                if (viatico.Tipo == "Total") {
                  cantidadEntregada = parseFloat(viatico.Valor);
                }
              }

              var cantidadFinal = cantidadEntregada + totalDineroDiasNoches;
              valorLiquidacion = liquidacionMaxima + cantidad;

              this.spinner.hide();

              if (valorLiquidacion > cantidadFinal) {
                this.global.VerAlerta(
                  this.textoInformacion,
                  `<div style="text-align: justificacion !important">No se puede ingresar esta factura porque supera el valor de liquidación permitido.<br><br><b>Valor justificado hasta el momento: </b>${this.global.FormatearNumero(valorLiquidacion, 2)}<b>$</b><br><b>Valor máximo de liquidación permitido: </b> ${this.global.FormatearNumero(cantidadFinal, 2)}<b>$</b></div>`,
                  "error"
                );
              } else {
                this.GestionArchivo();
              }
            })
            .catch((err) => {
              this.spinner.hide();
            });
        }
      }
    } else if (this.validarEditar == 1) {
      const lstArchivosNuevo = this.lstArchivos.filter((e: any) => e.IdArchivo != this.IdArchivo);
      facturaExistente = lstArchivosNuevo.find((element: any) => element.NumeroFactura == this.frmFactura.numeroFactura);

      if (facturaExistente != undefined) {
        this.global.VerAlerta("Alerta", "La factura que trata de ingresar, ya se encuentra en uso en esta liquidación. No puede utilizarse nuevamente", "warning");
      } else {
        var cantidad: any;
        var anteriorTotal: any;
        var liquidacionMaxima: any;
        var cantidadEntregada: any;
        var valorLiquidacion: any;
        if (this.viajeHecho == 1 && this._retorno == 1) {
          cantidad = 0;
          for (const concepto of this.lstFacturaConceptos) {
            cantidad = cantidad + parseFloat(concepto.Total);
          }

          anteriorTotal = 0;
          for (const file of this.lstArchivos) {
            if (file.IdArchivo == this.IdArchivo) {
              anteriorTotal = parseFloat(file.TotalFactura);
            }
          }

          liquidacionMaxima =
            parseFloat(this.liquidacionMaxima) - anteriorTotal;

          cantidadEntregada = 0;
          for (var viatico of this.lstViaticos) {
            if (viatico.Tipo == "Total") {
              cantidadEntregada = parseFloat(viatico.Valor);
            }
          }

          valorLiquidacion = liquidacionMaxima + cantidad;

          if (valorLiquidacion > cantidadEntregada) {
            this.global.VerAlerta(
              this.textoInformacion,
              `<div style="text-align: justificacion !important">No se puede ingresar esta factura porque supera el valor de liquidación permitido.<br><br><b>Valor justificado hasta el momento: </b>${this.global.FormatearNumero(valorLiquidacion, 2)}<b>$</b><br><b>Valor máximo de liquidación permitido: </b> ${this.global.FormatearNumero(cantidadEntregada, 2)}<b>$</b></div>`,
              "error"
            );
          } else {
            this.GestionArchivo();
          }
        } else if (this.viajeHecho == 1 && this._retorno == 2) {
          var diferencia = moment(this.dtViaje.RegresoFecha)
            .startOf("day")
            .diff(moment(this.dtViaje.FechaFinViaje).startOf("day"), "days");
          this.spinner.show();
          this.dataInterna
            .ObtenerParametro()
            .then((res) => {
              var lstParametros = res;
              var valueNight: any;
              var valueDay: any;

              if (this.dtViaje.ViajeCapacitacion == "Sí") {
                valueNight = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorNocheCapacitacion"
                );
                valueDay = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorDiaCapacitacion"
                );
              } else if (this.dtViaje.ViajeCapacitacion == "No") {
                valueNight = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorNocheSinCapacitacion"
                );
                valueDay = lstParametros.find(
                  (e: { NombreParametro: string }) =>
                    e.NombreParametro == "ValorDiaSinCapacitacion"
                );
              }

              const dineroDias = parseFloat(valueDay.ValorParametro) * 1;
              const dineroNoches = parseFloat(valueNight.ValorParametro) * diferencia;
              var totalDineroDiasNoches =
                dineroDias + dineroNoches - parseFloat(valueDay.ValorParametro);

              cantidad = 0;
              for (const concepto of this.lstFacturaConceptos) {
                cantidad = cantidad + parseFloat(concepto.Total);
              }

              anteriorTotal = 0;
              for (const file of this.lstArchivos) {
                if (file.IdArchivo == this.IdArchivo) {
                  anteriorTotal = parseFloat(file.TotalFactura);
                }
              }

              liquidacionMaxima =
                parseFloat(this.liquidacionMaxima) - anteriorTotal;

              cantidadEntregada = 0;
              for (var viatico of this.lstViaticos) {
                if (viatico.Tipo == "Total") {
                  cantidadEntregada = parseFloat(viatico.Valor);
                }
              }

              var cantidadFinal = cantidadEntregada + totalDineroDiasNoches;
              valorLiquidacion = liquidacionMaxima + cantidad;

              this.spinner.hide();

              if (valorLiquidacion > cantidadFinal) {
                this.global.VerAlerta(
                  this.textoInformacion,
                  `<div style="text-align: justificacion !important">No se puede ingresar esta factura porque supera el valor de liquidación permitido.<br><br><b>Valor justificado hasta el momento: </b>${this.global.FormatearNumero(valorLiquidacion, 2)}<b>$</b><br><b>Valor máximo de liquidación permitido: </b> ${this.global.FormatearNumero(cantidadFinal, 2)}<b>$</b></div>`,
                  "error"
                );
              } else {
                this.GestionArchivo();
              }
            })
            .catch((err) => {
              this.spinner.hide();
            });
        }
      }
    }

  }

  public Verificar() {
    this.cantidadBaseCero = 0;
    this.cantidadBaseDoce = 0;
    this.cantidadTotalCero = 0;
    this.cantidadTotalDoce = 0;

    $("#collapseThree").collapse("toggle");

    var aux1 = 0;
    var aux2 = 0;
    var aux3 = 0;
    var aux4 = 0;

    for (var dato of this.lstFacturaConceptos) {
      if (dato.TipoImpuesto == "12") {
        aux1 = aux1 + parseFloat(dato.BaseImponible);
        aux2 = aux2 + parseFloat(dato.Total);
      }
      if (dato.TipoImpuesto == 0) {
        aux3 = aux3 + parseFloat(dato.BaseImponible);
        aux4 = aux4 + parseFloat(dato.Total);
      }
    }

    this.cantidadBaseDoce = this.global.FormatearNumero(aux1, 2);
    this.cantidadBaseCero = this.global.FormatearNumero(aux3, 2);
    this.cantidadTotalDoce = this.global.FormatearNumero(aux2, 2);
    this.cantidadTotalCero = this.global.FormatearNumero(aux4, 2);
  }

  public ValidarTipoBusqueda() {
    if (this.tipoFactura == 1 && this.tipoBusqueda == 0) {
      this.busquedaRuc = false;
      this.busquedaFactura = false;
      this.busquedaAutorizacion = false;
    } else if (this.tipoFactura == 1 && this.tipoBusqueda == 1) {
      this.busquedaAutorizacion = false;
      this.numeroRuc = "";
      this.numeroFactura = "";
      this.lstFacturasElectronicas = [];
      this.visualizarFacturasELectronicas = false;
      $(this.modalBusquedaFactura).modal("toggle");
    } else if (this.tipoFactura == 1 && this.tipoBusqueda == 2) {
      this.busquedaRuc = false;
      this.busquedaFactura = false;
      this.busquedaAutorizacion = true;
    } else if (this.tipoFactura == 1 && this.tipoBusqueda == 3) {
      this.busquedaRuc = false;
      this.busquedaFactura = true;
      this.busquedaAutorizacion = false;
    }
  }

  public CerrarModalBusqueda() {
    this.tipoBusqueda = 0;
    $(this.modalBusquedaFactura).modal("toggle");
  }

  public BusquedaFacturasElectronicas() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    if (this.tipoBusqueda == 1) {

      if (this.numeroRuc == "" || this.numeroRuc == undefined || this.numeroRuc == null) {
        this.global.MostrarNotificacion("El campo Número de RUC es obligatorio", "info", "top-end");
      } else if (this.numeroRuc.length != 13) {
        this.global.MostrarNotificacion("Ingresar un número de ruc válido", "info", "top-end");
      } else if (this.numeroFactura == "" || this.numeroFactura == undefined || this.numeroFactura == null) {
        this.global.MostrarNotificacion("El campo Número de Factura es obligatorio", "info", "top-end");
      } else if (this.numeroFactura != "" && this.numeroFactura.length != 15) {
        this.global.MostrarNotificacion("Debe ingresar un número de factura válido", "info", "top-end");
      } else {
        var establecimiento = "";
        var puntoEmision = "";
        var secuencial = "";
        var respuesta: any;

        establecimiento = this.numeroFactura.substr(0, 3);
        puntoEmision = this.numeroFactura.substr(3, 3);
        secuencial = this.numeroFactura.substr(6, 9);

        var dataAdicional: any;

        dataAdicional = {
          Token: token.access_token,
          DataJSON: `?tipoDocumento=01&ruc=${this.numeroRuc}&establecimiento=${establecimiento}&puntoEmision=${puntoEmision}&secuencial=${secuencial}&numeroPagina=1&numeroRegistros=0`,
        };

        this.spinner.show();
        this.dataExterna.ObtenerFactura(dataAdicional).then((res) => {
          this.spinner.hide();
          respuesta = JSON.parse(res);
          if (respuesta.Estado == "Error") {
            let mensajes = "";
            for (var item of respuesta.Mensajes) {
              mensajes = `${mensajes + item} \n`;
            }

            this.global.VerAlerta(
              "Servicio Obtener Factura",
              mensajes,
              "info"
            );
            this.lstFacturasElectronicas = [];
            this.visualizarFacturasELectronicas = false;
          } else if (respuesta.Estado == "OK") {
            this.lstFacturasElectronicas = respuesta.Datos.Entidades;
            this.visualizarFacturasELectronicas = true;
          }
        }).catch((err) => { this.spinner.hide() });
      }
    } else if (this.tipoBusqueda == 2) {
      if (this.numeroAutorizacion == "" || this.numeroAutorizacion == null || this.numeroAutorizacion == undefined) {
        this.global.MostrarNotificacion("Ingrese el número de autorización de la factura", "info", "top-end");
      } else {
        this.BuscarFactura();
      }
    }
  }

  public SeleccionarFacturaElectronica(facturaElectronicaSeleccionada: any) {

    let fechaInicio: any = moment(this.dtViaje.FechaInicioViaje).format("YYYY-MM-DD");
    let fechaFin: any = moment(this.dtViaje.RegresoFecha).format("YYYY-MM-DD");
    let fechaEmision: any = moment(facturaElectronicaSeleccionada.FechaEmision).format("YYYY-MM-DD");

    var verificacionFechaEmision: any = moment(fechaEmision).isBetween(fechaInicio, fechaFin, undefined, '[]');

    if (!verificacionFechaEmision) {
      this.global.VerAlerta(
        'Validación Fechas',
        '<div style="text-align: left;">No es posible seleccionar la siguiente factura electrónica.<br><small class="form-text text-muted">La fecha de emisión de la factura es: <b style="color: darkred;">' + fechaEmision + '</b></small><br>'
        + 'El rango permitido para el ingreso de sus facturas es: <br><span style="color: #012952;">Fecha Inicio Viaje: <b>' + fechaInicio + '</b><br>Fecha Regreso Viaje: <b>' + fechaFin + '</b></span></div>',
        'warning');
    } else {
      this.global.VerAlertaSinTitulo('Validación exitosa de la factura seleccionada', 'success');
      setTimeout(() => {
        this.numeroAutorizacion = facturaElectronicaSeleccionada.NumeroAutorizacion;
        this.BuscarFactura();
        $(this.modalBusquedaFactura).modal("toggle");
      }, 1500);
    }

  }

  public VerificarCantidadAdicionalAcreditacion() {
    if (this.viajeHecho == 1 && this._retorno == 1) {
      this.valorAdicionalAcreditacion = 0;
      this.valorTotalLiquidacion = this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
      this.spinner.hide();
      this.ObtenerArchivo();
    } else if (this.viajeHecho == 1 && this._retorno == 2) {
      var diferencia = moment(this.dtViaje.RegresoFecha)
        .startOf("day")
        .diff(moment(this.dtViaje.FechaFinViaje).startOf("day"), "days");
      if (diferencia >= 1) {
        this.dataInterna.ObtenerParametro().then((res) => {
          var lstParametros = res;
          var valueNight: any;
          var valueDay: any;
          if (this.dtViaje.ViajeCapacitacion == "Sí") {
            valueNight = lstParametros.find(
              (e: { NombreParametro: string }) =>
                e.NombreParametro == "ValorNocheCapacitacion"
            );
            valueDay = lstParametros.find(
              (e: { NombreParametro: string }) =>
                e.NombreParametro == "ValorDiaCapacitacion"
            );
          } else if (this.dtViaje.ViajeCapacitacion == "No") {
            valueNight = lstParametros.find(
              (e: { NombreParametro: string }) =>
                e.NombreParametro == "ValorNocheSinCapacitacion"
            );
            valueDay = lstParametros.find(
              (e: { NombreParametro: string }) =>
                e.NombreParametro == "ValorDiaSinCapacitacion"
            );
          }
          const dineroDias = parseFloat(valueDay.ValorParametro) * 1;
          const dineroNoches =
            parseFloat(valueNight.ValorParametro) * diferencia;
          this.valorAdicionalAcreditacion =
            dineroDias + dineroNoches - valueDay.ValorParametro;
          this.valorTotalLiquidacion =
            this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
          this.spinner.hide();
          this.ObtenerArchivo();
        }).catch((err) => {
          this.spinner.hide();
        });
      } else {
        this.valorAdicionalAcreditacion = 0;
        this.valorTotalLiquidacion =
          this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
        this.spinner.hide();
        this.ObtenerArchivo();
      }
    } else {
      this.ObtenerArchivo();
    }
  }

  public ValidarEstadoSolicitudViaje() {
    this.dataInterna.VerificarEstadoSolicitud(this.dtViaje.IdViaje).then((res) => {
      if (res == 6 || res == 10) {
        this.BuscarContenerdor();
      } else {
        this.global.VerAlerta("Información", "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha finalizado este proceso en otra instancia del sistema", "info");
        this.rutaSistema.navigate([this.urlListadoReservas]);
      }
    }).catch((err) => { console.log(err) });
  }

  public BuscarContenerdor() {
    
    this.spinner.show();
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

    this.dataExterna.ObtenerContenedor(data).then((res) => {      
      var result = JSON.parse(res);
      if (result.Estado == "OK") {
        var lista = result.Datos;
        lista.sort((a: any, b: any) => a.FechaCreacion - b.FechaCreacion);
        var dtContainer = lista[0];
        var idContainer = dtContainer.Id;
        this.spinner.hide();
        this.CargarArchivosFacturas(idContainer);
      } else {
        this.spinner.hide();
        this.ObtenerUsuario();
      }
    }).catch((err) => { this.spinner.hide(); });
  }

  public ObtenerUsuario() {
    var informacionUsuario = this.servicioUsuario.ObtenerUsuario();;
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
      ]
    };
    this.CrearContenedor(dtPaymentRequest);
  }

  public CrearContenedor(param: any) {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = { Token: token.access_token, DataJSON: JSON.stringify(param) };
    this.dataExterna.CargarArchivo(data).then((res) => {
      var result = JSON.parse(res);
      var idContainer = 0;
      this.spinner.hide();
      if (result.Estado == "OK") {
        idContainer = result.Datos.Id;
        this.CargarArchivosFacturas(idContainer);
      }
    }).catch((err) => { this.spinner.hide(); });
  }

  public CargarArchivosFacturas(contenedor:any) {

    if (this.viajeHecho == 1 && this.lstArchivos.length != 0) {
      var token = this.sesionExterna.ObtenerClaveExterna();
      var documentos: any = [];
      for (const archivo of this.lstArchivos) {
        if (archivo.Documento != "") {
          var docs = JSON.parse(archivo.Documento);
          for (const doc of docs) {

            documentos.push({
              Nombre: doc.Nombre,
              Contenido: doc.Contenido,
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
                  Valor: contenedor,
                },
                {
                  Id: environment.parametrosMFiles.AdministracionViajeTipoDocumento,
                  Valor: 1,
                },
              ],
            });
          }
        }
      }

      if (documentos.length > 0) {
        this.spinner.show();
        var data = {
          Token: token.access_token,
          DataJSON: JSON.stringify({
            IdTipoObjeto: environment.parametrosMFiles.IdTipoObjetoAdministracionViaje,
            IdClase: environment.parametrosMFiles.IdClaseAdministracionViaje,
            Documentos: documentos,
          })
        };        
        this.dataExterna.CargarArchivoMultiple(data).then((res) => {
          
          var resultado = JSON.parse(res);
          var archivos: any = [];
          if (resultado.Estado == "OK") {
            var lstArchivos = resultado.Datos;
            for (const contenedor of lstArchivos) {
              for (const archivo of contenedor.Archivos) {
                archivos.push({
                  IdArchivo: this.BuscarArchivoId(`${archivo.Nombre}.${archivo.Extension}`),
                  IdTipoObjeto: contenedor.IdTipoObjeto,
                  IdClase: contenedor.IdClase,
                  IdContenido: contenedor.Id,
                  VersionContenido: archivo.Version,
                  IdArchivoArray: archivo.Id,
                  GuidArray: archivo.Guid,
                  NombreArray: archivo.Nombre,
                  ExtensionArray: archivo.Extension,
                  VersionArray: archivo.Version,
                });
              }
            }
            this.spinner.hide();
            setTimeout(() => {
              this.ModificarArchivoInternoVarios(archivos);
            }, 1000);
          } else if (resultado.Estado == "Error") {
            this.spinner.hide();
            let mensajes = "";
            for (var item of resultado.Mensajes) {
              mensajes = `${mensajes + item} \n`;
            }
            this.global.VerMensajeError(mensajes, "error", "top-end");
            this.global.Alerta("Problema en la carga de archivos", mensajes, "error");
            return false;
          }
        }).catch((err) => {
          this.spinner.hide();
        });

      } else {
        this.GestionViaje(7, 1, 8);
      }
    } else {
      this.GestionViaje(7, 1, 8);
    }
  }

  public ModificarArchivoInternoVarios(data: any) {
    var datos = {
      DataJson: JSON.stringify(data),
    };
    this.spinner.show();
    this.dataInterna.ModificarVariosArchivos(datos).then((res) => {
      this.spinner.hide();
      for (const file of this.lstArchivos) {
        file.DocumentoEstado = 2;
      }
      this.GestionViaje(7, 1, 8);
    }).catch((err) => { this.spinner.hide() });
  }

  public BuscarArchivoId(nombre: any) {
    var id = 0;
    for (const archivo of this.lstArchivos) {
      if (archivo.Documento != "") {
        var docs = JSON.parse(archivo.Documento);
        for (const doc of docs) {
          if (doc.Nombre == nombre) {
            id = archivo.IdArchivo;
          }
        }
      }
    }
    return id;
  }
}
