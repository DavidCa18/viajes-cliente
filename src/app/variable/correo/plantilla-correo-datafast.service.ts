import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class  ServicioPlantillaCorreoDatafast {
  linkUrl = environment.urlViajes;

  public obtenerDia() {
    var fecha = new Date();
    return fecha.getDate();
  }

  public GenerarEmailPreAprobador(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any,
    tmpNombrePreAprobador: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;
    return `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${tmpNombrePreAprobador} <br><br> Se le ha asignado la solicitud de
                                        viaje ${idSolicitud} <b style='color: #003366 !important'> en Salud S.A.
                                            Viajes<br></b>para que pueda Pre-Aprobarla con los siguientes detalles '<br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                            <tr style="border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitud. Nro</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Fecha Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitante</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Destino</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Motivo Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                            </tr>

                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Para gestionar la solicitud, acceda a través del siguiente <a
                                            href=' ${linkAcceso} ' target='_blank'
                                            style='text-decoration=none; color:#003366'><b>Link</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailRegistrador(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any
  ) {

    return `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreSolicitante} <br><br> Se ha realizado correctamente la
                                        solicitud de viaje en <b style='color: #003366 !important'>'Salud S.A.
                                            Viajes'</b><br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">


                                            <!--<tr style=" text-align:center; border: 3px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    <th style=" text-align:center; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Sol. Nro</th>
                                                    <th style=" text-align:center; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <th style=" text-align:center; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <th style=" text-align:center; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Destino</th>
                                                    <th style=" text-align:center; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Motivo Viaje</th>
                                                </tr >
                                                <tr style=" text-align:center; border: 3px solid #F1F1F1;">
                                                    <td style=" text-align:center; border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                                    <td style=" text-align:center; border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                                    <td style=" text-align:center; border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                                    <td style=" text-align:center; border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                                    <td style=" text-align:center; border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                                </tr>-->


                                            <tr style="border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitud. Nro</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Fecha Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitante</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Destino</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Motivo Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                            </tr>




                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailAprobador(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    nombreAprobador: any,
    rutaViaje: any,
    motivoViaje: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreAprobador} <br><br> Tiene una solicitud de viaje pendiente por
                                        aprobar en <b style='color: #003366 !important'>'Salud S.A. Viajes'</b><br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                            <tr style="border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitud. Nro</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Fecha Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitante</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Destino</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Motivo Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                            </tr>

                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Para gestionar la solicitud, acceda a través del siguiente <a
                                            href='${linkAcceso} ' target='_blank'
                                            style='text-decoration=none; color:#003366'><b>Link</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailSolicitudAprobada(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    nombreAprobador: any,
    rutaViaje: any,
    motivoViaje: any
  ) {

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreSolicitante} <br><br> Su solicitud de viaje ha sido aprobada
                                        en <b style='color: #003366 !important'>'Salud S.A. Viajes'</b><br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                            <tr style="border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitud. Nro</th>
                                                <td style=" border: 1px solid #F1F1F1;">${idSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Fecha Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;">${fechaSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Aprobador</th>
                                                <td style=" border: 1px solid #F1F1F1;">${nombreAprobador} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Destino</th>
                                                <td style=" border: 1px solid #F1F1F1;">${rutaViaje} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Motivo Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;">${motivoViaje} </td>
                                            </tr>

                                        </table>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailDescuentoRol(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any,
    valorViaticos: any
  ) {

    return `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreSolicitante} <br><br> Su solicitud de viaje ${idSolicitud} ha
                                        sido liquidada automáticamente en <b style='color: #003366 !important'>'Salud
                                            S.A. Viajes'</b>
                                        y el valor de $ ${valorViaticos} será descontado de su rol de pagos
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                            <tr style="border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitud. Nro</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Fecha Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Solicitante</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Destino</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                            </tr>

                                            <tr style=" border: 3px solid #F1F1F1;">
                                                <th
                                                    style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">
                                                    Motivo Viaje</th>
                                                <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                            </tr>

                                        </table>
                                    </div>


                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailContador(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreContador: any,
    rutaViaje: any,
    motivoViaje: any,
    nombreSolicitante: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreContador} <br><br> Se le a asignado la solicitud de viaje ${idSolicitud} <br> para que pueda contablizarla desde la plataforma <b style='color: #003366 !important'>'Salud S.A. Viajes'</b>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreContador} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Destino</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Motivo Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                                </tr>

                                            </table>
                                        </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                            <tr>
                                <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso} ' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailHotel(
    nombreHotel: any,
    cedulaViajero:any,
    nombreViajero:any,
    emailViajero:any,
    rutaViaje:any,
    fechaLlegada: any,
    fechaSalida: any,
    numeroNoches: any
  ) {

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@s, ${nombreHotel} <br><br> Por favor su ayuda con la reserva de una
                                        habitación en sus instalaciones, de acuerdo al siguiente detalle: <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style='width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Cédula Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${cedulaViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Nombre Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${nombreViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Correo Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${emailViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Ruta Seleccionada</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${rutaViaje} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Fecha de Llegada</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${fechaLlegada} </td>
                                            </tr>

                                            <tr style=' border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Fecha de Salida</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${fechaSalida} </td>
                                            </tr>

                                            <tr style=' border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Número de Noches</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${numeroNoches} </td>
                                            </tr>

                                        </table>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <br>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#717171;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:14px!important;line-height: 1.4 !important;'>
                                        Las facturas por los servicios adquiridos deben ser enviados por correo a
                                        <a href='mailto:mzambranop@saludsa.com.ec'><b>mzambranop@saludsa.com.ec</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:10px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'><img
                                                src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailRegistradorPago(
    nombreRegistradorPago: any,
    numeroSolicitud:any,
    cedulaViajero:any,
    nombreViajero:any,
    emailViajero:any,
    rutaViaje:any,
    fechaInicio:any,
    fechaFin:any,
    motivoViaje:any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreRegistradorPago} <br><br>
                                        Mantiene registros de pago pendientes por crear en la solicitud de Viaje N°
                                        ${numeroSolicitud} dentro de la plataforma<b style='color: #003366 !important'>
                                            Salud S.A. Viajes </b> con los
                                        siguientes detalles:<br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                        <table
                                            style='width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Solicitud N°</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${numeroSolicitud} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Cédula Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${cedulaViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Nombre Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${nombreViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Correo Solicitante</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${emailViajero} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Ruta Seleccionada</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${rutaViaje} </td>
                                            </tr>

                                            <tr style='border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Fecha Inicio Viaje</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${fechaInicio} </td>
                                            </tr>

                                            <tr style=' border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Fecha Fin Viaje</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${fechaFin} </td>
                                            </tr>

                                            <tr style=' border: 3px solid #F1F1F1;'>
                                                <th
                                                    style=' border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;'>
                                                    Motivo de Viaje</th>
                                                <td style=' border: 1px solid #F1F1F1;'> ${motivoViaje} </td>
                                            </tr>

                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Para gestionar la solicitud, acceda a través del siguiente <a
                                            href='${linkAcceso}' target='_blank'
                                            style='text-decoration:none; color:#003366'><b>Link</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#717171;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:14px!important;line-height: 1.4 !important;'>
                                        Las facturas por los servicios adquiridos deben ser enviados por correo a
                                        <a href='mailto:mzambranop@saludsa.com.ec'><b>mzambranop@saludsa.com.ec</b></a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:10px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed'
                                                            alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf'
                                                        alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p
                                        style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                        <a href='https://www.facebook.com/SaludSA/?fref=ts' target='_blank'
                                            style='text-decoration: none;color: #ffffff;'>
                                            <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc'
                                                alt=''
                                                style='border-width:0;height:auto;max-width:150px;display:inline-block;'>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                    <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailSolicitudPago(
    solicitud: any,
    solicitante: any,
    fecha: any,
    tipoPago: any
  ) {

    return   `
    <!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>

                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
									<br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimado Usuario ${solicitante} ,
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Adjunto encontrá la información de su ${tipoPago} de su viaje ${solicitud} que va a realizar en la fecha ${fecha}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
				<tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailRechazoSolicitud(
    solicitante: any,
    solicitud: any,
    comentario: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${solicitante} <br><br> Su solicitud N° <b style='color: #003366 !important'> ${solicitud} </b>, ingresada en la plataforma de viajes. <br> Ha sido revisada y fue <b>rechazada</b>. <br><br>
                                        Ponemos a tú disposición los detalles del rechazo de la solicitud.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                      <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                          <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                              <tr>
                                  <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:50px;padding-left:75px;width:100%;text-align:left;'>
                                    <h5><b style='color: #003366 !important'>Justificación</b></h5>
                                    <p class='h4 center grey' style='margin:0;color:#000000;margin-top:0px !important;margin-bottom:10px !important;font-size:15px!important;line-height: 1.4 !important;'>
                                    ${comentario}
                                    </p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                  <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                      <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                          <tr>
                              <td class='inner contents'
                                  style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                  <p class='h4 center grey'
                                      style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                      Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso} ' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailCorreccionSolicitud(
    solicitante: any,
    solicitud: any,
    comentario: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7' alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'><br><br></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${solicitante} <br><br> Su solicitud N° <b style='color: #003366 !important'> ${solicitud} </b>, ingresada en la plataforma de viajes. <br> Ha sido revisada y se solicita su <b>corección</b>. <br><br> Ponemos a tú disposición los detalles a tomar en cuenta al corregir la solicitud.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:50px;padding-left:75px;width:100%;text-align:left;'>
                                  <h5><b style='color: #003366 !important'>Acciones Correctivas</b></h5>
                                  <p class='h4 center grey' style='margin:0;color:#000000;margin-top:0px !important;margin-bottom:10px !important;font-size:15px!important;line-height: 1.4 !important;'>
                                  ${comentario}
                                  </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                  <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                      <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                          <tr>
                              <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                  <p class='h4 center grey'
                                      style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                      Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso} ' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailCorreccionLiquidacionViaje(
    solicitante: any,
    solicitud: any,
    comentario: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7' alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'><br><br></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${solicitante} <br><br> Su solicitud N° <b style='color: #003366 !important'> ${solicitud} </b>, ingresada en la plataforma de viajes. <br> Ha sido revisada y se solicita la edición de su <b>liquidación</b>. <br><br> Ponemos a tú disposición los detalles a tomar en cuenta al cambiar su liquidación.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:50px;padding-left:75px;width:100%;text-align:left;'>
                                  <h5><b style='color: #003366 !important'>Acciones Correctivas</b></h5>
                                  <p class='h4 center grey' style='margin:0;color:#000000;margin-top:0px !important;margin-bottom:10px !important;font-size:15px!important;line-height: 1.4 !important;'>
                                  ${comentario}
                                  </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                  <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                      <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                          <tr>
                              <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                  <p class='h4 center grey'
                                      style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                      Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso}' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }

  public GenerarEmailRegistradorModificacion(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any
  ) {

    return  `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml'>

    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>SALUD SA</title>
    </head>

    <body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
        <center class='wrapper'
            style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
            <div class='webkit' style='max-width:600px;'>

                <table class='outer' align='center'
                    style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                    <!--CUERPO-->
                    <tr>
                        <td class='full-width-image'
                            style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                                alt='SALUD SA' width='300'>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <br><br>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            Estimad@, ${nombreSolicitante} <br><br> Se ha modificado correctamente su solicitud de viaje en <b style='color: #003366 !important'>'Salud S.A. Viajes'</b><br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            A continuación ponemos a tu disposición los detalles de la petición de viaje :
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">


                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud}
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud}
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante}
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Destino</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje}
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Motivo Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje}
                                                </tr>

                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='three-column three-column-full-width'
                            style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                            <b>Oficina virtual</b> <br>
                                                            (PBX 6020920)
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                        <a href='' target='_blank'>
                                                            <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                                style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                                width='55' height='50'>
                                                        </a>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                            <b>Whatsapp</b> <br>
                                                            09-8940-4239
                                                        </p>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                            <b>Escríbenos</b> <br>
                                                            vive@saludsa.com.ec
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr class='grey-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                            <b></b>
                                            <p
                                                style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                                <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                    target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                        src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                        style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                            </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                            Este correo electrónico fue enviado por Salud S.A.<br>
                                            Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                            ©2022 Derechos Reservados
                                            <p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                            Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                            correo.
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>

    </html>`;
  }

  public GenerarEmailPreAprobadorModificacion(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any,
    tmpNombrePreAprobador: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml'>

    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>SALUD SA</title>
    </head>

    <body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
        <center class='wrapper'
            style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
            <div class='webkit' style='max-width:600px;'>

                <table class='outer' align='center'
                    style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                    <!--CUERPO-->
                    <tr>
                        <td class='full-width-image'
                            style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                                alt='SALUD SA' width='300'>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <br><br>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            Estimad@, ${tmpNombrePreAprobador} <br><br> Se le ha asignado la solicitud de viaje ${idSolicitud}
                                            <b style='color: #003366 !important'> en Salud S.A. Viajes</b><br>
                                            Que fue modificada en base a las observaciones enviadas al usuario. <br>
                                            Para que pueda Pre-Aprobarla con los siguientes detalles	'<br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                                <tr>
                                    <td class='inner contents' style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                        <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Destino</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Motivo Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                                </tr>

                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                      <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                          <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                              <tr>
                                  <td class='inner contents'
                                      style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                      <p class='h4 center grey'
                                          style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                          Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso} ' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                      </p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='three-column three-column-full-width'
                            style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                            <b>Oficina virtual</b> <br>
                                                            (PBX 6020920)
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                        <a href='' target='_blank'>
                                                            <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                                style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                                width='55' height='50'>
                                                        </a>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                            <b>Whatsapp</b> <br>
                                                            09-8940-4239
                                                        </p>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                            <b>Escríbenos</b> <br>
                                                            vive@saludsa.com.ec
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr class='grey-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                            <b></b>
                                            <p
                                                style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                                <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                    target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                        src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                        style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                            </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                            Este correo electrónico fue enviado por Salud S.A.<br>
                                            Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                            ©2022 Derechos Reservados
                                            <p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                            Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                            correo.
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>

    </html>`;
  }

  public GenerarEmailTesoreria(
    nombreTesorero: any,
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    cedulaSolicitante: any,
    montoViaticos: any
  ) {

    return `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml'>

    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>SALUD SA</title>
    </head>

    <body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
        <center class='wrapper'
            style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
            <div class='webkit' style='max-width:600px;'>

                <table class='outer' align='center'
                    style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                    <!--CUERPO-->
                    <tr>
                        <td class='full-width-image'
                            style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                                alt='SALUD SA' width='300'>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <br><br>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            Estimad@, ${nombreTesorero} <br><br>Se ha registrado una nueva solicitud para el registro de anticipo en la plataforma <b style='color: #003366 !important'>'Salud S.A. Viajes'</b><br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                           A continuación ponemos a tu disposición los detalles de la solicitud:
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">


                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Cedula</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${cedulaSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Viáticos</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${montoViaticos} $ dólares </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='three-column three-column-full-width'
                            style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                            <b>Oficina virtual</b> <br>
                                                            (PBX 6020920)
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                        <a href='' target='_blank'>
                                                            <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                                style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                                width='55' height='50'>
                                                        </a>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                            <b>Whatsapp</b> <br>
                                                            09-8940-4239
                                                        </p>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                            <b>Escríbenos</b> <br>
                                                            vive@saludsa.com.ec
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr class='grey-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                            <b></b>
                                            <p
                                                style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                                <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                    target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                        src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                        style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                            </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                            Este correo electrónico fue enviado por Salud S.A.<br>
                                            Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                            ©2022 Derechos Reservados
                                            <p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                            Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                            correo.
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>

    </html>`;
  }

  public GenerarEmailTesoreriaAcreditacion(
    nombreTesorero: any,
    idSolicitud: any,
    fechaInicioViaje: any,
    fechaFinViaje: any,
    nombreSolicitante: any,
    cedulaSolicitante: any,
    montoViaticos: any
  ) {

    return  `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
    <html xmlns='http://www.w3.org/1999/xhtml'>

    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>SALUD SA</title>
    </head>

    <body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
        <center class='wrapper'
            style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
            <div class='webkit' style='max-width:600px;'>

                <table class='outer' align='center'
                    style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                    <!--CUERPO-->
                    <tr>
                        <td class='full-width-image'
                            style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                                alt='SALUD SA' width='300'>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <br><br>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            Estimad@, ${nombreTesorero} <br><br>Se ha registrado una nueva solicitud para la acreditación de viáticos pendientes en la plataforma <b style='color: #003366 !important'>'Salud S.A. Viajes'</b><br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#00c1de;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                           A continuación ponemos a tu disposición los detalles de la solicitud:
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">


                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Inicio Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaInicioViaje} </td>

                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Finalización Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaFinViaje} </td>

                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>

                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Cédula</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${cedulaSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Viáticos a Acreditar</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${montoViaticos} </td>
                                                </tr>

                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='three-column three-column-full-width'
                            style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                            <b>Oficina virtual</b> <br>
                                                            (PBX 6020920)
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                        <a href='' target='_blank'>
                                                            <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                                style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                                width='55' height='50'>
                                                        </a>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                            <b>Whatsapp</b> <br>
                                                            09-8940-4239
                                                        </p>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class='column'
                                style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                                <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                    <tr>
                                        <td class='inner'
                                            style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                            <table class='contents'
                                                style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                                <tr>
                                                    <td
                                                        style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                            width='55' height='50'>
                                                        <p class='h4 center white'
                                                            style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                            <b>Escríbenos</b> <br>
                                                            vive@saludsa.com.ec
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr class='grey-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                            <b></b>
                                            <p
                                                style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                                <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                    target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                        src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                        style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                            </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='blue-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                            Este correo electrónico fue enviado por Salud S.A.<br>
                                            Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                            ©2022 Derechos Reservados
                                            <p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                            Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                            correo.
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </center>
    </body>

    </html>`;
  }

  public GenerarEmailReasignacion(
    idSolicitud: any,
    fechaSolicitud: any,
    nombreSolicitante: any,
    rutaViaje: any,
    motivoViaje: any,
    nombreUsuario: any,
    actividad: any,
    link: any
  ) {
    var linkAcceso = this.linkUrl + link;

    return  `<!DOCTYPE html
    PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>

<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SALUD SA</title>
</head>

<body style='Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;'>
    <center class='wrapper'
        style='width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;'>
        <div class='webkit' style='max-width:600px;'>

            <table class='outer' align='center'
                style='border-spacing:0;font-family:sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;'>
                <!--CUERPO-->
                <tr>
                    <td class='full-width-image'
                        style='padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:0; text-align: right; background-color: #003366'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo_saludsa_vitality.png?alt=media&token=c7a00e97-99ad-4383-b6a4-9bb232a8ded7'
                            alt='SALUD SA' width='300'>
                    </td>
                </tr>
                <tr>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <br><br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                        Estimad@, ${nombreUsuario} <br><br> Se le ha re-asignado la solicitud de viaje ${idSolicitud} <b style='color: #003366 !important'> en Salud S.A. Viajes<br></b>
                                        Para que realice <b style='color: #003366 !important'> ${actividad} </b> de esta solicitud con la siguiente información.<br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#003366;'>
                            <tr>
                                <td class='inner contents'
                                   style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>

                                    <div style='padding-left: 60px !important; padding-right: 60px !important'>
                                            <table style="width:100% ; border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">

                                                <tr style="border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitud. Nro</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${idSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Fecha Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${fechaSolicitud} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Solicitante</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${nombreSolicitante} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Destino</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${rutaViaje} </td>
                                                </tr>

                                                <tr style=" border: 3px solid #F1F1F1;">
                                                    <th style=" border: 1px solid #F1F1F1; border-collapse: collapse; padding:8px !important;">Motivo Viaje</th>
                                                    <td style=" border: 1px solid #F1F1F1;"> ${motivoViaje} </td>
                                                </tr>

                                            </table>
                                      </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                        <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#000000;'>
                                <tr>
                                    <td class='inner contents'
                                        style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                        <p class='h4 center grey'
                                            style='padding-top:40px !important;color:#000000;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:20px;padding-left:20px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:15px!important;line-height: 1.4 !important;'>
                                            Para gestionar la solicitud, acceda a través del siguiente <a href=' ${linkAcceso} ' target='_blank' style='text-decoration=none; color:#003366'><b>Link</b></a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='three-column three-column-full-width'
                        style='padding-top:30px;padding-bottom:10px;padding-right:0;padding-left:0;text-align:center;font-size:0;'>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/3.png?alt=media&token=59ceca5b-8033-413f-9b18-46ffc3361edc' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;Margin-bottom:10px;'>
                                                        <b>Oficina virtual</b> <br>
                                                        (PBX 6020920)
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:0px;padding-bottom:0;padding-right:0;padding-left:0;border-left:2px solid #2e417b;border-right:2px solid #2e417b;'>
                                                    <a href='' target='_blank'>
                                                        <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/4.png?alt=media&token=4b65b8d3-bc80-4d23-860c-43998b6abaed' alt=''
                                                            style='border-width:0;height:auto;max-width:55px;display:block;margin:25px auto 15px;'
                                                            width='55' height='50'>
                                                    </a>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px!important;Margin-bottom:10px;'>
                                                        <b>Whatsapp</b> <br>
                                                        09-8940-4239
                                                    </p>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='column'
                            style='width:100%;max-width:200px;display:inline-block;vertical-align:top;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                            <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                                <tr>
                                    <td class='inner'
                                        style='padding-top:10px;padding-bottom:0px;padding-right:0px;padding-left:0px;'>
                                        <table class='contents'
                                            style='border-spacing:0;font-family:sans-serif;color:#333333;width:100%;font-size:14px;text-align:center;'>
                                            <tr>
                                                <td
                                                    style='padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;'>
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/salud-viajes.appspot.com/o/5.png?alt=media&token=6c0e9d47-71fd-4b19-8206-f73a5a2910cf' alt=''
                                                        style='border-width:0;height:auto;max-width:55px;display:block;margin:15px auto;'
                                                        width='55' height='50'>
                                                    <p class='h4 center white'
                                                        style='margin:0;color:#2e417b;text-align:center;padding-top:0px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:12px !important;Margin-bottom:10px;'>
                                                        <b>Escríbenos</b> <br>
                                                        vive@saludsa.com.ec
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr class='grey-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#ffffff;text-align:center;padding-	top:10px;padding-bottom:5px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;margin-bottom:0px;'>
                                        <b></b>
                                        <p
                                            style='Margin:0;color:#ffffff;text-align:center;padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:20px !important;margin-right:0 !important;margin-left:0 !important;font-size:13px!important;'>
                                            <a href='https://www.facebook.com/SaludSA/?fref=ts'
                                                target='_blank' style='text-decoration: none;color: #ffffff;'><img
                                                    src='https://firebasestorage.googleapis.com/v0/b/polar-office-298722.appspot.com/o/logo-horizontal.png?alt=media&token=d94ea9f0-3e6d-49d2-bab6-0d3c8ea8fefc' alt=''
                                                    style='border-width:0;height:auto;max-width:150px;display:inline-block;'></a>
                                        </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='blue-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#333333;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:20px;padding-left:20px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='Margin:0;color:#2C2F85;text-align:center;padding-top:10px;padding-bottom:0px;padding-right:10px;padding-left:10px;margin-top:10px !important;margin-bottom:10px !important;margin-right:0 !important;margin-left:0 !important;font-size:10px!important;margin-bottom:10px;'>
                                        Este correo electrónico fue enviado por Salud S.A.<br>
                                        Rep. de El Salvador N° 36-84. Quito, Ecuador.<br>
                                        ©2022 Derechos Reservados
                                        <p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class='white-back' style='background-color:#f7f7f7;'>
                    <td class='one-column' style='padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;'>
                        <table width='100%' style='border-spacing:0;font-family:sans-serif;color:#3c3c3c;'>
                            <tr>
                                <td class='inner contents'
                                    style='padding-top:0px;padding-bottom:0px;padding-right:10px;padding-left:10px;width:100%;text-align:center;'>
                                    <p class='h4 center grey'
                                        style='margin:0;color:#3c3c3c;text-align:center;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px;margin-top:0px !important;margin-bottom:0px !important;margin-right:0 !important;margin-left:0 !important;font-size:11.5px!important;line-height:1.5 !important;'>
                                        Este mensaje ha sido generado automáticamente, por favor no respondas a este
                                        correo.
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>`;
  }
}
