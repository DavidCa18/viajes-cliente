import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class ServicioApi {

  url = environment.urlService;
  apiIP = environment.conexionIP;
  tipoContenidoAceptado = "application/json";

  constructor(private readonly http: HttpClient) { }

  async postAsincrono(endpoint: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": this.tipoContenidoAceptado,
      }),
    };
    return this.http
      .post(`${this.url}${endpoint}`, httpOptions)
      .toPromise();
  }

  post(endpoint: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": this.tipoContenidoAceptado,
      }),
    };
    return this.http.post(`${this.url}${endpoint}`, body, httpOptions);
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    reqOpts = {
      headers: new HttpHeaders({
        "Content-Type": this.tipoContenidoAceptado,
      }),
    };

    return this.http.get(`${this.url}${endpoint}`, reqOpts);
  }

  getIP(endpoint: any): Observable<any> {
    return this.http.get(`${this.apiIP}${endpoint}`).pipe(retry(3));
  }

  public GuardarError(
    clase: any,
    metodo: any,
    uriTemplate: any,
    estatus: any,
    url: any,
    descripcion: any
  ) {
    var error: any = {
      Identificador: 1,
      Clase: clase,
      Metodo: metodo,
      UriTemplate: uriTemplate,
      Estatus: estatus,
      Url: url,
      Descripcion: descripcion,
    };

    this.post(
      "AccesoServicios/AccesoServicio.svc/api/interno/error/gestion",
      error
    ).subscribe(
      (res: any) => {
        console.log("Error guardado en la base");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public GuardarLog(clase: any, metodo: any, tipo: any, datos: any) {
    var log: any = {
      Clase: clase,
      Metodo: metodo,
      Tipo: tipo,
      Datos: datos,
    };

    this.post(
      "AccesoServicios/AccesoServicio.svc/api/interno/gestion/LogTrazabiliad",
      log
    ).subscribe(
      (res: any) => {
        console.log(`Log: ${res} añadido exitosamente`);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
