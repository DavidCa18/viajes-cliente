import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../environments/environment";
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';

declare var $: any;
declare var google: any;
declare var moment: any;
@Component({
  selector: "app-view-task",
  templateUrl: "./vista-tarea.component.html",
  styleUrls: ["./vista-tarea.component.css"],
})
export class VistaTareaComponent implements OnInit {

  public mensaje = "Cargando Información...";
  tipoMenu = 1;
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
  proximaActividad: any = {
    ActividadAnterior: "",
    ActividadSiguiente: "",
    DescripcionEstado: null,
    FechaActividad: null,
    IdActividad: 0,
    IdEstado: 0,
    IdViaje: 0,
    NombreActividad: null,
    Observaciones: null,
    Responsable: "",
  };

  public dtContabilidad = {
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

  public lstRegistroActividades: any;

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
  lstCentroCosto: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: "" }>;
  lstCentroCostroFiltro: Array<{ Codigo: ""; Descripcion: ""; CodigoDescripcion: ""; }>;
  requerimientoPagoExitoso = [];
  lstRequerimientosPago = [];
  urlArchivo = "";
  nombreArchivo = "";

  public vistaContabilidad = false;

  public vistaCeroArchivosMH = false;

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

  dtAsientoViaje = {
    CierreDiario: "",
    CodigoDiario: "",
    IdAsientoViaje: 0,
    Identificador: 0,
    RegistroDiario: "",
    Viaje: null,
  };

  IdCabeceraAnticipoAx;
  IDAnticipoReferenciaPagoAx;
  AnticipoNumeroAsientoAx;
  lstViaticosAvance = [];
  totalViaticos = 0;

  lstArchivos = [];

  fmrDetalles = {
    justificacion: 0,
    viaticos: 0,
    creditoPendiente: 0,
    diferencia: 0,
  };

  valorAdicionalAcreditacion: any = 0.0;
  valorTotalLiquidacion: any = 0.0;

  urlVisualizarRide = environment.urlVisualizarRide;

  proximaActividadVista: any = {
    proceso: true,
    rechazada: false,
    finalizada: false
  }

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly rutaActiva: ActivatedRoute,
    private readonly rutaSistema: Router,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly global: ServicioGlobales
  ) { }

  ngOnInit() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public ObtenerViaje(id: any) {
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        if (
          this.dtViaje.Estado.IdEstado == 1 ||
          this.dtViaje.Estado.IdEstado == 3 ||
          this.dtViaje.Estado.IdEstado == 4
        ) {
          this.vistaContabilidad = false;
        } else {
          this.vistaContabilidad = true;
        }

        if (this.dtViaje.RequiereHospedajeViaje == 'Sí') {
          this.vistaCeroArchivosMH = false;
        } else if (this.dtViaje.TipoViaje == 'Aéreo' && this.dtViaje.Transporte.RequierePasajeAereo == 'Sí') {
          this.vistaCeroArchivosMH = false;
        } else if (this.dtViaje.TipoViaje == 'Terrestre' && this.dtViaje.Transporte.MovilizacionTerrestre == 'No' && this.dtViaje.Transporte.MovilizacionTerrestreContratada == 'Sí') {
          this.vistaCeroArchivosMH = false;
        } else {
          this.vistaCeroArchivosMH = true;
        }

        var ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
        this.setMap(ubicacion.lat, ubicacion.lng);
        this.CargarRegistroActividades(id);
      })
  }

  public CargarRegistroActividades(IdViaje: any) {
    this.spinner.show();
    this.dataInterna
      .ListarRegistroActividadViaje(IdViaje)
      .then((res) => {
        this.lstRegistroActividades = res;
        this.spinner.hide();
        this.ObtenerViatico(IdViaje);
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
        var tmpViatics: any = this.lstViaticos.find((e: any) => e.Tipo == "Total");
        this.totalViaticos = parseFloat(tmpViatics.Valor);
        this.fmrDetalles.viaticos = parseFloat(tmpViatics.Valor);
        setTimeout(() => {
          this.ListarProximaActividadViaje();
        }, 1000);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public Calculos() {
    var justificacion = 0;
    for (const invoice of this.lstArchivos) {
      justificacion += parseFloat(invoice.TotalLiquidar);
    }
    this.fmrDetalles.justificacion = Math.round(justificacion * 100) / 100;
    this.fmrDetalles.creditoPendiente = Math.round((this.fmrDetalles.justificacion - this.fmrDetalles.viaticos) * 100) / 100;
  }

  public ListarProximaActividadViaje() {
    var IdActividad =
      this.lstRegistroActividades[this.lstRegistroActividades.length - 1]
        .IdActividad;
    this.spinner.show();
    this.dataInterna
      .ListarProximaActividadViaje(this.idViaje, IdActividad)
      .then((res) => {
        this.spinner.hide();
        this.proximaActividad = res;
        if (this.proximaActividad.ActividadSiguiente == "FINALIZACIÓN DEL PROCESO POR NEGACIÓN") {
          this.proximaActividadVista = { proceso: false, rechazada: true, finalizada: false };
        } else if (this.proximaActividad.ActividadSiguiente == "FINALIZACIÓN DEL PROCESO DE VIAJE") {
          this.proximaActividadVista = { proceso: false, rechazada: false, finalizada: true };
        } else {
          this.proximaActividadVista = { proceso: true, rechazada: false, finalizada: false };
        }
        this.ObtenerDepartamento();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public IrModificarViaje() {
    this.rutaSistema.navigate([
      "/cliente/reservacion/editar/" + this.dtViaje.IdViaje,
    ]);
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

        if (this.dtViaje.Estado.IdEstado >= 6) {
          this.ObtenerArchivo();
        }

      })
      .catch((err) => {
        this.spinner.hide();
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
        var tmpViatics: any = this.lstViaticos.find((e: any) => e.Tipo == "Total");
        this.totalViaticos = parseFloat(tmpViatics.Valor);

        this.Calculos();
        setTimeout(() => {
          this.VerificarCantidadAdicionalAcreditacion();
        }, 1000);

      })
      .catch((err) => {
        this.spinner.hide();
        console.log(err);
      });
  }

  public VerificarPagoRespuestaVista(param: any) {
    const result = this.requerimientoPagoExitoso.find((e: any) => e == param);
    if (result == undefined) {
      return false;
    } else {
      return true;
    }
  }

  public ObtenerDocumentoSolicitudPago(type: any) {
    var tempLstId: any = this.lstRequerimientosPago.find((e: any) => e.Tipo == type);
    var id: any = tempLstId.IdDocumentoSolicitudPago;
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

  public RegresarPagina() {
    history.back();
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

  public DescargarArchivoFactura(param: any) {

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

  public DescargarArchivoBase64Factura(nombreArchivo: any, base64Data: any) {
    const linkSource = base64Data;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = nombreArchivo;
    downloadLink.click();
  }

  public VerificarCreditoPendiente() {
    return Math.sign(this.fmrDetalles.creditoPendiente);
  }

}
