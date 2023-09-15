import { Component, OnInit } from "@angular/core";
import { DataStateChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import { process, State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';

declare var $: any;
@Component({
  selector: "app-parametros",
  templateUrl: "./parametros.component.html",
})
export class ParametrosComponent implements OnInit {
  public parametro: any = {
    IdParametro: 0,
    NombreParametro: "",
    ValorParametro: "",
    DescripcionParametro: "",
  };

  public mensaje = "Cargando Información...";
  public sesion: any;
  public lstParametros = [];
  public dtsParametros: any;
  public state: State = { skip: 0, take: 6 };
  public gridData: GridDataResult = process(this.lstParametros, this.state);
  public campoNumerico = false;
  public campoTextoLetra = false;
  public campoTextoNumero = false;
  public campoTextoOpcional = false;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    private readonly servicioUsuario: ServicioUsuario,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.ObtenerParametro();
    this.sesion = this.servicioUsuario.ObtenerUsuario();
  }

  public ObtenerParametro() {
    this.spinner.show();
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.lstParametros = res;
        this.dtsParametros = this.lstParametros.slice();
        this.gridData = process(this.lstParametros, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarAgencia() {
    if (this.validador.ValidarFormularioAgencia(this.parametro)) {
      var datos = {
        Identificador: 1,
        IdParametro: 0,
        NombreParametro: this.parametro.NombreParametro,
        ValorParametro: this.parametro.ValorParametro,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarParametros(datos)
        .then((res) => {
          this.spinner.hide();

          if (res) {
            this.ObtenerParametro();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "El parámetro fue creada exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalCrearAgencia");
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

  public ActualizarParametro() {
    if (this.validador.ValidarFormularioParametro(this.parametro)) {
      var datos = {
        Identificador: 2,
        IdParametro: this.parametro.IdParametro,
        NombreParametro: this.parametro.NombreParametro,
        ValorParametro: this.parametro.ValorParametro,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarParametros(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerParametro();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "El parámetro fue actualizo exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalEditarParametro");
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

  public AbrirModalEditar(parametroSelected: any) {
    if (
      parametroSelected.NombreParametro == "CalculoKilometros" ||
      parametroSelected.NombreParametro == "ValorNocheSinCapacitacion" ||
      parametroSelected.NombreParametro == "ValorDiaSinCapacitacion" ||
      parametroSelected.NombreParametro == "ValorNocheCapacitacion" ||
      parametroSelected.NombreParametro == "ValorDiaCapacitacion" ||
      parametroSelected.NombreParametro == "ValorSubtotal"
    ) {
      this.campoNumerico = true;
      this.campoTextoLetra = false;
      this.campoTextoNumero = false;
      this.campoTextoOpcional = false;
    } else if (
      parametroSelected.NombreParametro == "EmailOrigen" ||
      parametroSelected.NombreParametro == "NombreOrigen"
    ) {
      this.campoNumerico = false;
      this.campoTextoLetra = true;
      this.campoTextoNumero = false;
      this.campoTextoOpcional = false;
    } else if (parametroSelected.NombreParametro == "TipoImpuestos") {
      this.campoNumerico = false;
      this.campoTextoLetra = false;
      this.campoTextoNumero = false;
      this.campoTextoOpcional = true;
    } else {
      this.campoNumerico = false;
      this.campoTextoLetra = false;
      this.campoTextoNumero = true;
      this.campoTextoOpcional = false;
    }
    this.parametro = parametroSelected;
    $("#modalEditarParametro").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarParametro() {
    this.parametro = {
      IdParametro: 0,
      NombreParametro: "",
      ValorParametro: "",
      DescripcionParametro: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstParametros, this.state);
  }
}
