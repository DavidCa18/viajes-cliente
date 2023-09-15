import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataExternos } from '../../../../controladores/externos/datos-externos.service';
import { ServicioSesionExterna } from '../../../../servicios/sesion-externa/sesion-externa.service';

@Component({
  selector: "app-approver",
  templateUrl: "./aprobador.component.html",
})
export class AprobadorComponent implements OnInit, OnChanges {
  
  @Input() nombreUsuarioAprobador: string;

  @Input() dtAprobador = {
    usuario: null,
    nombre: null,
    ciudad: null,
  };

  @Input() vlAprobador = {
    usuario: null,
    nombre: null,
  };

  aprobador: any;
  idViaje: any;
  lstJefeGrupo = [];
  lstJefeGrupoFiltro: Array<{ nombreCompleto: string; usuario: string }>;

  constructor(
    public spinner: NgxSpinnerService,
    private readonly dataExterna: ServicioDataExternos,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ObtenerGrupoJefe();
    this.idViaje = this.rutaActiva.snapshot.params.id;
  }

  ngOnChanges(changes: any) {
    const nombreActual = changes.nombreUsuarioAprobador.currentValue;
    this.ColocarValorSelectorAprobador(nombreActual);
  }

  public ColocarValorSelectorAprobador(nombreActual: any) {
    if (nombreActual !== "" && this.lstJefeGrupoFiltro) {
      const findCurrentApprover = this.lstJefeGrupoFiltro.find((appr: any) => appr.Usuario === nombreActual);
      this.aprobador = findCurrentApprover;
      this.SeleccionarInformacionAprobador();
    }
  }

  public ObtenerGrupoJefe() {
    var token = this.sesionExterna.ObtenerClaveExterna();
    var datos = { Token: token.access_token };
    this.dataExterna
      .ObtenerGrupoJefe(datos)
      .then((res) => {
        this.lstJefeGrupo = res;
        this.lstJefeGrupoFiltro = this.lstJefeGrupo.slice();
        if (!this.aprobador) {
          this.ColocarValorSelectorAprobador(this.nombreUsuarioAprobador);
        }
      })
      .catch((err) => { console.log(err) });
  }

  public FiltroJefe(value:any) {
    this.lstJefeGrupoFiltro = this.lstJefeGrupo.filter((s) => s.NombreCompleto.toLowerCase().indexOf(value.toLowerCase()) !== -1 || s.Usuario.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public SeleccionarInformacionAprobador() {
    this.dtAprobador.usuario = this.aprobador.Usuario;
    this.dtAprobador.nombre = this.aprobador.NombreCompleto;
    this.dtAprobador.ciudad = this.aprobador.CiudadDescripcion == null ? "" : this.aprobador.CiudadDescripcion;
  }
}
