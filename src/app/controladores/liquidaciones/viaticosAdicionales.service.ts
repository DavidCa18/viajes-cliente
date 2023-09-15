import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../externos/datos-externos.service";

@Injectable()
export class ViaticosAdicionalesServicio {
  dtCabecera = { NombreDiario: "", AcreditacionDescripcionAx: "" };
  public textoCodigoCompania = "&codigoCompania=";
  token: any;
  constructor(
    private readonly global: ServicioGlobales,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna
  ) {
    this.token = this.sesionExterna.ObtenerClaveExterna();
  }
  public CrearDiario(dtViaje: any, diarioNombre: any) {
    this.dtCabecera = {
      NombreDiario: diarioNombre,
      AcreditacionDescripcionAx: "Viaje " + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta
    };
    var data = {
      Token: this.token.access_token,
      DataJSON:
        "?nombreDiario=" + this.dtCabecera.NombreDiario + "" +
        "&descripcionDiario=" + this.dtCabecera.AcreditacionDescripcionAx + "" +
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

  public LineaProveedorAnticipo(
    dtViaje: any,
    IdCabeceraAcreditacionAx: any,
    totalViaticos: any,
    diarioNombre: any
  ) {
    var jsonDepartamento = JSON.parse(dtViaje.DepartamentoUnoViaje);
    var departamento = jsonDepartamento.Codigo;

    this.dtCabecera = {
      NombreDiario: diarioNombre,
      AcreditacionDescripcionAx: "Viaje " + dtViaje.IdViaje + " " + dtViaje.FechaInicioViaje + "-" + dtViaje.FechaFinViaje + " " + dtViaje.Transporte.Ruta.NombreRuta
    }

    return new Promise<any>((resolve, reject) => {
      var data = {
        Token: this.token.access_token,
        DataJSON: "?numeroDiario=" + IdCabeceraAcreditacionAx +
          "&valor=" + totalViaticos +
          "&fechaTransaccion=" + this.global.ObtenerFechaAX() +
          "&proveedor=" + dtViaje.Registrador.Identificacion +
          "&descripcion=" + this.dtCabecera.AcreditacionDescripcionAx +
          "&referencia=" + "Sol Viaje " + dtViaje.IdViaje +
          "&departameto=" + departamento +
          this.textoCodigoCompania + dtViaje.Registrador.CodigoEmpresa
      }
      this.dataExterna
        .LineaProveedorAnticipo(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  public RegistraDiario(dtViaje: any, IdCabeceraAcreditacionAx: any) {
    var data = {
      Token: this.token.access_token,
      DataJSON: "?numeroDiario=" + IdCabeceraAcreditacionAx +
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
