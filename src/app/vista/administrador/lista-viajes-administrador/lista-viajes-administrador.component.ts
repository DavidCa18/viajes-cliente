import { Component, OnInit } from "@angular/core";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { process, State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Workbook } from "exceljs";
import * as fs from "file-saver";

declare var $: any;
declare var google: any;
declare var moment: any;
@Component({
  selector: "app-lista-viajes-administrador",
  templateUrl: "./lista-viajes-administrador.component.html",
})
export class ListaViajesAdministradorComponent implements OnInit {
  public mensaje = "Cargando Información...";
  public formatoGenericoFecha = "YYYY-MM-DD";
  public formatoGenericoFechaReporte = "DD/MM/YYYY LT";

  public viaje: any = {
    Aprobador: {
      Ciudad: "",
      IdAprobador: 0,
      Identificador: 0,
      Nombre: "",
      Usuario: "",
    },
    CatalogoEstado: "",
    CentroCostoViaje: "",
    ComentariosDosViaje: "",
    ComentariosUnoViaje: "",
    Contador: {
      Ciudad: "",
      IdContador: 0,
      Identificador: 0,
      Nombre: "",
      Usuario: "",
    },
    CostoViaje: "",
    DepartamentoDosViaje: "",
    DepartamentoUnoViaje: "",
    DescripcionViaje: "",
    Estado: {
      DescripcionEstado: "",
      Estado: 0,
      IdEstado: 0,
      Identificador: 0,
      IdentificadorEstado: null,
    },
    FechaAprobacionViaje: "",
    FechaFinViaje: "",
    FechaInicioViaje: "",
    FechaMaximaLiquidacionViaje: "",
    FechaSolicitudViaje: "",
    Hotel: {
      CargoAutorizadoHotel: "",
      CiudadHotel: "",
      DescripcionHotel: "",
      EmailHotel: "",
      EstadoHotel: 0,
      IdHotel: 0,
      Identificador: 0,
      Imagen: "",
      LatLongHotel: '{"lat": -0.197135,"lng":-78.48964}',
      NombreHotel: "",
      TarifaHotel: "",
    },
    IdViaje: 0,
    Identificador: 0,
    MotivoViaje: "",
    NombreViaje: "",
    NumeroDiasViaje: "",
    NumeroNochesViaje: "",
    PreAprobador: {
      Ciudad: "",
      IdPreAprobador: 0,
      Identificador: 0,
      Nombre: "",
      Usuario: "",
    },
    PropositoViaje: "",
    RealizoViaje: "",
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
    RegistradorPago: {
      Ciudad: "",
      IdRegistradorPago: 0,
      Identificador: 0,
      Nombre: "",
      Usuario: "",
    },
    Regreso: "",
    RegresoFecha: "",
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
        DescripcionRuta: "",
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

  public lstViajes = [];
  public dtsViajes: any;
  public state: State = { skip: 0, take: 30 };
  public lstRegistroActividades: any;
  public gridData: GridDataResult = process(this.lstViajes, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly rutaSistema: Router,
    public global: ServicioGlobales,
  ) {}

  ngOnInit() {
    this.ObtenerListadoViajes();
  }

  public ObtenerListadoViajes() {
    this.spinner.show();

    var parametros: any = {
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

    this.dataInterna
      .ObtenerParametrosViajeDistinct(parametros)
      .then((res) => {
        this.lstViajes = res;
        this.dtsViajes = this.lstViajes.slice();
        this.gridData = process(this.lstViajes, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ListarRegistroActividadViaje(idViaje: any) {
    this.spinner.show();
    this.dataInterna
      .ListarRegistroActividadViaje(idViaje)
      .then((res) => {
        this.lstRegistroActividades = res;

        $("#registroActividadModal").modal("show");

        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public AbrirModalDetalleViaje(viajeSeleccionado: any) {
    this.viaje = viajeSeleccionado;
    this.geocodeLatLng();
    $("#modalDetalleViaje").modal("show");
  }

  public geocodeLatLng() {
    var valores = JSON.parse(this.viaje.Hotel.LatLongHotel);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: valores }, (results: any, status: any) => {
      if (status === "OK") {
        $("#direccionHotel").val(results[0].formatted_address);
      } else {
        this.global.Alerta(
          "Información",
          "Geocoder failed due to: " + status,
          "error"
        );
      }
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstViajes, this.state);
  }

  public CargarHistorialActividades(viajeSeleccionado: any) {
    this.rutaSistema.navigate([
      "/cliente/reservacion/ver-tarea/" + viajeSeleccionado,
    ]);
  }

  public DescargarExcel() {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet("Viajes");

    const headerRow = worksheet.addRow([
      "Número de Solicitud",
      "Departamento Usuario",
      "Cargo Usuario",
      "Nombre Usuario",
      "Email Usuario",
      "Ciudad Usuario",
      "Fecha Solicitud",
      "Nombre Corto Solicitud",
      "Cédula Usuario",
      "Fecha Inicio de Viaje",
      "Fecha Fin de Viaje",
      "Tipo de Viaje",
      "Requiere Hospedaje",
      "Es Capacitación",
      "Nombre de Capacitación",
      "Motivo del Viaje",
      "Otros Víaticos Entregados",
      "Total Víaticos Entregados",
      "Modo de Pago",
      "Diario Anticipo Entregado",
      "Referencia de Pago",
      "Número Asiento Anticipo Entregado",
      "Tipo Cuenta",
      "Comentario Liquidación",      
      "No. Diario Anticipo AX",
      "No. Diario Liquidación AX 1",
      "No. Diario Liquidación AX 2",
      "Tipo de Diario",
      "Nombre de Diario",
      "Nombre Proyecto",
      "Fecha Fin de Liquidación",
      "Realizo el Viaje",
      "Regreso en la fecha Establecida",
      "Utilizó Agencia",
      "Num Noches Hospedaje",
      "Hospedaje Cancelado?",
      "Solicitud Pago Generada?",
      "Nombre Hotel",
      "Tarifa Hotel (x Noche)",
      "Ciudad Hotel",
      "Email",
      "Estado Registro Hotel",
      "Require Pasaje Aéreo",
      "Tiene Transporte Propio",
      "Destino/Ruta Transporte Terrestre",
      "Total Kilometraje Transporte Terrestre",
      "Destino/Ruta Aérea",
      "Estado Registro Destino/Ruta Aérea",
      "Nombre Agencia",
      "RUC Agencia",
      "Persona Contacto Agencia",
      "Email Agencia",
      "Dirección Agencia",
      "Teléfono Agencia",
      "Nombre Transportista",
      "Cédula/RUC Transportista",
      "Teléfono Transportista",
      "Email Transportista",
      "Valor Transportista",
      "Nombre Aerolínea Pasaje",
      "Fecha de Emisión Pasaje",
      "Número de Pasaje",
      "Referencia de Pago Pasaje",
      "Valor Pasaje",
      "Impuesto Aéreo Pasaje",
      "Porcentaje Pasaje",
      "Total Pasaje",
      "Fecha Aprobación",
      "Nombre Usuario Aprobación",
      "Comentarios Aprobación",
      "Accion Aprobación",
    ]);

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "053A63" },
      };
      cell.font = {
        color: { argb: "FFFFFF" },
        bold: true,
        name: "Cambria",
        family: 4,
        size: 10,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    this.lstViajes.sort((a: any, b: any) => b.IdViaje - a.IdViaje);

    this.lstViajes.forEach((element) => {
      var fechaAux1 =
      `${moment(element.FechaInicioViaje).format(this.formatoGenericoFecha)} ${element.HoraInicioViaje}`;
      var fechaAux2 =
      `${moment(element.FechaFinViaje).format(this.formatoGenericoFecha)} ${element.HoraFinViaje}`;
      var fechaAux3 =
        element.Reporte.FechaFinLiquidacion == ""
          ? ""
          : moment(element.Reporte.FechaFinLiquidacion).format("DD/MM/YYYY");

        var realizoViaje:any;

      const referenceRow = worksheet.addRow([
        element.IdViaje,
        element.Registrador.Departamento,
        element.Registrador.Cargo,
        element.NombreViaje,
        element.Registrador.Email,
        element.Registrador.Ciudad,
        moment(element.FechaSolicitudViaje).format(this.formatoGenericoFechaReporte),
        element.MotivoViaje,
        element.Registrador.Identificacion,
        moment(fechaAux1).format(this.formatoGenericoFechaReporte),
        moment(fechaAux2).format(this.formatoGenericoFechaReporte),
        element.TipoViaje,
        element.RequiereHospedajeViaje,
        element.ViajeCapacitacion,
        element.ViajeCapacitacion == "Sí" ? element.MotivoViaje : "",
        element.MotivoViaje,
        element.Reporte.ViaticosAdicionales ,
        this.global.FormatearNumeroPunto(
          element.Reporte.ViaticosAdicionalesValor,
          2
        ) ,
        "",
        element.Reporte.CodigoDiarioAnticipoViaje,
        element.Reporte.ReferenciaPago,
        element.Reporte.AnticipoNumeroAsientoAxViaje,
        "Contabilidad",
        element.Reporte.ComentarioLiquidacion,
        element.Reporte.NoDiarioAnticipoAX ,
        element.Reporte.NoDiarioAnticipoAX1 ,
        element.Reporte.NoDiarioAnticipoAX2 ,
        "Diario de Facturas",
        "AJUSTES GENERALES",
        "",
        fechaAux3 ,
        element.RealizoViaje == null
          ? ""
          : element.RealizoViaje == "1"
          ? "Sí"
          : "No",
        element.Regreso == null ? "" : element.Regreso == "1" ? "Sí" : "No",
        "" ,
        element.NumeroNochesViaje == null ? "" : element.NumeroNochesViaje,
        "" ,
        element.Reporte.SolicitudPagoGenerada,
        element.Hotel.NombreHotel,
        element.Hotel.TarifaHotel,
        element.Hotel.CiudadHotel,
        element.Hotel.EmailHotel,
        "" /* No hay esta información - Estado Registro Hotel- */,
        element.Transporte.RequierePasajeAereo,
        element.Transporte.MovilizacionTerrestre,
        element.TipoViaje == "Terrestre"
          ? element.Transporte.Ruta.NombreRuta
          : "",
        element.TipoViaje == "Terrestre"
          ? element.Transporte.ValorTerrestre
          : "",
        element.TipoViaje !== "Terrestre"
          ? element.Transporte.Ruta.NombreRuta
          : "",
        "" /* No hay esta información - Estado Registro Destino/Ruta Aérea- */,
        "" /* No hay esta información - Nombre Agencia- */,
        "" /* No hay esta información - RUC AGENCIA- */,
        "" /* No hay esta información - Persona Contacto Agencia- */,
        "" /* No hay esta información - Email Agencia- */,
        "" /* No hay esta información - Dirección Agencia- */,
        "" /* No hay esta información - Teléfono Agencia- */,
        "" /* No hay esta información - Nombre Transportista- */,
        "" /* No hay esta información - Cédula/RUC Transportista- */,
        "" /* No hay esta información - Teléfono Transportista- */,
        "" /* No hay esta información - Email Transportista- */,
        "" /* No hay esta información - Valor Transportista- */,
        element.Transporte.NombreAerolineaAereo,
        element.TipoViaje == "Terrestre"
          ? ""
          : element.Transporte.FechaEmisionAereo,
        element.Transporte.NumeroPasajeAereo,
        element.Transporte.ReferenciaAereo,
        element.Transporte.ValorAereo,
        element.Transporte.ImpuestoAereo,
        element.Transporte.ImpuestoPorcentajeAereo,
        element.Transporte.TotalAereo,
        moment(fechaAux1).format(this.formatoGenericoFechaReporte),
        element.Aprobador.Nombre,
        "",
        element.Estado.DescripcionEstado,
      ]);

      referenceRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF" },
        };
        cell.font = {
          color: { argb: "000000" },
          bold: false,
          name: "Cambria",
          family: 4,
          size: 9,
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    worksheet.columns.forEach(function (column, i) {
      if (i !== 0) {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(
        blob,
        `Reporte viajes hasta ${moment().format(this.formatoGenericoFecha)}.xlsx`
      );
    });
  }
}
