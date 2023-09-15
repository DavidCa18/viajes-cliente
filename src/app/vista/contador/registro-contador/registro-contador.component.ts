import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioPlantillaCorreoDatafast } from '../../../variable/correo/plantilla-correo-datafast.service';
import { ViaticosJustificadosServicio } from "../../../controladores/liquidaciones/viaticosJustificados.service";
import { DescuentoRolServicio } from "../../../controladores/liquidaciones/descuentoRol.service";
import { ViaticosAdicionalesServicio } from "../../../controladores/liquidaciones/viaticosAdicionales.service";
import { NoViajoServicio } from "../../../controladores/liquidaciones/noViajo.service";
import Swal from "sweetalert2";

declare var $: any;
declare var moment: any;
@Component({
  selector: "app-accountant-record",
  templateUrl: "./registro-contador.component.html",
  styleUrls: ["./registro-contador.component.css"],
})
export class RegistroContadorComponent implements OnInit {

  public mensaje = "Cargando Información...";
  public rutaListadoSolicitudes = "contador/reservacion/lista";
  public modalCrearProveedor = "#modalCrearProveedor";
  public modalActualizarEmailProveedor = "#modalActualizarEmailProveedor";
  public textoInformacion = "Información";
  public textoCampoObligatorio = "Campo obligatorio";
  public textoServicioCrearDiario = "Servicio Externo Crear Diario";
  public textoServicioRegistraDiario = "Servicio Externo Registra Diario";
  public textoServicioBorrarLineaDiario = "Servicio Externo Borrar Linea Diario";
  public textoServicioBorrarDiarios = "Servicio Externo Borrar Diarios";
  public mensajeContabilizacionDatosAdicionales = "No se ha cargado por completo la información para la gestión de los Datos Adicionales <br> <b> Intente ejecutar el paso 4 nuevamente</b>";

  public proveedorGenerico = environment.proveeedorGenerico;
  urlVisualizarRide = environment.urlVisualizarRide;

  dtContabilidad: any = {
    usuario: null,
    nombre: null,
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
    codigoGrupoImpuesto: null,
    descripcionGrupoImpuesto: null,
    grupoImpuesto: null,
    grupoImpuestoArticulo: null,
    grupoImpuestoRenta: null,
    impuestoIva: null,
    sustentoTributario: null,
  };

  vlContabilidad = {
    usuario: null,
    nombre: null,
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

  fmrDetalles = {
    justificacion: 0,
    viaticos: 0,
    creditoPendiente: 0,
    diferencia: 0,
  };

  idViaje = 0;

  dtViaje: any = {
    Aprobador: { IdAprobador: 0, Identificador: 0, Nombre: "", Usuario: "" },
    Estado: { IdEstado: 0 },
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

  dtArchivo: any = {
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

  dtProveedor: any = {
    correo: null,
    direccion: null,
    identificacion: null,
    tipoIdentificacion: "Cédula",
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
  };

  frmFactura: any = {
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
    trim: 0,
  };

  dtAsientoViaje = {
    CierreDiario: "",
    CodigoDiario: "",
    IdAsientoViaje: 0,
    Identificador: 0,
    RegistroDiario: "",
    Viaje: null,
  };

  lstViaticosAvance: any = [];
  lstTipoIdentificacion: Array<string> = ["Ruc", "Cédula"];
  lstGrupoImpuestos: any = [];
  lstGrupoImpuestosFiltro: Array<{ Codigo: string; Descripcion: string }>;
  lstGrupoImpuestoElementos: any = [];
  lstGrupoImpuestoElementosFiltro: Array<{ Codigo: string; Descripcion: string; CodigoDescripcion: string; }>;
  lstGrupoImpuestosRenta: any = [];
  lstGrupoImpuestosRentaFiltro: Array<{ Codigo: string; Descripcion: string; CodigoDescripcion: string; }>;
  lstGrupoImpuestosIva: any = [];
  lstGrupoImpuestosIvaFiltro: Array<{ Codigo: string; Descripcion: string; CodigoDescripcion: string; }>;
  lstApoyoFiscal: any = [];
  lstApoyoFiscalFiltro: Array<{ Codigo: string; Descripcion: string; CodigoDescripcion: string; }>;

  lstDepartamento1: [""];
  dtDepartamento1: any;

  lstDepartamento2: [""];
  dtDepartamento2: any;

  dtCentroCosto: any;
  lstPropositos: [""];
  dtProposito: any;

  dtTipoGasto: any = "";

  lstCentroCosto: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: "" }>;
  lstCentroCostroFiltro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: ""; }>;

  lstTipoCuenta: Array<string> = ["Contabilidad"];
  editarCuenta = false;

  lstViaticos = [];
  totalViaticos = 0;

  lstCategorias = [];
  lstTiposDocumentos = [];
  lstParametros = [];
  lstTipoImpuesto = [];

  lstTipoProveedores = [
    { codigo: 1, nombre: "R.U.C" },
    { codigo: 2, nombre: "NOMBRE" },
  ];
  lstTipoFactura = [
    { codigo: 1, nombre: "ELECTRÓNICA" },
    { codigo: 2, nombre: "FÍSICA" },
  ];
  tipoFactura = 0;
  tipoProveedor = 0;
  IdArchivo = 0;
  dtDistribucionContable;
  agregarProveedor = 0;
  lstArchivoDetalles: any = [];
  idArchivoDetalle = 0;

  lstArchivoDetallesDistribucionContable = [];

  //CASO 1.1
  IdLiquidacionReembolsoCabeceraAx;
  IdLiquidacionReembolsoCreditoAx1;

  IdLiquidacionReembolsoDebitoAx;

  IdLiquidacionReembolsoCierreAx;
  IdLiquidacionReembolsoCierreAsientoAx;

  //DETALLES ADICIONALES
  IdDetalleDatoAdicionalAx;
  NumeroAsientoAdicionalAx;
  //-----------------------------------
  IdLiquidacionViaje = 0;
  IdCabeceraAnticipoAx;
  IDAnticipoReferenciaPagoAx;
  AnticipoNumeroAsientoAx;

  //CASO 1.2
  IdCabeceraLiquidacionAx2;
  IdDetalleLiquidacionCreditoAx2;
  IdDetalleDebitoLiquidacionAx;
  IdCierreLiquidacionAx2;
  IdLiquidacionDevolucionCierreAsientoAx;

  //CASO 1.3

  IDLineaProveedorCreditoDebitoAcreditacionAX;
  IdCierreAcreditacionAx;
  IdCabeceraAcreditacionAx;

  //CASO 1.4 NO VIAJO

  IdLiquidacionDevolucionCabeceraAx;
  IdLiquidacionDevolucionCreditoAx;
  IdLiquidacionDevolucionDebitoAx;
  IdLiquidacionDevolucionCierreAx;

  caso = 0;
  variableCaso = "";

  lstLiquidacionesViaje = [];
  lstArchivoLiquidacion = [];
  contadorValidacion1 = 0;
  contadorValidacion2 = 0;

  listaCR = [];
  listaCE = [];
  valdiacionPasoDetallesAdicionales = 0;

  informacionContable = {
    Archivo: null,
    BaseImponible: "",
    Descripcion: "",
    IdArchivoDetalle: 0,
    Identificador: 0,
    TipoImpuesto: "",
    Total: "",
    ValorImpuesto: "",
  };

  valDContable = "0";
  vistaContableFinal = false;
  vistaContableModificacion = true;
  contadorLineasFactura = 0;
  validaRuc = false;
  bloqueoGenerico: boolean;
  facturaElectronicaBloqueo: boolean;
  lstFacturaConceptos = [];

  public cantidadBaseCero: any = 0;
  public cantidadBaseDoce: any = 0;
  public cantidadTotalCero: any = 0;
  public cantidadTotalDoce: any = 0;

  justificacion: any;

  public bloqueoElectronica = true;

  textoValidacion: any = "";

  validarIdentificacion = false;
  validarNombre = false;
  validarCorreo = false;
  validarDireccion = false;
  validarTelefono = false;

  valorAdicionalAcreditacion: any = 0.0;
  valorTotalLiquidacion: any = 0.0;

  public liquidacionMaxima: any = 0;

  validarEditar = 0;
  valorEditar = 0;

  valorAdicional = 0;

  nombreCasoContabilidad = "";

  public gestionAsientoViajeRegistroDiario: any;

  public tmpAplicacion: any;
  public tmpNombreOrigen: any;
  public tmpEmailOrigen: any;
  public tmpTiempoEspera: any;

  visualizacionTipoImpuesto = true;

  public lstParametrosCuentaAX: any = { "CodigoCompania": "", "CuentaViaticosNoJustificados": "", "DiarioGeneral": "", "DiarioLiquidacion": "", "IdParametroCuenta": 0, "PerfilAnticipoViaticos": "" };

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly caso1: ViaticosJustificadosServicio,
    private readonly caso2: DescuentoRolServicio,
    private readonly caso3: ViaticosAdicionalesServicio,
    private readonly caso4: NoViajoServicio,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly dom: DomSanitizer,
    public global: ServicioGlobales,
  ) { }

  ngOnInit() {
    this.ObtenerDatosInicio();
  }

  public ObtenerDatosInicio() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public VerificarCreditoPendiente() {
    return Math.sign(this.fmrDetalles.creditoPendiente);
  }

  public Calculos() {
    var justificacion = 0;
    for (const invoice of this.lstArchivos) {
      justificacion += parseFloat(invoice.TotalLiquidar);
    }
    this.fmrDetalles.justificacion = Math.round(justificacion * 100) / 100;
    this.fmrDetalles.creditoPendiente =
      Math.round((this.fmrDetalles.justificacion - this.fmrDetalles.viaticos) * 100) /
      100;
  }

  public ObtenerViaje(id: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        if (this.dtViaje.SolicitudViajeReasignada == 1 && this.dtViaje.SolicitudViajeReasignadaUsuario != '') {
          var datosSesion = localStorage.getItem("k-session");
          var objetoSesion: any
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
              this.ObtenerCategoria();
            }
          }
        } else {
          this.ObtenerCategoria();
        }
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error al obtener "Viaje"',
          html: "No se pudo cargar la informaciòn del viaje, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerCategoria() {
    this.dataInterna
      .ObtenerCategoria()
      .then((res) => {
        this.lstCategorias = res;
        this.ObtenerTipoDocumento();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerTipoDocumento() {
    this.dataInterna
      .ObtenerTipoDocumento()
      .then((res) => {
        this.lstTiposDocumentos = res;
        this.obtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public obtenerParametros() {
    this.dataInterna.ObtenerParametro()
      .then((res) => {
        this.lstParametros = res;
        this.ObtenerImpuesto();
      })
      .catch((err) => {
        console.log(err);
        this.spinner.hide();
      });
  }

  public ObtenerImpuesto() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerImpuesto(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.lstTipoImpuesto = res;
        this.ObtenerArchivo();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error al obtener "Tipo Impuesto"',
          html: "No se pudo cargar el tipo de impuesto, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerArchivo() {
    this.dataInterna
      .ObtenerArchivo(this.idViaje)
      .then((res) => {
        this.lstArchivos = res;
        var valor = 0;
        if (res.length > 0) {
          for (const item of res) {
            valor = valor + parseFloat(item.TotalLiquidar);
          }
        }

        this.liquidacionMaxima = this.global.FormatearNumero(valor, 2);

        this.ObtenerAsientoViaje();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerAsientoViaje() {
    this.dataInterna
      .ObtenerAsientoViaje(this.idViaje)
      .then((res) => {
        this.dtAsientoViaje = res;
        this.IDAnticipoReferenciaPagoAx = res.IDAnticipoReferenciaPagoAx;
        this.AnticipoNumeroAsientoAx = res.AnticipoNumeroAsientoAx;
        this.IdCabeceraAnticipoAx = res.CodigoDiario;
        var tempSeatTravel = JSON.parse(res.RegistroDiario);
        this.lstViaticosAvance = JSON.parse(`[${tempSeatTravel.Datos}]`);
        this.ObtenerViatico();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerViatico() {
    this.dataInterna
      .ObtenerViatico(this.idViaje)
      .then((res) => {
        this.lstViaticos = res;
        var tmpViatics: any = this.lstViaticos.find((e: any) => e.Tipo == "Total");
        this.totalViaticos = parseFloat(tmpViatics.Valor);
        this.fmrDetalles.viaticos = parseFloat(tmpViatics.Valor);
        this.Calculos();

        this.ObtenerGrupoImpuestos();

        if (
          isNaN(this.dtViaje.RealizoViaje) ||
          this.dtViaje.RealizoViaje == 2
        ) {
          this.valorTotalLiquidacion = this.fmrDetalles.viaticos;
        }

        this.VerificarCantidadAdicionalAcreditacion();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public CambioEditacionContabilidad() {
    if (this.editarCuenta) {
      this.editarCuenta = false;
    } else {
      this.editarCuenta = true;
    }
  }

  public ObtenerDepartamento() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerDepartamento(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
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

        if (this.editarCuenta) {
          this.dtCentroCosto = [];
          this.dtProposito = [];
          this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
        } else {
          this.dtContabilidad.tipoContabilidad = this.dtViaje.TipoCuentaViaje;
          var tmpDepartament1 = JSON.parse(this.dtViaje.DepartamentoUnoViaje);
          this.dtDepartamento1 = tmpDepartament1;
          this.dtContabilidad.departamento1Codigo = tmpDepartament1.Codigo;

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
        Swal.fire({
          title: 'Error al obtener "Obtener Departamento"',
          html: "No se pudo cargar los departamentos, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerCentroCosto(idDepartament: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerCentroCosto(
        token,
        idDepartament,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.lstCentroCosto = res;
        this.lstCentroCostroFiltro = this.lstCentroCosto.slice();

        if (this.editarCuenta) {
          console.log(this.editarCuenta);
        } else {
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
        Swal.fire({
          title: 'Error al obtener "Centro de Costos"',
          html: "No se pudo cargar el centro de costos, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerProposito(idDepartament: any, idCostCenter: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerProposito(
        token,
        idDepartament,
        idCostCenter,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.lstPropositos = res;

        if (this.editarCuenta) {
          this.dtTipoGasto = this.dtViaje.TipoGastoViaje;
        } else {
          var tmpPurpose = JSON.parse(this.dtViaje.PropositoViaje);
          this.dtProposito = tmpPurpose;
          this.dtProposito.Codigo = tmpPurpose.Codigo;

          this.dtTipoGasto = this.dtViaje.TipoGastoViaje;
        }

        this.ValidacionDistribucionContable(1, 0);
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error al obtener "Propósito"',
          html: "No se pudo cargar el propósito, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
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
    this.dtCentroCosto = [];
    this.dtProposito = [];
    this.ObtenerCentroCosto(this.dtDepartamento2.Codigo);
  }

  public ColocarCentroCosto() {
    this.dtContabilidad.costoCentro = this.dtCentroCosto;
    this.dtContabilidad.costoCentroCodigoDescripcion =
      this.dtCentroCosto.CodigoDescripcion;
    this.dtContabilidad.costoCentroCodigo = this.dtCentroCosto.Codigo;
    this.dtProposito = [];
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
        console.log(err);
      });
  }

  public FiltrarCentroCosto(value: any) {
    this.lstCentroCostroFiltro = this.lstCentroCosto.filter(
      (s) =>
        s.CodigoDescripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  public ValidacionDistribucionContable(identificador: any, idArchivo: any) {
    this.dataInterna
      .ValidacionDistribucionContable(identificador, this.idViaje, idArchivo)
      .then((res) => {
        this.spinner.hide();
        this.valDContable = res;

        if (this.valDContable == "0") {
          this.vistaContableFinal = false;
        } else {
          this.vistaContableFinal = true;
        }

        if (identificador == 1) {
          this.VerificarCasoLiquidacion();
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerImagen() {
    var files = $("#Archivo").prop("files");
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        var base64Large: any = reader.result;
        var base64 = base64Large.split(",");

        var tmpFile = [
          {
            Nombre: files[0].nombre,
            Contenido: base64[1],
          },
        ];
        this.dtArchivo.Titulo = files[0].nombre;
        this.dtArchivo.Documentos = tmpFile;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  }

  public DescargarArchivo(param: any) {

    var token = this.sesionExterna.ObtenerClaveExterna();
    if (param.TipoFactura == 1) {
      window.open(this.urlVisualizarRide + param.Autorizacion, "_blank");
    } else {
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
          console.log(err);
        });
    }
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

  public ConvertirArchivoUrl(url: any) {
    return this.dom.bypassSecurityTrustUrl(url);
  }

  //ABRE UN MODAL Y BLOQUEA EL CONTENIDO EXTERNO
  public BloquearPantalla(modal: any) {
    $(modal).modal({ backdrop: "static", keyboard: false });
  }

  public CambiarTipoId() {
    this.dtProveedor.identificacion = "";
  }

  public GuadarProveedor() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var tipoId;
    if (this.dtProveedor.tipoIdentificacion == "Cédula") {
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
          Swal.fire({
            title: "Registrar Proveedor",
            html: "" + resultado.Mensajes,
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          });
        }

        if (resultado.Estado == "OK") {
          this.frmFiltroProveedor.identificacion =
            this.dtProveedor.identificacion;
          this.frmFiltroProveedor.nombre = this.dtProveedor.nombre;

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
        console.log(err);
      });
  }

  public ObtenerGrupoImpuestos() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerGrupoImpuestos(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.lstGrupoImpuestos = res;
        this.lstGrupoImpuestosFiltro = this.lstGrupoImpuestos.slice();

        this.ObtenerArticulosGrupoImpuestos();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error al obtener "Grupo Impuestos"',
          html: "No se pudo cargar el grupo de impuestos, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerArticulosGrupoImpuestos() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerArticulosGrupoImpuestos(
        token,
        this.dtViaje.Registrador.CodigoEmpresa
      )
      .then((res) => {
        this.lstGrupoImpuestoElementos = res;
        this.lstGrupoImpuestoElementosFiltro = this.lstGrupoImpuestoElementos.slice();
        this.ObtenerDepartamento();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error al obtener "Artículos Grupo Impuesto"',
          html: "No se pudo cargar los artículos grupo impuestos, si el problema persiste por favor comuníquese con el administrador del sistema",
          type: "info",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
        console.log(err);
      });
  }

  public ObtenerGrupoImpuestoRenta() {
    this.lstGrupoImpuestosRenta = [];
    this.lstGrupoImpuestosIva = [];

    var tempGrupoImpuestoArticulo: any = this.dtContabilidad.grupoImpuestoArticulo;
    this.dtContabilidad.grupoImpuestoRenta = null;
    this.dtContabilidad.impuestoIva = null;
    this.dtContabilidad.sustentoTributario = { Codigo: "", Descripcion: "" };

    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerGrupoImpuestoRenta(
        token,
        this.dtViaje.Registrador.CodigoEmpresa,
        tempGrupoImpuestoArticulo.Codigo
      )
      .then((res) => {
        this.spinner.hide();
        this.lstGrupoImpuestosRenta = res;
        this.lstGrupoImpuestosRentaFiltro = this.lstGrupoImpuestosRenta.slice();
        this.ObtenerGrupoImpuestoIva();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerGrupoImpuestoIva() {
    var tempGrupoImpuestoArticulo: any = this.dtContabilidad.grupoImpuestoArticulo;
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerGrupoImpuestoIvaAdicional(
        token,
        this.dtViaje.Registrador.CodigoEmpresa,
        tempGrupoImpuestoArticulo.Codigo
      )
      .then((res) => {
        var aux: any = "";
        aux = JSON.parse(res);

        if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          this.global.Alerta(this.textoInformacion, mensajes, "info");
          this.lstGrupoImpuestosIva = [];
          this.lstGrupoImpuestosIvaFiltro = this.lstGrupoImpuestosIva.slice();
        } else {
          this.lstGrupoImpuestosIva = aux.Datos;
          this.lstGrupoImpuestosIvaFiltro = this.lstGrupoImpuestosIva.slice();
        }

        this.spinner.hide();
        this.ObtenerSustentoTributario();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
        this.lstGrupoImpuestosIva = [];
        this.ObtenerSustentoTributario();
      });
  }

  public ObtenerSustentoTributario() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.spinner.show();
    this.dataExterna
      .ObtenerSustentoTributario(token, this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.spinner.hide();
        this.lstApoyoFiscal = res;
        this.lstApoyoFiscalFiltro = this.lstApoyoFiscal.slice();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public FiltrarGrupoImpuestos(value: any) {
    this.lstGrupoImpuestosFiltro = this.lstGrupoImpuestos.filter(
      (s) => s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  public ObtenerInformacionFactura(data: any) {
    this.IdArchivo = data.IdArchivo;
    this.tipoFactura = parseInt(data.TipoFactura);
    this.frmFactura.categorias = data.Categorias.Codigo;
    this.frmFactura.TipoDocumento = data.TipoDocumento.Codigo;

    var tempDatosProveedor = JSON.parse(data.DatosProveedor);
    this.tipoProveedor = 1;
    this.frmFiltroProveedor.identificacion = tempDatosProveedor.Identificacion;
    this.frmFiltroProveedor.nombre =
      tempDatosProveedor.RazonSocial == null
        ? tempDatosProveedor.Nombre
        : tempDatosProveedor.RazonSocial;
    this.dtProovedor.Identificacion = tempDatosProveedor.Identificacion;
    this.dtProovedor.Nombre =
      tempDatosProveedor.RazonSocial == null
        ? tempDatosProveedor.Nombre
        : tempDatosProveedor.RazonSocial;
    this.dtProveedor.identificacion = tempDatosProveedor.Identificacion;
    this.dtProveedor.nombre =
      tempDatosProveedor.RazonSocial == null
        ? tempDatosProveedor.Nombre
        : tempDatosProveedor.RazonSocial;
    this.frmFactura.numeroFactura = data.NumeroFactura;
    this.frmFactura.fechaEmision = data.FechaEmision;
    this.frmFactura.numeroAutorizacion = data.Autorizacion;
    this.frmFactura.fechaVencimiento = data.FechaVencimiento;

    this.frmFactura.concepto = data.Concepto;

    this.frmFactura.subtotal = data.SubtotalFactura;
    this.frmFactura.tipoImpuesto = JSON.parse(data.TipoImpuestoFactura);
    this.frmFactura.impuesto = data.ImpuestoFactura;
    this.frmFactura.total = data.TotalFactura;
    this.frmFactura.valorAdicional = data.ValorAdicional;
    this.frmFactura.liquidacionTotal = data.TotalLiquidar;
    this.frmFactura.ciudad = data.Ciudad;

    this.frmFactura.trim = data.ValorRecortar;

    this.cantidadBaseCero = 0;
    this.cantidadBaseDoce = 0;
    this.cantidadTotalCero = 0;
    this.cantidadTotalDoce = 0;

    if (data.TipoFactura == 1) {
      this.bloqueoElectronica = true;
    } else {
      this.bloqueoElectronica = false;
    }

    this.validarEditar = 1;
    this.valorEditar = parseFloat(data.TotalLiquidar);

    $("#exampleModalCenter").modal("toggle");
    this.ListarFacturaDetalle();
  }

  public ListarFacturaDetalle() {
    this.spinner.show();
    this.dataInterna
      .ListarFacturaDetalle(this.IdArchivo)
      .then((res) => {
        this.spinner.hide();
        this.lstArchivoDetalles = res;
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public AgregarDistribucionContable(concepto: any) {
    this.informacionContable = concepto;
    this.idArchivoDetalle = concepto.IdArchivoDetalle;
    this.ObtenerGestionDistribucionContable();

    $("#DistribucionContableModal").modal("toggle");
  }

  public ObtenerGestionDistribucionContable() {
    this.spinner.show();
    this.dataInterna
      .ObtenerGestionDistribucionContable(this.idArchivoDetalle)
      .then((res) => {
        this.spinner.hide();

        this.dtDistribucionContable = res;
        if (this.dtDistribucionContable.IdDistribucionContable != 0) {
          this.dtContabilidad.grupoImpuesto = JSON.parse(
            this.dtDistribucionContable.GrupoImpuesto
          );
          this.dtContabilidad.grupoImpuestoArticulo = JSON.parse(
            this.dtDistribucionContable.GrupoImpuestoArticulo
          );
          this.ObtenerGrupoImpuestoRenta();
          this.dtContabilidad.grupoImpuestoRenta = JSON.parse(
            this.dtDistribucionContable.ImpuestoRenta
          );
          this.dtContabilidad.impuestoIva = JSON.parse(
            this.dtDistribucionContable.ImpuestoIva
          );
          this.dtContabilidad.sustentoTributario = JSON.parse(
            this.dtDistribucionContable.SustentoTributario
          );
        } else {
          this.dtContabilidad.grupoImpuesto = null;
          this.dtContabilidad.grupoImpuestoArticulo = null;
          this.dtContabilidad.grupoImpuestoRenta = null;
          this.dtContabilidad.impuestoIva = null;
          this.dtContabilidad.sustentoTributario = null;
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public CalcularValores() {
    var tmpParameter: any = this.lstParametros.find((e: any) => e.NombreParametro == "ValorSubtotal");
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

  public RecortarValor() {
    if (this.frmFactura.trim == 0) {
      this.CalcularConceptoLineaTotal();
    } else {
      this.CalcularConceptoLineaTotal();
      var total =
        parseFloat(this.frmFactura.liquidacionTotal) - this.frmFactura.trim;
      this.frmFactura.total = this.global.FormatearNumero(total, 2);
    }

    this.CalcularValores();
  }

  public GestionDistribucionContable() {
    var data = {
      Identificador: 1,
      IdDistribucionContable: 0,
      GrupoImpuesto: JSON.stringify(this.dtContabilidad.grupoImpuesto),
      GrupoImpuestoArticulo: JSON.stringify(this.dtContabilidad.grupoImpuestoArticulo),
      ImpuestoRenta: JSON.stringify(this.dtContabilidad.grupoImpuestoRenta),
      ImpuestoIva: JSON.stringify(this.dtContabilidad.impuestoIva),
      SustentoTributario: JSON.stringify(this.dtContabilidad.sustentoTributario),
      Archivo: {
        IdArchivo: this.idArchivoDetalle,
        Viaje: {
          IdViaje: this.dtViaje.IdViaje
        }
      },
    };
    this.spinner.show();
    this.dataInterna
      .GestionDistribucionContable(data)
      .then((res) => {
        this.spinner.hide();

        $("#DistribucionContableModal").modal("toggle");
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public CambiarCategoria() {
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

  public GestionArchivo() {
    if (this.frmFactura.categorias == null) {
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
        "Debe seleccionar la fecha de emisión de la factura.",
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
    } else if (this.lstArchivoDetalles.length == 0) {
      this.global.MostrarNotificacion(
        "Debe ingresar por lo menos un concepto en la sección <b>&nbsp;Detalle Factura</b>",
        "info",
        "top-end"
      );
    } else {
      if (this.frmFactura.TipoDocumento == "03") {
        this.dtProovedor = {
          Bloqueado: 0,
          Correo: null,
          Direccion: null,
          EsExtranjero: null,
          Grupo: null,
          Identificacion: this.proveedorGenerico.Identificacion,
          Nombre: this.proveedorGenerico.Nombre,
          RazonSocial: this.proveedorGenerico.RazonSocial,
          RegionPais: "Ecuador",
          Telefono: this.proveedorGenerico.Telefono,
          TipoIdentificacion: this.proveedorGenerico.TipoIdentificacion,
        };
      }

      var data = {
        Identificador: 2,
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
        Concepto: this.frmFactura.concepto,
        Ciudad: this.frmFactura.ciudad,
        TotalFactura: this.frmFactura.total,
        ValorAdicional: this.frmFactura.valorAdicional,
        TotalLiquidar: this.frmFactura.liquidacionTotal,
        SubtotalFactura: this.frmFactura.subtotal,
        ImpuestoFactura: this.frmFactura.impuesto,
        TipoImpuestoFactura: JSON.stringify(this.frmFactura.tipoImpuesto),
        ValorRecortar: this.frmFactura.trim,
        Documento: "",
        DocumentoEstado: this.tipoFactura == 1 ? 2 : 1,
      };

      this.spinner.show();
      this.dataInterna
        .GestionArchivo(data)
        .then((res) => {
          this.spinner.hide();
          this.GuardarFacturaDetalle();
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }
  }

  public GuardarFacturaDetalle() {
    for (const concepto of this.lstArchivoDetalles) {
      var datos = {
        Identificador: 0,
        IdArchivoDetalle: concepto.IdArchivoDetalle,
        Descripcion: concepto.Descripcion,
        BaseImponible: concepto.BaseImponible,
        TipoImpuesto: concepto.TipoImpuesto,
        ValorImpuesto: concepto.ValorImpuesto,
        Total: concepto.Total,
      };

      this.spinner.show();
      this.dataInterna
        .ModificarFacturaDetalle(datos)
        .then((res) => {
          this.spinner.hide();
          this.global.VerMensajeError(
            "Detalle Modificado exitosamente",
            "success",
            "top-end"
          );
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }

    $("#exampleModalCenter").modal("toggle");
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      location.reload();
    }, 100);
  }

  public CalcularConceptoLinea(id: any) {
    var total: any = null;
    for (const concepto of this.lstArchivoDetalles) {
      if (concepto.IdArchivoDetalle == id) {
        this.idArchivoDetalle = concepto.IdArchivoDetalle;
        concepto.ValorImpuesto = this.global.FormatearNumero(
          Math.round(
            ((parseFloat(concepto.BaseImponible) *
              parseFloat(concepto.TipoImpuesto)) /
              100) *
            100
          ) / 100,
          2
        );
        concepto.Total = this.global.FormatearNumero(
          Math.round(
            (parseFloat(concepto.BaseImponible) +
              parseFloat(concepto.ValorImpuesto)) *
            100
          ) / 100,
          2
        );
      }
      total += Math.round(concepto.Total * 100) / 100;
    }

    this.frmFactura.total = this.global.FormatearNumero(
      Math.round(parseFloat(total) * 100) / 100,
      2
    );
    this.CalcularValores();
  }

  public CalcularConceptoLineaTotal() {
    var total: any = null;
    for (const concepto of this.lstArchivoDetalles) {
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
      total += Math.round(concepto.Total * 100) / 100;
    }
    this.frmFactura.total = this.global.FormatearNumero(
      Math.round(parseFloat(total) * 100) / 100,
      2
    );
    this.CalcularValores();
  }

  public VerificarCasoLiquidacion() {
    this.ObtenerCuentasDiariosAX();
    if (this.dtViaje.RealizoViaje == 2) {
      this.caso = 4;
      this.variableCaso = "L_NORMAL_NOVIAJO";
      this.ListarProcesoLiquidacion("L_NORMAL_NOVIAJO");
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 1 && this.global.NumeroNeutral(this.fmrDetalles.creditoPendiente)) {
      this.caso = 1;
      this.variableCaso = "L_NORMAL";
      this.ListarProcesoLiquidacion("L_NORMAL");
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 1 && this.global.NumeroNegativo(this.fmrDetalles.creditoPendiente)) {
      this.caso = 2;
      this.variableCaso = "L_CASO2";
      this.ListarProcesoLiquidacion("L_CASO2");
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 2 && this.global.NumeroNeutral(this.fmrDetalles.creditoPendiente)) {
      this.caso = 1;
      this.variableCaso = "L_NORMAL";
      this.ListarProcesoLiquidacion("L_NORMAL");
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 2 && this.global.NumeroNegativo(this.fmrDetalles.creditoPendiente)) {
      this.caso = 2;
      this.variableCaso = "L_CASO2";
      this.ListarProcesoLiquidacion("L_CASO2");
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 2 && this.global.NumeroPositivo(this.fmrDetalles.creditoPendiente)) {
      this.caso = 3;
      this.variableCaso = "L_CASO3";
      this.ListarProcesoLiquidacion("L_CASO3");
    }
  }

  public ListarProcesoLiquidacion(identificador: any) {

    console.log('CASO CONTABLE');
    console.log(identificador);

    this.dataInterna.ObtenerLiquidacionesViaje(this.dtViaje.IdViaje, identificador).then((res) => {
      this.lstLiquidacionesViaje = res;
      var temp1: any;
      var temp2: any;
      var temp3: any;
      var temp4: any;
      var temp5: any;
      var lstFacDetalle = [];
      var lstFactura = [];
      if (identificador == "L_NORMAL_NOVIAJO") {

        this.nombreCasoContabilidad = "L_NORMAL_NOVIAJO";

        temp1 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionDevolucionCabeceraAx");
        temp2 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionDevolucionCreditoAx");
        temp3 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionDevolucionDebitoAx");
        temp4 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionDevolucionCierreAx");

        this.IdLiquidacionDevolucionCabeceraAx = temp1 == undefined ? undefined : temp1.Valor;

        if (this.IdLiquidacionDevolucionCabeceraAx != undefined) {
          this.vistaContableModificacion = false;
        } else {
          this.vistaContableModificacion = true;
        }

        this.IdLiquidacionDevolucionCreditoAx = temp2 == undefined ? undefined : temp2.Valor;
        this.IdLiquidacionDevolucionDebitoAx = temp3 == undefined ? undefined : temp3.Valor;
        this.IdLiquidacionDevolucionCierreAx = temp4 == undefined ? undefined : temp4.Valor;

      } else if (identificador == "L_NORMAL") {
        this.nombreCasoContabilidad = "L_NORMAL";

        if (this.lstLiquidacionesViaje.length != 0) {
          temp1 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCabeceraAx");
          temp2 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCreditoAx1");
          lstFacDetalle = [];
          lstFactura = [];

          this.IdLiquidacionReembolsoCabeceraAx = temp1 == undefined ? undefined : temp1.Valor;

          if (this.IdLiquidacionReembolsoCabeceraAx != undefined) {
            this.vistaContableModificacion = false;
          } else {
            this.vistaContableModificacion = true;
          }

          this.IdLiquidacionReembolsoCreditoAx1 = temp2 == undefined ? undefined : temp2.Valor;

          for (const fact of this.lstLiquidacionesViaje) {
            if (fact.Lista == 1) {
              lstFacDetalle.push(fact);
            } else if (fact.Lista == 2) {
              lstFactura.push(fact);
              this.valdiacionPasoDetallesAdicionales = 1;
            }
          }

          this.dataInterna.ObtenerListadoArchivoDetalleDistribucionContable(this.dtViaje.IdViaje).then((resp) => {

            for (const detalle of lstFacDetalle) {
              resp = resp.filter(function (i) {
                return i.ArchivoDetalle.IdArchivoDetalle != detalle.ListaValor;
              });
            }

            this.lstArchivoDetallesDistribucionContable = resp;

            temp3 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAx");
            this.IdLiquidacionReembolsoCierreAx = temp3 == undefined ? undefined : temp3.Valor;

            temp4 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAsientoAx");
            this.IdLiquidacionReembolsoCierreAsientoAx = temp4 == undefined ? undefined : temp4.Valor;

            temp5 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "NumeroAsientoAdicionalAx");
            this.NumeroAsientoAdicionalAx = temp5 == undefined ? undefined : temp5.Valor;

            this.dataInterna.ObtenerArchivo(this.dtViaje.IdViaje).then((resp) => {
              this.listaCR = resp;
              this.listaCE = resp;
              for (const factura of lstFactura) {
                this.listaCR = this.listaCR.filter(function (i) {
                  return i.IdArchivo + "-CR" != factura.ListaValor;
                });
                this.listaCE = this.listaCE.filter(function (i) {
                  return i.IdArchivo + "-CE" != factura.ListaValor;
                });
              }
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
            this.spinner.hide();
          });
        }
      } else if (identificador == "L_CASO2") {
        this.nombreCasoContabilidad = "L_CASO2";

        if (this.lstLiquidacionesViaje.length != 0) {
          temp1 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCabeceraAx");
          temp2 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCreditoAx1");
          lstFacDetalle = [];
          lstFactura = [];

          this.IdLiquidacionReembolsoCabeceraAx = temp1 == undefined ? undefined : temp1.Valor;

          if (this.IdLiquidacionReembolsoCabeceraAx != undefined) {
            this.vistaContableModificacion = false;
          } else {
            this.vistaContableModificacion = true;
          }

          this.IdLiquidacionReembolsoCreditoAx1 = temp2 == undefined ? undefined : temp2.Valor;

          for (const fact of this.lstLiquidacionesViaje) {
            if (fact.Lista == 1) {
              lstFacDetalle.push(fact);
            } else if (fact.Lista == 2) {
              lstFactura.push(fact);
              this.valdiacionPasoDetallesAdicionales = 1;
            }
          }

          this.dataInterna
            .ObtenerListadoArchivoDetalleDistribucionContable(
              this.dtViaje.IdViaje
            )
            .then((resp) => {

              for (const detalle of lstFacDetalle) {
                resp = resp.filter(function (i) {
                  return i.ArchivoDetalle.IdArchivoDetalle != detalle.ListaValor;
                });
              }

              this.lstArchivoDetallesDistribucionContable = resp;

              temp3 = this.lstLiquidacionesViaje.find(
                (e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAx"
              );
              this.IdLiquidacionReembolsoCierreAx =
                temp3 == undefined ? undefined : temp3.Valor;

              temp4 = this.lstLiquidacionesViaje.find(
                (e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAsientoAx"
              );
              this.IdLiquidacionReembolsoCierreAsientoAx =
                temp4 == undefined ? undefined : temp4.Valor;

              temp5 = this.lstLiquidacionesViaje.find(
                (e: any) => e.Tipo == "NumeroAsientoAdicionalAx"
              );
              this.NumeroAsientoAdicionalAx =
                temp5 == undefined ? undefined : temp5.Valor;
              this.dataInterna
                .ObtenerArchivo(this.dtViaje.IdViaje)
                .then((_resp) => {
                  this.listaCR = _resp;
                  this.listaCE = _resp;
                  for (const factura of lstFactura) {
                    this.listaCR = this.listaCR.filter(function (i) {
                      return i.IdArchivo + "-CR" != factura.ListaValor;
                    });
                    this.listaCE = this.listaCE.filter(function (i) {
                      return i.IdArchivo + "-CE" != factura.ListaValor;
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              this.spinner.hide();
            });

          var temp6: any = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdCierreLiquidacionAx2");
          this.IdCierreLiquidacionAx2 = temp6 == undefined ? undefined : temp6.Valor;
        }
      } else if (identificador == "L_CASO3") {

        this.nombreCasoContabilidad = 'L_CASO3';

        if (this.lstLiquidacionesViaje.length != 0) {

          var temp1: any = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCabeceraAx");
          var temp2: any = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCreditoAx1");
          var lstFacDetalle = [];
          var lstFactura = [];

          this.IdLiquidacionReembolsoCabeceraAx = temp1 == undefined ? undefined : temp1.Valor;

          if (this.IdLiquidacionReembolsoCabeceraAx != undefined) {
            this.vistaContableModificacion = false;
          } else {
            this.vistaContableModificacion = true;
          }

          this.IdLiquidacionReembolsoCreditoAx1 = temp2 == undefined ? undefined : temp2.Valor;

          for (const fact of this.lstLiquidacionesViaje) {
            if (fact.Lista == 1) {
              lstFacDetalle.push(fact);
            } else if (fact.Lista == 2) {
              lstFactura.push(fact);
              this.valdiacionPasoDetallesAdicionales = 1;
            }
          }

          this.dataInterna.ObtenerListadoArchivoDetalleDistribucionContable(this.dtViaje.IdViaje).then((resp) => {

            for (const detalle of lstFacDetalle) {
              resp = resp.filter(function (i) {
                return i.ArchivoDetalle.IdArchivoDetalle != detalle.ListaValor;
              });
            }

            this.lstArchivoDetallesDistribucionContable = resp;

            temp3 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAx");
            this.IdLiquidacionReembolsoCierreAx = temp3 == undefined ? undefined : temp3.Valor;

            temp4 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdLiquidacionReembolsoCierreAsientoAx");
            this.IdLiquidacionReembolsoCierreAsientoAx = temp4 == undefined ? undefined : temp4.Valor;

            temp5 = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "NumeroAsientoAdicionalAx");
            this.NumeroAsientoAdicionalAx = temp5 == undefined ? undefined : temp5.Valor;

            this.dataInterna.ObtenerArchivo(this.dtViaje.IdViaje).then((response) => {
              this.listaCR = response;
              this.listaCE = response;
              for (const factura of lstFactura) {
                this.listaCR = this.listaCR.filter(function (i) {
                  return i.IdArchivo + "-CR" != factura.ListaValor;
                });
                this.listaCE = this.listaCE.filter(function (i) {
                  return i.IdArchivo + "-CE" != factura.ListaValor;
                });
              }
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
            this.spinner.hide();
          });

          var temp7: any = this.lstLiquidacionesViaje.find((e: any) => e.Tipo == "IdCierreAcreditacionAx");
          this.IdCierreAcreditacionAx = temp7 == undefined ? undefined : temp7.Valor;
        }
      }
    }).catch((err) => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public GenerarVectorDinamico() {
    this.lstArchivoDetalles.push({
      Id: this.lstArchivoDetalles.length + 1,
      Descripcion: "",
      BaseImponible: "",
      TipoImpuesto: 0,
      ValorImpuesto: 0,
      Total: 0,
    });

    var sentencia = `('','','0','0','0','${this.IdArchivo}')`;

    this.spinner.show();
    this.dataInterna
      .GestionFacturaDetalle(sentencia)
      .then((res) => {
        this.spinner.hide();
        this.ListarFacturaDetalle();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public EliminarConcepto(id: any) {

    Swal.fire({
      title: 'Eliminación de Registro',
      html: "Asegúrese de <b style='color:darkred'>Guardar</b> el cambio de la factura después de eliminar este registro, Para que se realice los cálculos adecuadamente.",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.value) {
        var eliminarMarcadorVector = function (lista) {
          var items: any = [];
          lista.map((e: any) => {
            items.push(e.IdArchivoDetalle);
          });
          var posicion = items.indexOf(id);
          if (posicion > -1) {
            lista.splice(posicion, 1);
          }
        };

        eliminarMarcadorVector(this.lstArchivoDetalles);
        this.spinner.show();
        this.dataInterna.EliminarFacturaDetalle(id).then((res) => {
          this.spinner.hide();
          this.global.VerMensajeError("Detalle Eliminado exitosamente", "success", "top-end");
          this.CalcularConceptoLinea(id);
        }).catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
      }
    });

  }

  //CASO 1.1
  public ValidarEstadoSolicitudViaje() {
    this.dataInterna.VerificarEstadoSolicitud(this.dtViaje.IdViaje).then((res) => {
      if (res == 7) {
        this.DatosCabecera();
      } else {
        this.global.VerAlerta(this.textoInformacion, "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha finalizado este proceso en otra instancia del sistema", "info");
        this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
      }
    }).catch((err) => { console.log(err) });
  }

  public DatosCabecera() {
    console.log("entrada 1");
    this.spinner.show();
    this.caso1
      .DatosCabecera(this.dtViaje, this.IDAnticipoReferenciaPagoAx, this.lstParametrosCuentaAX.DiarioLiquidacion, this.lstParametrosCuentaAX.PerfilAnticipoViaticos)
      .then((res) => {
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          console.log("entrada 2 - OK", aux);
          this.IdLiquidacionReembolsoCabeceraAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdLiquidacionReembolsoCabeceraAx",
            this.IdLiquidacionReembolsoCabeceraAx,
            this.variableCaso
          );
          this.LineaProveedorFactura();
        } else if (aux.Estado == "Error") {
          console.log("entrada 2 - Error", aux);
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          this.spinner.hide();
          Swal.fire({
            title: this.textoServicioCrearDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((resp) => {
            if (resp.value) {
              this.windowLocationReload();
            }
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaProveedorFactura() {
    this.spinner.show();
    console.log("entrada 3");
    this.caso1
      .LineaProveedorFactura(
        this.dtViaje,
        this.fmrDetalles.justificacion,
        this.IdLiquidacionReembolsoCabeceraAx,
        this.IDAnticipoReferenciaPagoAx,
        this.lstParametrosCuentaAX.DiarioLiquidacion,
        this.lstParametrosCuentaAX.PerfilAnticipoViaticos
      )
      .then((res) => {
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          console.log("entrada 4 - OK", aux);
          this.IdLiquidacionReembolsoCreditoAx1 = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdLiquidacionReembolsoCreditoAx1",
            this.IdLiquidacionReembolsoCreditoAx1,
            this.variableCaso
          );
          if (
            this.IdLiquidacionReembolsoCabeceraAx != undefined &&
            this.IdLiquidacionReembolsoCreditoAx1 != undefined
          ) {
            this.DistribucionContable();
          } else {
            setTimeout(() => {
              this.VerificarCasoLiquidacion();
            }, 1000);
          }
          setTimeout(() => {
            this.VerificarCasoLiquidacion();
          }, 1000);
        } else {
          console.log("entrada 4 - Error", aux);
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          this.spinner.hide();
          Swal.fire({
            title: "Servicio Linea Proveedor Factura",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public DistribucionContable() {
    console.log('entrada 5');
    this.spinner.show();
    this.dataInterna
      .ObtenerListadoArchivoDetalleDistribucionContable(this.dtViaje.IdViaje)
      .then((res) => {
        if (res.length != 0) {
          this.lstArchivoDetallesDistribucionContable = res;
        }

        this.contadorValidacion1 = 0;
        var token = this.sesionExterna.ObtenerClaveExterna();
        var arregloDatos: any = [];
        for (const detalle of this.lstArchivoDetallesDistribucionContable) {
          var proveedor = JSON.parse(detalle.Archivo.DatosProveedor);
          var jsonIdGrupoImpuesto = JSON.parse(detalle.GrupoImpuesto);
          var IdGrupoImpuesto = jsonIdGrupoImpuesto.Codigo;
          var jsonIdGrupoImpuestoArticulo = JSON.parse(
            detalle.GrupoImpuestoArticulo
          );
          var IdGrupoImpuestoArticulo = jsonIdGrupoImpuestoArticulo.Codigo;
          var jsonIdSustentoTributario = JSON.parse(detalle.SustentoTributario);
          var IdSustentoTributario = jsonIdSustentoTributario.Codigo;
          var jsonIdImpuestoRenta = JSON.parse(detalle.ImpuestoRenta);
          var IdImpuestoRenta = jsonIdImpuestoRenta.Codigo;
          var jsonIdImpuestoIva =
            detalle.ImpuestoIva == "null"
              ? ""
              : JSON.parse(detalle.ImpuestoIva);

          var IdImpuestoIva: any;

          if (jsonIdImpuestoIva != "") {
            IdImpuestoIva = jsonIdImpuestoIva.Codigo;
          } else {
            IdImpuestoIva = " ";
          }
          var CuentaContableTipoGasto;

          var textoCategoria = detalle.Archivo.Categorias.Nombre;
          if (this.dtViaje.TipoGastoViaje == "ADMINISTRATIVO") {
            CuentaContableTipoGasto = 56021108;
          } else {
            CuentaContableTipoGasto = 560515;
          }
          var jsonDepartamentoDosViaje = JSON.parse(
            this.dtViaje.DepartamentoDosViaje
          );
          var departamento = jsonDepartamentoDosViaje.Codigo;
          var jsonCentoCostos = JSON.parse(this.dtViaje.CentroCostoViaje);
          var centroCostos = jsonCentoCostos.Codigo;
          var jsonPropositoViaje = JSON.parse(this.dtViaje.PropositoViaje);
          var propositoViaje = jsonPropositoViaje.Codigo;
          var parametros = this.dtViaje.Registrador.CodigoEmpresa + "|" +
            this.dtViaje.TipoCuentaViaje + "|" +
            this.IdLiquidacionReembolsoCabeceraAx + "|" +
            CuentaContableTipoGasto + "|" +
            IdGrupoImpuesto + "|" +
            IdGrupoImpuestoArticulo + "|" +
            IdSustentoTributario + "|" +
            IdImpuestoRenta + "|" +
            IdImpuestoIva + "|" +
            departamento + "|" +
            centroCostos + "|" +
            propositoViaje + "|" +
            " " + "|" +
            " " + "|" +
            " " + "|" +
            "true" + "|";

          var valorFinal: any = this.global.FormatearNumeroPunto(detalle.ArchivoDetalle.Total, 2);

          var data = {
            IdViaje: this.dtViaje.IdViaje,
            IdArchivoDetalle: detalle.ArchivoDetalle.IdArchivoDetalle,
            VariableCaso: this.variableCaso,
            Token: token.access_token,
            DataJSON: "?parametros=" + parametros + "&valor=" + valorFinal + "&descripcion=" + "Categoría - " + textoCategoria + ", Concepto - " + detalle.ArchivoDetalle.Descripcion + ' Factura: ' + detalle.Archivo.NumeroFactura + ' Proveedor: ' + proveedor.Identificacion + ' - ' + proveedor.Nombre + "&credito=" + false
          };
          arregloDatos.push(data);
        }

        var valores: any;
        this.dataExterna
          .LineaFactura(arregloDatos)
          .then((_response) => {

            console.log(_response);
            var aux = 0;

            let mensajes = "";

            for (var respuesta of _response) {
              if (respuesta != null) {
                valores = JSON.parse(respuesta);
                if (valores.Estado == "OK") {
                  aux = aux + 1;
                } else if (valores.Estado == "Error") {
                  for (var item of valores.Mensajes) {
                    mensajes = `${mensajes + item} \n`;
                  }
                }
              }
            }

            if (aux == _response.length) {
              console.log('entrada 6 - OK');
              this.RegistraDiario();
            } else {
              console.log('entrada 6 - Error');
              this.spinner.hide();
              Swal.fire({
                title: "Servicio Registro Línea Factura",
                html: mensajes,
                type: "info",
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.value) {
                  setTimeout(() => {
                    this.windowLocationReload();
                  }, 1100);
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

  public RegistraDiario() {
    console.log('entrada 7');
    this.spinner.show();
    this.caso1
      .RegistraDiario(this.dtViaje, this.IdLiquidacionReembolsoCabeceraAx)
      .then((res) => {
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          console.log('entrada 8 - OK');
          this.IdLiquidacionReembolsoCierreAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdLiquidacionReembolsoCierreAx",
            this.IdLiquidacionReembolsoCierreAx,
            this.variableCaso
          );
          this.LiquidaDiarioFactura();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          console.log('entrada 8 - Error');
          this.spinner.hide();
          Swal.fire({
            title: this.textoServicioRegistraDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LiquidaDiarioFactura() {
    console.log('entrada 9');
    this.spinner.show();
    this.caso1
      .LiquidaDiarioFactura(
        this.dtViaje,
        this.IdLiquidacionReembolsoCreditoAx1,
        this.AnticipoNumeroAsientoAx
      )
      .then((res) => {
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          console.log("entrada 10 - OK");
          this.IdLiquidacionReembolsoCierreAsientoAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdLiquidacionReembolsoCierreAsientoAx",
            this.IdLiquidacionReembolsoCierreAsientoAx,
            this.variableCaso
          );
          this.CreacionCierreDatosAdicionales();
          setTimeout(() => {
            this.VerificarCasoLiquidacion();
          }, 1000);
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          console.log("entrada 10 - Error");
          this.spinner.hide();
          Swal.fire({
            title: "Servicio Liquida Diario Factura",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  //// SEGUNDO FOR CAMBIO AL BACKEND
  public ListarFacturasCaso1() {
    this.spinner.show();
    this.dataInterna
      .ObtenerArchivo(this.dtViaje.IdViaje)
      .then((res) => {
        this.lstArchivoLiquidacion = res;
        console.log("segundo listado correspondiente a las facturas del viaje");
        console.log(this.lstArchivoLiquidacion);

        setTimeout(() => {
          console.log(this.lstArchivoLiquidacion);
        }, 2000);
        for (const factura of this.lstArchivoLiquidacion) {
          var proveedor = JSON.parse(factura.DatosProveedor);
          var impuestos = JSON.parse(factura.TipoImpuestoFactura);
          var desglose = { baseIvaCero: 0, baseIva: 0, iva: 0 };
          var numero = factura.NumeroFactura;
          var establecimiento = numero.substring(0, 3);
          var puntoEmision = numero.substring(3, 6);
          var secuencial = numero.substring(6, numero.length);
          if (impuestos.Codigo == 0) {
            desglose.baseIvaCero = factura.TotalLiquidar;
            desglose.iva = factura.ImpuestoFactura;
          } else if (impuestos.Codigo == 2) {
            desglose.baseIva = factura.SubtotalFactura;
            desglose.iva = factura.ImpuestoFactura;
          }

          console.log(
            factura.IdArchivo,
            proveedor.Identificacion,
            factura.TipoDocumento.Nombre,
            establecimiento,
            puntoEmision,
            secuencial,
            factura.Autorizacion,
            factura.FechaEmision,
            desglose.baseIvaCero,
            desglose.baseIva,
            desglose.iva
          );

          this.CrearDatoAdicionalReembolso(
            factura.IdArchivo,
            proveedor.Identificacion,
            factura.TipoDocumento.Nombre,
            establecimiento,
            puntoEmision,
            secuencial,
            factura.Autorizacion,
            factura.FechaEmision,
            desglose.baseIvaCero,
            desglose.baseIva,
            desglose.iva
          );
        }

        setTimeout(() => {
          this.spinner.hide();
          this.VerificarCasoLiquidacion();
        }, 5000);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  //// LISTADO DE FACTURAS PARA LOS DATOS ADICIONALES
  public ListarFacturasDatosAdicionales() {
    this.spinner.show();
    this.dataInterna
      .ObtenerArchivo(this.dtViaje.IdViaje)
      .then((res) => {
        var arregloFacturas: any;
        this.lstArchivoLiquidacion = res;
        for (const factura of this.lstArchivoLiquidacion) {
          this.dataInterna
            .DesgloseValoresFactura(this.dtViaje.IdViaje, factura.IdArchivo)
            .then((res) => {
              if (res) {
                var proveedor = JSON.parse(factura.DatosProveedor);
                var desglose = { baseIvaCero: 0, baseIva: 0, iva: 0 };
                var numero = factura.NumeroFactura;
                var establecimiento = numero.substring(0, 3);
                var puntoEmision = numero.substring(3, 6);
                var secuencial = numero.substring(6, numero.length);
                const serie = `${establecimiento}${puntoEmision}`;

                var _baseCero: any = 0;
                var _baseDoce: any = 0;
                var _baseIva: any = 0;

                for (var dato of res) {
                  _baseCero += parseFloat(dato.BaseCero);
                  _baseDoce += parseFloat(dato.BaseDoce);
                  _baseIva += parseFloat(dato.Iva);
                }

                desglose.baseIvaCero = parseFloat(_baseCero);
                desglose.baseIva = parseFloat(_baseDoce);
                desglose.iva = parseFloat(_baseIva);

                var codigoTipoDocumento = factura.TipoDocumento.Nombre == "COMPROBANTE VENTA REEMBOLSO" ? "41" : factura.TipoDocumento.Nombre;

                var data = {
                  IdViaje: this.dtViaje.IdViaje,
                  IdArchivo: factura.IdArchivo,
                  VariableCaso: this.variableCaso,
                  DataJSON: `?proveedor=${proveedor.Identificacion}&idRegistro=${this.IdLiquidacionReembolsoCreditoAx1}&tipoDocumento=${codigoTipoDocumento}&serie=${serie}&secuencial=${secuencial}&autorizacion=${factura.Autorizacion}&fechaDocumento=${factura.FechaEmision}&baseIvaCero=${desglose.baseIvaCero}&baseIva=${desglose.baseIva}&iva=${desglose.iva}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
                };

                arregloFacturas.push(data);
              }
            })
            .catch((err) => {
              console.log(err);
              this.spinner.hide();
            });
        }
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  /////////// CREACIÓN Y CIERRE DE DATOS ADICIONALES
  public CreacionCierreDatosAdicionales() {
    console.log('entrada 11');
    this.spinner.show();
    this.dataInterna
      .ObtenerArchivo(this.dtViaje.IdViaje)
      .then((res) => {
        this.lstArchivoLiquidacion = res;

        var token = this.sesionExterna.ObtenerClaveExterna();
        var arregloDatosAdicionales = [];
        for (const archivo of this.lstArchivoLiquidacion) {
          this.dataInterna
            .DesgloseValoresFactura(this.dtViaje.IdViaje, archivo.IdArchivo)
            .then((res) => {
              if (res) {
                var proveedor = JSON.parse(archivo.DatosProveedor);
                var desglose = { baseIvaCero: 0, baseIva: 0, iva: 0 };
                var numero = archivo.NumeroFactura;
                var establecimiento = numero.substring(0, 3);
                var puntoEmision = numero.substring(3, 6);
                var secuencial = numero.substring(6, numero.length);
                const serie = `${establecimiento}${puntoEmision}`;

                var _baseCero: any = 0;
                var _baseDoce: any = 0;
                var _baseIva: any = 0;

                for (var dato of res) {
                  _baseCero += parseFloat(dato.BaseCero);
                  _baseDoce += parseFloat(dato.BaseDoce);
                  _baseIva += parseFloat(dato.Iva);
                }

                desglose.baseIvaCero = parseFloat(_baseCero);
                desglose.baseIva = parseFloat(_baseDoce);
                desglose.iva = parseFloat(_baseIva);

                var codigoTipoDocumento =
                  archivo.TipoDocumento.Nombre == "COMPROBANTE VENTA REEMBOLSO"
                    ? "41"
                    : archivo.TipoDocumento.Nombre;

                var data = {
                  Token: token.access_token,
                  IdViaje: this.dtViaje.IdViaje,
                  IdArchivo: archivo.IdArchivo,
                  VariableCaso: this.variableCaso,
                  DataJSON: `?proveedor=${proveedor.Identificacion}&idRegistro=${this.IdLiquidacionReembolsoCreditoAx1}&tipoDocumento=${codigoTipoDocumento}&serie=${serie}&secuencial=${secuencial}&autorizacion=${archivo.Autorizacion}&fechaDocumento=${archivo.FechaEmision}&baseIvaCero=${desglose.baseIvaCero}&baseIva=${desglose.baseIva}&iva=${desglose.iva}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
                  DataJsonCierre: `?idRegistro=${this.IdLiquidacionReembolsoCreditoAx1}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
                };

                arregloDatosAdicionales.push(data);
                console.log(
                  "ARREGLO DATOS ADICIONALES",
                  arregloDatosAdicionales
                );
              }
            })
            .catch((err) => {
              console.log(err);
              this.spinner.hide();
            });
        }

        var tiempoEspera = this.lstArchivoLiquidacion.length >= 3 ? 35000 : 25000;

        setTimeout(() => {
          if (this.lstArchivoLiquidacion.length == arregloDatosAdicionales.length) {
            console.log('entrada 12 - OK');
            arregloDatosAdicionales.sort((a: any, b: any) => a.IdArchivo - b.IdArchivo);
            this.EnviarDatosAdicionalesBackEnd(arregloDatosAdicionales);
          } else {
            console.log('entrada 12 - Error');
            this.spinner.hide();
            this.global.VerAlerta(
              this.textoInformacion,
              this.mensajeContabilizacionDatosAdicionales,
              "warning"
            );
          }
        }, tiempoEspera);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public EnviarDatosAdicionalesBackEnd(listado: any) {
    console.log('entrada 13');
    var datos: any = JSON.stringify(listado);

    if (listado.length == 0) {
      this.spinner.hide();
      this.global.VerAlerta(
        this.textoInformacion,
        this.mensajeContabilizacionDatosAdicionales,
        "warning"
      );
    } else if (this.lstArchivoLiquidacion.length != listado.length) {
      this.spinner.hide();
      this.global.VerAlerta(
        this.textoInformacion,
        this.mensajeContabilizacionDatosAdicionales,
        "warning"
      );
    } else {
      var data: any = {
        Estado: "",
        Datos: datos,
      };

      this.dataExterna
        .CreacionCierreDatosAdicionalesReembolso(data)
        .then((res) => {
          console.log(
            "Entrada 8, CreacionCierreDatosAdicionalesReembolso",
            JSON.stringify(res)
          );

          var aux = 0;

          let mensajes = "";
          var valores;

          for (var respuesta of res) {
            if (respuesta != null) {
              valores = JSON.parse(respuesta);
              if (valores.Estado == "OK") {
                aux = aux + 1;
              } else if (valores.Estado == "Error") {
                for (var item of valores.Mensajes) {
                  mensajes = `${mensajes + item} \n`;
                }
              }
            }
          }

          if (aux == res.length) {
            console.log('entrada 14 - OK');
            this.CierreUnicoDatosAdicionales();
          } else {
            this.spinner.hide();
            console.log('entrada 14 - Error');
            Swal.fire({
              title: "Servicio Externo Creación Datos Adicionales",
              html: mensajes,
              type: "info",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              setTimeout(() => {
                this.windowLocationReload();
              }, 1200);
            });
          }
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }
  }

  public CierreUnicoDatosAdicionales() {
    console.log('entrada 15');
    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Identificador: 0,
      Token: token.access_token,
      DataJSON: `?idRegistro=${this.IdLiquidacionReembolsoCreditoAx1}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .CierreDatoAdicionalReembolso(data)
      .then((res) => {
        if (res) {
          var respuesta = JSON.parse(res);
          if (respuesta.Estado == "OK") {
            this.spinner.hide();
            this.VerificarCasoLiquidacion();
            setTimeout(() => {
              this.GestionLiquidacion(
                "",
                "",
                "NumeroAsientoAdicionalAx",
                respuesta.Datos,
                this.variableCaso
              );
              if (this.variableCaso == "L_NORMAL") {
                this.VerificarCasoLiquidacion();
                setTimeout(() => {
                  this.GestionViaje(9, 17);
                }, 300);
              } else if (this.variableCaso == "L_CASO2") {
                this.VerificarCasoLiquidacion();
                setTimeout(() => {
                  this.DatosCabeceraViaticosPendientes();
                }, 300);
              } else if (this.variableCaso == "L_CASO3") {
                this.VerificarCasoLiquidacion();
                setTimeout(() => {
                  this.CrearDiario();
                }, 300);
              }
            }, 500);
          } else {
            let mensajes: any;

            for (var item of respuesta.Mensajes) {
              mensajes = `${mensajes + item} \n`;
            }

            this.spinner.hide();
            Swal.fire({
              title: "Servicio Cierre Datos Adicionales",
              html: mensajes,
              type: "info",
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              setTimeout(() => {
                this.windowLocationReload();
              }, 1000);
            });
          }
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  /// ANTIGUO
  public CrearDatoAdicionalReembolso(
    IdArchivo: any,
    Identificacion: any,
    Nombre: any,
    establecimiento: any,
    puntoEmision: any,
    secuencial: any,
    Autorizacion: any,
    FechaEmision: any,
    baseIvaCero: any,
    baseIva: any,
    iva: any
  ) {
    this.caso1
      .CrearDatoAdicionalReembolso(
        this.dtViaje,
        Identificacion,
        Nombre,
        `${establecimiento}${puntoEmision}`,
        secuencial,
        Autorizacion,
        FechaEmision,
        baseIvaCero,
        baseIva,
        iva,
        this.IdLiquidacionReembolsoCreditoAx1
      )
      .then((res) => {
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.GestionLiquidacion(
            "2",
            IdArchivo + "-CR",
            "IdDetalleDatoAdicionalAx",
            aux.Datos,
            this.variableCaso
          );
          this.CierreDatoAdicionalReembolsoCaso1(IdArchivo);
        } else if (aux.Estado == "Error") {
          this.spinner.hide();

          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          this.global.VerAlerta(
            "Servicio Crear Dato Adicional Reembolso",
            mensajes,
            "error"
          );
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public CierreDatoAdicionalReembolsoCaso1(idArchivo: any) {
    this.caso1
      .CierreDatoAdicionalReembolso(
        this.dtViaje,
        this.IdLiquidacionReembolsoCreditoAx1
      )
      .then((res) => {
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.GestionLiquidacion(
            "2",
            idArchivo + "-CE",
            "NumeroAsientoAdicionalAx",
            aux.Datos,
            this.variableCaso
          );

          this.VerificarCasoLiquidacion();

          if (
            this.valdiacionPasoDetallesAdicionales == 1 &&
            this.listaCR.length == 0 &&
            this.NumeroAsientoAdicionalAx != undefined
          ) {
            if (this.variableCaso == "L_NORMAL") {
              this.GestionViaje(9, 17);
              this.VerificarCasoLiquidacion();
            } else if (this.variableCaso == "L_CASO2") {
              this.DatosCabeceraViaticosPendientes();
            } else if (this.variableCaso == "L_CASO3") {
              this.CrearDiario();
            }
          }

          this.spinner.hide();
        } else if (aux.Estado == "Error") {
          this.spinner.hide();

          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          this.global.VerAlerta(
            "Servicio Cierre Dato Adicional Reembolso",
            mensajes,
            "error"
          );
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  // FIN DEL ENVÍO AL BACKEND

  //PARA TODOS LOS CASOS
  //GUARDA EN LA BASE DE DATOS CADA QUE EL SERVICIO ME DEVUELVE UN VALOR CORRECTO
  public GestionLiquidacion(
    lista: any,
    listaValor: any,
    tipo: any,
    valor: any,
    identificador: any
  ) {
    this.caso1
      .GestionLiquidacion(
        this.dtViaje,
        lista,
        listaValor,
        tipo,
        valor,
        identificador
      )
      .then((res) => {
        var resultado = res;
        this.IdLiquidacionViaje = resultado.datos.IdLiquidacionViaje;
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public EliminarRegistroBDD(idViaje, registroAEliminar) {
    this.dataInterna
      .EliminarRegistroBDD(idViaje, registroAEliminar)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  //CASO 1.2  //TIENE VIATICOS PENDIENTES POR JUSTIFICAR
  public DatosCabeceraViaticosPendientes() {
    this.VerificarCasoLiquidacion();
    this.spinner.show();
    this.caso2
      .CrearDiarioDos(this.dtViaje, this.IDAnticipoReferenciaPagoAx, this.lstParametrosCuentaAX.DiarioGeneral, this.lstParametrosCuentaAX.PerfilAnticipoViaticos, this.lstParametrosCuentaAX.CuentaViaticosNoJustificados)
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdCabeceraLiquidacionAx2 = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdCabeceraLiquidacionAx2",
            this.IdCabeceraLiquidacionAx2,
            this.variableCaso
          );
          this.LineaProveedorLiquidaAnticipo();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: this.textoServicioCrearDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaProveedorLiquidaAnticipo() {
    this.spinner.show();
    this.caso2
      .LineaProveedorLiquidaAnticipo(
        this.dtViaje,
        this.IdCabeceraLiquidacionAx2,
        this.fmrDetalles.creditoPendiente,
        this.IDAnticipoReferenciaPagoAx,
        this.lstParametrosCuentaAX.DiarioGeneral,
        this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
        this.lstParametrosCuentaAX.CuentaViaticosNoJustificados
      )
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdDetalleLiquidacionCreditoAx2 = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdDetalleLiquidacionCreditoAx2",
            this.IdDetalleLiquidacionCreditoAx2,
            this.variableCaso
          );
          this.LineaLiquidacion(this.fmrDetalles.creditoPendiente);
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          Swal.fire({
            title: "Servicio Linea Proveedor Liquida Anticipo",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((response) => {
            if (response.value) {
              this.windowLocationReload();
            }
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaLiquidacion(creditoPendiente: any) {
    this.spinner.show();
    this.caso2
      .LineaLiquidacion(
        this.dtViaje,
        this.IdCabeceraLiquidacionAx2,
        creditoPendiente,
        this.IDAnticipoReferenciaPagoAx,
        this.lstParametrosCuentaAX.DiarioGeneral,
        this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
        this.lstParametrosCuentaAX.CuentaViaticosNoJustificados
      )
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdDetalleDebitoLiquidacionAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdDetalleDebitoLiquidacionAx",
            this.IdDetalleDebitoLiquidacionAx,
            this.variableCaso
          );
          this.RegistraDiario2();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          Swal.fire({
            title: "Servicio Linea Liquidacion",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public RegistraDiario2() {
    this.spinner.show();
    this.caso2
      .RegistraDiario(this.dtViaje, this.IdCabeceraLiquidacionAx2)
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdCierreLiquidacionAx2 = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdCierreLiquidacionAx2",
            this.IdCierreLiquidacionAx2,
            this.variableCaso
          );
          this.LiquidaDiarioFactura2();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: this.textoServicioRegistraDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LiquidaDiarioFactura2() {
    this.spinner.show();
    this.caso2
      .LiquidaDiarioFactura(
        this.dtViaje,
        this.IdDetalleLiquidacionCreditoAx2,
        this.AnticipoNumeroAsientoAx
      )
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdLiquidacionDevolucionCierreAsientoAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdLiquidacionDevolucionCierreAsientoAx",
            this.IdLiquidacionDevolucionCierreAsientoAx,
            this.variableCaso
          );
          this.GestionViaje(9, 17);
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: "Liquida Diario Factura",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  //CASO 1.3
  public CrearDiario() {
    this.spinner.show();
    this.caso3
      .CrearDiario(this.dtViaje, this.lstParametrosCuentaAX.DiarioGeneral)
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdCabeceraAcreditacionAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdCabeceraAcreditacionAx",
            this.IdCabeceraAcreditacionAx,
            this.variableCaso
          );
          this.LineaProveedorAnticipo();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }

          Swal.fire({
            title: this.textoServicioCrearDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaProveedorAnticipo() {
    this.spinner.show();
    this.caso3
      .LineaProveedorAnticipo(
        this.dtViaje,
        this.IdCabeceraAcreditacionAx,
        this.fmrDetalles.creditoPendiente,
        this.lstParametrosCuentaAX.DiarioGeneral
      )
      .then((res) => {
        this.spinner.hide();
        this.gestionAsientoViajeRegistroDiario = res;
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IDLineaProveedorCreditoDebitoAcreditacionAX = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IDLineaProveedorCreditoDebitoAcreditacionAX",
            this.IDLineaProveedorCreditoDebitoAcreditacionAX,
            this.variableCaso
          );
          this.RegistraDiario3();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: "Servicio Linea Proveedor Anticipo",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public RegistraDiario3() {
    this.spinner.show();
    this.caso3
      .RegistraDiario(this.dtViaje, this.IdCabeceraAcreditacionAx)
      .then((res) => {
        this.spinner.hide();
        var aux = JSON.parse(res);
        console.log(aux);
        if (aux.Estado == "OK") {
          this.IdCierreAcreditacionAx = aux.Datos;
          this.GestionLiquidacion(
            "",
            "",
            "IdCierreAcreditacionAx",
            this.IdCierreAcreditacionAx,
            this.variableCaso
          );
          this.GestionAsientoViaje();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: this.textoServicioRegistraDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public GestionAsientoViaje() {
    var data = {
      Identificador: 4,
      IdAsientoViaje: 0,
      CodigoDiario: this.IdCabeceraAcreditacionAx,
      RegistroDiario: this.gestionAsientoViajeRegistroDiario,
      CierreDiario: this.IdCierreAcreditacionAx,
      IDAnticipoReferenciaPagoAx: "",
      AnticipoNumeroAsientoAx: "",
      Viaje: {
        IdViaje: this.dtViaje.IdViaje,
        CatalogoEstado: {
          IdEstado: 0,
        },
      },
    };

    this.dataInterna
      .GestionAsientoViaje(data)
      .then((res) => {
        this.spinner.hide();
        console.log(res);
        this.ObtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public ObtenerParametros() {
    this.spinner.show();
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

        this.tmpAplicacion = aux1.ValorParametro;
        this.tmpNombreOrigen = aux2.ValorParametro;
        this.tmpEmailOrigen = aux3.ValorParametro;
        this.tmpTiempoEspera = aux4.ValorParametro;

        this.EnviarEmailTesoreria();

        setTimeout(() => {
          this.GestionViaje(8, 17);
        }, 1000);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public EnviarEmailTesoreria() {
    var token = this.sesionExterna.ObtenerClaveExterna();

    var email = {
      Token: token,
      Email: {
        Cuerpo: this.servicioEmail.GenerarEmailTesoreriaAcreditacion(
          this.dtViaje.NombreUsuarioTesoreria,
          this.dtViaje.IdViaje,
          this.dtViaje.FechaInicioViaje,
          this.dtViaje.RegresoFecha,
          this.dtViaje.NombreViaje,
          this.dtViaje.Registrador.Identificacion,
          this.fmrDetalles.creditoPendiente
        ),
        Asunto:
          "Solicitud de Registro de Acreditación de Viáticos Pendientes Viaje " +
          this.dtViaje.IdViaje,
        IdAplicacion: this.tmpAplicacion,
        IdTransaccion: "",
        NumeroIdentificacion: "",
        Contrato: "",
        NombreOrigen: this.tmpNombreOrigen,
        EmailOrigen: this.tmpEmailOrigen,
        EmailsDestino: [
          {
            Nombre: this.dtViaje.NombreUsuarioTesoreria,
            Direccion: this.global.Reemplazar(this.dtViaje.UsuarioTesoreria + "@saludsa.com.ec")
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
        console.log(err);
      });
  }


  public ValidarEstadoSolicitudViajeCuatro() {
    this.dataInterna.VerificarEstadoSolicitud(this.dtViaje.IdViaje).then((res) => {
      if (res == 7) {
        this.CrearDiarioCuatro();
      } else {
        this.global.VerAlerta(this.textoInformacion, "La solicitud número: <b>" + this.dtViaje.IdViaje + "</b> ya ha finalizado este proceso en otra instancia del sistema", "info");
        this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
      }
    }).catch((err) => { console.log(err) });
  }

  //CASO 1.4  NO VIAJO
  public CrearDiarioCuatro() {
    this.spinner.show();
    this.caso4.CrearDiarioCuatro(
      this.dtViaje,
      this.IDAnticipoReferenciaPagoAx,
      this.lstParametrosCuentaAX.DiarioGeneral,
      this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
      this.lstParametrosCuentaAX.CuentaViaticosNoJustificados
    )
      .then((res) => {
        console.log(res);
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.IdLiquidacionDevolucionCabeceraAx = aux.Datos;
          this.GestionLiquidacion("", "", "IdLiquidacionDevolucionCabeceraAx", this.IdLiquidacionDevolucionCabeceraAx, "L_NORMAL_NOVIAJO");
          this.LineaProveedorLiquidaAnticipoCuatro();
        } else if (aux.Estado == "Error") {
          this.spinner.hide();
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: this.textoServicioCrearDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaProveedorLiquidaAnticipoCuatro() {
    this.spinner.show();
    this.caso4.LineaProveedorLiquidaAnticipoCuatro(
      this.dtViaje,
      this.IdLiquidacionDevolucionCabeceraAx,
      this.fmrDetalles.viaticos,
      this.IdCabeceraAnticipoAx,
      this.IDAnticipoReferenciaPagoAx,
      this.lstParametrosCuentaAX.DiarioGeneral,
      this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
      this.lstParametrosCuentaAX.CuentaViaticosNoJustificados
    )
      .then((res) => {
        console.log(res);
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.IdLiquidacionDevolucionCreditoAx = aux.Datos;
          this.GestionLiquidacion("", "", "IdLiquidacionDevolucionCreditoAx", this.IdLiquidacionDevolucionCreditoAx, "L_NORMAL_NOVIAJO");
          this.LineaLiquidacionCuatro();
        } else if (aux.Estado == "Error") {
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          this.spinner.hide();
          Swal.fire({
            title: "Servicio Linea Proveedor Liquida Anticipo",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {
              this.BorrarDiario(this.IdLiquidacionDevolucionCabeceraAx);
            }
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public LineaLiquidacionCuatro() {
    this.spinner.show();
    this.caso4.LineaLiquidacionCuatro(
      this.dtViaje,
      this.IdLiquidacionDevolucionCabeceraAx,
      this.fmrDetalles.viaticos,
      this.IDAnticipoReferenciaPagoAx,
      this.lstParametrosCuentaAX.DiarioGeneral,
      this.lstParametrosCuentaAX.PerfilAnticipoViaticos,
      this.lstParametrosCuentaAX.CuentaViaticosNoJustificados
    )
      .then((res) => {
        console.log(res);
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.IdLiquidacionDevolucionDebitoAx = aux.Datos;
          this.GestionLiquidacion("", "", "IdLiquidacionDevolucionDebitoAx", this.IdLiquidacionDevolucionDebitoAx, "L_NORMAL_NOVIAJO");
          this.RegistraDiarioCuatro();
        } else if (aux.Estado == "Error") {
          this.spinner.hide();
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: "Servicio Línea Liquidación Anticipo",
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            this.windowLocationReload();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public RegistraDiarioCuatro() {
    this.spinner.show();
    this.caso4.RegistraDiarioCuatro(
      this.dtViaje,
      this.IdLiquidacionDevolucionCabeceraAx
    )
      .then((res) => {
        console.log(res);
        var aux = JSON.parse(res);
        if (aux.Estado == "OK") {
          this.IdLiquidacionDevolucionCierreAx = aux.Datos;
          this.GestionLiquidacion("", "", "IdLiquidacionDevolucionCierreAx", this.IdLiquidacionDevolucionCierreAx, "L_NORMAL_NOVIAJO");
          this.spinner.hide();
          this.GestionViaje(9, 17);
        } else if (aux.Estado == "Error") {
          this.spinner.hide();
          let mensajes = "";
          for (var item of aux.Mensajes) {
            mensajes = `${mensajes + item} \n`;
          }
          Swal.fire({
            title: this.textoServicioRegistraDiario,
            html: mensajes,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {
              this.spinner.show();
              this.windowLocationReload();
            }
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  // CASO 1.4: Eliminar Caso 4 NO VIAJO
  public EliminarCaso4() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    this.dataInterna
      .ObtenerLiquidacionesLista(this.dtViaje.IdViaje, "L_NORMAL_NOVIAJO", "")
      .then((res) => {
        var resultado3 = res;
        var dataDetalle;
        var repeticiones = 0;
        if (resultado3.length > 0) {
          for (const datos of resultado3) {
            this.spinner.show();
            if (datos.Tipo == "IdLiquidacionDevolucionDebitoAx") {
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?idRegistro=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };
              this.dataExterna
                .BorrarLineaDiario(dataDetalle)
                .then((res) => {
                  var aux = JSON.parse(res);
                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionDevolucionDebitoAx: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }

            if (datos.Tipo == "IdLiquidacionDevolucionCreditoAx") {
              repeticiones = repeticiones + 1;
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?idRegistro=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };

              this.dataExterna
                .BorrarLineaDiario(dataDetalle)
                .then((res) => {
                  var aux = JSON.parse(res);

                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionDevolucionCreditoAx: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }


            if (datos.Tipo == "IdLiquidacionDevolucionCabeceraAx") {
              repeticiones = repeticiones + 1;
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?numeroDiario=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };

              this.dataExterna
                .BorrarDiario(dataDetalle)
                .then((res) => {
                  var aux = JSON.parse(res);

                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionDevolucionCabeceraAx: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }
          }
        }

        setTimeout(() => {
          this.spinner.hide();
          Swal.fire({
            title: this.textoServicioBorrarDiarios,
            html: "Los diarios fueron eliminados correctamente, puede volver a registrarlos",
            type: "info",
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {
              this.spinner.show();
              this.windowLocationReload();
            }
          });
        }, 15000);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  // CASO 1.1: Eliminar Caso 1 CASO NORMAL
  public EliminarCaso1() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    this.dataInterna
      .ObtenerLiquidacionesLista(
        this.dtViaje.IdViaje,
        this.nombreCasoContabilidad,
        ""
      )
      .then((resp) => {
        var resultado3 = resp;
        var dataDetalle;
        var repeticiones = 0;
        if (resultado3.length > 0) {
          for (const datos of resultado3) {
            this.spinner.show();
            if (datos.Tipo == "IdLiquidacionReembolsoDebitoAx") {
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?idRegistro=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };

              this.dataExterna
                .BorrarLineaDiario(dataDetalle)
                .then((resp) => {
                  var aux = JSON.parse(resp);
                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionReembolsoDebitoAx: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }

            if (datos.Tipo == "IdLiquidacionReembolsoCreditoAx1") {
              repeticiones = repeticiones + 1;
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?idRegistro=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };

              this.dataExterna
                .BorrarLineaDiario(dataDetalle)
                .then((resp) => {
                  var aux = JSON.parse(resp);

                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionReembolsoCreditoAx1: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }

            if (datos.Tipo == "IdLiquidacionReembolsoCabeceraAx") {
              repeticiones = repeticiones + 1;
              dataDetalle = {
                Token: token.access_token,
                DataJSON: `?numeroDiario=${datos.Valor}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
              };

              this.dataExterna
                .BorrarDiario(dataDetalle)
                .then((resp) => {
                  var aux = JSON.parse(resp);

                  if (aux.Estado == "OK") {
                    repeticiones = repeticiones + 1;
                    console.log(
                      "BorrarLineaDiario IdLiquidacionReembolsoCabeceraAx: ",
                      aux.Datos
                    );
                    this.EliminarRegistroBDD(
                      this.dtViaje.IdViaje,
                      datos.Valor
                    );
                  } else if (aux.Estado == "Error") {
                    let mensajes = "";
                    for (var item of aux.Mensajes) {
                      mensajes = `${mensajes + item} \n`;
                    }
                    Swal.fire({
                      title: this.textoServicioBorrarLineaDiario,
                      html: mensajes,
                      type: "info",
                      showCancelButton: false,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      this.windowLocationReload();
                    });
                  }
                })
                .catch((err) => {
                  this.spinner.hide();
                  console.log(err);
                });
            }
          }

          setTimeout(() => {
            this.spinner.hide();
            Swal.fire({
              title: this.textoServicioBorrarDiarios,
              html: "Los diarios fueron eliminados correctamente, puede volver a registrarlos",
              type: "info",
              showCancelButton: false,
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.value) {
                this.spinner.show();
                this.windowLocationReload();
              }
            });
          }, 20000);
        } else {
          this.spinner.hide();
          Swal.fire({
            title: this.textoServicioBorrarDiarios,
            html: "Los diarios no se pudieron eliminar contáctese con el administrador",
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  // BORAR DIARIOS ALL
  public BorrarDiario(IdLiquidacionDevolucionCabeceraAx: any) {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var dataCabecera = {
      Token: token.access_token,
      DataJSON: `?numeroDiario=${this.IdLiquidacionDevolucionCabeceraAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BorrarDiario(dataCabecera)
      .then((res) => {
        console.log("BorrarDiario : ", res);
        this.EliminarRegistroBDD(
          this.dtViaje.IdViaje,
          IdLiquidacionDevolucionCabeceraAx
        );
        this.windowLocationReload();
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Borrar Linea Diario",
          html: "No se pudo borrar el diaro <br> ¿Desea volver a intentarlo?",
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarDiario(IdLiquidacionDevolucionCabeceraAx);
          }
        });
        console.log(err);
      });
  }

  public BorrarLineaDiarioCredito(IdLiquidacionDevolucionCreditoAx: any) {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    var dataDetalle = {
      Token: token.access_token,
      DataJSON: `?idRegistro=${IdLiquidacionDevolucionCreditoAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BorrarLineaDiario(dataDetalle)
      .then((res) => {
        console.log("BorrarLineaDiarioCredito : ", res);
        this.EliminarRegistroBDD(
          this.dtViaje.IdViaje,
          IdLiquidacionDevolucionCreditoAx
        );
        this.BorrarDiario(this.IdLiquidacionReembolsoCabeceraAx);
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Borrar Línea Diario",
          html: "No se pudo borrar la línea de diaro <br> ¿Desea volver a intentarlo?",
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarLineaDiarioCredito(IdLiquidacionDevolucionCreditoAx);
          }
        });
        console.log(err);
      });
  }

  public BorrarLineaDiarioDebito(IdLiquidacionReembolsoDebitoAx: any) {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    var dataDetalle = {
      Token: token.access_token,
      DataJSON: `?idRegistro=${IdLiquidacionReembolsoDebitoAx}&codigoCompania=${this.dtViaje.Registrador.CodigoEmpresa}`,
    };

    this.dataExterna
      .BorrarLineaDiario(dataDetalle)
      .then((res) => {
        console.log("BorrarLineaDiarioDebito : ", res);
        this.EliminarRegistroBDD(
          this.dtViaje.IdViaje,
          IdLiquidacionReembolsoDebitoAx
        );
        this.BorrarLineaDiarioCredito(this.IdLiquidacionDevolucionCreditoAx);
      })
      .catch((err) => {
        this.spinner.hide();
        Swal.fire({
          title: "Borrar Línea Diario",
          html: "No se pudo borrar la línea de diaro <br> ¿Desea volver a intentarlo?",
          type: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.value) {
            this.BorrarLineaDiarioDebito(IdLiquidacionReembolsoDebitoAx);
          }
        });
        console.log(err);
      });
  }

  public ContabilizarCasos() {
    this.GestionViaje(9, 17);
  }

  public GestionViaje(state: any, identificador: any) {

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

    this.spinner.show();

    var mensajeFinal = '';

    if (this.nombreCasoContabilidad == "L_NORMAL_NOVIAJO") {
      mensajeFinal = `La solicitud de viaje fue guardada exitosamente.<br> El número de diario es: <br><b>${this.IdLiquidacionDevolucionCabeceraAx}</b>`;
    } else if (this.nombreCasoContabilidad == "L_NORMAL") {
      mensajeFinal = `La solicitud de viaje fue guardada exitosamente.<br> El número de diario es: <br><b>${this.IdLiquidacionReembolsoCierreAx}</b>`;
    } else if (this.nombreCasoContabilidad == "L_CASO2") {
      mensajeFinal = `La solicitud de viaje fue guardada exitosamente.<br> El número de diario es: <br><b>${this.IdLiquidacionReembolsoCierreAx}</b><br>El diario de descuento es: <br><b>${this.IdCabeceraLiquidacionAx2}<b>`;
    } else if (this.nombreCasoContabilidad == "L_CASO3") {
      mensajeFinal = `La solicitud de viaje fue guardada exitosamente.<br> El número de diario es: <br><b>${this.IdLiquidacionReembolsoCierreAx}</b><br>El diario de acreditación es: <br><b>${this.IdCabeceraAcreditacionAx}<b>`;
    } else {
      mensajeFinal = "La solicitud de viaje fue guardada exitosamente.";
    }

    this.VerificarCasoLiquidacion();
    this.dataInterna
      .GestionarViaje(travel)
      .then((res) => {
        this.spinner.hide();
        Swal.fire({
          title: "Contabilización Generada Exitosamente",
          html: mensajeFinal,
          type: "success",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          this.spinner.hide();
          this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
        });
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public GuardarViaje() {
    var travel = {
      Identificador: 16,
      Query: "",
      Viaje: {
        IdViaje: this.dtViaje.IdViaje,
        ComentariosUnoViaje: "",
        ComentariosDosViaje: "",
        HoraInicioViaje: "",
        HoraFinViaje: "",
        CatalogoEstado: {
          IdEstado: 7,
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
        TipoCuentaViaje: this.dtContabilidad.tipoContabilidad,
        DepartamentoUnoViaje: JSON.stringify(this.dtDepartamento1),
        DepartamentoDosViaje: JSON.stringify(this.dtDepartamento2),
        CentroCostoViaje: JSON.stringify(this.dtCentroCosto),
        PropositoViaje: JSON.stringify(this.dtProposito),
        TipoGastoViaje: this.dtTipoGasto,
        RegistroAnticipo: "",
      },
    };

    this.spinner.show();
    this.dataInterna
      .GestionarViaje(travel)
      .then((res) => {
        this.spinner.hide();
        if (res.Estado != "ERROR") {
          this.global.VerAlertaTiempo(
            "Guardado",
            "Datos actualizados correctamente.",
            "success"
          );
          this.editarCuenta = false;
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public CambiarTipoDocumentoValores() {
    if (this.frmFactura.TipoDocumento == "03") {
      this.tipoProveedor = 1;
      this.bloqueoGenerico = true;
      this.frmFiltroProveedor.identificacion = this.proveedorGenerico.Identificacion;
      this.frmFiltroProveedor.nombre = this.proveedorGenerico.Nombre;
      this.frmFactura.numeroFactura = this.proveedorGenerico.NumeroFactura;
      this.dtProovedor = {
        Bloqueado: "0",
        Correo: "",
        Direccion: "S/D",
        EsExtranjero: "0",
        Grupo: "0",
        Identificacion: this.proveedorGenerico.Identificacion,
        Nombre: this.proveedorGenerico.Nombre,
        RazonSocial: this.proveedorGenerico.RazonSocial,
        RegionPais: "0",
        Telefono: this.proveedorGenerico.Telefono,
        TipoIdentificacion: this.proveedorGenerico.TipoIdentificacion,
      };
      this.frmFactura.numeroAutorizacion = this.proveedorGenerico.NumeroAutorizacion;
      this.frmFactura.fechaEmision = this.global.ObtenerFechaParametroDiaEspecifico(
        this.dtViaje.FechaInicioViaje
      );
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
        this.global.Alerta(this.textoInformacion, "Ingresar una razón social o nombre correcto", "info");
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
        console.log(this.dtProovedor);
        this.ValidarEstadoProveedor(res[0]);
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
        console.log(err);
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
    this.spinner.show();
    var razonSocial;
    var ruc;

    if (this.frmFiltroProveedor.identificacion != null) {
      razonSocial = "''";
      ruc = this.frmFiltroProveedor.identificacion;
    } else {
      ruc = this.frmFiltroProveedor.nombre;
      razonSocial = "''";
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
        console.log(err);
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
            this.ObtenerProveedor();
          });
        }
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
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

  public ValidacionDatosProveedor() {
    if (this.dtProveedor.identificacion == null) {
      this.validarIdentificacion = true;
      this.validarNombre = false;
      this.validarCorreo = false;
      this.validarDireccion = false;
      this.validarTelefono = false;

      this.textoValidacion = this.textoCampoObligatorio;
    } else if (this.dtProveedor.identificacion.length != 13) {
      this.validarIdentificacion = true;
      this.validarNombre = false;
      this.validarCorreo = false;
      this.validarDireccion = false;
      this.validarTelefono = false;
      this.textoValidacion = "El ruc debe tener 13 dígitos";
    } else if (this.dtProveedor.nombre == null) {
      this.validarIdentificacion = false;
      this.validarNombre = true;
      this.validarCorreo = false;
      this.validarDireccion = false;
      this.validarTelefono = false;
      this.textoValidacion = this.textoCampoObligatorio;
    } else if (!this.global.ValidarEmail(this.dtProveedor.correo)) {
      this.validarIdentificacion = false;
      this.validarNombre = false;
      this.validarCorreo = true;
      this.validarDireccion = false;
      this.validarTelefono = false;
      this.textoValidacion = "El correo ingresado no es válido";
    } else if (this.dtProveedor.direccion == null) {
      this.validarIdentificacion = false;
      this.validarNombre = false;
      this.validarCorreo = false;
      this.validarDireccion = true;
      this.validarTelefono = false;
      this.textoValidacion = this.textoCampoObligatorio;
    } else if (this.dtProveedor.telefono == null) {
      this.validarIdentificacion = false;
      this.validarNombre = false;
      this.validarCorreo = false;
      this.validarDireccion = false;
      this.validarTelefono = true;
      this.textoValidacion = this.textoCampoObligatorio;
    } else {
      this.GuadarProveedor();
    }
  }

  public CerrarModalActualizaInfoProveedor() {
    $(this.modalActualizarEmailProveedor).modal("toggle");
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

    for (var dato of this.lstArchivoDetalles) {
      if (dato.TipoImpuesto == "12") {
        aux1 = aux1 + parseFloat(dato.BaseImponible);
        aux2 = aux2 + parseFloat(dato.Total);
      }
      if (dato.TipoImpuesto == 0) {
        aux3 = aux3 + parseFloat(dato.BaseImponible);
        aux4 = aux4 + parseFloat(dato.Total);
      }
    }

    this.cantidadBaseDoce = this.global.FormatearNumeroPunto(aux1, 2);
    this.cantidadBaseCero = this.global.FormatearNumeroPunto(aux3, 2);
    this.cantidadTotalDoce = this.global.FormatearNumeroPunto(aux2, 2);
    this.cantidadTotalCero = this.global.FormatearNumeroPunto(aux4, 2);
  }

  public AbrirModalModificarSolicitudContabilidad() {
    this.justificacion = "";
    $("#modalCorregirLiquidacion").modal("toggle");
  }

  public ModificarSolicitudContabilidad() {
    if (
      this.justificacion == undefined ||
      this.justificacion == "" ||
      this.justificacion == null
    ) {
      this.global.MostrarNotificacion(
        "Debe completar el campo observación",
        "info",
        "top-end"
      );
    } else {
      var travel = {
        Identificador: 7,
        Query: "",
        Viaje: {
          IdViaje: this.dtViaje.IdViaje,
          ComentariosUnoViaje: "",
          ComentariosDosViaje: this.justificacion,
          HoraInicioViaje: "",
          HoraFinViaje: "",
          CatalogoEstado: {
            IdEstado: 10,
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
      this.dataInterna
        .GestionarViaje(travel)
        .then((res) => {
          this.spinner.hide();

          var tmpAplicacion: any = this.lstParametros.find(
            (e: any) => e.NombreParametro == "IdAplicacion"
          );
          var tmpNombreOrigen: any = this.lstParametros.find(
            (e: any) => e.NombreParametro == "NombreOrigen"
          );
          var tmpEmailOrigen: any = this.lstParametros.find(
            (e: any) => e.NombreParametro == "EmailOrigen"
          );
          var tmpTiempoEspera: any = this.lstParametros.find(
            (e: any) => e.NombreParametro == "TiempoEspera"
          );

          this.EnviarEmailEdicionLiquidacion(
            this.dtViaje.IdViaje,
            tmpAplicacion.ValorParametro,
            tmpNombreOrigen.ValorParametro,
            tmpEmailOrigen.ValorParametro,
            this.dtViaje.NombreViaje,
            this.dtViaje.Registrador.Email,
            tmpTiempoEspera.ValorParametro,
            this.justificacion
          );

          Swal.fire({
            title: "Edición de Liquidación",
            html: "La solicitud a sido enviado a corregir",
            type: "success",
            showCancelButton: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result) {
              $("#modalCorregirLiquidacion").modal("toggle");
              this.rutaSistema.navigate([this.rutaListadoSolicitudes]);
            }
          });
        })
        .catch((err) => {
          this.spinner.hide();
          console.log(err);
        });
    }
  }

  public EnviarEmailEdicionLiquidacion(
    idViaje: any,
    aplicacion: any,
    nombreOrigen: any,
    emailOrigen: any,
    nombreSolicitante: any,
    emailSolicitante: any,
    tmpTiempoEspera: any,
    justificacion: any
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
        Cuerpo: this.servicioEmail.GenerarEmailCorreccionLiquidacionViaje(
          nombreSolicitante.toUpperCase(),
          idViaje,
          justificacion,
          urlAcceso
        ),
        Asunto: "Correción Liquidación Solicitud de Viaje " + idViaje,
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
        console.log(err);
      });
  }

  public VerificarCantidadAdicionalAcreditacion() {
    if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 1) {
      this.valorAdicionalAcreditacion = 0;
      this.valorTotalLiquidacion =
        this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
    } else if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 2) {
      var diferencia = moment(this.dtViaje.RegresoFecha)
        .startOf("day")
        .diff(moment(this.dtViaje.FechaFinViaje).startOf("day"), "days");

      if (diferencia >= 1) {
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
            const dineroNoches =
              parseFloat(valueNight.ValorParametro) * diferencia;

            this.valorAdicionalAcreditacion =
              dineroDias + dineroNoches - valueDay.ValorParametro;

            this.valorTotalLiquidacion =
              this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
          })
          .catch((err) => {
            this.spinner.hide();
            console.log(err);
          });
      } else {
        this.valorAdicionalAcreditacion = 0;
        this.valorTotalLiquidacion =
          this.fmrDetalles.viaticos + this.valorAdicionalAcreditacion;
      }
    }
  }

  public LimpiarValoresDistribucionContable() {
    this.lstGrupoImpuestosRenta = [];
    this.lstGrupoImpuestosIva = [];
    this.lstApoyoFiscal = [];
  }

  public CerrarModalProveedor() {
    this.tipoProveedor = 0;
    this.agregarProveedor = 0;
    $(this.modalCrearProveedor).modal("toggle");
  }

  public ValidarMaximoLiquidacion() {

    const lstArchivosNuevo = this.lstArchivos.filter((e: any) => e.IdArchivo != this.IdArchivo);
    const facturaExistente = lstArchivosNuevo.find((element: any) => element.NumeroFactura == this.frmFactura.numeroFactura);

    if (facturaExistente != undefined) {
      this.global.VerAlertaTiempoLargo("Alerta", "El número de factura ingresado, ya se encuentra en uso en otra factura. No puede utilizarse nuevamente", "warning");
    } else {

      var cantidadActualArchivoDetalle = 0;
      for (const detalle of this.lstArchivoDetalles) {
        if (detalle.IdArchivoDetalle == this.idArchivoDetalle) {
          cantidadActualArchivoDetalle = detalle.Total;
        }
      }

      if (this.idArchivoDetalle == 0) {
        this.GestionArchivo();
      } else {
        this.spinner.show();
        this.dataInterna
          .ObtenerTotalFacturasDetalle(
            this.dtViaje.IdViaje,
            this.idArchivoDetalle,
            cantidadActualArchivoDetalle
          )
          .then((res) => {
            this.spinner.hide();
            var estado = res;
            if (estado == 1) {
              this.global.VerAlerta(
                this.textoInformacion,
                "Límite máximo de valores superado",
                "error"
              );
            } else {
              if (this.dtViaje.RealizoViaje == 1 && this.dtViaje.Regreso == 1) {
                this.GestionArchivo();
              } else if (
                this.dtViaje.RealizoViaje == 1 &&
                this.dtViaje.Regreso == 2
              ) {
                var diferencia = moment(this.dtViaje.RegresoFecha)
                  .startOf("day")
                  .diff(
                    moment(this.dtViaje.FechaFinViaje).startOf("day"),
                    "days"
                  );

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
                    const dineroNoches =
                      parseFloat(valueNight.ValorParametro) * diferencia;
                    var totalDineroDiasNoches =
                      dineroDias +
                      dineroNoches -
                      parseFloat(valueDay.ValorParametro);

                    var cantidad = 0;
                    for (const concepto of this.lstFacturaConceptos) {
                      cantidad = cantidad + parseFloat(concepto.Total);
                    }

                    var cantidadEntregada = 0;
                    for (var viatico of this.lstViaticos) {
                      if (viatico.Tipo == "Total") {
                        cantidadEntregada = parseFloat(viatico.Valor);
                      }
                    }

                    var cantidadFinal = cantidadEntregada + totalDineroDiasNoches;
                    var valorLiquidacion =
                      parseFloat(this.liquidacionMaxima) + cantidad;

                    this.spinner.hide();

                    if (valorLiquidacion > cantidadFinal) {
                      this.global.VerAlerta(
                        this.textoInformacion,
                        `<div style="text-align: justificacion !important">No se puede ingresar esta factura porque supera el valor de liquidación permitido.<br><br><b>Valor justificado hasta el momento: </b>${this.global.FormatearNumero(valorLiquidacion, 2)}<b>$</b><br><b>Valor máximo de liquidación permitido: </b>${this.global.FormatearNumero(cantidadFinal, 2)}<b>$</b></div>`,
                        "error"
                      );
                    } else {
                      this.GestionArchivo();
                    }
                  })
                  .catch((err) => {
                    this.spinner.hide();
                    console.log(err);
                  });
              }
            }
          })
          .catch((err) => {
            this.spinner.hide();
            console.log(err);
          });
      }

    }



  }

  public RegresarPagina() {
    const id = this.rutaActiva.snapshot.params.id;
    const url = "/contador/reservacion/detalle/" + id;
    this.rutaSistema.navigate([url]);
  }

  public FiltroCombo(value: any, tipo: any) {
    if (tipo == 1) {
      this.lstGrupoImpuestos = this.lstGrupoImpuestosFiltro.filter(
        (s) =>
          s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          s.Codigo.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else if (tipo == 2) {
      this.lstGrupoImpuestoElementos = this.lstGrupoImpuestoElementosFiltro.filter(
        (s) =>
          s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          s.Codigo.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else if (tipo == 3) {
      this.lstGrupoImpuestosRenta = this.lstGrupoImpuestosRentaFiltro.filter(
        (s) =>
          s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          s.Codigo.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else if (tipo == 4) {
      this.lstGrupoImpuestosIva = this.lstGrupoImpuestosIvaFiltro.filter(
        (s) =>
          s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          s.Codigo.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else if (tipo == 5) {
      this.lstApoyoFiscal = this.lstApoyoFiscalFiltro.filter(
        (s) =>
          s.Descripcion.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          s.Codigo.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  }

  public ObtenerCuentasDiariosAX() {
    this.dataInterna
      .ObtenerParametrosCuentasAX(this.dtViaje.Registrador.CodigoEmpresa)
      .then((res) => {
        this.lstParametrosCuentaAX = res[0];
      })
      .catch((err) => {
        console.log(err)
      });
  }

  windowLocationReload() {
    window.location.reload();
  }
}
