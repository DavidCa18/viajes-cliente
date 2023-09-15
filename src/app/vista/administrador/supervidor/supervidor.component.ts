import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicioDataExternos } from '../../../controladores/externos/datos-externos.service';
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioSesionExterna } from '../../../servicios/sesion-externa/sesion-externa.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-supervidor',
  templateUrl: './supervidor.component.html',
  styleUrls: ['./supervidor.component.css']
})
export class SupervidorComponent implements OnInit {
  public textoInformacion = "Información";
  public lstUsuariosSupervisores = [];
  public state: State = { skip: 0, take: 15 };
  public gridData: GridDataResult = process(this.lstUsuariosSupervisores, this.state);

  public usuarioNuevo: any;
  public usuarioBusqueda: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly globales: ServicioGlobales,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna
  ) { }

  ngOnInit() {
    this.ConsultarListadoUsuariosSupervisores();
  }

  public ConsultarListadoUsuariosSupervisores() {
    this.spinner.show();
    this.dataInterna.ConsultarListadoUsuariosSupervisores().then((res) => {
      this.lstUsuariosSupervisores = res;
      this.gridData = process(this.lstUsuariosSupervisores, this.state);
      this.spinner.hide();
    }).catch((err: any) => {
      this.spinner.hide();
    });
  }

  public BuscarUsuarioDirectorioActivo() {
    if (this.usuarioNuevo) {
      this.spinner.show();
      var token = this.sesionExterna.ObtenerClaveExterna();
      this.dataExterna.ObtenerUsuarioDos(token, this.usuarioNuevo).then((res) => {
        this.spinner.hide();
        if (res) {
          this.usuarioBusqueda = res;
          Swal.fire({
            title: this.textoInformacion,
            html: "Mediante la búsqueda se encontró la información de la siguiente persona: <br><b>" + res.NombreCompleto + "</b><br> Presione aceptar para asignarle el rol de <b>Supervisor</b>",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.value) {

              var datos: any = {
                IdUsuarioRolViaje: 0,
                EstadoUsuarioRolViaje: 0,
                Usuario: {
                  IdUsuarioViaje: 0,
                  CiudadUsuario: this.usuarioBusqueda.CiudadDescripcion,
                  UserUsuario: this.usuarioBusqueda.Usuario,
                  NombreUsuario: this.usuarioBusqueda.NombreCompleto,
                  EmailUsuario: this.usuarioBusqueda.Email,
                  DescripcionUsuario: "Usuario Supervisor",
                },
                Rol: {
                  Identificador: 2,
                  IdRolViaje: 10,
                  Principal: 0,
                },
              };

              this.dataInterna.GestionUsuarioNuevo(datos).then((res) => {
                if (res == 0) {
                  this.globales.VerAlerta(this.textoInformacion, "El usuario <b>" + this.usuarioBusqueda.NombreCompleto + "</b> ya tiene asignado el rol de <b>Supervidor.</b>", "info");
                  this.usuarioNuevo = "";
                } else {
                  this.globales.VerAlerta("Transacción Exitosa", "El rol de <b>Supervidor</b> ha sido asignado exitosamente a la persona <br><b>" + this.usuarioBusqueda.NombreCompleto + "</b>", "success");
                  this.usuarioNuevo = "";
                  this.ConsultarListadoUsuariosSupervisores();
                }
              }).catch((error) => { console.log(error) });

            }
          });
        }

      }).catch((error) => {
        this.spinner.hide();
        if (error.status == 400) {
          this.globales.VerMensajeError("Atención: <br>No se encontro información con el usuario ingresado</br>", "warning", "top-end");
        }
      });
    } else {
      this.globales.Alerta(this.textoInformacion, "Debe llenar el campo <b>Usuario</b>", "info");
    }
  }

  public EliminarUsuarioSupervisor(usuarioSeleccionado: any) {
    Swal.fire({
      title: "Confirmar Acción",
      html: "Esta seguro de eliminar el rol de Supervidor al usuario <br> <b>" + usuarioSeleccionado.Usuario.NombreUsuario + "</b>",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.value) {
        var datos: any = {
          IdUsuarioRolViaje: usuarioSeleccionado.IdUsuarioRolViaje,
          EstadoUsuarioRolViaje: 0,
          Usuario: {
            IdUsuarioViaje: 0,
            CiudadUsuario: "",
            UserUsuario: usuarioSeleccionado.Usuario.UserUsuario,
            NombreUsuario: "",
            EmailUsuario: "",
            DescripcionUsuario: "",
          },
          Rol: {
            Identificador: 3,
            IdRolViaje: 10,
            Principal: 0,
          },
        };
        this.dataInterna.GestionUsuarioNuevo(datos).then((res) => {
          if (res == 0) {
            this.globales.VerAlerta(this.textoInformacion, "No fue posible eliminar el supervidor seleccionado", "warning");
          } else {
            this.globales.VerAlerta("Transacción Exitosa", "Se ha eliminado correctamente el usuario supervisor seleccionado", "success");
            this.ConsultarListadoUsuariosSupervisores();
          }
        }).catch((error) => { console.log(error) });
      }
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstUsuariosSupervisores, this.state);
  }
}
