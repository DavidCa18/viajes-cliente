import { Injectable } from "@angular/core";

@Injectable()
export class ServicioValidaciones {

  public ValidacionesRegistro(dtRegistro: any) {
    var vlRegistro = {
      compania: null,
      nombre: null,
    };
    var parametros = { state: true, vlRegistro: vlRegistro };

    if (dtRegistro.compania == "") {
      vlRegistro.compania = true;
      parametros = { state: false, vlRegistro: vlRegistro };
    }
    if (dtRegistro.nombre == "") {
      vlRegistro.nombre = true;
      parametros = { state: false, vlRegistro: vlRegistro };
    }

    if (!vlRegistro.compania && !vlRegistro.nombre) {
      vlRegistro.compania = false;
      vlRegistro.nombre = false;
      parametros = { state: true, vlRegistro: vlRegistro };
    }

    return parametros;
  }

  public ValidacionesViaje(dtViaje: any) {
    var vlViaje = {
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
    };

    var parametros = { state: true, vlViaje: vlViaje };

    if (dtViaje.tipoViaje == "" || dtViaje.tipoViaje == null) {
      vlViaje.tipoViaje = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.requiereHospedaje == "" || dtViaje.requiereHospedaje == null) {
      vlViaje.requiereHospedaje = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.viajeCapacitacion == "" || dtViaje.viajeCapacitacion == null) {
      vlViaje.viajeCapacitacion = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.nombreCorto == "" || dtViaje.nombreCorto == null) {
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.razonViaje == "" || dtViaje.razonViaje == null) {
      vlViaje.razonViaje = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.fechaInicio == "" || dtViaje.fechaInicio == null) {
      vlViaje.fechaInicio = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.fechaFin == "" || dtViaje.fechaFin == null) {
      vlViaje.fechaFin = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.fechaInicioHora == "" || dtViaje.fechaInicioHora == null) {
      vlViaje.fechaInicioHora = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    if (dtViaje.fechaFinHora == "" || dtViaje.fechaFinHora == null) {
      vlViaje.fechaFinHora = true;
      parametros = { state: false, vlViaje: vlViaje };
    }

    return parametros;
  }

  public ValidacionesTransporte(dtTransporte: any, dtViaje: any) {
    var vlTransporte = {
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
      impuesto: false,
      valorImpuesto: null,
      valorPasaje: null,
      numeroKilometros: null,
      valorKilometros: null,
      total: null,
      dtImpuesto: null,
    };

    var parametros = { state: true, vlTransporte: vlTransporte };

    if (dtTransporte.destino == "" || dtTransporte.destino == null) {
      vlTransporte.destino = true;
      parametros = { state: false, vlTransporte: vlTransporte };
    }

    if (dtViaje.tipoViaje == "Aéreo") {
      if (
        dtTransporte.requierePasaje == "" ||
        dtTransporte.requierePasaje == null
      ) {
        vlTransporte.requierePasaje = true;
        parametros = { state: false, vlTransporte: vlTransporte };
      } else if (dtTransporte.requierePasaje == "No") {
        if (
          dtTransporte.fechaEmision == "" ||
          dtTransporte.fechaEmision == null
        ) {
          vlTransporte.fechaEmision = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (dtTransporte.nombreAereolinea == "" || dtTransporte.nombreAereolinea == null) {
          vlTransporte.nombreAereolinea = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (
          dtTransporte.numeroPasaje == "" ||
          dtTransporte.numeroPasaje == null
        ) {
          vlTransporte.numeroPasaje = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (
          dtTransporte.referenciaPago == "" ||
          dtTransporte.referenciaPago == null
        ) {
          vlTransporte.referenciaPago = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (dtTransporte.valorPago == "" || dtTransporte.valorPago == null) {
          vlTransporte.valorPago = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (dtTransporte.impuestoAereo == "" || dtTransporte.impuestoAereo == null) {
          vlTransporte.impuestoAereo = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }

        if (dtTransporte.impuesto == null) {
          vlTransporte.impuesto = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }
      }
    } else if (dtViaje.tipoViaje == "Terrestre") {
      if (
        dtTransporte.requiereMovilizacion == "" ||
        dtTransporte.requiereMovilizacion == null
      ) {
        vlTransporte.requiereMovilizacion = true;
        parametros = { state: false, vlTransporte: vlTransporte };
      }

      if (dtTransporte.requiereMovilizacion == "Sí") {
        if (
          dtTransporte.numeroKilometros == "" ||
          dtTransporte.numeroKilometros == null
        ) {
          vlTransporte.numeroKilometros = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }
      }

      if (dtTransporte.requiereMovilizacion == "No") {
        if (
          dtTransporte.requiereMovilizacionContratada == "" ||
          dtTransporte.requiereMovilizacionContratada == null
        ) {
          vlTransporte.requiereMovilizacionContratada = true;
          parametros = { state: false, vlTransporte: vlTransporte };
        }
      }
    }

    return parametros;
  }

  public ValidacionesAlojamiento(dtHotel: any) {
    var vlHotel = {
      hotel: null,
      tarifa: true,
    };

    var parametros = { state: true, vlHotel: vlHotel };

    if (dtHotel.hotel == "" || dtHotel.hotel == null) {
      vlHotel.hotel = true;
      parametros = { state: false, vlHotel: vlHotel };
    }

    if (!vlHotel.hotel) {
      vlHotel.hotel = false;
      parametros = { state: true, vlHotel: vlHotel };
    }

    return parametros;
  }
}
