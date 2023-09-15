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
import { ServicioUsuario } from "../../../servicios/usuario/usuario.service";

declare var $: any;

@Component({
  selector: "app-agencias",
  templateUrl: "./agencias.component.html",
})
export class AgenciasComponent implements OnInit {
  public mensaje = "Cargando Información...";

  public agencia: any = {
    IdAgencia: 0,
    RucAgencia: "",
    NombreAgencia: "",
    DescripcionAgencia: "",
    TelefonoAgencia: "",
    EmailAgencia: "",
    NombreContactoAgencia: "",
    DireccionAgencia: "",
  };

  public sesion: any;

  public lstAgencias = [];
  public dtsAgencias: any;
  public state: State = { skip: 0, take: 5 };

  public gridData: GridDataResult = process(this.lstAgencias, this.state);

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly validador: ValidacionesAdministracionService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly servicioUsuario: ServicioUsuario,
    public global: ServicioGlobales,
  ) {}

  ngOnInit() {
    this.ObtenerAgencia();
    this.sesion = this.servicioUsuario.ObtenerUsuario();
  }

  public ObtenerAgencia() {
    this.spinner.show();
    this.dataInterna
      .ObtenerAgencia()
      .then((res) => {
        this.lstAgencias = res;
        this.dtsAgencias = this.lstAgencias.slice();
        this.gridData = process(this.lstAgencias, this.state);
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarAgencia() {
    if (this.validador.ValidarFormularioAgencia(this.agencia)) {
      var datos = {
        Identificador: 1,
        IdAgencia: 0,
        NombreAgencia: this.agencia.NombreAgencia,
        DescripcionAgencia: this.agencia.DescripcionAgencia,
        NombreContactoAgencia: this.agencia.NombreContactoAgencia,
        TelefonoAgencia: this.agencia.TelefonoAgencia,
        DireccionAgencia: this.agencia.DireccionAgencia,
        RucAgencia: this.agencia.RucAgencia,
        EmailAgencia: this.agencia.EmailAgencia,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarAgencia(datos)
        .then((res) => {
          this.spinner.hide();

          if (res) {
            this.ObtenerAgencia();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "La Agencia fue creada exitosamente",
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

  public ActualizarAgencia() {
    if (this.validador.ValidarFormularioAgencia(this.agencia)) {
      var datos = {
        Identificador: 2,
        IdAgencia: this.agencia.IdAgencia,
        NombreAgencia: this.agencia.NombreAgencia,
        DescripcionAgencia: this.agencia.DescripcionAgencia,
        NombreContactoAgencia: this.agencia.NombreContactoAgencia,
        TelefonoAgencia: this.agencia.TelefonoAgencia,
        DireccionAgencia: this.agencia.DireccionAgencia,
        RucAgencia: this.agencia.RucAgencia,
        EmailAgencia: this.agencia.EmailAgencia,
      };

      this.spinner.show();
      this.dataInterna
        .GestionarAgencia(datos)
        .then((res) => {
          this.spinner.hide();
          if (res) {
            this.ObtenerAgencia();
            this.global.VerAlerta(
              "Transacción Exitosa",
              "La Agencia fue actualiza exitosamente",
              "success"
            );
          }
          this.CerrarModal("modalEditarAgencia");
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

  public AbrirModalDetalles(agencySelected: any) {
    this.agencia = agencySelected;
    $("#modalDetalleAgencia").modal("show");
  }

  public AbrirModalCrear() {
    this.LimpiarAgencia();
    $("#modalCrearAgencia").modal("show");
  }

  public AbrirModalEditar(agencySelected: any) {
    this.agencia = agencySelected;
    $("#modalEditarAgencia").modal("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarAgencia() {
    this.agencia = {
      IdAgencia: 0,
      RucAgencia: "",
      NombreAgencia: "",
      DescripcionAgencia: "",
      TelefonoAgencia: "",
      EmailAgencia: "",
      NombreContactoAgencia: "",
      DireccionAgencia: "",
    };
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstAgencias, this.state);
  }
}
