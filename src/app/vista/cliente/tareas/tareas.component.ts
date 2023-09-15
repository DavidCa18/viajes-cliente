import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { DataStateChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import { ServicioPlantillaCorreoDatafast } from '../../../variable/correo/plantilla-correo-datafast.service';
import { process, State } from "@progress/kendo-data-query";
import { Router } from "@angular/router";
import { ServicioUsuario } from "../../../servicios/usuario/usuario.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tareas.component.html",
  styleUrls: ["./tareas.component.css"],
})
export class TareasComponent implements OnInit {

  lstUsuarios: any = [];
  lstUsuariosNuevos: any = [];
  nuevoResponsableActual: any;
  nombreUsuario: any = "";
  usuarioDirectorioActivo: any = null;
  tareasSeleccionadas: any = [];
  rolesResponsableActual: any = [];

  public tareasRol = [
    { nombre: "CONTADOR", estadoTarea: 7 },
    { nombre: "APROBADOR", estadoTarea: 2 },
    { nombre: "PRE-APROBADOR", estadoTarea: 1 },
    { nombre: "REGISTRADOR PAGO", estadoTarea: 5 },
  ];

  public listadoCompletoTareasRevision: any;
  public tipoMenu = 1;
  public mensaje = "Cargando Información...";
  public lstUsuariosGrupo = [];
  public lstUsuariosGrupoData: Array<{ Usuario: string; NombreCompleto: string; }>;
  public responsableActual: any;
  public responsableNuevo: any;
  public responsableActualData: any;
  public responsableNuevoData: any;
  public listadoRolesResponsableNuevo: any;
  public tareasPendientes: any;
  public state: State = { skip: 0, take: 15 };
  public lstTareas: any = [];
  public lstViajesReasignados: any = [];
  public ListadoTareasFinal: any = [];
  public gridData: GridDataResult = process(this.ListadoTareasFinal, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly sesionusuario: ServicioUsuario,
    private readonly servicioEmail: ServicioPlantillaCorreoDatafast,
    private readonly global: ServicioGlobales,
    private readonly rutaSistema: Router
  ) { }

  ngOnInit() {
    this.ListadoUsuariosPorGrupo();
  }

  // Cargar listado de usuarios del directorio activo para los dos combos
  public ListadoUsuariosPorGrupo() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = { Token: token.access_token };
    this.dataExterna.ObtenerListadoUsuariosPorGrupo(data).then((res: any) => {
      var aux = JSON.parse(res);
      this.lstUsuariosGrupo = aux.Datos;
      this.lstUsuariosGrupoData = this.lstUsuariosGrupo.slice();
      this.spinner.hide();
    }).catch((err: any) => {
      this.spinner.hide();
    });
  }

  // Filtro de combo de usuarios del directorio activo
  handleFilter(value: any) {
    this.lstUsuariosGrupo = this.lstUsuariosGrupoData.filter(
      (s) =>
        s.NombreCompleto.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  // Selección del responsable actual
  public SeleccionarResponsableActualR() {
    this.ObtenerListaRolesUsuario(this.responsableActual.Usuario);
  }

  // Cargar listado de roles de un usuario
  public async ObtenerListaRolesUsuario(nombreUsuario: any) {
    this.rolesResponsableActual = [];
    await this.dataInterna
      .GestionObtenerUsuarioRol(nombreUsuario)
      .then((res) => {
        const listaRoles: any = [];
        res.forEach((rol: any) => {
          const existeRol = listaRoles.findIndex(
            (r: any) => r.idRolViaje === rol.Rol.IdRolViaje
          );
          if (existeRol == -1) {
            const nuevoObjeto = {
              idRolViaje: rol.Rol.IdRolViaje,
              nombre: rol.Rol.NombreRol,
            };
            listaRoles.push(nuevoObjeto);
          }
        });
        listaRoles.push({ idRolViaje: 9, nombre: "REGISTRADOR" });
        this.rolesResponsableActual = listaRoles;
        this.CargarCadenaConsultaViajes(this.rolesResponsableActual);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarCadenaConsultaViajes(roles: any) {
    var query: any = "";
    const usuarioRegistrador = "UsuarioRegistrador";

    for (const role of roles) {
      if (role.nombre == "REGISTRADOR") {
        query +=
          `(${usuarioRegistrador} = '${this.responsableActual.Usuario}' AND IdEstado = 4) OR `;
      }

      if (role.nombre == "REGISTRADOR") {
        query +=
          `(${usuarioRegistrador} = '${this.responsableActual.Usuario}' AND IdEstado = 6) OR `;
      }

      if (role.nombre == "REGISTRADOR") {
        query +=
          `(${usuarioRegistrador} = '${this.responsableActual.Usuario}' AND IdEstado = 10) OR `;
      }

      if (role.nombre == "PRE-APROBADOR") {
        query +=
          `(UsuarioPreAprobador = '${this.responsableActual.Usuario}' AND IdEstado = 1) OR `
      }

      if (role.nombre == "APROBADOR") {
        query +=
          `(UsuarioAprobador = '${this.responsableActual.Usuario}' AND IdEstado = 2) OR `
      }

      if (role.nombre == "REGISTRADOR PAGO") {
        query +=
          `(UsuarioRegistradorPago = '${this.responsableActual.Usuario}' AND IdEstado = 5) OR `
      }

      if (role.nombre == "CONTADOR") {
        query +=
          `(UsuarioContador = '${this.responsableActual.Usuario}' AND IdEstado = 7) OR `
      }
    }

    var cadena =
      `WHERE (${query.slice(0, -4)}) ORDER BY FechaSolicitudViaje DESC`;

    this.ObtenerListadoViajesCadena(cadena);

  }

  public ObtenerListadoViajesCadena(cadena: any) {
    this.lstTareas = [];
    this.dataInterna
      .ObtenerListadoViajesCadenaAdicional(cadena)
      .then((res) => {
        this.lstTareas = res;
        this.ObtenerListadoViajesReasignados(this.responsableActual.Usuario);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerListadoViajesReasignados(usuario: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerListadoViajesReasignados(usuario)
      .then((res) => {
        this.spinner.hide();
        this.lstViajesReasignados = res;
        this.ListadoTareasFinal = this.lstTareas.concat(
          this.lstViajesReasignados
        );
        this.ListadoTareasFinal.sort((a: any, b: any) => b.IdViaje - a.IdViaje);
        this.tareasPendientes =
          this.lstTareas.length + this.lstViajesReasignados.length;
        if (this.tareasPendientes != 0) {
          this.gridData = process(this.ListadoTareasFinal, this.state);
        } else {
          this.global.Alerta(
            "Atención",
            "El usuario seleccionado no posee actividades pendientes",
            "success"
          );
          this.responsableNuevo = { NombreCompleto: "", Usuario: "" };
          this.tareasSeleccionadas = [];
          this.gridData = process([], this.state);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public Cargando() {
    const informacion = "Información";
    const info = "info";

    if (this.responsableActual == undefined) {
      this.global.Alerta(
        informacion,
        "Debe seleccionar el responsable actual para cargar sus tareas pendientes",
        info
      );
    } else if (this.responsableNuevo == undefined) {
      this.global.Alerta(
        informacion,
        "Debe seleccionar un responsable nuevo para reasignar las tareas",
        info
      );
    } else if (this.tareasSeleccionadas.length == 0) {
      this.global.Alerta(
        informacion,
        "Debe seleccionar por lo menos una tarea para reasignar",
        info
      );
    } else {
      this.CargarInformacionUsuarioActual(this.responsableActual.Usuario);
    }
  }

  public CargarInformacionUsuarioActual(username: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerUsuario(token, username)
      .then((res) => {
        this.spinner.hide();
        this.responsableActualData = res;
        this.CargarInformacionUsuarioNuevo(this.responsableNuevo.Usuario);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarInformacionUsuarioNuevo(username: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerUsuario(token, username)
      .then((res) => {
        this.spinner.hide();
        this.responsableNuevoData = res;
        this.ObtenerListaRolesResponsableNuevo(
          this.responsableNuevoData.Usuario
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public async ObtenerListaRolesResponsableNuevo(nombreUsuario: any) {
    this.listadoRolesResponsableNuevo = [];
    await this.dataInterna
      .GestionObtenerUsuarioRol(nombreUsuario)
      .then((res) => {
        const listaRoles: any = [];
        res.forEach((rol: any) => {
          const existeRol = listaRoles.findIndex(
            (r: any) => r.idRolViaje === rol.Rol.IdRolViaje
          );
          if (existeRol == -1) {
            const nuevoObjeto = {
              idRolViaje: rol.Rol.IdRolViaje,
              nombre: rol.Rol.NombreRol,
              ciudad: rol.Usuario.CiudadUsuario,
            };
            listaRoles.push(nuevoObjeto);
          }
        });
        this.listadoRolesResponsableNuevo = listaRoles;

        var preaprobador: any;
        var aprobador: any;
        var _registradorPago: any;
        var contador: any;

        for (const rol of this.listadoRolesResponsableNuevo) {
          if (rol.idRolViaje == 3) {
            preaprobador = "si";
          } else {
            preaprobador = "no";
          }

          if (rol.idRolViaje == 2) {
            aprobador = "si";
          } else {
            aprobador = "no";
          }

          if (rol.idRolViaje == 4) {
            _registradorPago = "si";
          } else {
            _registradorPago = "no";
          }

          if (rol.idRolViaje == 1) {
            contador = "si";
          } else {
            contador = "no";
          }
        }

        var data: any = {
          Identificador: 3,
          Usuario: this.responsableNuevoData.Usuario,
          NombreCompleto: this.responsableNuevoData.NombreCompleto,
          Email: this.responsableNuevoData.Usuario + "@saludsa.com.ec",
          Ciudad: this.responsableActualData.CiudadDescripcion,
          PreAprobador: preaprobador == "si" ? 1 : 0,
          Aprobador: aprobador == "si" ? 1 : 0,
          RegistradorPago: _registradorPago == "si" ? 1 : 0,
          Contador: contador == "si" ? 1 : 0,
        };

        this.GestionReasignacionRolesTask(data);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GestionReasignacionRolesTask(data: any) {
    this.spinner.show();
    this.dataInterna
      .GestionFueraOficinaRoles(data)
      .then((res) => {
        this.spinner.hide();
        this.ObtenerParametros();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerParametros() {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.spinner.hide();
        var lstParametros = res;

        var tmpAplicacion = lstParametros.find(
          (e:any) => e.NombreParametro == "IdAplicacion"
        );
        var tmpNombreOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "NombreOrigen"
        );
        var tmpEmailOrigen = lstParametros.find(
          (e:any) => e.NombreParametro == "EmailOrigen"
        );
        var tmpTiempoEspera = lstParametros.find(
          (e:any) => e.NombreParametro == "TiempoEspera"
        );

        this.ReasignarTareas(
          tmpAplicacion.ValorParametro,
          tmpNombreOrigen.ValorParametro,
          tmpEmailOrigen.ValorParametro,
          tmpTiempoEspera.ValorParametro
        );
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ReasignarTareas(
    IdAplicacion: any,
    NombreOrigen: any,
    EmailOrigen: any,
    TiempoEspera: any
  ) {

    var usuarioSesionAdministrador = this.sesionusuario.ObtenerUsuario();

    for (const tarea of this.tareasSeleccionadas) {
      this.spinner.show();
      this.dataInterna
        .ObtenerViaje(tarea)
        .then((res) => {
          this.spinner.hide();

          var dtViaje: any = res;

          var _nuevaActividad = "";
          var _idActividad = 0;

          if (dtViaje.Estado.IdEstado == 1) {
            _nuevaActividad = "La preaprobación";
            _idActividad = 23;
          } else if (dtViaje.Estado.IdEstado == 2) {
            _nuevaActividad = "La aprobación";
            _idActividad = 24;
          } else if (dtViaje.Estado.IdEstado == 5) {
            _nuevaActividad = "El registro de movilización u hospedaje";
            _idActividad = 25;
          } else if (dtViaje.Estado.IdEstado == 6) {
            _nuevaActividad = "La liquidación";
            _idActividad = 26;
          } else if (dtViaje.Estado.IdEstado == 7) {
            _nuevaActividad = "La contabilización";
            _idActividad = 27;
          } else if (dtViaje.Estado.IdEstado == 4) {
            _nuevaActividad = "La modificación";
            _idActividad = 28;
          } else if (dtViaje.Estado.IdEstado == 10) {
            _nuevaActividad = "La edición de la liquidación";
            _idActividad = 29;
          }

          this.dataInterna
            .GestionReasignarTarea(
              1,
              dtViaje.IdViaje,
              dtViaje.Estado.IdEstado,
              this.responsableNuevo.Usuario,
              _nuevaActividad,
              _idActividad,
              usuarioSesionAdministrador.Usuario,
              this.responsableActual.Usuario
            )
            .then((res) => {
              if (res) {
                var token = this.sesionExterna.ObtenerClaveExterna();
                var actividad = "";
                var link = "";
                const detalleRservaCliente = "cliente/reservacion/detalle/";

                if (dtViaje.Estado.IdEstado == 1) {
                  // Siguiente Tarea PreAprobar
                  actividad = "la PREAPROBACIÓN";
                  link = "preaprobador/reservacion/detalle/" + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 2) {
                  // Siguiente Tarea Aprobar
                  actividad = "la APROBACIÓN";
                  link = "aprobador/reservacion/detalle/" + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 5) {
                  // Siguiente Tarea Registro Movilización u Hospedaje
                  actividad = "el REGISTRO DE MOVILIZACIÓN U HOSPEDAJE";
                  link = "registrador/pago/viajes/detalle/" + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 6) {
                  // Siguiente Tarea Liquidación
                  actividad = "la LIQUIDACIÓN";
                  link = detalleRservaCliente + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 7) {
                  // Siguiente Tarea Contabilizar
                  actividad = "la CONTABILIZACIÓN";
                  link = "contador/reservacion/detalle/" + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 4) {
                  // Siguiente Tarea Modificación
                  actividad = "la MODIFICACIÓN";
                  link = detalleRservaCliente + dtViaje.IdViaje;
                } else if (dtViaje.Estado.IdEstado == 10) {
                  // Siguiente Tarea Edición Liquidación
                  actividad = "la EDICIÓN DE LA LIQUIDACIÓN";
                  link = detalleRservaCliente + dtViaje.IdViaje;
                }

                var datos = JSON.stringify({
                  tipo: "link",
                  usuario: this.responsableNuevoData.Usuario,
                  idViaje: dtViaje.IdViaje,
                  url: link,
                });
                var urlAcceso = "#/" + btoa(datos);

                var email = {
                  Token: token,
                  Email: {
                    Cuerpo: this.servicioEmail.GenerarEmailReasignacion(
                      dtViaje.IdViaje,
                      dtViaje.FechaSolicitudViaje,
                      dtViaje.NombreViaje,
                      dtViaje.Transporte.Ruta.DestinoRuta,
                      dtViaje.MotivoViaje,
                      this.responsableNuevoData.NombreCompleto,
                      actividad,
                      urlAcceso
                    ),
                    Asunto: "Reasignación de Solicitud de Viaje",
                    IdAplicacion: IdAplicacion,
                    IdTransaccion: "",
                    NumeroIdentificacion: "",
                    Contrato: "",
                    NombreOrigen: NombreOrigen,
                    EmailOrigen: EmailOrigen,
                    EmailsDestino: [
                      {
                        Nombre: this.responsableNuevoData.NombreCompleto,
                        Direccion: this.global.Reemplazar(this.responsableNuevoData.Email)
                      },
                    ],
                    TiempoEspera: TiempoEspera,
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
              }
            })
        })
        .catch((err) => {
          this.spinner.hide();
        });
    }

    setTimeout(() => {
      this.global.Alerta(
        "Información",
        "Tareas Reasignadas Exitosamente",
        "success"
      );
      this.ObtenerListaRolesUsuario(this.responsableActual.Usuario);
    }, 2000);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.ListadoTareasFinal, this.state);
  }

  public CargarHistorialActividades(viajeSeleccionado: any) {
    this.rutaSistema.navigate([
      "/cliente/reservacion/ver-tarea/" + viajeSeleccionado,
    ]);
  }
}
