import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServicioDataInternos } from "../../controladores/internos/datos-internos.service";
import { ServicioApi } from "../../servicios/api/api.service";
import { ServicioUsuario } from "../../servicios/usuario/usuario.service";
import { ServicioSesionExterna } from "../../servicios/sesion-externa/sesion-externa.service";
import { ServicioDataExternos } from "../../controladores/externos/datos-externos.service";

declare var $: any;
declare var platform: any;
declare var moment: any;
@Component({
  selector: "app-routes",
  templateUrl: "./rutas.component.html",
})
export class RutasComponentVista implements OnInit {
  public mensaje = "Cargando Información...";
  public variableSesionLocal = "k-perfiles";

  userData = {
    Apellidos: "",
    ApellidosNombres: "",
    Cargo: "",
    Cedula: "",
    CiudadCodigo: "",
    CiudadDescripcion: "",
    CompaniaCodigo: "",
    CompaniaDescripcion: "",
    Departamento: "",
    Email: "",
    "": "",
    JefeInmediato: {
      Apellidos: "",
      ApellidosNombres: "",
      Cargo: "",
      Cedula: "",
      CiudadCodigo: "",
      CiudadDescripcion: "",
      CompaniaCodigo: "",
      CompaniaDescripcion: "",
      Departamento: "",
      Email: "",
      Extension: "",
      JefeInmediato: null,
      NombreCompleto: "",
      Nombres: "",
      NombresApellidos: "",
      Telefono: "",
      Usuario: "",
      UsuarioDominio: "",
    },
    NombreCompleto: "",
    Nombres: "",
    NombresApellidos: "",
    Telefono: "",
    Usuario: "",
    UsuarioDominio: "",
    ip: "",
    sistemaOperativo: "",
    navegador: "",
  };

  lstPerfiles = [];
  fmrPerfiles = {
    rol: null,
    usuario: null,
  };

  public dataRolesPerfil = [
    {
      EstadoUsuarioRolViaje: 0,
      IdUsuarioRolViaje: 0,
      Identificacion: 0,
      Rol: {
        DescripcionRol: null,
        EstadoRol: null,
        IdRolViaje: 0,
        Identificador: 0,
        NombreRol: "APROBADOR",
        Principal: "0",
      },
      Usuario: {
        CiudadUsuario: "",
        DescripcionUsuario: null,
        EmailUsuario: null,
        EstadoUsuario: null,
        IdUsuarioViaje: 0,
        Identificacion: 0,
        NombreUsuario: "",
        UserUsuario: "",
      },
    },
  ];

  public ipObtenida: any;
  public navegadorPrincipal: any;
  public sistemaOpe: any;

  public informacionGeneral: any;
  kCiudades = "k-ciudades";
  preAprobador = "PRE-APROBADOR";
  registradorPago = "REGISTRADOR PAGO";
  clienteListaReservacion = "/cliente/reservacion/lista";

  agregarRolSupervidor = false;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly dataInterna: ServicioDataInternos,
    private readonly dataExterna: ServicioDataExternos,
    private readonly rutaSistema: Router,
    private readonly rutaActiva: ActivatedRoute,
    private readonly sesionExterna: ServicioSesionExterna,
    private readonly apiService: ServicioApi,
    private readonly usuarioServicio: ServicioUsuario
  ) { }

  ngOnInit() {
    var data = atob(this.rutaActiva.snapshot.params.data);
    this.informacionGeneral = JSON.parse(data);

    if (this.informacionGeneral.tipo == "sesion") {
      localStorage.removeItem("k-perfil");
      localStorage.removeItem(this.kCiudades);
      localStorage.removeItem("k-key1");
      localStorage.removeItem("k-key2");
      localStorage.removeItem("k-key3");
      localStorage.removeItem("k-session");
      setTimeout(() => {
        this.ObtenerIP();
      }, 500);
    } else if (this.informacionGeneral.tipo == "link") {

      var datosSesion = localStorage.getItem("k-session");
      var objetoSesion:any
      if (datosSesion != undefined || datosSesion != null) {
        var datosSesionDesencriptados = atob(datosSesion);
        if (datosSesionDesencriptados != "") {
          objetoSesion = JSON.parse(datosSesionDesencriptados);
        }
      }

      if (this.informacionGeneral != undefined && objetoSesion != undefined) {
        if (this.informacionGeneral.usuario.toLowerCase() == objetoSesion.usuario.toLowerCase()) {
          this.ObtenerTokenExterno();
        } else {
          this.rutaSistema.navigate(["/ingreso/autorizacion"]);
        }
      } else {
        this.rutaSistema.navigate(["/ingreso/autorizacion"]);
      }

    }
  }

  public ObtenerIP() {
    this.apiService.getIP("?format=json").subscribe(
      (res: any) => {
        if (res) {
          this.ipObtenida = res.ip;
          this.navegadorPrincipal = `${platform.name} ${platform.version}`;
          this.sistemaOpe = `${platform.os.family} ${platform.os.version} x${platform.os.architecture}`;
          localStorage.setItem("k-key1", btoa(this.ipObtenida == undefined ? "200.107.24.221" : this.ipObtenida));
          localStorage.setItem("k-key2", btoa(this.navegadorPrincipal == undefined ? "Chrome Chrome" : this.navegadorPrincipal));
          localStorage.setItem("k-key3", btoa(this.sistemaOpe == undefined ? "Windows" : this.sistemaOpe));
          ////////////////////Sesión
          const transaccion = { 'usuario': this.informacionGeneral.usuario, 'acceso': moment().format("YYYY-MM-DD HH:mm"), 'ip': this.ipObtenida, 'navegador': this.navegadorPrincipal, 'sistema': this.sistemaOpe }
          localStorage.setItem("k-session", btoa(JSON.stringify(transaccion)));
          ////////////////////Link
          this.ObtenerTokenExterno();
        }
      },
      (err) => { console.log(err) }
    );
  }

  public ObtenerTokenExterno() {
    this.spinner.show();
    this.dataExterna.ObtenerTokenExterno().then((res) => {
      this.spinner.hide();
      var token = res;
      this.sesionExterna.AgregarClaveExterna(token);
      this.ObtenerRegistro(token);
    }).catch((err) => {
      console.log(err);
      this.spinner.hide();
    });
  }

  public ObtenerRegistro(token: any) {
    this.spinner.show();
    this.dataExterna.ObtenerUsuario(token, this.informacionGeneral.usuario).then((res) => {
      this.spinner.hide();
      this.userData = res;
      this.ValidarUsuarioRegistrador();
    }).catch((err) => {
      console.log(err)
      this.spinner.hide();
    });
  }

  public ValidarUsuarioRegistrador() {
    var registrador: any = {
      CodigoEmpresa: this.userData.CompaniaCodigo,
      NombreEmpresa: this.userData.CompaniaDescripcion,
      Identificacion: this.userData.Cedula,
      Email: this.userData.Email,
      Departamento: this.userData.Departamento,
      Cargo: this.userData.Cargo,
      Ciudad: this.userData.CiudadDescripcion.toUpperCase(),
      Usuario: this.userData.Usuario,
    };
    this.dataInterna.GestionUsuarioRegistradorViaje(registrador).then((res) => {
      this.VerificarUsuarioSupervidor();
    }).catch((err) => {
      console.log(err)
      this.VerificarUsuarioSupervidor();
    });
  }

  public VerificarUsuarioSupervidor() {
    this.dataInterna.ObtenerUsuarioSupervisor(this.userData.Usuario).then((res) => {
      if (res) {
        if (res.IdUsuarioRolViaje != 0) {
          this.agregarRolSupervidor = true;
        } else {
          this.agregarRolSupervidor = false;
        }
      }
      this.ObtenerUsuarioRol();
    }).catch((err) => {
      console.log(err)
      this.ObtenerUsuarioRol();
    });
  }

  public ObtenerUsuarioRol() {
    this.spinner.show();
    this.dataInterna.ObtenerUsuarioRol(this.userData.Usuario, this.userData.CiudadDescripcion).then((res) => {
      this.spinner.hide();
      var perfil: any;
      for (const usuario of res) {
        if (usuario.Rol.Principal == "1") {
          perfil = usuario;
          break;
        }
      }

      if (res.length > 0) {
        this.usuarioServicio.AgregarSesionUsuario(this.userData);
        localStorage.setItem(this.kCiudades, JSON.stringify(this.ObtenerCiudades(res)));
        localStorage.setItem(this.variableSesionLocal, JSON.stringify(this.ObtenerPerfiles(res)));
        if (perfil.Rol.NombreRol == "APROBADOR") {
          localStorage.setItem("k-perfil", "APROBADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate(["/aprobador/reservacion/lista"]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == this.preAprobador) {
          localStorage.setItem("k-perfil", this.preAprobador);
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate(["/preaprobador/reservacion/lista"]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == "CONTADOR") {
          localStorage.setItem("k-perfil", "CONTADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate(["/contador/reservacion/lista"]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == this.registradorPago) {
          localStorage.setItem("k-perfil", this.registradorPago);
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate(["/registrador/pago/viajes/lista"]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == "ADMINISTRADOR") {
          localStorage.setItem("k-perfil", "ADMINISTRADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate([this.clienteListaReservacion]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == "SUPERVISOR") {
          localStorage.setItem("k-perfil", "REGISTRADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate([this.clienteListaReservacion]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == "REASIGNADOR") {
          localStorage.setItem("k-perfil", "REGISTRADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate([this.clienteListaReservacion]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } else if (perfil.Rol.NombreRol == "TESORERIA") {
          localStorage.setItem("k-perfil", "REGISTRADOR");
          if (this.informacionGeneral.tipo == "sesion") {
            this.rutaSistema.navigate([this.clienteListaReservacion]);
          } else if (this.informacionGeneral.tipo == "link") {
            this.rutaSistema.navigate([this.informacionGeneral.url]);
          }
        } 
      } else {
        localStorage.setItem("k-perfil", "REGISTRADOR");
        if (this.agregarRolSupervidor) {
          localStorage.setItem(this.variableSesionLocal, JSON.stringify(["REGISTRADOR", "SUPERVISOR"]));
        } else {
          localStorage.setItem(this.variableSesionLocal, JSON.stringify(["REGISTRADOR"]));
        }
        localStorage.setItem(this.kCiudades, JSON.stringify([this.userData.CiudadDescripcion.toUpperCase()]));
        this.usuarioServicio.AgregarSesionUsuario(this.userData);
        if (this.informacionGeneral.tipo == "sesion") {
          this.rutaSistema.navigate([this.clienteListaReservacion]);
        } else if (this.informacionGeneral.tipo == "link") {
          this.rutaSistema.navigate([this.informacionGeneral.url]);
        }
      }
    }).catch((err) => {
      console.log(err)
      this.spinner.hide();
    });
  }

  public ObtenerCiudades(lista: any) {
    var ciudades = [];
    for (const datos of lista) {
      ciudades.push(datos.Usuario.CiudadUsuario.toUpperCase());
    }
    return ciudades.filter(
      (valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
    );
  }

  public ObtenerPerfiles(lista: any) {
    var perfiles: any = [];
    if (this.agregarRolSupervidor) {
      perfiles = ["REGISTRADOR", "SUPERVISOR"];
    } else {
      perfiles = ["REGISTRADOR"];
    }
    for (const datos of lista) {
      perfiles.push(datos.Rol.NombreRol);
    }
    return perfiles.filter(
      (valor: any, indiceActual: any, arreglo: any) => arreglo.indexOf(valor) === indiceActual
    );
  }
}
