import { Injectable } from "@angular/core";

@Injectable()
export class ServicioUsuario {
  keyUser = "k:user";

  public EliminarSesionUsuario() {
    localStorage.removeItem(this.keyUser);
  }

  public ObtenerUsuario() {
    var data = localStorage.getItem(this.keyUser);
    var result: any;
    if (data == null) {
      result = null;
    } else {
      try {
        result = JSON.parse(data);
      } catch (e) {
        result = null;
      }
    }
    return result;
  }

  public async ObtenerUsuarioAsync() {
    var data = localStorage.getItem(this.keyUser);
    var res: any;
    if (data == null) {
      res = null;
    } else {
      try {
        res = JSON.parse(data);
      } catch (e) {
        res = null;
      }
    }
    return res;
  }

  public AgregarSesionUsuario(data) {
    this.EliminarSesionUsuario();
    localStorage.setItem(this.keyUser, JSON.stringify(data));
  }

  public EliminarSesionGlobal() {
    localStorage.removeItem("k-ciudades");
    localStorage.removeItem("k-perfiles");
    localStorage.removeItem("l:key-sesion-external");
    localStorage.removeItem("k:user");
    localStorage.removeItem("k-perfil");
    localStorage.removeItem("k-session");
    localStorage.clear();
  }
}
