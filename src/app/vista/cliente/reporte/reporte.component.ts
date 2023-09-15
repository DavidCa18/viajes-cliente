import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioUsuario } from "../../../servicios/usuario/usuario.service";
import { process, State } from "@progress/kendo-data-query";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";

@Component({
  selector: "app-report",
  templateUrl: "./reporte.component.html",
})
export class ReporteComponent implements OnInit {

  public tipoMenu = 1;
  public mensaje = "Cargando Información...";
  public state: State = { skip: 0, take: 30 };
  public lstRegistroActividades: any;
  public sesionLocal: any;
  public lstPerfiles: any;
  public dtPerfil: any;
  public lstViaje: any;
  public dtsViajes: any;
  public lstViajes = [];
  public lstViajeReasignados = [];
  public listadoViajesFinal = [];
  public gridData: GridDataResult = process( this.listadoViajesFinal, this.state );

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly servicioUsuario: ServicioUsuario,
    private readonly servicioInterno: ServicioDataInternos,
    private readonly rutaSistema: Router
  ) {}

  ngOnInit() {
    this.InicializarParametros();
  }

  public InicializarParametros() {
    this.sesionLocal = this.servicioUsuario.ObtenerUsuario();
    this.lstPerfiles = JSON.parse(localStorage.getItem("k-perfiles"));
    this.dtPerfil = localStorage.getItem("k-perfil");
    this.ValidarCadenaConsulta();
  }

  public ValidarCadenaConsulta() {
    var query: any = "";

    for (const perfil of this.lstPerfiles) {
      if (perfil === "REGISTRADOR") {
        query += `(UsuarioRegistrador = '${this.sesionLocal.Usuario}') OR `;
      }

      if (perfil === "PRE-APROBADOR") {
        query += `(UsuarioPreAprobador = '${this.sesionLocal.Usuario}') OR `
      }

      if (perfil === "APROBADOR") {
        query += `(UsuarioAprobador = '${this.sesionLocal.Usuario}') OR `;
      }

      if (perfil === "REGISTRADOR PAGO") {
        query += `(UsuarioRegistradorPago = '${this.sesionLocal.Usuario}') OR `;
      }

      if (perfil === "CONTADOR") {
        query += `(UsuarioContador = '${this.sesionLocal.Usuario}') OR `;
      }
    }

    var cadena = `WHERE (${query.slice(0, -4)}) ORDER BY FechaSolicitudViaje DESC`;

    this.ObtenerListadoViajesCadena(cadena);
  }

  public ObtenerListadoViajesCadena(cadena: any) {
    this.spinner.show();
    this.servicioInterno
      .ObtenerListadoViajesCadena(cadena)
      .then((res) => {
        this.spinner.hide();
        this.lstViaje = res;
        this.lstViajes = res;
        this.ObtenerListadoViajesReasignados(this.sesionLocal.Usuario);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerListadoViajesReasignados(usuario: any) {
    this.spinner.show();
    this.servicioInterno
      .ObtenerListadoViajesReasignados(usuario)
      .then((res) => {
        this.spinner.hide();
        this.lstViajeReasignados = res;
        this.listadoViajesFinal = this.lstViajes.concat(
          this.lstViajeReasignados
        );
        // ordenar de menor a mayor - this.listadoViajesFinal.sort((a:any, b:any) => a.IdViaje - b.IdViaje);
        this.listadoViajesFinal.sort((a: any, b: any) => b.IdViaje - a.IdViaje);
        this.dtsViajes = this.lstViajes.slice();

        this.gridData = process(this.listadoViajesFinal, this.state);
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public CargarHistorialActividades(viajeSeleccionado: any) {
    this.rutaSistema.navigate([
      "/cliente/reservacion/ver-tarea/" + viajeSeleccionado,
    ]);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstViajes, this.state);
  }
}
