import { Component, OnInit } from "@angular/core";
import {
  DataStateChangeEvent,
  GridDataResult,
} from "@progress/kendo-angular-grid";
import { process, State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';

declare var $: any;

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
})
export class CategoriasComponent implements OnInit {
  public mensaje = "Cargando Información...";

  public categoria: any = {
    IdCategorias: 0,
    Codigo: "",
    Nombre: "",
  };

  public lstCategorias = [];
  public dtsCategorias: any;
  public state: State = { skip: 0, take: 5 };

  public gridData: GridDataResult = process(this.lstCategorias, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerCategorias();
  }

  public ObtenerCategorias() {
    this.spinner.show();
    this.dataInterna
      .ObtenerCategoria()
      .then((res) => {
        this.lstCategorias = res;
        this.dtsCategorias = this.lstCategorias.slice();
        this.gridData = process(this.lstCategorias, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarCategoria() {
    if (this.validador.ValidarFormularioCategoria(this.categoria)) {
      var datos = {
        Identificador: 1,
        IdCategorias: 0,
        Codigo: this.categoria.Codigo,
        Nombre: this.categoria.Nombre,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarCategoria(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerCategorias();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "La Categoría fue creada exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalCrearCategoria");
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

  public ActualizarCategoria() {
    if (this.validador.ValidarFormularioCategoria(this.categoria)) {
      var datos = {
        Identificador: 2,
        IdCategorias: this.categoria.IdCategorias,
        Codigo: this.categoria.Codigo,
        Nombre: this.categoria.Nombre,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarCategoria(datos)
        .then((res) => {
          this.spinner.hide();

          this.ObtenerCategorias();
          this.global.VerAlerta(
            "Transacción Exitosa",
            "La Categoría fue actualiza exitosamente",
            "success"
          );

          this.CerrarModal("modalEditarCategoria");
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
    this.LimpiarCategoria();
    $("#modalCrearCategoria").modal("show");
  }

  public AbrirModalEditar(categoriaSeleccionada: any) {
    this.categoria = categoriaSeleccionada;
    $("#modalEditarCategoria").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarCategoria() {
    this.categoria = {
      IdCategorias: 0,
      Nombre: "",
      Codigo: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstCategorias, this.state);
  }
}
