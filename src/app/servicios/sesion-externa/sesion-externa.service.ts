import { Injectable } from "@angular/core";

@Injectable()
export class ServicioSesionExterna {
  private readonly llaveSesion = "l:key-sesion-external";

  EliminarClaveExterna() {
    localStorage.removeItem(this.llaveSesion);
  }

  AgregarClaveExterna(data: any) {
    this.EliminarClaveExterna();
    localStorage.setItem(this.llaveSesion, JSON.stringify(data));
  }

  ObtenerClaveExterna() {
    var data = localStorage.getItem(this.llaveSesion);

    if (data == null) {
      return {
        access_token: null,
        error: null,
        error_description: null,
        expires: null,
        expires_in: null,
        issued: null,
        refresh_token: null,
        token_type: null,
      };
    } else {
      return JSON.parse(data);
    }
  }
}
