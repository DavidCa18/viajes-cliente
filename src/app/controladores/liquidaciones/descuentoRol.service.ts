import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../externos/datos-externos.service";
import { ServicioDataInternos } from '../internos/datos-internos.service';

@Injectable()
export class DescuentoRolServicio {
  dtCabecera = {
    LiquidacionReembolsoCreditoDescripcionAx: "",
    NombreDiario: "",
    PerfilAnticipoViaticos: "",
  };
  dtCabeceraDos = {
    NombreDiarioGeneral: "",
    LiquidacionDevolucionDescripcionAx: "",
    PerfilAnticipoViaticos: "",
    CuentaContablePVNJ: "",
  };
  token: any;
  public textoCodigoCompania = "&codigoCompania=";
  public textoReferenciaPago = " Ref. Pago:";
  public textoViajeNoUtilizado = "ViaNoUtilizado Viaje ";

  constructor(
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly global: ServicioGlobales,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos
  ) {
    this.token = this.sesionExterna.ObtenerClaveExterna();
  }

  public CrearDiarioDos(dtViaje: any, IDAnticipoReferenciaPagoAx: any, diarioNombre: any, anticipoPerfil: any, pvnjCuentaContable: any) {
    return new Promise<any>((resolve, reject) => {
      this.dtCabeceraDos = {
        NombreDiarioGeneral: diarioNombre,
        LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
        PerfilAnticipoViaticos: anticipoPerfil,
        CuentaContablePVNJ: pvnjCuentaContable,
      };

      var data = {
        Token: this.token.access_token,
        DataJSON:
          "?nombreDiario=" + this.dtCabeceraDos.NombreDiarioGeneral +
          "&descripcionDiario=" + this.dtCabeceraDos.LiquidacionDevolucionDescripcionAx +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };

      this.dataExterna
        .ObtenerDiarioAvance(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public LineaProveedorLiquidaAnticipo(
    dtViaje: any,
    IdCabeceraLiquidacionAx2: any,
    viaticosPendientes: any,
    IDAnticipoReferenciaPagoAx: any,
    diarioNombre: any,
    anticipoPerfil: any,
    pvnjCuentaContable: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var jsonDepartamentoUnoViaje = JSON.parse(dtViaje.DepartamentoUnoViaje);
      var departamento = jsonDepartamentoUnoViaje.Codigo;

      this.dtCabeceraDos = {
        NombreDiarioGeneral: diarioNombre,
        LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
        PerfilAnticipoViaticos: anticipoPerfil,
        CuentaContablePVNJ: pvnjCuentaContable,
      };

      var data = {
        Token: this.token.access_token,
        DataJSON: "?numeroDiario=" + IdCabeceraLiquidacionAx2 +
          "&valor=" + viaticosPendientes * (-1) +
          "&fechaTransaccion=" + this.global.ObtenerFechaAX() +
          "&proveedor=" + dtViaje.Registrador.Identificacion +
          "&descripcion=" + this.dtCabeceraDos.LiquidacionDevolucionDescripcionAx +
          "&referencia=" + 0 +
          "&departameto=" + departamento +
          "&perfilAsiento=" + this.dtCabeceraDos.PerfilAnticipoViaticos +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      };

      this.dataExterna
        .LineaProveedorLiquidaAnticipo(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public LineaLiquidacion(
    dtViaje: any,
    IdCabeceraLiquidacionAx2: any,
    viaticosPendientes: any,
    IDAnticipoReferenciaPagoAx: any,
    diarioNombre: any,
    anticipoPerfil: any,
    pvnjCuentaContable: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var jsonDepartamentoUnoViaje = JSON.parse(dtViaje.DepartamentoUnoViaje);
      var departamento = jsonDepartamentoUnoViaje.Codigo;
      this.dtCabeceraDos = {
        NombreDiarioGeneral: diarioNombre,
        LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
        PerfilAnticipoViaticos: anticipoPerfil,
        CuentaContablePVNJ: pvnjCuentaContable,
      };
      var parametros = dtViaje.Registrador.CodigoEmpresa + "|" + dtViaje.TipoCuentaViaje + "|" + IdCabeceraLiquidacionAx2 + "|" + this.dtCabeceraDos.CuentaContablePVNJ + "|" + departamento + "|" + " " + "|" + " " + "|" + " " + "|";
      var data = {
        Token: this.token.access_token,
        DataJSON: "?parametros=" + parametros +
          "&valor=" + viaticosPendientes * (-1) +
          "&descripcion=" + this.dtCabeceraDos.LiquidacionDevolucionDescripcionAx +
          "&fechaTransaccion=" + this.global.ObtenerFechaAX()
      };
      this.dataExterna
        .LineaLiquidacion(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public RegistraDiario(dtViaje: any, IdCabeceraLiquidacionAx2: any) {
    var data = {
      Token: this.token.access_token,
      DataJSON: "?numeroDiario=" + IdCabeceraLiquidacionAx2 +
        "&autorizacion=" + "''" +
        "&fechaVigencia=" + this.global.ObtenerFechaAX() +
        "&autorizacionElectronica=" + "''" +
        this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
    };

    return new Promise<any>((resolve, reject) => {
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
    IdDetalleLiquidacionCreditoAx2: any,
    AnticipoNumeroAsientoAx: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?idRegistro=" + IdDetalleLiquidacionCreditoAx2 +
          "&asiento=" + AnticipoNumeroAsientoAx +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
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
    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?proveedor=" + identificacion +
          "&idRegistro=" + IdLiquidacionReembolsoCreditoAx1 +
          "&tipoDocumento=" + tipoDocumento +
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
    IdCabeceraLiquidacionAx2: any,
    IdDetalleLiquidacionCreditoAx2: any,
    IdDetalleDebitoLiquidacionAx: any,
    IdCierreLiquidacionAx2: any,
    IdLiquidacionDevolucionCierreAsientoAx: any
  ) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        Identificador: 2,
        IdLiquidacionViaje: 0,
        IdViaje: dtViaje.IdViaje,
        Identificador_: "L_NORMAL",
        IdLiquidacionReembolsoCabeceraAx: "",
        IdLiquidacionReembolsoCreditoAx1: "",
        IdCabeceraLiquidacionAx2: IdCabeceraLiquidacionAx2,
        IdDetalleLiquidacionCreditoAx2: IdDetalleLiquidacionCreditoAx2,
        IdDetalleDebitoLiquidacionAx: IdDetalleDebitoLiquidacionAx,
        IdCierreLiquidacionAx2: IdCierreLiquidacionAx2,
        IdLiquidacionDevolucionCierreAsientoAx:
          IdLiquidacionDevolucionCierreAsientoAx,
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
          console.log(err);
        });
    });
  }
}
