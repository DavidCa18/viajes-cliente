import { Component, OnInit } from "@angular/core";
import { process, State } from "@progress/kendo-data-query";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;

@Component({
  selector: "app-estados",
  templateUrl: "./estados.component.html",
})
export class EstadosComponent implements OnInit {
  public mensaje = "Cargando Información...";

  public catalogoEstado: any = {
    IdEstado: 0,
    DescripcionEstado: "",
  };

  public lstEstadosCatalogo = [];
  public dtsEstadosCatalogo: any;
  public state: State = { skip: 0, take: 15 };
  public gridData: GridDataResult = process(this.lstEstadosCatalogo, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerEstado();
  }

  public ObtenerEstado() {
    this.spinner.show();
    this.dataInterna
      .ObtenerEstado()
      .then((res) => {
        this.lstEstadosCatalogo = res;
        this.dtsEstadosCatalogo = this.lstEstadosCatalogo.slice();
        this.gridData = process(this.lstEstadosCatalogo, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarEstadoCatalogo() {
    if (this.validador.ValidarFormularioCatalogoEstado(this.catalogoEstado)) {
      var datos = {
        Identificador: 1,
        IdEstado: 0,
        DescripcionEstado: this.catalogoEstado.DescripcionEstado,
      };

      this.spinner.show();
      this.dataInterna
        .GestionEstado(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerEstado();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "El estado se creo exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalCrearEstado");
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

  public ActualizarEstadoCatalogo() {
    if (this.validador.ValidarFormularioCatalogoEstado(this.catalogoEstado)) {
      var datos = {
        Identificador: 2,
        IdEstado: this.catalogoEstado.IdEstado,
        DescripcionEstado: this.catalogoEstado.DescripcionEstado,
      };

      this.spinner.show();
      this.dataInterna
        .GestionEstado(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerEstado();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "El estado se actualizo exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalEditarEstado");
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
    this.LimpiarCatalogoEstado();
    $("#modalCrearEstado").modal("show");
  }

  public AbrirModalEditar(stateSelected: any) {
    this.catalogoEstado = stateSelected;
    $("#modalEditarEstado").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarCatalogoEstado() {
    this.catalogoEstado = {
      IdEstado: 0,
      DescripcionEstado: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstEstadosCatalogo, this.state);
  }
}
