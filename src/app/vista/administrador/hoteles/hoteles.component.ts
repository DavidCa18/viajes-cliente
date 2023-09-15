import { Component, OnInit } from "@angular/core";
import { ServicioDataInternos } from '../../../controladores/internos/datos-internos.service';
import { ServicioGlobales } from '../../../metodos/globales/globales.service';
import { ValidacionesAdministracionService } from '../../../metodos/validaciones-administracion.service';
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { process, State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

declare var $: any;
declare var google: any;
@Component({
  selector: "app-hoteles",
  templateUrl: "./hoteles.component.html",
  styleUrls: ["./hoteles.component.css"],
})
export class HotelesComponent implements OnInit {

  public hotel: any = {
    IdHotel: 0,
    NombreHotel: "",
    DescripcionHotel: "",
    CiudadHotel: "",
    TarifaHotel: "",
    EmailHotel: "",
    CargoAutorizadoHotel: "",
    LatLongHotel: "",
    Imagen: "",
  };

  public mensaje = "Cargando Información...";
  public textoInformacion = "Información";
  public textoTransaccion = "Transacción Exitosa";

  public lstHoteles = [];
  public lstCiudadesViajes = [];
  public dtsHoteles: any;
  public state: State = { skip: 0, take: 10 };

  public ciudadSeleccion: any;

  public gridData: GridDataResult = process(this.lstHoteles, this.state);

  public tabla = true;

  map: any;
  mapState = false;
  coordenadas: any;
  marcadores = [];
  direccion: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly validador: ValidacionesAdministracionService,
    public global: ServicioGlobales
  ) { }

  ngOnInit() {
    this.ObtenerHotel();
  }

  public ObtenerHotel() {
    this.spinner.show();
    this.dataInterna
      .ObtenerTodosHotel()
      .then((res) => {
        this.lstHoteles = res;
        this.lstHoteles = this.lstHoteles.filter((e:any) => e.IdHotel != 23);
        this.dtsHoteles = this.lstHoteles.slice();
        this.gridData = process(this.dtsHoteles, this.state);
        this.spinner.hide();
        this.ObtenerCiudadesViajes();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerCiudadesViajes() {
    this.spinner.show();
    this.dataInterna
      .ObtenerCiudadesViajes()
      .then((res) => {
        this.lstCiudadesViajes = res;
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public GuardarHotel() {

    if (this.ciudadSeleccion) {
      this.hotel.CiudadHotel = this.ciudadSeleccion.Nombre;
    } else {
      this.hotel.CiudadHotel = '';
    }

    if (this.validador.ValidarFormularioHotel(this.hotel)) {
      var datos = {
        Identificador: 1,
        IdHotel: 0,
        NombreHotel: this.hotel.NombreHotel,
        DescripcionHotel: this.hotel.DescripcionHotel,
        CiudadHotel: this.hotel.CiudadHotel,
        TarifaHotel: this.hotel.TarifaHotel,
        EmailHotel: this.hotel.EmailHotel,
        CargoAutorizadoHotel: "",
        LatLongHotel: this.hotel.LatLongHotel,
        Imagen: this.hotel.Imagen,
      };

      this.spinner.show();
      this.dataInterna
        .GestionHotel(datos)
        .then((res) => {
          this.spinner.hide();
          this.ObtenerHotel();
          this.CerrarCollapse();
          if (res) {
            this.global.VerAlerta(
              this.textoTransaccion,
              "El hotel se creó exitosamente",
              "success"
            );
          }
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

  public ActualizarHotel() {
    if (this.ciudadSeleccion) {
      this.hotel.CiudadHotel = this.ciudadSeleccion.Nombre;
    } else {
      this.hotel.CiudadHotel = '';
    }
    if (this.validador.ValidarFormularioHotel(this.hotel)) {
      var datos = {
        Identificador: 2,
        IdHotel: this.hotel.IdHotel,
        NombreHotel: this.hotel.NombreHotel,
        DescripcionHotel: this.hotel.DescripcionHotel,
        CiudadHotel: this.hotel.CiudadHotel,
        TarifaHotel: this.hotel.TarifaHotel,
        EmailHotel: this.hotel.EmailHotel,
        CargoAutorizadoHotel: "",
        LatLongHotel: this.hotel.LatLongHotel,
        Imagen: this.hotel.Imagen,
      };

      this.spinner.show();
      this.dataInterna
        .GestionHotel(datos)
        .then((res) => {
          this.spinner.hide();
          this.ObtenerHotel();
          this.CerrarCollapse();
          if (res) {
            this.global.VerAlerta(
              this.textoTransaccion,
              "El hotel se actualizó exitosamente",
              "success"
            );
          }
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
    this.LimpiarHotel();
    this.BuscarDireccion("input-direccion");
    this.tabla = false;
    $("#collapseCrear").collapse("show");
    $("#collapseEditar").collapse("hide");
  }

  public AbrirModalDetalles(hotelSelected: any) {
    this.hotel = hotelSelected;
    $("#modalDetalleHotel").modal("show");
  }

  public AbrirModalEditar(hotelSelected: any) {
    var ciudadRegistro = this.lstCiudadesViajes.find((element:any) => element.Nombre == hotelSelected.CiudadHotel);
    this.ciudadSeleccion = ciudadRegistro;
    this.hotel = hotelSelected;
    this.BuscarDireccion("input-direccion2");
    this.tabla = false;
    this.geocodeLatLng();
    $("#collapseCrear").collapse("hide");
    $("#collapseEditar").collapse("show");
  }

  public CerrarModal(modal: any) {
    $("#" + modal).modal("hide");
  }

  public LimpiarHotel() {
    this.hotel = {
      IdHotel: 0,
      NombreHotel: "",
      DescripcionHotel: "",
      CiudadHotel: "",
      TarifaHotel: "",
      EmailHotel: "",
      CargoAutorizadoHotel: "",
      LatLongHotel: "",
      Imagen: "",
    };
  }
  public initMap(_latitud: any, _longitud: any) {
    this.coordenadas = { lat: _latitud, lng: _longitud };
  }

  public VerMapa(hotel: any) {
    var direccion = hotel.LatLongHotel;
    var LatLong = JSON.parse(direccion);
    this.setMap(LatLong.lat, LatLong.lng);
    $("#modalMapa").modal("show");
  }

  public setMap(_latitud: any, _longitud: any) {
    const latitude = _latitud;
    const longitude = _longitud;
    const mapEle = document.getElementById("mapa");
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
      this.marcadores.push(marker);
      mapEle.classList.add("show-map");
    });
  }

  public BuscarDireccion(dato: any) {

    var input = document.getElementById(dato);

    var options = {
      componentRestrictions: { country: "ec" },
    };

    var thisGlobal: any = this;
    var searchBox = new google.maps.places.Autocomplete(input, options);

    searchBox.addListener("place_changed", function () {
      var place = searchBox.getPlace();
      if (!place.geometry) {
        this.global.Alerta(
          thisGlobal.textoInformacion,
          `La dirección ingresada: ${place.name}, no es válida. Inténtelo de nuevo.`,
          "info"
        );
        return;
      }
      thisGlobal.direccion = place.formatted_address;
      thisGlobal.hotel.LatLongHotel = JSON.stringify({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }

  public ObtenerImagen(imagen: any) {
    var files = $("#" + imagen).prop("files");
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.hotel.Imagen = reader.result + "";
      };
      reader.onerror = function (error) {
        console.log(error)
      };
    }
  }

  public CerrarCollapse() {
    $(".collapse").collapse("hide");
    this.tabla = true;
  }

  public geocodeLatLng() {
    var valores = JSON.parse(this.hotel.LatLongHotel);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: valores }, (results: any, status: any) => {
      if (status === "OK") {
        $("#input-direccion2").val(results[0].formatted_address);
      } else {
        this.global.Alerta(
          this.textoInformacion,
          "Geocoder failed due to: " + status,
          "error"
        );
      }
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.lstHoteles, this.state);
  }

  public AbrirModalEliminar(hotelSeleccionado: any) {
    Swal.fire({
      title: "Confirmar Acción",
      html: "Esta seguro de deshabilitar el hotel ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.value) {
        var datos = {
          Identificador: 3,
          IdHotel: hotelSeleccionado.IdHotel,
          NombreHotel: "",
          DescripcionHotel: "",
          CiudadHotel: "",
          TarifaHotel: "",
          EmailHotel: "",
          CargoAutorizadoHotel: "",
          LatLongHotel: "",
          Imagen: "",
        };
        this.spinner.show();
        this.dataInterna.GestionHotel(datos).then((res) => {
          this.spinner.hide();
          if (res == 0) {
            this.global.VerAlerta(this.textoInformacion, "No se puede eliminar el hotel porque hay solicitudes de viaje relacionadas con el mismo", "warning");
          } else {
            this.global.VerAlerta(this.textoTransaccion, "El hotel se ha deshabilitado exitosamente", "success");
            this.ObtenerHotel();
          }
        }).catch((err) => {
          console.log(err);
          this.spinner.hide();
        });
      }
    });
  }

  public AbrirModalActivar(hotelSeleccionado: any) {
    Swal.fire({
      title: "Confirmar Acción",
      html: "Esta seguro de habilitar el hotel ?",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.value) {
        var datos = {
          Identificador: 4,
          IdHotel: hotelSeleccionado.IdHotel,
          NombreHotel: "",
          DescripcionHotel: "",
          CiudadHotel: "",
          TarifaHotel: "",
          EmailHotel: "",
          CargoAutorizadoHotel: "",
          LatLongHotel: "",
          Imagen: "",
        };
        this.spinner.show();
        this.dataInterna.GestionHotel(datos).then((res) => {
          this.spinner.hide();
          if (res == 0) {
            this.global.VerAlerta(this.textoInformacion, "No se pudo activar el hotel", "warning");
          } else {
            this.global.VerAlerta(this.textoTransaccion, "El hotel se ha habilitado exitosamente", "success");
            this.ObtenerHotel();
          }
        }).catch((err) => {
          console.log(err);
          this.spinner.hide();
        });
      }
    });
  }
}
