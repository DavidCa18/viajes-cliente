import { Injectable } from "@angular/core";
import { ServicioGlobales } from "./globales/globales.service";

@Injectable()

export class ValidacionesAdministracionService {

  public mensajeCampoNombreObligarotio = "El campo nombre es obligatorio";
  public mensajeCampoDescripcionObligarotio = "El campo descripción es obligatorio";
  public mensajeCampoLongitudObligarotio = "El nombre ingresado es muy corto";

  constructor(private readonly globales: ServicioGlobales) { }

  public ValidarFormularioAgencia(agencia: any) {
    var validacion = true;
    if (agencia.RucAgencia == "") {
      validacion = false;
      this.globales.VerAlerta("Alerta", "El campo ruc es obligatorio", "error");
    } else if (agencia.RucAgencia.length != 13) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "Ingrese el nombre de la agencia",
        "error"
      );
    } else if (agencia.NombreAgencia == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (agencia.NombreAgencia.length <= 5) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El nombre de agencia ingresado es demasiado corto",
        "error"
      );
    } else if (agencia.DescripcionAgencia == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoDescripcionObligarotio,
        "error"
      );
    } else if (this.globales.CorreoElectronico(agencia.EmailAgencia)) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El email ingresado no es válido",
        "error"
      );
    } else if (
      agencia.TelefonoAgencia.length <= 7 ||
      agencia.TelefonoAgencia.length > 10
    ) {
      validacion = false;
      this.globales.VerAlerta("Alerta", "Ingrese un teléfono válido", "error");
    } else if (agencia.NombreContactoAgencia == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo contacto agencia es obligatorio",
        "error"
      );
    } else if (agencia.NombreContactoAgencia.length <= 5) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El nombre nombre ingresado es demasiado corto",
        "error"
      );
    } else if (agencia.DireccionAgencia == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "EL campo dirección es obligatorio",
        "error"
      );
    } else if (agencia.DireccionAgencia.length <= 5) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "La dirección ingresada es demasiado corta",
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioCategoria(categoria: any) {
    var validacion = true;
    if (categoria.Nombre == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (categoria.Nombre.length < 3) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoLongitudObligarotio,
        "error"
      );
    } else if (categoria.Codigo == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo codigo es obligatorio",
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioTipoDocumento(documento: any) {
    var validacion = true;
    if (documento.Nombre == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (documento.Codigo == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo codigo es obligatorio",
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioCatalogoEstado(estado: any) {
    var validacion = true;
    if (estado.DescripcionEstado == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (estado.DescripcionEstado.length <= 5) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoLongitudObligarotio,
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioRuta(ruta: any) {
    var validacion = true;
    if (ruta.DescripcionRuta == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoDescripcionObligarotio,
        "error"
      );
    } else if (ruta.DescripcionRuta.length < 3) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "La descripción ingresada es muy corta",
        "error"
      );
    } else if (ruta.NombreRuta == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (ruta.NombreRuta.length < 3) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoLongitudObligarotio,
        "error"
      );
    } else if (ruta.OrigenRuta == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo origen es obligatorio",
        "error"
      );
    } else if (ruta.OrigenRuta.length < 3) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El origen ingresado es muy corto",
        "error"
      );
    } else if (ruta.DestinoRuta == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo destino es obligatorio",
        "error"
      );
    } else if (ruta.DestinoRuta.length < 3) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El destino ingresado es muy corto",
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioHotel(hotel: any) {
    var validacion = true;
    if (hotel.NombreHotel == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoNombreObligarotio,
        "error"
      );
    } else if (hotel.DescripcionHotel == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        this.mensajeCampoDescripcionObligarotio,
        "error"
      );
    } else if (hotel.EmailHotel == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo email es obligatorio",
        "error"
      );
    } else if (this.globales.CorreoElectronico(hotel.EmailHotel)) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El email ingresado no es válido",
        "error"
      );
    } else if (hotel.CiudadHotel == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo ciudad es obligatorio",
        "error"
      );
    } else if (hotel.TarifaHotel == "" || hotel.TarifaHotel <= 0) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "Ingrese un valor válido para la tarida, el total no puede ser igual a cero 0.00 $",
        "error"
      );
    } else if (hotel.TarifaHotel > 600) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "Ingrese un valor válido para el cobro, el total no puede ser mayor a 600.00 $",
        "error"
      );
    } else if (hotel.LatLongHotel == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo dirección es obligatorio",
        "error"
      );
    } else if (hotel.Imagen == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo imágen es obligatorio",
        "error"
      );
    }
    return validacion;
  }

  public ValidarFormularioParametro(parametro: any) {
    var validacion = true;
    if (parametro.ValorParametro == "") {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El campo valor es obligatorio",
        "error"
      );
    } else if (
      parametro.NombreParametro == "EmailOrigen" &&
      this.globales.CorreoElectronico(parametro.ValorParametro)
    ) {
      validacion = false;
      this.globales.VerAlerta(
        "Alerta",
        "El valor ingresado no corresponde a un correo electrónico",
        "error"
      );
    }
    return validacion;
  }
}
