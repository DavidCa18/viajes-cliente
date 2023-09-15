import { Component, Input, OnInit } from "@angular/core";
import { ServicioGlobales } from '../../../../metodos/globales/globales.service';
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';

declare var $: any;
declare var moment: any;
@Component({
  selector: "app-reservation-travel",
  templateUrl: "./viaje.component.html",
})
export class ViajeComponent implements OnInit {
  @Input() dtViaje = {
    fechaInicio: null,
    fechaInicioHora: null,
    fechaFin: null,
    fechaFinHora: "",
    tipoViaje: null,
    nombreCorto: null,
    requiereHospedaje: null,
    numeroNoches: null,
    viajeCapacitacion: null,
    razonViaje: null,
    bloqueo: null,
  };

  @Input() vlViaje = {
    fechaInicio: null,
    fechaInicioHora: false,
    fechaFin: null,
    fechaFinHora: false,
    tipoViaje: false,
    nombreCorto: false,
    requiereHospedaje: false,
    numeroNoches: null,
    viajeCapacitacion: false,
    razonViaje: false,
  };

  dtTransporte = {};

  vlTransporte = {
    tipoTransporte: null,
  };

  lstTipoViaje: Array<string> = ["Aéreo", "Terrestre"];
  lstHospedaje: Array<string> = ["Sí", "No"];
  lstCapacitacion: Array<string> = ["Sí", "No"];
  lstNoches: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  primerRangoFechas: Date;
  segundoRangoFechas: Date = null;

  constructor(
    public global: ServicioGlobales,
    public validador: ServicioValidaciones
  ) {}

  ngOnInit() {
    this.primerRangoFechas = moment().format("YYYY-MM-DD");
    this.dtViaje.fechaInicioHora = "";
    this.dtViaje.fechaFinHora = "";
  }

  public Validaciones() {
    var validation = this.validador.ValidacionesViaje(this.dtViaje);
    this.vlViaje = validation.vlViaje;
    if (!validation.state) {
      $("#tab3").css("pointer-events", "none");
    }
  }

  public ValidacionesFecha(date: any) {
    this.dtViaje.fechaFin = null;
    this.segundoRangoFechas = moment(date).format("YYYY-MM-DD");
    this.Validaciones();
  }

  public ValidarNochesViaje(date1: any, date2: any) {
    var diferencia = moment(date2).startOf("day").diff(moment(date1).startOf("day"), "days");
    this.dtViaje.numeroNoches = diferencia;

    if (diferencia == 0) {
      this.dtViaje.requiereHospedaje = "No";
      this.dtViaje.bloqueo = true;
    } else {
      this.dtViaje.requiereHospedaje = "Sí";
      this.dtViaje.bloqueo = false;
    }

    this.ObtenerCalculos();
  }

  public ObtenerCalculos() {
    this.Validaciones();
  }
}
