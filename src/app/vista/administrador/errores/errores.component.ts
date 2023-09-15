import { Component, OnInit } from "@angular/core";
import { process, State } from "@progress/kendo-data-query";
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';

declare var $: any;
@Component({
  selector: "app-errores",
  templateUrl: "./errores.component.html",
  styleUrls: ["./errores.component.css"],
})
export class ErroresComponent implements OnInit {
  public mensaje = "Cargando Información...";

  public error: any = {
    IdError: 0,
    Clase: "",
    Metodo: "",
    Url: "",
    UriTemplate: "",
    Estatus: "",
    Descripcion: "",
    Fecha: "",
    IdUsuario: 0,
    NombreUsuario: "",
  };

  public lstErrores = [];
  public dtsErrores: any;
  public state: State = { skip: 0, take: 10 };

  public gridData: GridDataResult = process(this.lstErrores, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerErrores();
  }

  public ObtenerErrores() {
    this.spinner.show();
    this.dataInterna
      .ObtenerErrores()
      .then((res) => {
        this.lstErrores = res;
        this.dtsErrores = this.lstErrores.slice();
        this.gridData = process(this.lstErrores, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public AbrirModalDetalles(errorSelected: any) {
    this.error = errorSelected;
    $("#modalDetalleError").modal("show");
  }

  public Copiar() {
    var copyText: any = document.getElementById("error");
    copyText.select();
    copyText.setSelectionRange(0, 99999999);
    document.execCommand("copy");
    this.global.VerMensaje("Error Copiado Exitosamente", "success", "top");
  }

  public dataStateChange(estado: DataStateChangeEvent): void {
    this.state = estado;
    this.gridData = process(this.lstErrores, this.state);
  }
}
