import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ServicioUsuario } from './servicios/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public ambiente = environment;

  constructor(private readonly servicioUsuario: ServicioUsuario) { }

  ngOnInit() {
    this.VerificarSesion();
  }

  public VerificarSesion() {
    var time: any;
    var _this = this;
    var urlCierre = this.ambiente.urlPrincipal;
    window.onload = resetearContador;
    document.onmousemove = resetearContador;
    function cerrar() {
      _this.servicioUsuario.EliminarSesionGlobal();
      window.alert("La sesión ha caducado por inactividad. Ingrese sus credenciales nuevamente");
      window.history.go(1);
      setTimeout(() => {
        window.location.href = urlCierre;
      }, 500);
    }
    function resetearContador() {
      clearTimeout(time);
      time = setTimeout(function () {
        cerrar();
      }, 30 * 60 * 1000);
    }
  }
}
