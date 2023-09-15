import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioUsuario } from "../../../servicios/usuario/usuario.service";

@Component({
  selector: "app-treassig",
  templateUrl: "./reasignacion-tareas.component.html",
  styleUrls: ["./reasignacion-tareas.component.css"],
})
export class ReasignacionTareasComponent implements OnInit {
  public tipoMenu = 1;
  public mensaje = "Cargando Información...";
  public textoInformacion = "Información";
  public lstUsuariosGrupo = [];
  public lstUsuariosGrupoDatos: Array<{ Usuario: string; NombreCompleto: string; }>;
  public datosBase: any;
  public usuarioActual: any;
  public usuarioReasignado: any;
  public nuevoResponsableActual: any;
  public radioOficina: string;
  public seleccionActiva = false;
  public listadoRolesResponsableActual: any;
  public listadoRolesResponsableNuevo: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router,
    private readonly globales: ServicioGlobales,
  ) {}

  ngOnInit() {
    this.usuarioActual = this.servicioUsuario.ObtenerUsuario();
    this.ListadoUsuariosPorGrupo();
  }

  // Cargar listado de usuarios del directorio activo para los dos combos
  public ListadoUsuariosPorGrupo() {
    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();
    var data = { Token: token.access_token };
    this.dataExterna
      .ObtenerListadoUsuariosPorGrupo(data)
      .then((res: any) => {
        var aux = JSON.parse(res);
        this.lstUsuariosGrupo = aux.Datos;
        this.lstUsuariosGrupoDatos = this.lstUsuariosGrupo.slice();
        this.spinner.hide();
        this.ObtenerUsuario();
      })
      .catch((err: any) => {
        this.spinner.hide();
      });
  }

  // Validar si el usuario está en la oficina o no
  public ObtenerUsuario() {
    this.spinner.show();
    this.dataInterna
      .ConsultaUsuarioReasignadoDatos(this.usuarioActual.Usuario)
      .then((res) => {
        this.datosBase = res;
        this.spinner.hide();
        if (this.datosBase.NombreUsuario == null) {
          this.radioOficina = "1";
          this.seleccionActiva = false;
        } else {
          this.radioOficina = "0";
          this.CargarInformacionUsuario(this.datosBase.UsuarioReasignar);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  // Obtener información del usuario reasignado
  public CargarInformacionUsuario(username: any) {
    var token = this.sesionExterna.ObtenerClaveExterna();
    this.dataExterna
      .ObtenerUsuario(token, username)
      .then((res) => {
        this.spinner.hide();
        this.usuarioReasignado = res;
        if (this.datosBase.UsuarioReasignar != null) {
          this.nuevoResponsableActual = {
            Usuario: this.usuarioReasignado.Usuario,
            NombreCompleto: this.usuarioReasignado.NombreCompleto,
          };
        }
        this.seleccionActiva = true;
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CambioTipo() {
    if (this.radioOficina == "0") {
      this.seleccionActiva = false;

      if (this.nuevoResponsableActual.Usuario != "") {
        var data: any = {
          Identificador: 2,
          Usuario: this.nuevoResponsableActual.Usuario,
          NombreCompleto: this.usuarioActual.Usuario,
          Email: "",
          Ciudad: "",
          PreAprobador: 0,
          Aprobador: 0,
          RegistradorPago: 0,
          Contador: 0,
        };

        this.GestionFueraOficinaRolesTarea(data, 2);
      }
    } else if (this.radioOficina == "1") {
      this.seleccionActiva = true;
      this.nuevoResponsableActual = { Usuario: "", NombreCompleto: "" };
    }
  }

  public AsignarFueraOficina() {
    if (this.usuarioActual.Usuario == this.nuevoResponsableActual.Usuario) {
      this.globales.Alerta(
        this.textoInformacion,
        "No puede seleccionar el mismo usuario de sesión",
        "warning"
      );
    } else {
      this.dataInterna
        .ConsultaVerificacionUsuarioReasignadoExistenteData(
          this.nuevoResponsableActual.Usuario
        )
        .then((res) => {
          if (res == 0) {
            this.ObtenerListaRolesResponsableNuevo(
              this.nuevoResponsableActual.Usuario
            );
          } else {
            this.globales.VerAlertaTiempoLargo(
              this.textoInformacion,
              `El usuario <b style='color: #003366 !important; font-weight: bold !important;'>${this.nuevoResponsableActual.NombreCompleto} </b> <br> ya se encuentra asignado como respaldo de otra persona dentro de la plataforma. <br> Seleccione a otra persona para continuar.`,
              "error"
            );
          }
        })
        .catch((err) => { console.log(err) });
    }
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
          Identificador: 1,
          Usuario: this.nuevoResponsableActual.Usuario,
          NombreCompleto: this.nuevoResponsableActual.NombreCompleto,
          Email: this.nuevoResponsableActual.Usuario + "@saludsa.com.ec",
          Ciudad: this.usuarioActual.CiudadDescripcion,
          PreAprobador: preaprobador == "si" ? 1 : 0,
          Aprobador: aprobador == "si" ? 1 : 0,
          RegistradorPago: _registradorPago == "si" ? 1 : 0,
          Contador: contador == "si" ? 1 : 0,
        };

        this.GestionFueraOficinaRolesTarea(data, 1);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GestionFueraOficinaRolesTarea(data: any, identificador: any) {
    this.spinner.show();
    this.dataInterna
      .GestionFueraOficinaRoles(data)
      .then((res) => {
        this.spinner.hide();
        if (identificador == 1) {
          this.GestionFueraOficina(1);
        } else if (identificador == 2) {
          this.GestionFueraOficina(2);
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GestionFueraOficina(identificador: any) {
    var data: any = {
      Identificador: identificador,
      NombreUsuario: this.usuarioActual.Usuario,
      EnLaOficina: 0,
      UsuarioReasignar:
        identificador == 1 ? this.nuevoResponsableActual.Usuario : "",
    };

    this.spinner.show();
    this.dataInterna
      .GestionFueraOficina(data)
      .then((res) => {
        this.spinner.hide();
        if (identificador == 1) {
          this.globales.Alerta(
            this.textoInformacion,
            "Asignación exitosa de usuario fuera de oficina",
            "success"
          );
        } else {
          this.globales.Alerta(
            this.textoInformacion,
            "Cambió de estado fuera de oficina exitosamente",
            "success"
          );
        }
        setTimeout(() => {
          this.rutaSistema.navigate(["/cliente/reservacion/lista"]);
        }, 2000);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  // Filtro de combo de usuarios del directorio activo
  public handleFilter(value: any) {
    this.lstUsuariosGrupo = this.lstUsuariosGrupoDatos.filter(
      (s) =>
        s.NombreCompleto.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
}
