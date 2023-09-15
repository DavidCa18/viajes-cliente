import { Component, OnInit } from "@angular/core";
import { process, State } from "@progress/kendo-data-query";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';

declare var $: any;
@Component({
  selector: "app-tipos-documentos",
  templateUrl: "./tipos-documentos.component.html",
})
export class TiposDocumentosComponent implements OnInit {
  public TipoDocumento: any = {
    IdTipoDocumento: 0,
    Nombre: "",
    Codigo: "",
  };

  public mensaje = "Cargando Información...";
  public lstTiposDocumentos = [];
  public dtsTiposDocumentos: any;
  public state: State = { skip: 0, take: 5 };
  public gridData: GridDataResult = process(this.lstTiposDocumentos, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerTipoDocumento();
  }

  public ObtenerTipoDocumento() {
    this.spinner.show();
    this.dataInterna
      .ObtenerTipoDocumento()
      .then((res) => {
        this.lstTiposDocumentos = res;
        this.dtsTiposDocumentos = this.lstTiposDocumentos.slice();
        this.gridData = process(this.lstTiposDocumentos, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarTipoDocumento() {
    if (this.validador.ValidarFormularioTipoDocumento(this.TipoDocumento)) {
      var datos = {
        Identificador: 1,
        IdTipoDocumento: 0,
        Codigo: this.TipoDocumento.Codigo,
        Nombre: this.TipoDocumento.Nombre,
      };

      this.spinner.show();
      this.dataInterna
        .GestionTipoDocumento(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerTipoDocumento();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "Documento creado exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalCrearTipoDocumento");
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

  public ActualizarTipoDocumento() {
    if (this.validador.ValidarFormularioTipoDocumento(this.TipoDocumento)) {
      var datos = {
        Identificador: 2,
        IdTipoDocumento: this.TipoDocumento.IdTipoDocumento,
        Codigo: this.TipoDocumento.Codigo,
        Nombre: this.TipoDocumento.Nombre,
      };

      this.spinner.show();
      this.dataInterna
        .GestionTipoDocumento(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerTipoDocumento();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "Documento actualizado exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalEditarTipoDocumento");
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
    this.LimpiarTipoDocumento();
    $("#modalCrearTipoDocumento").modal("show");
  }

  public AbrirModalEditar(documentoSeleccionado: any) {
    this.TipoDocumento = documentoSeleccionado;
    $("#modalEditarTipoDocumento").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarTipoDocumento() {
    this.TipoDocumento = {
      IdTipoDocumento: 0,
      Nombre: "",
      Codigo: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstTiposDocumentos, this.state);
  }
}
