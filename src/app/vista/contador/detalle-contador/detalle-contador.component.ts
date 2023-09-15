import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';

declare var google:any;
@Component({
  selector: "app-accountant-detail",
  templateUrl: "./detalle-contador.component.html",
  styleUrls: ["./detalle-contador.component.css"],
})
export class  DetalleContadorComponent implements OnInit {

  public mensaje = "Cargando Información...";

  idViaje = 0;
  dtViaje: any = {
    Aprobador: { IdAprobador: 0, Identificador: 0, Nombre: "", Usuario: "" },
    CatalogoEstado: null,
    CentroCostoViaje: null,
    ComentariosViaje: null,
    CostoViaje: null,
    DepartamentoViaje: null,
    DescripcionViaje: null,
    FechaAprobacionViaje: null,
    FechaFinViaje: "",
    FechaInicioViaje: "",
    FechaMaximaLiquidacionViaje: null,
    FechaSolicitudViaje: "",
    Hotel: {
      CargoAutorizadoHotel: null,
      CiudadHotel: null,
      DescripcionHotel: null,
      EmailHotel: null,
      EstadoHotel: 0,
      IdHotel: 0,
      Identificador: 0,
      Imagen: "",
      LatLongHotel: "",
      NombreHotel: "",
      TarifaHotel: "",
    },
    IdViaje: 0,
    Identificador: 0,
    MotivoViaje: "",
    NombreViaje: "",
    NumeroDiasViaje: null,
    NumeroNochesViaje: "",
    PropositoViaje: null,
    Registrador: {
      Cargo: "",
      Ciudad: "",
      CodigoEmpresa: "",
      Departamento: "",
      Email: "",
      IdRegistrador: 0,
      Identificacion: "",
      Identificador: 0,
      NombreEmpresa: "",
      Usuario: "",
    },
    RequiereHospedajeViaje: "",
    TipoGastoViaje: null,
    TipoViaje: "",
    Transporte: {
      FechaEmisionAereo: "",
      IdTransporte: 0,
      Identificador: 0,
      ImpuestoAereo: "",
      ImpuestoPorcentajeAereo: "",
      ImpuestoValorAereo: "",
      KilometrosTerrestre: "",
      MovilizacionTerrestre: "",
      NombreAerolineaAereo: "",
      NumeroPasajeAereo: "",
      ReferenciaAereo: "",
      RequierePasajeAereo: "",
      Ruta: {
        DescripcionRuta: null,
        DestinoRuta: "",
        EstadoRuta: 0,
        IdRuta: 0,
        Identificador: 0,
        NombreRuta: "",
        OrigenRuta: null,
      },
      Tipo: "",
      TotalAereo: "",
      ValorAereo: "",
      ValorTerrestre: "",
    },
    ViajeCapacitacion: "",
  };
  mapa: any;
  coordenadas: any;
  marcadores = [];
  lstViaticos = [];
  estadoVista = "";

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly datosInternos: ServicioDataInternos,
    private readonly rutaActiva: ActivatedRoute,
    public global: ServicioGlobales
  ) {}

  ngOnInit() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public ObtenerViaje(id:any) {
    this.datosInternos
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        this.estadoVista = this.dtViaje.Estado.DescripcionEstado;
        var ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
        this.setMap(ubicacion.lat, ubicacion.lng);
        this.ObtenerViatico(this.dtViaje.IdViaje);
      }).catch((err) => {
        console.log(err);
      });
  }

  public setMap(_latitud:any, _longitud:any) {
    const latitude = _latitud;
    const longitude = _longitud;
    const mapEle: HTMLElement | null = document.getElementById("mapa");
    this.coordenadas = { lat: latitude, lng: longitude };
    this.mapa = new google.maps.Map(mapEle, {
      center: this.coordenadas,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      zoom: 18,
    });

    google.maps.event.addListenerOnce(this.mapa, "idle", () => {
      const marker = new google.maps.Marker({
        position: this.coordenadas,
        draggable: true,
        map: this.mapa,
        title: "Mi Ubicación",
      });
      this.marcadores.push(marker);
      mapEle.classList.add("show-mapa");
    });
  }

  public ObtenerViatico(id:any) {
    this.spinner.show();
    this.datosInternos
      .ObtenerViatico(id)
      .then((res) => {
        this.spinner.hide();
        this.lstViaticos = res;
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }
}
