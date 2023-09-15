import { Component, Input, OnInit } from "@angular/core";
import { ServicioGlobales } from '../../../../metodos/globales/globales.service';
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';
import { ServicioDataInternos } from '../../../../controladores/internos/datos-internos.service';

@Component({
  selector: "app-reservation-travel-expenses",
  templateUrl: "./gasto-viaje.component.html",
  styleUrls: ["./gasto-viaje.component.css"],
})
export class GastoViajeComponent implements OnInit {
  @Input() dtViaje = {
    fechaInicio: null,
    fechaInicioHora: new Date(),
    fechaFin: null,
    fechaFinHora: new Date(),
    tipoViaje: null,
    nombreCorto: null,
    requiereHospedaje: null,
    numeroNoches: null,
    viajeCapacitacion: null,
    razonViaje: null,
  };

  @Input() dtTransporte = {
    destino: null,
    nombreDestino: null,
    requierePasaje: null,
    requiereMovilizacion: null,
    fechaEmision: null,
    nombreAereolinea: null,
    numeroPasaje: null,
    referenciaPago: null,
    valorPago: null,
    impuestoAereo: null,
    impuesto: null,
    total: null,
    numeroKilometros: null,
    valorKilometros: null,
    dtImpuesto: null,
  };

  @Input() dtHotel = {
    hotel: null,
    tarifa: null,
  };

  @Input() dtDinero = {
    dias: 1,
    noches: null,
    dineroDias: null,
    dineroNoches: null,
    totalDineroDiasNoches: null,
    seleccionarDinero: null,
    totalDinero: null,
    descripcionDinero: null,
    totalHotel: null,
    total: 0,
    numeroKilometros: null,
    valorKilometros: null,
    requiereMovilizacion: null,
    otroDinero: "No",
    valorOtroDinero: 0,
    justificarDinero: null,
  };
  
  @Input() lstParametros = [];

  public estadoOtroDinero = false;
  
  lstOtroDinero: Array<string> = ["Sí", "No"];

  constructor(
    public global: ServicioGlobales,
    public validador: ServicioValidaciones,
    private readonly dataInterna: ServicioDataInternos
  ) {}

  ngOnInit() {
    //función de inicio
  }

  public ObtenerVistaOtroDinero() {
    if (this.dtDinero.otroDinero == "Sí") {
      this.estadoOtroDinero = true;
    } else {
      this.estadoOtroDinero = false;
      this.dtDinero.valorOtroDinero = 0;
      this.dtDinero.justificarDinero = null;
    }
    this.ObtenerCalculos();
  }

  public ObtenerCalculos() {
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.lstParametros = res;
        var valueNight: any;
        var valueDay: any;

        if (this.dtViaje.viajeCapacitacion == "Sí") {
          valueNight = this.lstParametros.find(
            (e:any) => e.NombreParametro == "ValorNocheCapacitacion"
          );
          valueDay = this.lstParametros.find(
            (e:any) => e.NombreParametro == "ValorDiaCapacitacion"
          );
        } else {
          valueNight = this.lstParametros.find(
            (e:any) => e.NombreParametro == "ValorNocheSinCapacitacion"
          );
          valueDay = this.lstParametros.find(
            (e:any) => e.NombreParametro == "ValorDiaSinCapacitacion"
          );
        }

        this.dtDinero.dineroDias =
          parseFloat(valueDay.ValorParametro) * this.dtDinero.dias;
        this.dtDinero.dineroNoches =
          parseFloat(valueNight.ValorParametro) * this.dtViaje.numeroNoches;

        this.dtDinero.numeroKilometros = this.dtTransporte.numeroKilometros;
        this.dtDinero.valorKilometros =
          this.dtTransporte.valorKilometros == null
            ? 0
            : this.dtTransporte.valorKilometros;
        this.dtDinero.requiereMovilizacion =
          this.dtTransporte.requiereMovilizacion;

        this.dtDinero.totalDineroDiasNoches =
          parseFloat(this.dtDinero.dineroDias) +
          parseFloat(this.dtDinero.dineroNoches);
        this.dtDinero.totalHotel =
          parseFloat(this.dtHotel.tarifa) * parseInt(this.dtViaje.numeroNoches);

        this.dtDinero.total =
          parseFloat(this.dtDinero.totalDineroDiasNoches) +
          parseFloat(this.dtDinero.valorKilometros) +
          this.dtDinero.valorOtroDinero;
      })
      .catch((err) => {console.log(err) });
  }
}
