import { Component, OnInit } from "@angular/core";
import { process, State } from "@progress/kendo-data-query";
import {
  GridDataResult,
  DataStateChangeEvent,
} from "@progress/kendo-angular-grid";

import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';

declare var $: any;
@Component({
  selector: "app-rutas",
  templateUrl: "./rutas.component.html",
})
export class RutasComponent implements OnInit {
  public rute: any = {
    IdRuta: 0,
    NombreRuta: "",
    DescripcionRuta: "",
    OrigenRuta: "",
    DestinoRuta: "",
  };

  public mensaje = "Cargando Información...";
  public lstRutas = [];
  public dtsRutas: any;
  public state: State = { skip: 0, take: 10 };
  public gridData: GridDataResult = process(this.lstRutas, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerRutas();
  }

  public ObtenerRutas() {
    this.spinner.show();
    this.dataInterna
      .ObtenerRutas()
      .then((res) => {
        this.lstRutas = res;
        this.dtsRutas = this.lstRutas.slice();
        this.gridData = process(this.lstRutas, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarRuta() {
    if (this.validador.ValidarFormularioRuta(this.rute)) {
      var datos = {
        Identificador: 1,
        IdRuta: 0,
        NombreRuta: this.rute.NombreRuta,
        DescripcionRuta: this.rute.DescripcionRuta,
        OrigenRuta: this.rute.OrigenRuta,
        DestinoRuta: this.rute.DestinoRuta,
      };

      this.spinner.show();
      this.dataInterna
        .GestionRuta(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerRutas();
            this.global.VerAlerta(
              "Información",
              "Ruta agregada exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalCrearRuta");
        })
        .catch((err) => {
          this.spinner.hide();
          this.global.VerAlerta(
            "Error",
            "Se presento un error <br> Inténtelo más tarde",
            "error"
          );
        });
    }
  }

  public ActualizarRuta() {
    if (this.validador.ValidarFormularioRuta(this.rute)) {
      var datos = {
        Identificador: 2,
        IdRuta: this.rute.IdRuta,
        NombreRuta: this.rute.NombreRuta,
        DescripcionRuta: this.rute.DescripcionRuta,
        OrigenRuta: this.rute.OrigenRuta,
        DestinoRuta: this.rute.DestinoRuta,
      };

      this.spinner.show();
      this.dataInterna
        .GestionRuta(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerRutas();
            this.global.VerAlerta(
              "Información",
              "Ruta actualizada exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalEditarRuta");
        })
        .catch((err) => {
          this.spinner.hide();
          this.global.VerAlerta(
            "Error",
            "Se presento un error <br> Inténtelo más tarde",
            "error"
          );
        });
    }
  }

  public AbrirModalCrear() {
    this.LimpiarRuta();
    $("#modalCrearRuta").modal("show");
  }

  public AbrirModalEditar(rutaSeleccionada: any) {
    this.rute = rutaSeleccionada;
    $("#modalEditarRuta").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarRuta() {
    this.rute = {
      IdRuta: 0,
      NombreRuta: "",
      DescripcionRuta: "",
      OrigenRuta: "",
      DestinoRuta: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstRutas, this.state);
  }
}
