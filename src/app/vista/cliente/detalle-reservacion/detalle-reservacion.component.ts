import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from "../../../controladores/internos/datos-internos.service";
import { ServicioGlobales } from "../../../metodos/globales/globales.service";
import { ServicioSesionExterna } from "../../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../../../controladores/externos/datos-externos.service";

declare var google: any;
declare var moment: any;
@Component({
  selector: "app-reservation-detail",
  templateUrl: "./detalle-reservacion.component.html",
  styleUrls: ["./detalle-reservacion.component.css"],
})
export class DetalleReservacionComponent implements OnInit {
  tipoMenu = 1;
  idViaje = 0;

  public mensaje = "Cargando Información...";
  public formatoFechaGenerico = "YYYY-MM-DD HH:mm";
  public urlLiquidacionViaje = "/cliente/reservacion/solucion/";
  public textoInformacion = "Información";

  dtViaje: any = {
    Aprobador: { IdAprobador: 0, Identificador: 0, Nombre: "", Usuario: "" },
    CatalogoEstado: null,
    CentroCostoViaje: "",
    ComentariosDosViaje: null,
    ComentariosUnoViaje: null,
    CostoViaje: null,
    DepartamentoDosViaje: "",
    DepartamentoUnoViaje: "",
    DescripcionViaje: null,
    Estado: {
      DescripcionEstado: "",
      Estado: 0,
      IdEstado: 0,
      Identificador: 0,
      IdentificadorEstado: null,
    },
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
    PropositoViaje: "",
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
    TipoCuentaViaje: "",
    TipoGastoViaje: "",
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
  registroPago: any;
  IDAnticipoReferenciaPagoAx: any;
  AnticipoNumeroAsientoAx: any;
  IdAsientoViaje = 0;
  lstHoteles = [];
  dtHotel: any;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly rutaActiva: ActivatedRoute,
    private readonly rutaSistema: Router,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    public global: ServicioGlobales
  ) { }

  ngOnInit() {
    this.idViaje = this.rutaActiva.snapshot.params.id;
    this.ObtenerViaje(this.idViaje);
  }

  public ObtenerViaje(id: any) {
    this.dataInterna
      .ObtenerViaje(id)
      .then((res) => {
        this.dtViaje = res;
        var ubicacion: any;
        if (this.dtViaje.SolicitudViajeReasignada == 1 && this.dtViaje.SolicitudViajeReasignadaUsuario != '') {
          var datosSesion = localStorage.getItem("k-session");
          var objetoSesion: any;
          if (datosSesion != undefined || datosSesion != null) {
            var datosSesionDesencriptados = atob(datosSesion);
            if (datosSesionDesencriptados != "") {
              objetoSesion = JSON.parse(datosSesionDesencriptados);
            }
          }
          if (objetoSesion != undefined) {
            if (objetoSesion.usuario.toLowerCase() != this.dtViaje.SolicitudViajeReasignadaUsuario.toLowerCase()) {
              this.rutaSistema.navigate(["/ingreso/autorizacion"]);
            } else {
              ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
              this.setMap(ubicacion.lat, ubicacion.lng);
              this.ObtenerViatico(this.dtViaje.IdViaje);
            }
          }
        } else {
          ubicacion = JSON.parse(this.dtViaje.Hotel.LatLongHotel);
          this.setMap(ubicacion.lat, ubicacion.lng);
          this.ObtenerViatico(this.dtViaje.IdViaje);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public setMap(_latitud: any, _longitud: any) {
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

  public ObtenerViatico(id: any) {
    this.spinner.show();
    this.dataInterna
      .ObtenerViatico(id)
      .then((res) => {
        this.spinner.hide();
        this.lstViaticos = res;
        this.ObtenerHotel();
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ObtenerHotel() {
    this.spinner.show();
    this.dataInterna
      .ObtenerHotel(this.dtViaje.Transporte.Ruta.DestinoRuta)
      .then((res) => {
        this.spinner.hide();
        this.lstHoteles = res;
        for (const hotel of this.lstHoteles) {
          if (this.dtViaje.Hotel.IdHotel == hotel.IdHotel) {
            this.dtHotel = hotel;
            break;
          }
        }
      })
      .catch((err) => {
        this.spinner.hide();
      });
  }

  public ConsultarRegistroAsientoBD() {

    this.dataInterna.ObtenerAsientoViaje(this.dtViaje.IdViaje).then((res) => {
      if (res.EstadoAnticipo == 1) {
        this.VerificarRangoFechasLiquidacion();
      } else if (res.EstadoAnticipo == 0) {
        this.IdAsientoViaje = res.IdAsientoViaje;
        var aux = JSON.parse(res.RegistroDiario);
        var aux2 = aux.Datos.split(",");
        this.registroPago = aux2[0];
        this.VerificarAnticipoPagoAX();
      }
    }).catch((err) => { console.log(err) });

  }

  public VerificarAnticipoPagoAX() {

    this.spinner.show();
    var token = this.sesionExterna.ObtenerClaveExterna();

    this.dataExterna.VerificarAnticipoPago(token, this.registroPago, this.dtViaje.Registrador.CodigoEmpresa).then((res) => {
      this.spinner.hide();
      var aux = JSON.parse(res);

      if (aux.Estado == "Error") {
        let mensajes = "";
        for (var item of aux.Mensajes) {
          mensajes = `${mensajes + item} \n`;
        }
        this.global.VerAlerta(this.textoInformacion, mensajes, "info");
      } else {

        var aux2 = aux.Datos;
        var aux3 = aux2.split("|");
        this.IDAnticipoReferenciaPagoAx = aux3[0];
        this.AnticipoNumeroAsientoAx = aux3[1];

        if (this.IDAnticipoReferenciaPagoAx == undefined || this.AnticipoNumeroAsientoAx == undefined || this.AnticipoNumeroAsientoAx == null) {
          this.global.VerAlertaTiempoLargo("Anticipo de Viaje", "El anticipo de viaje aún no se encuentra registrado", "error");
        } else {
          this.global.VerAlertaTiempo("Anticipo de Viaje", "El anticipo de viaje se ha registrado exitosamente", "success");
          setTimeout(() => {
            this.ActualizarRegistroAsientoBD()
          }, 2000);
        }

      }

    }).catch((err) => { this.spinner.hide() });

  }

  public ActualizarRegistroAsientoBD() {

    var data = {
      Identificador: 2,
      IdAsientoViaje: this.IdAsientoViaje,
      CodigoDiario: "",
      RegistroDiario: "",
      CierreDiario: "",
      IDAnticipoReferenciaPagoAx: this.IDAnticipoReferenciaPagoAx,
      AnticipoNumeroAsientoAx: this.AnticipoNumeroAsientoAx,
      Viaje: { IdViaje: this.dtViaje.IdViaje, CatalogoEstado: { IdEstado: 0 } }
    };

    this.dataInterna.GestionAsientoViaje(data).then((res) => {
      this.VerificarRangoFechasLiquidacion();
    }).catch((err) => { console.log(err) });

  }

  public VerificarRangoFechasLiquidacion() {

    this.dataInterna.ObtenerViaje(this.dtViaje.IdViaje).then((res) => {
      this.dtViaje = res;
      var fechaActual = moment().format(this.formatoFechaGenerico);

      var NuevaFechaFinalizacionViaje = moment(this.dtViaje.FechaFinViaje + " " + this.dtViaje.HoraFinViaje).format(this.formatoFechaGenerico);
      var NuevaFechaMaximaLiquidacionViaje = moment(this.dtViaje.FechaMaximaLiquidacionViaje + " " + this.dtViaje.HoraFinViaje).format(this.formatoFechaGenerico);

      if (moment(fechaActual).isSameOrAfter(NuevaFechaFinalizacionViaje) && moment(fechaActual).isSameOrBefore(NuevaFechaMaximaLiquidacionViaje)) {
        this.global.VerAlertaTiempoLargo(this.textoInformacion, "Datos validados exitosamente, puede continuar con su proceso de liquidación", "success");
        this.rutaSistema.navigate([this.urlLiquidacionViaje + this.dtViaje.IdViaje]);
      } else {
        this.global.VerAlertaTiempoLargo(
          this.textoInformacion,
          `No puede acceder a la liquidación de este viaje. <br> El tiempo permitido para su proceso de liquidación es: <br><br><span style="color: #012952;">Fecha Finalización de Viaje: <b>${NuevaFechaFinalizacionViaje}</b><br>Fecha Máxima Liquidación: <b>${NuevaFechaMaximaLiquidacionViaje}</b></span>`,
          "info"
        );
      }

    }).catch((err) => { console.log(err) });

  }

  public IrModificarViaje() {
    this.rutaSistema.navigate(["/cliente/reservacion/editar/" + this.dtViaje.IdViaje]);
  }

}
