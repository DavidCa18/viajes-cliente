import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../externos/datos-externos.service";

@Injectable()
export class NoViajoServicio {
  dtCabecera = {
    NombreDiarioGeneral: "",
    LiquidacionDevolucionDescripcionAx: "",
    PerfilAnticipoViaticos: "",
    CuentaContablePVNJ: "",
  };

  token: any;
  public textoCodigoCompania = "&codigoCompania=";
  public textoReferenciaPago = " Ref. Pago:";
  public textoViajeNoUtilizado = "ViaNoUtilizado Viaje ";

  constructor(private readonly global: ServicioGlobales, private readonly sesionExterna: ServicioSesionExterna, private readonly dataExterna: ServicioDataExternos) { this.token = this.sesionExterna.ObtenerClaveExterna(); }

  public CrearDiarioCuatro(dtViaje: any, IDAnticipoReferenciaPagoAx: any, diarioNombre: any, anticipoPerfil: any, pvnjCuentaContable: any) {
    this.dtCabecera = {
      NombreDiarioGeneral: diarioNombre,
      LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
      PerfilAnticipoViaticos: anticipoPerfil,
      CuentaContablePVNJ: pvnjCuentaContable,
    };

    var data = {
      Token: this.token.access_token,
      DataJSON:
        "?nombreDiario=" + this.dtCabecera.NombreDiarioGeneral + "" +
        "&descripcionDiario=" + this.dtCabecera.LiquidacionDevolucionDescripcionAx + "" +
        this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
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

  public LineaProveedorLiquidaAnticipoCuatro(
    dtViaje: any,
    IdLiquidacionDevolucionCabeceraAx: any,
    viaticosEntregados: any,
    IdCabeceraAnticipoAx: any,
    IDAnticipoReferenciaPagoAx: any,
    diarioNombre: any,
    anticipoPerfil: any,
    pvnjCuentaContable: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.dtCabecera = {
        NombreDiarioGeneral: diarioNombre,
        LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
        PerfilAnticipoViaticos: anticipoPerfil,
        CuentaContablePVNJ: pvnjCuentaContable,
      };

      var jsonDepartamentoUnoViaje = JSON.parse(dtViaje.DepartamentoUnoViaje);
      var departamento = jsonDepartamentoUnoViaje.Codigo;

      var data = {
        Token: this.token.access_token,
        DataJSON: "?numeroDiario=" + IdLiquidacionDevolucionCabeceraAx +
          "&valor=" + viaticosEntregados.toFixed(2) +
          "&fechaTransaccion=" + this.global.ObtenerFechaAX() +
          "&proveedor=" + dtViaje.Registrador.Identificacion +
          "&descripcion=" + this.dtCabecera.LiquidacionDevolucionDescripcionAx +
          "&referencia=" + IdCabeceraAnticipoAx +
          "&departameto=" + departamento +
          "&perfilAsiento=" + this.dtCabecera.PerfilAnticipoViaticos +
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

  public LineaLiquidacionCuatro(
    dtViaje: any,
    IdLiquidacionDevolucionCabeceraAx: any,
    viaticosEntregados: any,
    IDAnticipoReferenciaPagoAx: any,
    diarioNombre: any,
    anticipoPerfil: any,
    pvnjCuentaContable: any
  ) {
    this.dtCabecera = {
      NombreDiarioGeneral: diarioNombre,
      LiquidacionDevolucionDescripcionAx: this.textoViajeNoUtilizado + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta + this.textoReferenciaPago + IDAnticipoReferenciaPagoAx,
      PerfilAnticipoViaticos: anticipoPerfil,
      CuentaContablePVNJ: pvnjCuentaContable,
    };

    return new Promise<any>((resolve, reject) => {
      var jsonDepartamentoUnoViaje = JSON.parse(dtViaje.DepartamentoUnoViaje);
      var departamento = jsonDepartamentoUnoViaje.Codigo;

      var parametros = dtViaje.Registrador.CodigoEmpresa + "|" + dtViaje.TipoCuentaViaje + "|" + IdLiquidacionDevolucionCabeceraAx + "|" + this.dtCabecera.CuentaContablePVNJ + "|" + departamento + "|" + " " + "|" + " " + "|" + " " + "|";

      var data = {
        Token: this.token.access_token,
        DataJSON: "?parametros=" + parametros +
          "&valor=" + viaticosEntregados +
          "&descripcion=" + this.dtCabecera.LiquidacionDevolucionDescripcionAx +
          "&fechaTransaccion=" + this.global.ObtenerFechaAX()
      }

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

  public RegistraDiarioCuatro(dtViaje: any, IdLiquidacionDevolucionCabeceraAx: any) {
    var data = {
      Token: this.token.access_token,
      DataJSON: "?numeroDiario=" + IdLiquidacionDevolucionCabeceraAx +
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
}
