import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioApi } from "../../servicios/api/api.service";

@Injectable()
export class ServicioDataInternos {

  public nombreArchivo = "data.internal.service.ts";

  constructor(
    private readonly conexion: ServicioApi,
    private readonly globales: ServicioGlobales
  ) { }

  public ObtenerRutas() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/viaje/listar/Rutas")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Rutas</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerRutas",
              "AccesoServicios/AccesoServicio.svc/api/interno/viaje/listar/Rutas",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerCiudadesViajes() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/catalogo/Ciudades")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Ciudades</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerCiudadesViajes",
              "AccesoServicios/AccesoServicio.svc/api/interno/catalogo/Ciudades",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerParametro() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/parametros/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Parametros</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/parametros/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerDatosUsuario(
    CargoPA: any,
    CargoC: any,
    CargoRP: any,
    CargoT: any,
    Ciudad: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/usuario/ObtenerDatosUsuario?cargoPA=${CargoPA}&cargoC=${CargoC}&CargoRP=
${CargoRP}&CargoT=${CargoT}&ciudad=${Ciudad}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Datos Usuario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDatosUsuario",
              "AccesoServicios/AccesoServicio.svc/api/interno/usuario/ObtenerDatosUsuario",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerHotel(destino: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/hoteles/Listar/${destino}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Hotel</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerHotel",
              "AccesoServicios/AccesoServicio.svc/api/interno/hoteles/Listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionarViaje(travel: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post("AccesoServicios/AccesoServicio.svc/api/interno/viajes/Gestion", travel).subscribe((res: any) => {
        if (res.IdViaticos != null) {
          resolve({ Estado: "OK", Resultado: res });
        } else {
          resolve({ Estado: "ERROR", Resultado: res });
        }
      }, (err) => {
        reject(err);
        this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestionar Viaje</b>", "error", "top-end");
        this.conexion.GuardarError(this.nombreArchivo, "GestionarViaje", "AccesoServicios/AccesoServicio.svc/api/interno/viajes/Gestion", err.status, err.url, err.error);
      });
    });
  }

  public ObtenerEstado() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/estados/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Estado</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerEstado",
              "AccesoServicios/AccesoServicio.svc/api/interno/estados/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerViajes(usuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/Usuario/${usuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Viajes/b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerViajes",
              "AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/Usuario/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerViaje(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/viaje/listar/Codigo/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/viaje/listar/Codigo/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerParametrosViaje(datos: any) {
    return new Promise<any>((resolve, reject) => {
      var parametros = {
        usuario: datos.usuario,
        preaprobador: datos.preaprobador,
        registradorPago: datos.registradorPago,
        aprobador: datos.aprobador,
        contador: datos.contador,
        viaje: datos.viaje,
        ruta: datos.ruta,
        hotel: datos.hotel,
        estado: datos.estado,
        ciudad: datos.ciudad,
      };
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/usuario/Parametros?usuario=${parametros.usuario}&solicitud=
${parametros.viaje}&ruta=${parametros.ruta}&hotel=${parametros.hotel}&aprobador=${parametros.aprobador}&estado=
${parametros.estado}&ciudad=${parametros.ciudad}&preaprobador=${parametros.preaprobador}&registradorPago=
${parametros.registradorPago}&contador=${parametros.contador}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Parametros Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerParametrosViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/usuario/Parametros?usuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerParametrosViajeDistinct(datos: any) {
    return new Promise<any>((resolve, reject) => {
      var parametros = {
        usuario: datos.usuario,
        preaprobador: datos.preaprobador,
        registradorPago: datos.registradorPago,
        aprobador: datos.aprobador,
        contador: datos.contador,
        viaje: datos.viaje,
        ruta: datos.ruta,
        hotel: datos.hotel,
        estado: datos.estado,
        ciudad: datos.ciudad,
      };
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/usuario/parametros/Distintos?usuario=${parametros.usuario}&solicitud=
${parametros.viaje}&ruta=${parametros.ruta}&hotel=${parametros.hotel}&aprobador=${parametros.aprobador}&estado=
${parametros.estado}&ciudad=${parametros.ciudad}&preaprobador=${parametros.preaprobador}&registradorPago=
${parametros.registradorPago}&contador=${parametros.contador}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Parametros Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerParametrosViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/viajes/listar/usuario/parametros/Distintos?usuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionAsientoViaje(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.post("AccesoServicios/AccesoServicio.svc/api/interno/asiento/viaje/Gestion", data).subscribe((res: any) => {
        if (res.IdAsientoViaje != null && res.IdAsientoViaje > 0) {
          resolve({ Estado: "OK", Resultado: res });
        } else {
          resolve({ Estado: "ERROR", Resultado: res });
        }
      }, (err) => {
        reject(err);
        this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Asiento Viaje</b>", "error", "top-end");
        this.conexion.GuardarError(this.nombreArchivo, "GestionAsientoViaje", "AccesoServicios/AccesoServicio.svc/api/interno/asiento/viaje/Gestion", err.status, err.url, err.error);
      });
    });
  }

  public ObtenerAsientoViaje(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/asiento/viaje/Listar/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Asiento Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerAsientoViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/asiento/viaje/Listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerViatico(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/viaticos/Listar/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Viatico</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerViatico",
              "AccesoServicios/AccesoServicio.svc/api/interno/viaticos/Listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionArchivo(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/archivos/Gestion",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente, debe llenar toda la información antes de continuar:<b>Gestion Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionArchivo",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivos/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ModificarVariosArchivos(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/modificar/varios/archivos",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente, debe llenar toda la información antes de continuar:<br><b>Gestion Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionArchivo",
              "AccesoServicios/AccesoServicio.svc/api/interno/modificar/varios/archivos",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerArchivo(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/archivos/Listar?viaje=${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerArchivo",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivos/Listar?viaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerDocumentoSolicitudPago(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/solicitud/pago/Listar/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Documento Solicitud Pago</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDocumentoSolicitudPago",
              "AccesoServicios/AccesoServicio.svc/api/interno/solicitud/pago/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionSolicitudPagoViaje(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/liquidacion/viaje/Gestion",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionSolicitudPagoViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/liquidacion/viaje/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionDistribucionContable(data): any {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/contabilidad/gestion/Distribucion",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Distribucion Contable</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionDistribucionContable",
              "AccesoServicios/AccesoServicio.svc/api/interno/contabilidad/gestion/Distribucion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerGestionDistribucionContable(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/contabilidad/distribucion/Listar/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Gestion Distribucion Contable</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGestionDistribucionContable",
              "AccesoServicios/AccesoServicio.svc/api/interno/contabilidad/distribucion/Listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionLiquidacionViaje(data) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/Viaje",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Liquidacion Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionLiquidacionViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/Viaje",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerLiquidacionesViaje(idViaje: any, identificador: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/viaje/Listar?idViaje=${idViaje}&identificador=${identificador}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Liquidaciones Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionLiquidacionViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/viaje/Listar?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerLiquidacionesLista(
    idViaje: any,
    identificador: any,
    lista: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/viaje/lista/Listar?idViaje=${idViaje}&identificador=${identificador}&lista=${lista}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Liquidaciones Lista</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionLiquidacionViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/asiento/liquidacion/viaje/lista/Listar?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerUsuarioRol(usuarioPersona: any, ciudadUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/usuario/ObtenerUsuarioRol?usuarioPersona=${usuarioPersona}&ciudadUsuario=${ciudadUsuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Usuario Rol</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerUsuarioRol",
              "AccesoServicios/AccesoServicio.svc/api/interno/usuario/ObtenerUsuarioRol?usuarioPersona=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // SERVICIOS PARA LA ADMINISTRACIÓN
  // LISTAR AGENCIAS
  public ObtenerAgencia() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/agencia/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Obtener Agencias</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              "agencias.component.ts",
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/api/interno/agencia/Listar",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  // GESTION AGENCIA
  public GestionarAgencia(agency: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/agencia/Gestion",
          agency
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Gestionar Agencias</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              "agencias.component.ts",
              "gestionarAgencia",
              "AccesoServicios/AccesoServicio.svc/api/interno/agencia/Gestion",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  // LISTAR CATEGORIAS
  public ObtenerCategoria() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/categoria/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Obtener Categorias</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              "categorias.component.ts",
              "ObtenerCategorias",
              "AccesoServicios/AccesoServicio.svc/api/interno/categoria/Listar",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  // GESTION CATEGORIAS
  public GestionarCategoria(category: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/categoria/Gestion",
          category
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Gestionar Categorias</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              "categorias.component.ts",
              "GestionarCategorias",
              "AccesoServicios/AccesoServicio.svc/api/interno/categoria/Gestion",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  // LISTAR TIPOS DE DOCUMENTOS
  public ObtenerTipoDocumento() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          "AccesoServicios/AccesoServicio.svc/api/interno/tipo/documento/Listar"
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Tipo Documento</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerTipoDocumento",
              "AccesoServicios/AccesoServicio.svc/api/interno/tipo/documento/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // GESTION TIPOS DE DOCUMENTOS
  public GestionTipoDocumento(documentType: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/tipo/documento/Gestion",
          documentType
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Tipo Documento</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionTipoDocumento",
              "AccesoServicios/AccesoServicio.svc/api/interno/tipo/documento/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // LISTAR TODOS LOS HOTELES
  public ObtenerTodosHotel() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/hotel/listar/Todos")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Todos Hoteles</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerTodosHotel",
              "AccesoServicios/AccesoServicio.svc/api/interno/hotel/listar/Todos",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // GESTION HOTELES
  public GestionHotel(hotel: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/hotel/Gestion",
          hotel
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Hotel</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionHotel",
              "AccesoServicios/AccesoServicio.svc/api/interno/hotel/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // LISTAR PARAMETRO POR NOMBRE
  public ObtenerParametroEspecifico(nombreParametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/parametro/especifico/Obtener/${nombreParametro}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Parametro Especifico</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerParametroEspecifico",
              "AccesoServicios/AccesoServicio.svc/api/interno/parametro/especifico/Obtener/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // GESTION RUTAS
  public GestionRuta(route: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post("AccesoServicios/AccesoServicio.svc/api/interno/ruta/Gestion", route)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Ruta</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionRuta",
              "AccesoServicios/AccesoServicio.svc/api/interno/ruta/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // GESTION ESTADOS
  public GestionEstado(stateCatalog: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/estados/Gestion",
          stateCatalog
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Estado</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionEstado",
              "AccesoServicios/AccesoServicio.svc/api/interno/estados/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  // LISTAR ERRORES
  public ObtenerErrores() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/error/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Errores</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerErrores",
              "AccesoServicios/AccesoServicio.svc/api/interno/error/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionFacturaDetalle(datos: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Gestion?consulta=${datos}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Factura Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionFacturaDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Gestion?consulta=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ModificarFacturaDetalle(datos: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Modificar",
          datos
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<b>Modificar Factura Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ModificarFacturaDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Modificar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public InsertarArchivoDetalle(datos: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Insertar",
          datos
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<b>Insertar Archivo Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "InsertarArchivoDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Insertar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public EliminarFacturaDetalle(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Eliminar/${id}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Modificar Factura Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EliminarFacturaDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/Eliminar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ListarFacturaDetalle(idArchivo: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/listar/${idArchivo}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Listar Factura Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ListarFacturaDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivo/detalle/listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerListadoArchivoDetalleDistribucionContable(idArchivo: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/archivoDetalle/distribucionContable/listar/${idArchivo}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Listado Archivo Detalle Distribucion Contable</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoArchivoDetalleDistribucionContable",
              "AccesoServicios/AccesoServicio.svc/api/interno/archivoDetalle/distribucionContable/listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionLiquidacionViajeDetalle(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/liquidacion/viaje/detalle/Gestion",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Liquidacion Viaje Detalle</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionLiquidacionViajeDetalle",
              "AccesoServicios/AccesoServicio.svc/api/interno/liquidacion/viaje/detalle/Gestion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public InsertarViatico(data) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/viatico/Insertar",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Insertar Viatico</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "InsertarViatico",
              "AccesoServicios/AccesoServicio.svc/api/interno/viatico/Insertar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ActualizarHotel(data) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post("AccesoServicios/AccesoServicio.svc/api/interno/gestion/Hotel", data)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Actualiza Hotel</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ActualizarHotel",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/Hotel",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public EliminarRegistroBDD(idViaje: any, registroAEliminar: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/eliminar/registro/LiquidacionViaje?idViaje=${idViaje}&registroAEliminar=${registroAEliminar}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Elimina rRegistro BDD</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EliminarRegistroBDD",
              "AccesoServicios/AccesoServicio.svc/api/interno/eliminar/registro/LiquidacionViaje?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ListarRegistroActividadViaje(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/listar/registro/actividad?idViaje=${idViaje}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Listar Registro Actividad Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ListarRegistroActividadViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/listar/registro/actividad?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ListarProximaActividadViaje(idViaje: any, idActividad: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/listar/registro/proxima/actividad?idViaje=${idViaje}&idActividad=${idActividad}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Listar Próxima Actividad Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ListarProximaActividadViaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/listar/registro/proxima/actividad?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ValidacionDistribucionContable(
    identificador: any,
    idViaje: any,
    idArchivo: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/validar/distribucion/contable?identificador=${identificador}&idViaje=${idViaje}&idArchivo=${idArchivo}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Validación Distribución Contable</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ValidacionDistribucionContable",
              "AccesoServicios/AccesoServicio.svc/api/interno/validar/distribucion/contable?identificador=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionarParametros(parametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/parametros/Gestion",
          parametro
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Gestionar Parámetros</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/parametros/Gestion",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuariosViaje() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/Usuarios"
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener usuarios:<br><b>Obtener Usuarios Viaje</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/Usuarios",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuariosViajeAdicional() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuarios/Adicional"
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener usuarios:<br><b>Obtener Usuarios</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuarios/Adicional",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerRolesViaje() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/rol/Listar")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener roles viajes:<br><b>Obtener roles viajes</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "roles viaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/rol/Listar",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerRolesViajeAdicional() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get("AccesoServicios/AccesoServicio.svc/api/interno/rol/listar/Adicional")
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener roles viajes:<br><b>Obtener roles viajes</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "roles viaje",
              "AccesoServicios/AccesoServicio.svc/api/interno/rol/listar/Adicional",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public async CrearUsuarioRolViaje(parametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/administracion/gestion/Usuario",
          parametro
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>CrearUsuarioRolViaje</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/gestion/Usuario",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public GestionObtenerUsuarioRol(usuarioPersona: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/Roles?usuarioPersona=${usuarioPersona}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestión Obtener Usuario Rol</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionObtenerUsuarioRol",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/Roles?usuarioPersona=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionObtenerUsuarioRolAdicional(usuarioPersona: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/roles/Totales?usuarioPersona=${usuarioPersona}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestión Obtener Usuario Rol Adicional</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionObtenerUsuarioRolAdicional",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/roles/Totales?usuarioPersona=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionObtenerUsuarioRolAdministracion(usuarioPersona: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/roles/Administracion?usuarioPersona=${usuarioPersona}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestión Obtener Usuario Rol Administración</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionObtenerUsuarioRolAdministracion",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/listar/usuario/roles/Administracion?usuarioPersona=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public CrearUsuario(parametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/administracion/gestion/Usuario/crear",
          parametro
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>CrearUsuario</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/administracion/gestion/Usuario/crear",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuariosConNombreRol() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/listar/Usuarios"
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener usuarios:<br><b>Obtener Usuarios</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/apiinterno/reasignacion/listar/Usuarios",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerViajesDatosPorEstado(nombreRol: any, nombreUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/listar/viajes/Estado?nombreRol=${nombreRol}&nombreUsuario=${nombreUsuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener tareas del viaje:<br><b>Obtener Tareas</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/listar/viajes/Estado?nombreRol=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ExisteRolCiudad(idRolViaje: any, ciudad: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/Usuarios/exite/rol/ciudad?idRolViaje=${idRolViaje}&ciudad=${ciudad}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener tareas del viaje:<b>Obtener Tareas</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "obtenerAgencias",
              "AccesoServicios/AccesoServicio.svc/apiinterno/listar/viajes/Estado?estado=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuariosPorRolCiudadDiferente(
    usuarioPersona: any,
    idRolViaje: any,
    ciudadNombre: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/listar/usuario/rol/diferente/ciudad?idRolViaje=
${idRolViaje}&ciudadNombre=${ciudadNombre}&usuarioPersona=${usuarioPersona}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un error al obtener tareas del viaje:<br><b>Obtener Tareas</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerUsuariosPorRolCiudadDiferente",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/listar/usuario/rol/diferente/ciudad?idRolViaje=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ReasignarUnaTarea(parametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/una/tarea",
          parametro
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Reasignar Una Tarea</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ReasignarUnaTarea",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/una/tarea",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ReasignarUnaTareas(parametro: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/una/tareas",
          parametro
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<b>Reasignar Una Tareas</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ReasignarUnaTareas",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignacion/una/tareas",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerListadoViajesCadena(cadena: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/listar/viajes/Cadena?cadena=${cadena}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>ObtenerListadoViajesCadena</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoViajesCadena",
              "AccesoServicios/AccesoServicio.svc/api/interno/listar/viajes/Cadena?cadena=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerListadoViajesCadenaAdicional(cadena: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/listar/viajes/CadenaAdicional?cadena=${cadena}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<b>ObtenerListadoViajesCadena</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoViajesCadena",
              "AccesoServicios/AccesoServicio.svc/api/interno/listar/viajes/CadenaAdicional?cadena=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public EliminarViaticosExistentes(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/eliminar/viaticos/Existentes?idViaje=${idViaje}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>EliminarViaticosExistentes</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EliminarViaticosExistentes",
              "AccesoServicios/AccesoServicio.svc/api/interno/eliminar/viaticos/Existentes?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerTotalFacturasDetalle(
    idViaje: any,
    idArchivoDetalle: any,
    nuevoTotal: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/total/facturas/viaje?idViaje=${idViaje}&idArchivoDetalle=
${idArchivoDetalle}&nuevoTotal=${nuevoTotal}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerArchivo",
              "AccesoServicios/AccesoServicio.svc/api/interno/total/facturas/viaje?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionUsuarioRegistradorViaje(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/gestion/Registrador",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Verificar Registrador</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/Registrador",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public GestionUsuarioAprobadorViaje(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/gestion/Aprobador",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Verificar Aprobador</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/Aprobador",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public GestionUsuarioNuevo(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/gestion/usuario/Nuevo",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>GestionUsuarioNuevo</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "gestionarParametros",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/usuario/Nuevo",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ConsultaUsuarioReasignado(nombreUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/buscar/usuario/Reasignado?nombreUsuario=${nombreUsuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Consultar Usuario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ConsultaUsuarioReasignado",
              "AccesoServicios/AccesoServicio.svc/api/interno/buscar/usuario/Reasignado?nombreUsuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ConsultaUsuarioReasignadoDatos(nombreUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/buscar/datos/Reasignado?nombreUsuario=${nombreUsuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Consultar Usuario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ConsultaUsuarioReasignadoDatos",
              "AccesoServicios/AccesoServicio.svc/api/interno/buscar/datos/Reasignado?nombreUsuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public DesgloseValoresFactura(IdViaje: any, IdArchivo: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/desglose/Valores?IdViaje=${IdViaje}&IdArchivo=${IdArchivo}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Desglose Valores Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "DesgloseValoresFactura",
              "AccesoServicios/AccesoServicio.svc/api/interno/desglose/Valores?IdViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionFueraOficina(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/gestion/fuera/Oficina",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Gestion Fuera Oficina</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionFueraOficina",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/fuera/Oficina",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public GestionFueraOficinaRoles(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/interno/gestion/fuera/oficina/Rol",
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio:<br><b>Gestion Fuera Oficina Roles</b> ",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionFueraOficinaRoles",
              "AccesoServicios/AccesoServicio.svc/api/interno/gestion/fuera/oficina/Rol",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerListadoViajesReasignados(usuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/lista/viajes/Reasignados?usuario=${usuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Listado Viajes Reasignados</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoViajesReasignados",
              "AccesoServicios/AccesoServicio.svc/api/interno/lista/viajes/Reasignados?usuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public GestionReasignarTarea(
    identificador: any,
    idViaje: any,
    estado: any,
    usuario: any,
    actividad: any,
    idActividad: any,
    administrador: any,
    usuarioActual: any
  ) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/reasignar/Tarea?identificador=${identificador}&idViaje=${idViaje}&estado=
${estado}&usuario=${usuario}&actividad=${actividad}&idActividad=${idActividad}&administrador=${administrador}&usuarioActual=${usuarioActual}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Gestion Reasignar Tarea</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GestionReasignarTarea",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignar/Tarea?identificador=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ConsultaVerificacionUsuarioReasignadoExistenteData(nombreUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/reasignar/verificar/usuario/FueraOficina?nombreUsuario=${nombreUsuario}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Consulta Verificacion Usuario Reasignado Existente Data</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ConsultaVerificacionUsuarioReasignadoExistenteData",
              "AccesoServicios/AccesoServicio.svc/api/interno/reasignar/verificar/usuario/FueraOficina?nombreUsuario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerParametrosCuentasAX(codigoCompania: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/listar/parametros/cuentas/AX?codigoCompania=${codigoCompania}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Parametros Cuentas AX</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerParametrosCuentasAX",
              "AccesoServicios/AccesoServicio.svc/api/interno/listar/parametros/cuentas/AX?codigoCompania",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ConsultarListadoUsuariosSupervisores() {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/listar/Supervisores")
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Consultar Listado Usuarios Supervisores</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "ConsultarListadoUsuariosSupervisores", "AccesoServicios/AccesoServicio.svc/api/interno/listar/Supervisores", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuarioSupervisor(nombreUsuario: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/obtener/Supervisor?nombreUsuario=" + nombreUsuario)
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Usuario Supervisor</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "ObtenerUsuarioSupervisor", "AccesoServicios/AccesoServicio.svc/api/interno/obtener/Supervisor?nombreUsuario=", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public VerificarProcesoAprobacion(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Verificar?idViaje=" + idViaje)
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Verificar Proceso Aprobacion</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "VerificarProcesoAprobacion", "AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Verificar?idViaje=", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public AgregarProcesoAprobacion(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Agregar?idViaje=" + idViaje)
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Agregar Proceso Aprobacion</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "AgregarProcesoAprobacion", "AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Agregar?idViaje=", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public VerificarEstadoSolicitud(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/verificar/Estado?idViaje=" + idViaje)
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Verificar Estado Solicitud</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "VerificarEstadoSolicitud", "AccesoServicios/AccesoServicio.svc/api/interno/verificar/Estado?idViaje=", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public RetirarProcesoAprobacion(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion.get("AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Retirar?idViaje=" + idViaje)
        .subscribe(
          (res: any) => {
            resolve(res)
          }, (err) => {
            this.globales.VerMensajeError("Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Retirar Proceso Aprobacion</b>", "error", "top-end");
            this.conexion.GuardarError(this.nombreArchivo, "RetirarProcesoAprobacion", "AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Retirar?idViaje=", err.status, err.url, err.error);
            reject(err);
          }
        );
    });
  }

  public GestionLogAprobacion(fechaEnvioFront: any, idViaje: any, metodo: any, paso: any, datos: any, tipo: any) {
    try {
      var requerimiento: any = {
        "FechaEnvioFront": fechaEnvioFront,
        "IdViaje": idViaje,
        "Metodo": metodo,
        "Paso": paso,
        "Datos": datos,
        "Tipo": tipo
      };
      this.conexion.post("AccesoServicios/AccesoServicio.svc/api/interno/aprobacion/Log", requerimiento).subscribe((res: any) => { }, (err: any) => {
        console.log(err);
      });
    } catch (error) { console.log(error) }
  }

  public ObtenerListadoDocumentosPago(idViaje: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/obtener/ListadoDocumentosPago?idViaje=${idViaje}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Listado Documentos Pago</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoDocumentosPago",
              "AccesoServicios/AccesoServicio.svc/api/interno/obtener/ListadoDocumentosPago?idViaje=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerDocumentoSolicitudPagoRegistro(idDocumento: any) {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/interno/obtener/Registro/DocumentoSolicitudPago/Registro?idDocumento=${idDocumento}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio interno:<br><b>Obtener Documento Solicitud Pago Registro</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDocumentoSolicitudPagoRegistro",
              "AccesoServicios/AccesoServicio.svc/api/interno/obtener/Registro/DocumentoSolicitudPago/Registro?idDocumento=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }
}
