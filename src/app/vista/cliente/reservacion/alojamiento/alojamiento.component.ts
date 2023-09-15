import { Component, Input, OnInit } from "@angular/core";
import { ServicioDataInternos } from '../../../../controladores/internos/datos-internos.service';
import { ServicioValidaciones } from '../../../../metodos/validaciones/validaciones.service';

declare var $: any;
declare var google:any;
@Component({
  selector: "app-reservation-lodging",
  templateUrl: "./alojamiento.component.html",
})
export class AlojamientoComponent implements OnInit {
  @Input() dtHotel = {
    hotel: null,
    tarifa: null,
    ubicacion: null,
  };

  @Input() vlHotel = {
    hotel: null,
    tarifa: null,
  };

  @Input() dtTransporte = {
   nombreDestino: null,
  };

  @Input() seleccionarHotel: any;

  lstHoteles = [];
  dtHotelSeleccionado: any;
  map: any;
  mapState = false;
  imagenHotel: any;
  coordenadas: any;
  markers = [];
  hotelesCombo = true;

  constructor(
    private readonly dataInterna: ServicioDataInternos,
    public validador: ServicioValidaciones
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.ObtenerHotel();
    }, 3000);
  }

  public ObtenerHotel() {
    this.dataInterna
      .ObtenerHotel(this.dtTransporte.nombreDestino)
      .then((res) => {
        this.lstHoteles = res;
        if (this.lstHoteles.length > 0) {
          this.hotelesCombo = false;
        } else {
          this.hotelesCombo = true;
        }
        if (this.seleccionarHotel) {
          this.dtHotelSeleccionado = this.seleccionarHotel;
          this.SeleccionarInformacion();
        }
      })
      .catch((err) => { console.log(err) });
  }

  public SeleccionarInformacion() {
    this.dtHotel.hotel = this.dtHotelSeleccionado.IdHotel;
    this.dtHotel.tarifa = this.dtHotelSeleccionado.TarifaHotel;
    this.dtHotel.ubicacion = JSON.parse(this.dtHotelSeleccionado.LatLongHotel);
    this.mapState = true;
    this.imagenHotel = this.dtHotelSeleccionado.Imagen;
    setTimeout(() => {
      this.setMap(this.dtHotel.ubicacion.lat, this.dtHotel.ubicacion.lng);
    }, 2000);
    this.Validaciones();
  }

  public Validaciones() {
    var validation = this.validador.ValidacionesAlojamiento(this.dtHotel);
    this.vlHotel = validation.vlHotel;
    if (!validation.state) {
      $("#tab5").css("pointer-events", "none");
    }
  }

  public setMap(_latitud: any, _longitud: any) {
    const latitude = _latitud;
    const longitude = _longitud;
    const mapEle: HTMLElement | null = document.getElementById("map");
    this.coordenadas = { lat: latitude, lng: longitude };
    this.map = new google.maps.Map(mapEle, {
      center: this.coordenadas,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      zoom: 18,
    });

    google.maps.event.addListenerOnce(this.map, "idle", () => {
      const marker = new google.maps.Marker({
        position: this.coordenadas,
        draggable: true,
        map: this.map,
        title: "Mi Ubicación",
      });
      this.markers.push(marker);
      mapEle.classList.add("show-map");
    });
  }
}
