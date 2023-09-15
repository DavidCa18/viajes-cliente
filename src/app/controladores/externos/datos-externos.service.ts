import { Injectable } from "@angular/core";
import { ServicioGlobales } from "../../metodos/globales/globales.service";
import { ServicioApi } from "../../servicios/api/api.service";

@Injectable()
export class ServicioDataExternos {
  public ipLocal: any = "";
  public navegadorLocal: any = "";
  public sistemaLocal: any = "";
  public nombreArchivo = "data.external.service.ts";
  session: any;

  constructor(
    private readonly conexion: ServicioApi,
    private readonly globales: ServicioGlobales
  ) { }

  public InicializarParametros() {
    var aux1 = atob(localStorage.getItem("k-key1"));
    var aux2 = atob(localStorage.getItem("k-key2"));
    var aux3 = atob(localStorage.getItem("k-key3"));
    this.ipLocal = aux1 == undefined ? "200.125.36.221" : aux1;
    this.navegadorLocal = aux2 == undefined ? "Mozilla Firefox" : aux2;
    this.sistemaLocal = aux2 == undefined ? "Sistema Windows" : aux3;
  }

  public ObtenerTokenExterno() {
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          "AccesoServicios/AccesoServicio.svc/api/externo/usuario/obtener/Token"
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Token</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerTokenExterno",
              "AccesoServicios/AccesoServicio.svc/api/externo/usuario/obtener/Token",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerUsuario(token: any, nombreUsuario: string) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/usuario/Listar/${nombreUsuario}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Usuario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerUsuario",
              "AccesoServicios/AccesoServicio.svc/api/externo/usuario/Listar/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerCompania(token: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/empresa/Listar/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Compañia</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerCompania",
              "AccesoServicios/AccesoServicio.svc/api/externo/empresa/Listar",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerGrupoJefe(token: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/usuario/listar/Grupos/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            var auxiliar = JSON.parse(res);
            if (auxiliar.Estado == "OK") {
              resolve(auxiliar.Datos);
            } else {
              this.globales.VerMensajeError(
                "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Grupo Jefes</b>",
                "error",
                "top-end"
              );
            }
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Grupo Jefes</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGrupoJefe",
              "AccesoServicios/AccesoServicio.svc/api/externo/usuario/listar/Grupos",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public EnviarEmail(email: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "EnviarEmail",
      "salida",
      JSON.stringify(email)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/enviar/email/Normal/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          email
        )
        .subscribe(
          (res: any) => {
            if (!res.Enviado) {
              this.globales.VerMensajeError(
                "Hubo un error al enviar el correo electrónico<br><b>Enviar Email</b>",
                "error",
                "top-end"
              );
              this.conexion.GuardarLog(
                this.nombreArchivo,
                "EnviarEmail Respuesta Erronea",
                "entrada",
                JSON.stringify(res)
              );
              resolve(res);
            } else {
              this.conexion.GuardarLog(
                this.nombreArchivo,
                "EnviarEmail Respuesta Exitosa",
                "entrada",
                JSON.stringify(res)
              );
              resolve(res);
            }
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Enviar Email</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EnviarEmail",
              "AccesoServicios/AccesoServicio.svc/api/externo/enviar/email/Normal",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public EnviarEmailAdjunto(email: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "EnviarEmailAdjunto Solicitud",
      "salida",
      JSON.stringify(email)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion.post(`AccesoServicios/AccesoServicio.svc/api/externo/enviar/email/Adjunto/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`, email)
        .subscribe(
          (res: any) => {
            const respuesta = JSON.parse(res);
            if (!respuesta.Datos.Enviado) {
              this.globales.VerMensajeError("Hubo un error al enviar el correo electrónico<br><b>Enviar Email Adjunto</b>", "error", "top-end");
              this.conexion.GuardarLog("data.service.ts", "EnviarEmailAdjunto Respuesta Erronea", "entrada", JSON.stringify(res));
              resolve(res);
            } else {
              this.conexion.GuardarLog(
                this.nombreArchivo,
                "EnviarEmailAdjunto Respuesta Exitosa",
                "entrada",
                JSON.stringify(res)
              );
              resolve(res);
            }
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Enviar Email Adjunto</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EnviarEmailAdjunto",
              "AccesoServicios/AccesoServicio.svc/api/externo/enviar/email/Adjunto",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  //SERVICIO PARA OBTENER LOS DEPARTAMENTOS
  public ObtenerDepartamento(token: any, code: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/departamento/Listar/${code}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Departamento</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDepartamento",
              "AccesoServicios/AccesoServicio.svc/api/externo/departamento/Listar/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  //SERVICIO PARA OBTENER LOS CENTROS DE COSTO
  public ObtenerCentroCosto(token: any, idDepartamento: any, empresa: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/centrocosto/Listar/${idDepartamento}/${empresa}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Centro Costo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerCentroCosto",
              "AccesoServicios/AccesoServicio.svc/api/externo/centrocosto/Listar/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  //SERVICIO PARA OBTENER LOS PROPOSITOS
  public ObtenerProposito(
    token: any,
    idDepartamento: any,
    idCentroCosto: any,
    empresa: any
  ) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/proposito/Listar/${idDepartamento}/${idCentroCosto}/${empresa}/${this.sistemaLocal}/
${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Proposito</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerProposito",
              "AccesoServicios/AccesoServicio.svc/api/externo/proposito/Listar/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerProveedor(
    token: any,
    identification: any,
    nombre: any,
    empresa: any
  ) {
    this.InicializarParametros();
    if (identification != null) {
      nombre = "";
    } else {
      identification = "";
    }
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/proveedor/Obtener?identificacion=
${identification}&nombre=${nombre}&empresa=${empresa}&sistema=${this.sistemaLocal}&navegador=
${this.navegadorLocal}&ip=${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "No se encontró un proveedor con los datos ingresados, por favor debe crear el proveedor:<br><b>Obtener Proveedor</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerProveedor",
              "AccesoServicios/AccesoServicio.svc/api/externo/proveedor/Obtener?identificacion=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public BuscarProveedor(token: any, data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/proveedor/Buscar/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "No se encontró un proveedor con los datos ingresados, por favor debe crear el proveedor:<b>Obtener Proveedor</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerProveedor",
              "AccesoServicios/AccesoServicio.svc/api/externo/proveedor/Obtener?identificacion=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public BuscarProveedorAdicional(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/buscar/proveedor/Adicional?sistema=${this.sistemaLocal}&navegador=${this.navegadorLocal}&ip=${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "No se encontró un proveedor con los datos ingresados, por favor debe crear el proveedor:<b>Buscar Proveedor Adicional</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "BuscarProveedorAdicional",
              "AccesoServicios/AccesoServicio.svc/api/externo/buscar/proveedor/Adicional/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ActualizarCorreoProveedor(token: any, data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/proveedor/actualiza/Correo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "No se pudo actualizar el correo del proveedor<br><b>Actualizar Correo Proveedor</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ActualizarCorreoProveedor",
              "AccesoServicios/AccesoServicio.svc/api/externo/proveedor/actualiza/Correo",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public CargarArchivo(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "CargarArchivo",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/subir/Archivo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CargarArchivo",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Cargar Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CargarArchivo",
              "AccesoServicios/AccesoServicio.svc/api/externo/subir/Archivo",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public CargarArchivoMultiple(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "CargarArchivoMultiple",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/subir/varios/Archivos/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CargarArchivoMultiple",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Cargar Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CargarArchivoMultiple",
              "AccesoServicios/AccesoServicio.svc/api/externo/subir/varios/Archivos",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public DescargarArchivo(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/bajar/Archivo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Descargar Archivo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "DescargarArchivo",
              "AccesoServicios/AccesoServicio.svc/api/externo/bajar/Archivo",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public ObtenerContenedor(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/verificar/Contenedor/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Contenedor</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerContenedor",
              "AccesoServicios/AccesoServicio.svc/api/externo/verificar/Contenedor",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public GuadarProveedor(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/crear/Proveedor/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Guardar Proveedor</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "GuardarProveedor",
              "AccesoServicios/AccesoServicio.svc/api/externo/crear/Proveedor",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerGrupoImpuestos(token: any, empresa: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/Impuesto/${empresa}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Grupo Impuestos</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGrupoImpuestos",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/Impuesto/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerArticulosGrupoImpuestos(token: any, empresa: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Articulos/${empresa}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Articulos Grupo Impuestos</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerArticulosGrupoImpuestos",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Articulos/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerGrupoImpuestoRenta(token: any, empresa: any, codigo: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Renta?empresa=${empresa}&codigo=${codigo}&sistema=${this.sistemaLocal}
&navegador=${this.navegadorLocal}&ip=${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Grupo Impuesto Renta</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGrupoImpuestoRenta",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Renta?empresa=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerGrupoImpuestoIva(token: any, empresa: any, codigo: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Iva?empresa=${empresa}&codigo=${codigo}&sistema=${this.sistemaLocal}
&navegador=${this.navegadorLocal}&ip=${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerAlerta("<b>Información</b>", err.error, "top-end");
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGrupoImpuestoIva",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/grupos/impuesto/Iva?empresa=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerGrupoImpuestoIvaAdicional(
    token: any,
    empresa: any,
    codigo: any
  ) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/obtener/iva/grupo/impuestosArticulos?sistema=${this.sistemaLocal}&navegador=${this.navegadorLocal}
&ip=${this.ipLocal}&empresa=${empresa}&codigo=${codigo}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Grupo Impuesto Iva</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerGrupoImpuestoIvaAdicional",
              "AccesoServicios/AccesoServicio.svc/api/externo/obtener/iva/grupo/impuestosArticulos?sistema=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerSustentoTributario(token: any, empresa: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/sustento/Tributario/${empresa}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Sustento Tributario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerSustentoTributario",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/sustento/Tributario/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerDiarioAvance(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "ObtenerDiarioAvance",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/anticipo/crearDiario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "ObtenerDiarioAvance",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Diario Avance</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDiarioAvance Error",
              "AccesoServicios/AccesoServicio.svc/api/externo/anticipo/crearDiario?nombreDiario=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public CrearDiarioAprobacion(data: any, idViaje: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(this.nombreArchivo,
      "CrearDiarioAprobacion",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/aprobacion/crearDiarioAprobacion/${idViaje}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CrearDiarioAprobacion",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Crear Diario Aprobacion</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDiarioAvance Error",
              "AccesoServicios/AccesoServicio.svc/api/externo/aprobacion/crearDiarioAprobacion",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  //FUNCIÓN PARA REGISTRAR EL DIARIO CONTABLE DE ANTICIPO
  public EstablecerRegistroDiario(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "EstablecerRegistroDiario",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/anticipo/registrarDiario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "EstablecerRegistroDiario",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Registrar Diario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EstablecerRegistroDiario",
              "AccesoServicios/AccesoServicio.svc/api/externo/anticipo/registrarDiario",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  //FUNCIÓN PARA REGISTRAR EL DIARIO CONTABLE DE FACTURAS DE LIQUIDACION
  public EstablecerRegistroDiarioFactura(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "EstablecerRegistroDiarioFactura",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/registrarDiarioFactura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "EstablecerRegistroDiarioFactura",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Establecer Registro Diario Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "EstablecerRegistroDiarioFactura",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/registrarDiarioFactura",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public RegistraDiario(data) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "RegistraDiario",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/anticipo/cerrarDiario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "RegistraDiario",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Cerrar Avance</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CerrarAvance",
              "AccesoServicios/AccesoServicio.svc/api/externo/anticipo/cerrarDiario?numeroDiario=",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public LineaFactura(data) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "LineaFactura",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaFactura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "LineaFactura",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Línea Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "Lineafactura",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaFactura?parametros=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public LiquidarFacturaDiaria(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "LiquidarFacturaDiaria",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LiquidaDiarioFactura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "LiquidarFacturaDiaria",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Liquidar Factura Diaria</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "LiquidarFacturaDiaria",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LiquidaDiarioFactura",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN Proveedor Diario Devolución: (LineaProveedorLiquidaAnticipo)
  public LineaProveedorLiquidaAnticipo(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "LineaProveedorLiquidaAnticipo",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaProveedorLiquidaAnticipo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "LineaProveedorLiquidaAnticipo",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Linea Proveedor Liquida Anticipo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "LineaProveedorLiquidaAnticipo",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaProveedorLiquidaAnticipo",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN Proveedor Credito/Debito Acreditacion: (LineaProveedorAnticipo)
  public LineaProveedorAnticipo(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "LineaProveedorAnticipo",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaProveedorAnticipo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "LineaProveedorAnticipo",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Linea Proveedor Anticipo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "LineaProveedorAnticipo",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaProveedorAnticipo",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN Contabilidad/Proyecto Diario de Devolución (LineaLiquidacion)
  public LineaLiquidacion(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "LineaLiquidacion",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaLiquidacion/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "LineaLiquidacion",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Linea Liquidacion</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "LineaLiquidacion",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/LineaLiquidacion",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public CrearDatoAdicionalReembolso(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "CrearDatoAdicionalReembolso",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CrearDatoAdicionalReembolso/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CrearDatoAdicionalReembolso",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Crear Dato Adicional Reembolso</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CrearDatoAdicionalReembolso",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CrearDatoAdicionalReembolso",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public CierreDatoAdicionalReembolso(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "CierreDatoAdicionalReembolso",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CierreDatoAdicionalReembolso/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CierreDatoAdicionalReembolso",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Cierre Dato Adicional Reembolso</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CierreDatoAdicionalReembolso",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CierreDatoAdicionalReembolso",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA Elimina línea de Contabilidad (BorrarLineaDiario)
  public BorrarLineaDiario(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "BorrarLineaDiario",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/BorrarLineaDiario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "BorrarLineaDiario",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Borrar Linea Diario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "BorrarLineaDiario",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/BorrarLineaDiario?idRegistro=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA Elimina Cabecera Diario General (BorrarDiario)
  public BorrarDiario(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "BorrarDiario",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/BorrarDiario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "BorrarDiario",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Borrar Diario</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "BorrarDiario",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/BorrarDiario?numeroDiario=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //SERVICIO PARA OBTENER EL TIPO DE GASTO
  public ObtenerTipoGasto(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "ObtenerTipoGasto",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/tipo/gasto/Listar/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "ObtenerTipoGasto",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Tipo Gasto</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerTipoGasto",
              "AccesoServicios/AccesoServicio.svc/api/externo/tipo/gasto/Listar",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //SERVICIO PARA REGISTRAR UNA SOLICITUD DE PAGO EN EL MÓDULO DE PAGOS
  public CrearSolicitudPago(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "CrearSolicitudPago",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          "AccesoServicios/AccesoServicio.svc/api/externo/solicitudes/pago/Crear",
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "CrearSolicitudPago",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Crear Solicitud Pago</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CrearSolicitudPago",
              "AccesoServicios/AccesoServicio.svc/api/externo/solicitudes/pago/Crear",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //SERVICIO PARA LISTAR LAS SOLICITUDES DE PAGO POR ID DE VIAje y tipo
  public ObtenerSolicitudPago(idViaje: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .get(
          `AccesoServicios/AccesoServicio.svc/api/externo/solicitudes/pago/Listar/${idViaje}`
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Solicitud Pago</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerSolicitudPago",
              "AccesoServicios/AccesoServicio.svc/api/externo/solicitudes/pago/Listar/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA OBTENER UNA FACTURA ELECTRÓNICA
  public ObtenerDetalleFactura(data: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "ObtenerDetalleFactura",
      "salida",
      JSON.stringify(data)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/obtener/factura/Detalles/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "ObtenerDetalleFactura",
              "entrada",
              JSON.stringify(res)
            );
            var result = JSON.parse(res);
            var detalles1 = result.Datos;

            if (result.Estado != "Error") {
              var data2 = {
                Token: data.Token,
                DataJSON: "?tipoDocumento=" + detalles1.InfoTributaria.TipoDocumento + "&ruc=" + detalles1.InfoTributaria.Ruc + "&establecimiento=" + detalles1.InfoTributaria.Establecimiento + "&puntoEmision=" + detalles1.InfoTributaria.PuntoEmision + "&secuencial=" + detalles1.InfoTributaria.Secuencial + "&numeroPagina=1"
              };

              this.conexion
                .post(
                  `AccesoServicios/AccesoServicio.svc/api/externo/obtener/Factura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
                  data2
                )
                .subscribe(
                  (resp: any) => {
                    result = JSON.parse(resp);
                    var details = result.Datos;
                    var respuesta = {
                      mensaje: details.Entidades[0].EstadoNombre,
                      estado: details.Entidades[0].Estado,
                    };

                    this.conexion.GuardarLog(
                      this.nombreArchivo,
                      "ObtenerDetalleFactura",
                      "entrada",
                      JSON.stringify(resp)
                    );
                    resolve({ Factura: detalles1, Estado: respuesta });
                  },
                  (err) => {
                    reject(err);
                    this.globales.VerMensajeError(
                      "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Detalle Factura</b>",
                      "error",
                      "top-end"
                    );
                    this.conexion.GuardarError(
                      this.nombreArchivo,
                      "ObtenerDetalleFactura",
                      "AccesoServicios/AccesoServicio.svc/api/externo/obtener/Factura",
                      err.status,
                      err.url,
                      err.error
                    );
                  }
                );
            } else {
              resolve({ Factura: detalles1, Estado: { estado: 2 } });
            }
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Detalle Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerDetalleFactura",
              "AccesoServicios/AccesoServicio.svc/api/externo/obtener/factura/Detalles",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA OBTENER UNA FACTURA ELECTRÓNICA
  public ObtenerFactura(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/obtener/Factura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerFactura",
              "AccesoServicios/AccesoServicio.svc/api/externo/obtener/Factura",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //MNETODO PARA CAMBIAR EL ESTADO DE LA FACTURA ELECTRÓNICA
  public CambiarEstadoFactura(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/cambiar/estado/Factura/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Cambiar Estado Factura</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CambiarEstadoFactura",
              "AccesoServicios/AccesoServicio.svc/api/externo/cambiar/estado/Factura",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA TRAER LOS IMPUESTO VIGENTES POR COMPAÑIA
  public ObtenerImpuesto(token: any, empresa: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/traer/impuestos/Vigentes/${empresa}/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Impuesto</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerImpuesto",
              "AccesoServicios/AccesoServicio.svc/api/externo/traer/imuestos/Vigentes/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  //FUNCIÓN PARA VERIFICAR SI EXISTE UN PAGO EN TESORERIA
  public VerificarAnticipoPago(token: any, idRegistro: any, empresa: any) {
    this.InicializarParametros();
    this.conexion.GuardarLog(
      this.nombreArchivo,
      "VerificarAnticipoPago",
      "salida",
      JSON.stringify(idRegistro)
    );
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/verificar/anticipo/Viaje?idRegistro=${idRegistro}&codigoCompania=${empresa}&sistema=${this.sistemaLocal}
&navegador=${this.navegadorLocal}&ip=${this.ipLocal}`,
          token
        )
        .subscribe(
          (res: any) => {
            this.conexion.GuardarLog(
              this.nombreArchivo,
              "VerificarAnticipoPago",
              "entrada",
              JSON.stringify(res)
            );
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Verificar Anticipo Pago</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "VerificarAnticipoPago",
              "AccesoServicios/AccesoServicio.svc/api/externo/verificar/anticipo/Viaje?idRegistro=",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerUsuarioDos(token: any, nombreUsuario: string) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/administracion/buscar/Usuario/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}/${nombreUsuario}`,
          token
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Usuario Dos</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerUsuarioDos",
              "AccesoServicios/AccesoServicio.svc/api/externo/administracion/buscar/Usuario/",
              err.status,
              err.url,
              err.error
            );
            reject(err);
          }
        );
    });
  }

  public CreacionCierreDatosAdicionalesReembolso(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CreacionCierreDatosAdicionales/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Creacion Cierre Datos Adicionales Reembolso</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "CreacionCierreDatosAdicionalesReembolso",
              "AccesoServicios/AccesoServicio.svc/api/externo/contabilidad/CreacionCierreDatosAdicionales",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }

  public ObtenerListadoUsuariosPorGrupo(data: any) {
    this.InicializarParametros();
    return new Promise<any>((resolve, reject) => {
      this.conexion
        .post(
          `AccesoServicios/AccesoServicio.svc/api/externo/listar/usuarios/Grupo/${this.sistemaLocal}/${this.navegadorLocal}/${this.ipLocal}`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            reject(err);
            this.globales.VerMensajeError(
              "Ocurrió un inconveniente al conectarse al servicio externo:<br><b>Obtener Listado Usuarios Por Grupo</b>",
              "error",
              "top-end"
            );
            this.conexion.GuardarError(
              this.nombreArchivo,
              "ObtenerListadoUsuariosPorGrupo",
              "AccesoServicios/AccesoServicio.svc/api/externo/listar/usuarios/Grupo/",
              err.status,
              err.url,
              err.error
            );
          }
        );
    });
  }
}
