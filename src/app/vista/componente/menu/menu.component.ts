import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { ServicioUsuario } from '../../../servicios/usuario/usuario.service';
import { ServicioDinamico } from '../../../servicios/servicio-menu-dinamico/dinamico.service';

@Component({
  selector: "app-componente-menu-global",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  @Input() tipo = 0;
  urls = environment;
  usuario: any;
  perfil = "";

  constructor(
    private readonly servicioUsuario: ServicioUsuario,
    private readonly rutaSistema: Router,
    private readonly dySw: ServicioDinamico
  ) {}

  ngOnInit() {
    this.usuario = this.servicioUsuario.ObtenerUsuario();
    this.perfil = localStorage.getItem("k-perfil");
    this.EstaActivoLink();
  }

  public EstaActivoLink() {
    this.dySw.menuConfig$.subscribe((x) => {
      if (x.id != "") {
        setTimeout(() => {
          const link = document.getElementById(x.id);

          link.setAttribute("class", "link");
        }, 500);
      } else {
        setTimeout(() => {
          const link = document.getElementById("Re2");

          link.setAttribute("class", "link");
        }, 500);
      }
    });
  }

  public Navegacion(pagina:any, event: Event) {
    const a = event.currentTarget as HTMLElement;

    const ida = a.id;
    const reservacionCliente = "/cliente/reservacion";
    const reservacionClienteLista = "/cliente/reservacion/lista/";
    const reservacionReporte = "/reporte/lista";

    this.dySw.setMenu({ id: ida });

    if (this.perfil == "REGISTRADOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate([reservacionClienteLista]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "PRE-APROBADOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate([reservacionClienteLista]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "REGISTRADOR PAGO") {
      if (pagina == 1) {
        this.rutaSistema.navigate(["/registrador/pago/viajes/lista"]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "APROBADOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate(["/aprobador/reservacion/lista"]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "CONTADOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate(["/contador/reservacion/lista"]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "ADMINISTRADOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate(["/contador/reservacion/lista"]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    } else if (this.perfil == "SUPERVISOR") {
      if (pagina == 1) {
        this.rutaSistema.navigate([reservacionClienteLista]);
      } else if (pagina == 2) {
        this.rutaSistema.navigate([reservacionCliente]);
      } else if (pagina == 3) {
        this.rutaSistema.navigate([reservacionReporte]);
      }
    }
  }

}
