import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';
import { ServicioDataInternos } from '../../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from "../../../../metodos/globales/globales.service";

declare var $: any;
@Component({
  selector: "app-reservation-transport",
  templateUrl: "./transporte.component.html",
  styleUrls: ["./transporte.component.css"],
})
export class TransporteComponent implements OnInit, OnChanges {

  @Input() dtViaje = {
    fechaInicio: null,
    fechaInicioHora: null,
    fechaFin: null,
    fechaFinHora: null,
    tipoViaje: null,
    nombreCorto: null,
    requiereHospedaje: null,
    numeroNoches: null,
    viajeCapacitacion: null,
    razonViaje: null,
    Transporte: null,
  };

  @Input() dtTransporte = {
    destino: null,
    nombreDestino: null,
    requierePasaje: null,
    requiereMovilizacion: null,
    requiereMovilizacionContratada: null,
    fechaEmision: null,
    nombreAereolinea: null,
    numeroPasaje: null,
    referenciaPago: null,
    valorPago: null,
    impuestoAereo: null,
    impuesto: null,
    valorImpuesto: null,
    valorPasaje: null,
    numeroKilometros: null,
    valorKilometros: null,
    dtImpuesto: null,
  };

  @Input() vlTransporte = {
    destino: null,
    nombreDestino: null,
    requierePasaje: null,
    requiereMovilizacion: null,
    requiereMovilizacionContratada: null,
    fechaEmision: null,
    nombreAereolinea: null,
    numeroPasaje: null,
    referenciaPago: null,
    valorPago: null,
    impuestoAereo: null,
    impuesto: null,
    valorImpuesto: null,
    valorPasaje: null,
    numeroKilometros: null,
    valorKilometros: null,
    dtImpuesto: null,
  };

  @Input() lstParametros = [];

  @Input() seleccionarValorRutaPredeterminada: any;

  dtListaRutaSeleccionada: any;
  lstRutas: any = [];
  lstRequierePasaje: Array<string> = ["Sí", "No"];
  lstContratadoEmpresa: Array<string> = ["Sí", "No"];
  lstTiposImpuestos = [];
  kilometros = 0;

  constructor(
    private readonly dataInterna: ServicioDataInternos,
    public validador: ServicioValidaciones,
    public global: ServicioGlobales
  ) { }

  ngAfterContentInit() {
    this.ObtenerRutas();
    setTimeout(() => {
      this.ObtenerParametros();
    }, 4000);
  }

  ngOnInit() {
    //función de inicio
  }

  ngOnChanges(changes: any) {
    const idRuta = changes.seleccionarValorRutaPredeterminada
      ? changes.seleccionarValorRutaPredeterminada.currentValue
      : null;
    if (idRuta !== "" && idRuta !== null && idRuta !== undefined) {
      this.ObtenerSeleccionRuta(idRuta);
    }
  }

  public ObtenerSeleccionRuta(idRuta: any) {
    if (this.lstRutas.length > 0 && idRuta) {
      const currentRuta = this.lstRutas.find((ruta) => ruta.IdRuta === idRuta);
      this.dtListaRutaSeleccionada = currentRuta;
      this.dtListaRutaSeleccionada = currentRuta;
      this.SeleccionData();
    }
  }

  public ObtenerParametros() {
    this.dataInterna
      .ObtenerParametro()
      .then((res) => {
        this.lstParametros = res;
        var tmpKilometers = this.lstParametros.find(
          (e:any) => e.NombreParametro == "CalculoKilometros"
        );
        this.kilometros = parseFloat(tmpKilometers.ValorParametro);
        var tmpLstTypeTaxes = this.lstParametros.find(
          (e:any) => e.NombreParametro == "TipoImpuestos"
        );
        this.lstTiposImpuestos = JSON.parse(tmpLstTypeTaxes.ValorParametro);
      })
      .catch((err) => { console.log(err) });
  }

  public ObtenerRutas() {
    this.dataInterna
      .ObtenerRutas()
      .then((res) => {
        this.lstRutas = res;
        if (
          this.seleccionarValorRutaPredeterminada !== "" &&
          this.seleccionarValorRutaPredeterminada !== null &&
          this.seleccionarValorRutaPredeterminada !== undefined
        ) {
          this.ObtenerSeleccionRuta(this.seleccionarValorRutaPredeterminada);
        }
      })
      .catch((err) => { console.log(err) });
  }

  public CalculaValorKilometraje(numberOfKilometers: any) {
    this.dtTransporte.valorKilometros = this.global.FormatearNumero(
      this.kilometros * parseFloat(numberOfKilometers),
      2
    );
  }

  public SeleccionData() {
    this.dtTransporte.destino = this.dtListaRutaSeleccionada.IdRuta;
    this.dtTransporte.nombreDestino = this.dtListaRutaSeleccionada.DestinoRuta;
    this.Validaciones();
  }

  public SeleccionRequiereMovilizacion() {
    var require = this.dtTransporte.requiereMovilizacion;
    if (require == "No") {
      this.dtTransporte.requiereMovilizacionContratada = "Sí";
      this.dtTransporte.numeroKilometros = null;
      this.dtTransporte.valorKilometros = null;
    }

    this.Validaciones();
  }

  public Validaciones() {
    var validation = this.validador.ValidacionesTransporte(
      this.dtTransporte,
      this.dtViaje
    );
    this.vlTransporte = validation.vlTransporte;
    if (!validation.state) {
      $("#tab4").css("pointer-events", "none");
    }
  }

  public CalcularImpuesto() {
    var subtotal;

    if (this.dtTransporte.impuesto == 0.12) {
      subtotal = this.global.FormatearNumero(this.dtTransporte.valorPago / 1.12, 2);
      this.dtTransporte.valorImpuesto = this.global.FormatearNumero(
        parseFloat(this.dtTransporte.valorPago) - subtotal,
        2
      );
    } else {
      this.dtTransporte.valorImpuesto = this.global.FormatearNumero(0, 2);
    }

    var aux =
      parseFloat(this.dtTransporte.valorPago) +
      parseFloat(this.dtTransporte.impuestoAereo);
    this.dtTransporte.valorPasaje = this.global.FormatearNumero(aux, 2);
    this.Validaciones();
  }

  public CargarMovilizacionContratada() {
    this.Validaciones();
  }
}
