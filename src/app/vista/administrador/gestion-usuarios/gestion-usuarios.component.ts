import { Component, OnInit } from "@angular/core";
import { DataStateChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { process, State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

declare var $: any;
@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.css"],
})
export class GestionUsuariosComponent implements OnInit {
  public mensaje = "Cargando Información...";
  public lstUsuarios = [];
  public lstCiudadesViajes = [];
  public lstRolesPorUsuario = [];
  public state: State = { skip: 0, take: 15 };
  public stateRol: State = { skip: 0, take: 10 };

  alerta = false;

  listaRoles = [];
  rolSeleccion: any;
  ciudadSeleccion: any;

  usuarioActual: any;

  public gridData: GridDataResult = process(this.lstUsuarios, this.state);

  public gridRolesPorUsuario: GridDataResult = process(this.lstRolesPorUsuario,this.stateRol);

  usuario: any = {
    Nombre: "",
    Descripcion: "",
    usuario: "",
  };

  verTabla = true;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly globales: ServicioGlobales,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna
  ) {}

  ngOnInit() {
    this.ObtenerUsuarios();
  }

  public ObtenerUsuarios() {
    this.spinner.show();
    this.dataInterna
      .ObtenerUsuariosViajeAdicional()
      .then((res) => {
        this.lstUsuarios = res;
        this.gridData = process(this.lstUsuarios, this.state);
        this.spinner.hide();
        this.ObtenerRolesViaje();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerRolesViaje() {
    this.dataInterna
      .ObtenerRolesViajeAdicional()
      .then((res) => {
        this.listaRoles = res;
        this.ObtenerCiudadesViajes();
      })
      .catch((error) => { console.log(error) });
  }

  public ObtenerCiudadesViajes() {
    this.spinner.show();
    this.dataInterna
      .ObtenerCiudadesViajes()
      .then((res) => {
        this.lstCiudadesViajes = res;
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public AbrirModalEditar(usuario: any) {
    this.spinner.show();
    const nombreUsuario = usuario.UserUsuario;
    this.usuarioActual = usuario;
    this.rolSeleccion = null;
    this.ciudadSeleccion = null;
    this.stateRol = { skip: 0, take: 10 };
    $("#modalUsuarios").modal("toggle");
    this.ObtenerListaRolesUsuario(nombreUsuario);
  }

  public ObtenerListaRolesUsuario(nombreUsuario: any) {
    this.dataInterna
      .GestionObtenerUsuarioRolAdministracion(nombreUsuario)
      .then((res) => {
        this.lstRolesPorUsuario = res;
        this.lstRolesPorUsuario.sort(
          (a: any, b: any) => b.Rol.IdRolViaje - a.Rol.IdRolViaje
        );
        this.gridRolesPorUsuario = process(
          this.lstRolesPorUsuario,
          this.stateRol
        );
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ValidarCrearRol(): boolean {
    if (this.rolSeleccion && this.ciudadSeleccion) {
      const existe = this.lstRolesPorUsuario.findIndex((registro) => (registro.Rol.IdRolViaje == this.rolSeleccion.IdRolViaje && registro.Usuario.CiudadUsuario == this.ciudadSeleccion.Nombre));
      if (existe != -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public ValidarRolCiudad(idRol: any, ciudad: any): any {
    return new Promise((resol, rej) => {
      this.dataInterna
        .ExisteRolCiudad(idRol, ciudad)
        .then((res) => {
          if (res.length > 0) {
            this.globales.VerMensajeError(
              `Atención: <br>El usuario  ${res[0].Usuario.NombreUsuario} ya tiene el rol ${res[0].Rol.NombreRol} en la ciudad de ${res[0].Usuario.CiudadUsuario}</br>`,
              "warning",
              "top-end"
            );
            return resol(false);
          } else {
            return resol(true);
          }
        })
        .catch((error) => {
          return resol(false);
        });
    });
  }

  public async CreaRolUsuario() {
    if (this.ValidarCrearRol()) {
      if (this.rolSeleccion && this.ciudadSeleccion) {
        if (
          await this.ValidarRolCiudad(
            this.rolSeleccion.IdRolViaje,
            this.ciudadSeleccion.Nombre
          )
        ) {
          this.spinner.show();
          var datos: any = {
            EstadoUsuarioRolViaje: 1,
            IdUsuarioRolViaje: 0,
            Usuario: {
              IdUsuarioViaje: this.usuarioActual.IdUsuarioViaje,
              CiudadUsuario: this.ciudadSeleccion.Nombre,
            },
            Rol: {
              Identificador: 1,
              IdRolViaje: this.rolSeleccion.IdRolViaje,
              Principal: 0,
            },
          };
          this.dataInterna
            .CrearUsuarioRolViaje(datos)
            .then((res) => {
              this.spinner.hide();
              this.globales.VerMensajeError(
                "Atención: <br>Rol creado correctamente</br>",
                "success",
                "top-end"
              );
              this.ObtenerListaRolesUsuario(this.usuarioActual.UserUsuario);
              this.ciudadSeleccion = null;
              this.rolSeleccion = null;
            })
            .catch((error) => { this.spinner.hide() });
        }
      } else { console.log("Llene todos los campos") }
    } else {
      this.globales.VerMensajeError(
        `Atención: <br>El usuario ya tiene asignado el rol ${this.rolSeleccion.NombreRol} en la ciudad de ${this.ciudadSeleccion.Nombre}</br>`,
        "warning",
        "top-end"
      );
    }
  }

  public CerrarAlerta() {
    this.alerta = false;
  }

  public EliminarRol(dataUser:any) {
    if (dataUser.Rol.Principal != 1) {
      var datos: any = {
        IdUsuarioRolViaje: dataUser.IdUsuarioRolViaje,
        EstadoUsuarioRolViaje: 0,
        Usuario: {
          IdUsuarioViaje: 0,
          CiudadUsuario: "",
        },
        Rol: {
          Identificador: 2,
          IdRolViaje: 0,
          Principal: 0,
        },
      };
      Swal.fire({
        title: "Eliminar rol del usuario",
        html: "¿Está seguro que desea eliminar el rol?",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar rol",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.dataInterna
            .CrearUsuarioRolViaje(datos)
            .then((res) => {
              this.ObtenerListaRolesUsuario(this.usuarioActual.UserUsuario);
            })
            .catch((error) => { console.log(error) });
        }
      });
    } else {
      this.globales.VerMensajeError(
        "Atención: <br>No se permite eliminar el rol principal</br>",
        "warning",
        "top-end"
      );
    }
  }

  public ActivarDesactivar(dataUser:any) {
    var datos: any = {
      IdUsuarioRolViaje: dataUser.IdUsuarioRolViaje,
      EstadoUsuarioRolViaje: dataUser.EstadoUsuarioRolViaje == 1 ? 0 : 1,
      Usuario: {
        IdUsuarioViaje: this.usuarioActual.IdUsuarioViaje,
        CiudadUsuario: dataUser.Usuario.CiudadUsuario,
      },
      Rol: {
        Identificador: 4,
        IdRolViaje: dataUser.Rol.IdRolViaje,
        Principal: dataUser.Rol.Principal,
      },
    };
    Swal.fire({
      title: "Cambiar estado",
      html: "¿Está seguro de cambiar el estado del rol?",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Si, cambiar rol",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.dataInterna
          .CrearUsuarioRolViaje(datos)
          .then((res) => {
            if(res == 0){
              this.globales.VerAlertaTiempoLargo("Información","No se puede activar el rol <b>" + dataUser.Rol.NombreRol + "</b><br> porque ya existe un usuario habilitado para la ciudad: <b>" + dataUser.Usuario.CiudadUsuario + "</b>","warning");
            }else{
              this.ObtenerListaRolesUsuario(this.usuarioActual.UserUsuario);
            }
          })
          .catch((error) => { console.log(error) });
      }
    });
  }

  public AbrirFormularioCrearUsuario() {
    $("#collapseCrearUser").collapse("show");
    this.rolSeleccion = null;
    this.ciudadSeleccion = null;
    this.verTabla = false;
  }

  public VerSoloCuadricula() {
    $("#collapseCrearUser").collapse("hide");
    this.verTabla = true;
    this.usuario.nombre = "";
    this.usuario.email = "";
    this.usuario.idUSuario = "";
    this.usuario.usuario = "";
  }

  public BuscarPorUsuario() {
    const usuario = this.usuario.usuario;
    this.usuario.nombre = "";
    this.usuario.email = "";
    this.usuario.descripcion = "";
    if (usuario) {
      this.spinner.show();
      var token = this.sesionExterna.ObtenerClaveExterna();

      this.dataExterna
        .ObtenerUsuarioDos(token, usuario)
        .then((res) => {
          this.usuario.nombre = res.ApellidosNombres == null ? res.NombreCompleto : res.ApellidosNombres;
          this.usuario.email = res.Email;
          this.usuario.idUSuario = res.IdUsuarioViaje;
          this.spinner.hide();
        })
        .catch((error) => {
          this.spinner.hide();
          if (error.status == 400) {
            this.globales.VerMensajeError(
              "Atención: <br>No se encontro ningun usuario</br>",
              "warning",
              "top-end"
            );
          }
        });
    }
  }

  public GuardarUsuario() {
    const existe = this.lstUsuarios.findIndex(
      (lstU:any) => lstU.UserUsuario == this.usuario.usuario
    );
    if (existe != -1) {
      this.globales.VerMensajeError(
        "Atención: <br>El usuario ya esta registrado,si quiere generar roles dirijase a ediar usuario</br>",
        "warning",
        "top-end"
      );
    } else {
      if (this.rolSeleccion == undefined) {
        this.globales.VerMensajeError(
          "Atención: <br>Debe elegir un rol para el usuario</br>",
          "warning",
          "top-end"
        );
      } else if (this.ciudadSeleccion == undefined) {
        this.globales.VerMensajeError(
          "Atención: <br>Debe seleccionar una ciudad para el usuario</br>",
          "warning",
          "top-end"
        );
      } else {
        var rolSeleccionado = this.rolSeleccion.IdRolViaje;
        var ciudadSeleccionada = this.ciudadSeleccion.Nombre;

        var datos: any = {
          IdUsuarioRolViaje: 0,
          EstadoUsuarioRolViaje: 0,
          Usuario: {
            IdUsuarioViaje: 0,
            CiudadUsuario: ciudadSeleccionada,
            UserUsuario: this.usuario.usuario,
            NombreUsuario: this.usuario.nombre,
            EmailUsuario: this.usuario.email,
            DescripcionUsuario: "",
          },
          Rol: {
            Identificador: 1,
            IdRolViaje: rolSeleccionado,
            Principal: 0,
          },
        };

        this.dataInterna
          .GestionUsuarioNuevo(datos)
          .then((res) => {
            this.globales.VerMensajeError(
              "Atención: <br>Usuario creadoo</br>",
              "success",
              "top-end"
            );
            this.ObtenerUsuarios();
            this.VerSoloCuadricula();
            this.usuario.nombre = "";
            this.usuario.email = "";
            this.usuario.idUSuario = "";
            this.usuario.usuario = "";

            this.ciudadSeleccion = "";
            this.rolSeleccion = {
              DescripcionRol: "",
              EstadoRol: "",
              IdRolViaje: 0,
              Identificador: 0,
              NombreRol: "",
              Principal: "",
            };
          })
          .catch((error) => { console.log(error) });
      }
    }
  }

  public EliminarUsuario(data:any) {
    var datos: any = {
      IdUsuarioRolViaje: 0,
      EstadoUsuarioRolViaje: 0,
      Usuario: {
        IdUsuarioViaje: data.IdUsuarioViaje,
        CiudadUsuario: "",
        UserUsuario: "",
        NombreUsuario: "",
        EmailUsuario: "",
        DescripcionUsuario: "",
      },
      Rol: {
        Identificador: 2,
        IdRolViaje: 0,
        Principal: 0,
      },
    };
    Swal.fire({
      title: "Eliminar usuario",
      html: "¿Está seguro que desea eliminar el usuariol?",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.dataInterna
          .CrearUsuario(datos)
          .then((res) => {
            this.globales.VerMensajeError(
              "Atención: <br>Usuario eliminado</br>",
              "success",
              "top-end"
            );
            this.ObtenerUsuarios();
          })
          .catch((error) => { console.log(error) });
      }
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstUsuarios, this.state);
  }

  public dataStateChangeRol(stateRol: DataStateChangeEvent): void {
    this.stateRol = stateRol;
    this.gridRolesPorUsuario = process(this.lstRolesPorUsuario, this.stateRol);
  }

}
