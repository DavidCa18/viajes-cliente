import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../externos/datos-externos.service";
import { ServicioDataInternos } from '../internos/datos-internos.service';

@Injectable()
export class ViaticosJustificadosServicio {
  IdLiquidacionViaje = 0;
  facturaDetalles = [];
  longFacturaDetalles = 0;
  public textoCodigoCompania = "&codigoCompania=";

  dtCabecera = {
    LiquidacionReembolsoCreditoDescripcionAx: "",
    NombreDiario: "",
    PerfilAnticipoViaticos: "",
  };
  token: any;
  constructor(private readonly global: ServicioGlobales, private readonly sesionExterna: ServicioSesionExterna, private readonly dataExterna: ServicioDataExternos, private readonly dataInterna: ServicioDataInternos) { this.token = this.sesionExterna.ObtenerClaveExterna(); }

  public DatosCabecera(dtViaje: any, IDAnticipoReferenciaPagoAx: any, diarioLiquidacionNombre: any, anticipoPerfil: any) {
    this.dtCabecera = {
      LiquidacionReembolsoCreditoDescripcionAx: "Viaje " + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + " Ref. Pago:" + IDAnticipoReferenciaPagoAx,
      NombreDiario: diarioLiquidacionNombre,
      PerfilAnticipoViaticos: anticipoPerfil,
    };

    var token = this.sesionExterna.ObtenerClaveExterna();

    var data = {
      Token: token.access_token,
      DataJSON: "?nombreDiario=" + this.dtCabecera.NombreDiario + "&descripcionDiario=" + this.dtCabecera.LiquidacionReembolsoCreditoDescripcionAx + this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa,
    };

    return new Promise<any>((resolve, reject) => {
      this.dataExterna
        .ObtenerDiarioAvance(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  public LineaProveedorFactura(
    dtViaje: any,
    viaticosJustificados: any,
    IdLiquidacionReembolsoCabeceraAx: any,
    IDAnticipoReferenciaPagoAx: any,
    diarioLiquidacionNombre: any,
    anticipoPerfil: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var jsonDepartamento = JSON.parse(dtViaje.DepartamentoUnoViaje);
      var departamento = jsonDepartamento.Codigo;

      this.dtCabecera = {
        LiquidacionReembolsoCreditoDescripcionAx: "Viaje " + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + " Ref. Pago:" + IDAnticipoReferenciaPagoAx,
        NombreDiario: diarioLiquidacionNombre,
        PerfilAnticipoViaticos: anticipoPerfil,
      };

      var data = {
        Token: this.token.access_token,
        DataJSON: "?numeroDiario=" + IdLiquidacionReembolsoCabeceraAx +
          "&valor=" + viaticosJustificados +
          "&fechaFactura=" + this.global.ObtenerFechaAX() +
          "&proveedor=" + dtViaje.Registrador.Identificacion +
          "&descripcion=" + this.dtCabecera.LiquidacionReembolsoCreditoDescripcionAx +
          "&numeroFactura=" + "''" +
          "&perfilAsiento=" + this.dtCabecera.PerfilAnticipoViaticos +
          "&referencia=" + IDAnticipoReferenciaPagoAx +
          "&departameto=" + departamento +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };

      this.dataExterna
        .EstablecerRegistroDiarioFactura(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public LineaFactura(
    dtViaje: any,
    IdGrupoImpuesto: any,
    IdGrupoImpuestoArticulo: any,
    IdSustentoTributario: any,
    IdRetencionRenta: any,
    IdRetencionIva: any,
    total: any,
    descripcion: any,
    IdLiquidacionReembolsoCabeceraAx: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var CuentaContableTipoGasto;
      if (dtViaje.TipoGastoViaje == "ADMINISTRATIVO") {
        CuentaContableTipoGasto = 56021108;
      } else {
        CuentaContableTipoGasto = 560515;
      }

      var jsonDepartamentoDosViaje = JSON.parse(dtViaje.DepartamentoDosViaje);
      var departamento = jsonDepartamentoDosViaje.Codigo;

      var jsonCentoCostos = JSON.parse(dtViaje.CentroCostoViaje);
      var centroCostos = jsonCentoCostos.Codigo;

      var jsonPropositoViaje = JSON.parse(dtViaje.PropositoViaje);
      var propositoViaje = jsonPropositoViaje.Codigo;

      var parametros = dtViaje.Registrador.CodigoEmpresa + "|" +
        dtViaje.TipoCuentaViaje + "|" +
        IdLiquidacionReembolsoCabeceraAx + "|" +
        CuentaContableTipoGasto + "|" +
        IdGrupoImpuesto + "|" +
        IdGrupoImpuestoArticulo + "|" +
        IdSustentoTributario + "|" +
        IdRetencionRenta + "|" +
        IdRetencionIva + "|" +
        departamento + "|" +
        centroCostos + "|" +
        propositoViaje + "|" +
        " " + "|" +
        " " + "|" +
        " " + "|" +
        "true" + "|";

      var data = {
        Token: this.token.access_token,
        DataJSON: "?parametros=" + parametros +
          "&valor=" + total +
          "&descripcion=" + descripcion +
          "&credito=" + false
      };

      this.dataExterna
        .LineaFactura(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  public RegistraDiario(dtViaje: any, IdLiquidacionReembolsoCabeceraAx: any) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?numeroDiario=" + IdLiquidacionReembolsoCabeceraAx +
          "&autorizacion=" + 0 +
          "&fechaVigencia=" + this.global.ObtenerFechaAX() +
          "&autorizacionElectronica=" + 0 +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };

      this.dataExterna
        .RegistraDiario(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public LiquidaDiarioFactura(
    dtViaje: any,
    IdLiquidacionReembolsoCreditoAx1: any,
    AnticipoNumeroAsientoAx: any,
  ) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?idRegistro=" + IdLiquidacionReembolsoCreditoAx1 + "&asiento=" + AnticipoNumeroAsientoAx + this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };
      this.dataExterna
        .LiquidarFacturaDiaria(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public CrearDatoAdicionalReembolso(
    dtViaje: any,
    identificacion: any,
    tipoDocumento: any,
    serie: any,
    secuencial: any,
    autorizacionFactura: any,
    fechaEmision: any,
    baseIvaCero: any,
    baseIva: any,
    iva: any,
    IdLiquidacionReembolsoCreditoAx1: any
  ) {
    var codigoTipoDocumento =
      tipoDocumento == "COMPROBANTE VENTA REEMBOLSO" ? "41" : tipoDocumento;

    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?proveedor=" + identificacion +
          "&idRegistro=" + IdLiquidacionReembolsoCreditoAx1 +
          "&tipoDocumento=" + codigoTipoDocumento +
          "&serie=" + serie +
          "&secuencial=" + secuencial +
          "&autorizacion=" + autorizacionFactura +
          "&fechaDocumento=" + fechaEmision +
          "&baseIvaCero=" + baseIvaCero +
          "&baseIva=" + baseIva +
          "&iva=" + iva +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };
      this.dataExterna
        .CrearDatoAdicionalReembolso(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public CierreDatoAdicionalReembolso(
    dtViaje: any,
    IdLiquidacionReembolsoCreditoAx1: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?idRegistro=" + IdLiquidacionReembolsoCreditoAx1 + this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };

      this.dataExterna
        .CierreDatoAdicionalReembolso(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public GestionLiquidacion(
    dtViaje: any,
    lista: any,
    listaValor: any,
    tipo: any,
    valor: any,
    identificador: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Identificador: 1,
        IdLiquidacionViaje: 0,
        IdViaje: dtViaje.IdViaje,
        Identificador_: identificador,
        Lista: lista,
        ListaValor: listaValor,
        Tipo: tipo,
        Valor: valor,
        Estado: 0,
      };
      this.dataInterna
        .GestionLiquidacionViaje(data)
        .then((res) => {
          resolve({
            estado: 1,
            datos: { IdLiquidacionViaje: res.IdLiquidacionViaje },
          });
        })
        .catch((err) => {
          reject({ estado: 2, datos: {} });
        });
    });
  }
}
