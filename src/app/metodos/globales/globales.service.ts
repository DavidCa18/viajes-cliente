import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class ServicioGlobales {

  public cadenaAJson(data: any) {
    return JSON.parse(data);
  }

  public ObtenerFechaParametro(date) {
    var separador = "-";
    var fecha = new Date(date);
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate() - 1;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }

    return anio + separador + mes + separador + dia;
  }

  public ObtenerFechaParametroDiaEspecifico(date) {
    var separador = "-";
    var fecha = new Date(date);
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }

    return anio + separador + mes + separador + dia;
  }

  public ObtenerFecha() {
    var separador = "/";
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }

    return dia + separador + mes + separador + anio;
  }

  public ObtenerFechaAX() {
    var separador = "-";
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = fecha.getMonth() + 1;
    var dia: any = fecha.getDate();

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }
    return anio + separador + mes + separador + dia;
  }

  public ObtenerFechaEmision() {
    var separador = "-";
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes: any = 12;
    var dia: any = 31;

    if (mes < 10) {
      mes = `0${mes}`;
    }

    if (dia < 10) {
      dia = `0${dia}`;
    }

    return anio + separador + mes + separador + dia;
  }

  public FormatearCampo(valor: any, restriccion: any, caracteres: any, tipo: any) {
    var out = "";
    var filtro = ` ${restriccion} `;
    for (var i = 0; i < valor.length; i++) {
      if (filtro.indexOf(valor.charAt(i)) != -1) {
        if (out.length >= caracteres) {
          out = out.substr(0, caracteres);
        } else {
          out += valor.charAt(i);
        }
      }
    }
    return tipo == 1 ? out.toUpperCase() : out;
  }

  public FormatearNumero(monto: any, decimales: any) {
    monto += "";
    monto = parseFloat(monto.replace(/[^0-9\.]/g, ""));

    decimales = decimales || 0;

    if (isNaN(monto) || monto === 0) {
      return parseFloat("0").toFixed(decimales);
    }

    monto = "" + monto.toFixed(decimales);

    var amountParts = monto.split("."),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amountParts[0])) {
      amountParts[0] = amountParts[0].replace(regexp, "$1" + "," + "$2");
    }

    return amountParts.join(".");
  }

  public FormatearNumeroPunto(monto: any, decimales: any) {
    monto += "";
    monto = parseFloat(monto.replace(/[^0-9\.]/g, ""));

    decimales = decimales || 0;

    if (isNaN(monto) || monto === 0) {
      return parseFloat("0").toFixed(decimales);
    }

    monto = "" + monto.toFixed(decimales);

    var amountParts = monto.split("."),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amountParts[0])) {
      amountParts[0] = amountParts[0].replace(regexp, "$1" + "." + "$2");
    }

    return amountParts.join(".");
  }

  public VerMensaje(texto: any, tipo: any, posicion: any) {
    var _tipo = "";
    var fondo = "";
    if (tipo == "success") {
      _tipo =
        '<i class="mdi mdi-checkbox-marked-circle-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#28B463";
    } else if (tipo == "warning") {
      _tipo =
        '<i class="mdi mdi-alert-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#D4AC0D";
    } else if (tipo == "error") {
      _tipo =
        '<i class="mdi mdi-alert-octagon" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#CB4335";
    }

    const Toast = Swal.mixin({
      toast: true,
      position: posicion,
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      html: `${_tipo} <span style="color: #FFF; font-size: 12.5px !important;"> ${texto} </span>`,
      background: fondo,
    });
  }

  public MostrarNotificacion(texto: any, tipo: any, posicion: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: posicion,
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      type: tipo,
      title: texto,
    });
  }

  public VerMensajeError(texto: any, tipo: any, posicion: any) {
    var _tipo = "";
    var fondo = "";
    if (tipo == "success") {
      _tipo =
        '<i class="mdi mdi-checkbox-marked-circle-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#28B463";
    } else if (tipo == "warning") {
      _tipo =
        '<i class="mdi mdi-alert-outline" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#D4AC0D";
    } else if (tipo == "error") {
      _tipo =
        '<i class="mdi mdi-alert-octagon" style="font-size: 20px; color: #fff; padding-right: 8px"></i>';
      fondo = "#d18324";
    }

    const Toast = Swal.mixin({
      toast: true,
      position: posicion,
      showConfirmButton: false,
      timer: 6000,
    });

    Toast.fire({
      html: `${_tipo} <span style="color: #FFF; font-size: 12.5px !important;"> ${texto} </span>`,
      background: fondo,
    });
  }

  public Alerta(titulo: any, texto: any, tipo: any) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
      showConfirmButton: false,
      timer: 4000,
    });
  }

  public VerAlertaTiempoLargo(titulo: any, texto: any, tipo: any) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
      showConfirmButton: false,
      timer: 7000,
    });
  }

  public VerAlertaSinTitulo(texto: any, tipo: any) {
    Swal.fire({
      html: texto,
      type: tipo,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  public VerAlertaTiempo(titulo: any, texto: any, tipo: any) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
      timer: 3000,
    });
  }

  public VerAlerta(titulo: any, texto: any, tipo: any) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo,
    });
  }

  public CorreoElectronico(valor: any) {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  public ValidarCampos(campo: any) {
    var validacion = true;
    if (
      campo == "" ||
      campo == null ||
      campo == undefined ||
      campo.length == 0
    ) {
      validacion = false;
    }
    return validacion;
  }

  public ValidarTelefono(telefono: any, tipo: any) {
    let valido = true;
    const restriccionConvencional = ["02", "03", "04", "05", "06", "07"];
    const restriccionCelular = ["08", "09"];
    const prefijo = telefono.substring(0, 2);

    if (tipo == 1) {
      if (!restriccionConvencional.includes(prefijo)) {
        valido = false;
      }
    } else if (tipo == 2) {
      if (!restriccionCelular.includes(prefijo)) {
        valido = false;
      }
    }
    return valido;
  }

  public NumeroNegativo(numero = 0) {
    if (numero < 0) {
      return true;
    } else {
      return false;
    }
  }

  public NumeroPositivo(numero = 0) {
    if (numero > 0) {
      return true;
    } else {
      return false;
    }
  }

  public NumeroNeutral(numero = 0) {
    if (numero == 0) {
      return true;
    } else {
      return false;
    }
  }

  public ValidarEmail(email: any) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  public Aleatorio(minimo: any, maximo: any) {
    return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
  }

  public Reemplazar(cadena:any){
    cadena = cadena.toLowerCase();
    cadena = cadena.replace(/ñ/gi,"n");
    return cadena;
  }
}
