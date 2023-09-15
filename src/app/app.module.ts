import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  DateInputsModule,
  CalendarModule,
} from "@progress/kendo-angular-dateinputs";
import { IntlModule } from "@progress/kendo-angular-intl";
import {
  ExcelModule,
  GridModule,
  PDFModule,
} from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import "@progress/kendo-angular-intl/locales/es/all";
import { NgxMaskModule, IConfig } from "ngx-mask";
import {
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG,
} from "ng2-currency-mask";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ServicioUsuario } from "./servicios/usuario/usuario.service";
import { ServicioApi } from "./servicios/api/api.service";

import { ServicioSesionExterna } from "./servicios/sesion-externa/sesion-externa.service";
import { ServicioDinamico } from "./servicios/servicio-menu-dinamico/dinamico.service";
import { ServicioGlobales } from "./metodos/globales/globales.service";
import { ServicioValidaciones } from "./metodos/validaciones/validaciones.service";
import { ValidacionesAdministracionService } from "./metodos/validaciones-administracion.service";
import { ServicioDataExternos } from "./controladores/externos/datos-externos.service";
import { ServicioDataInternos } from "./controladores/internos/datos-internos.service";
import { DetalleContadorComponent } from "./vista/contador/detalle-contador/detalle-contador.component";
import { ListaContadorComponent } from "./vista/contador/lista-contador/lista-contador.component";
import { RegistroContadorComponent } from "./vista/contador/registro-contador/registro-contador.component";
import { AgenciasComponent } from "./vista/administrador/agencias/agencias.component";
import { CategoriasComponent } from "./vista/administrador/categorias/categorias.component";
import { BarraLateralComponent } from "./vista/administrador/componentes/barra-lateral/barra-lateral.component";
import { BarraSuperiorComponent } from "./vista/administrador/componentes/barra-superior/barra-superior.component";
import { ErroresComponent } from "./vista/administrador/errores/errores.component";
import { EstadosComponent } from "./vista/administrador/estados/estados.component";
import { GestionUsuariosComponent } from "./vista/administrador/gestion-usuarios/gestion-usuarios.component";
import { HotelesComponent } from "./vista/administrador/hoteles/hoteles.component";
import { InicioComponent } from "./vista/administrador/inicio/inicio.component";
import { ListaViajesAdministradorComponent } from "./vista/administrador/lista-viajes-administrador/lista-viajes-administrador.component";
import { ParametrosComponent } from "./vista/administrador/parametros/parametros.component";
import { RutasComponent } from "./vista/administrador/rutas/rutas.component";
import { TiposDocumentosComponent } from "./vista/administrador/tipos-documentos/tipos-documentos.component";
import { DetalleReservacionAprobadorComponent } from "./vista/aprobador/detalle-reservacion/detalle-reservacion.component";
import { ListaReservacionAprobadorCompoenente } from "./vista/aprobador/lista-reservacion/lista-reservacion.component";
import { ErrorComponent } from "./vista/error/error.component";
import { RutasComponentVista } from "./vista/rutas/rutas.component";
import { DetalleReservacionComponent } from "./vista/cliente/detalle-reservacion/detalle-reservacion.component";
import { ReporteComponent } from "./vista/cliente/reporte/reporte.component";
import { ListaReservacionComponent } from "./vista/cliente/lista-reservacion/lista-reservacion.component";
import { ReasignacionTareasComponent } from "./vista/cliente/reasignacion-tarea/reasignacion-tareas.component";
import { TareasComponent } from "./vista/cliente/tareas/tareas.component";
import { VistaTareaComponent } from "./vista/cliente/vista-tarea/vista-tarea.component";
import { SolucionComponent } from "./vista/cliente/solucion/solucion.component";
import { AprobadorComponent } from "./vista/cliente/reservacion/aprobador/aprobador.component";
import { ViajeComponent } from "./vista/cliente/reservacion/viaje/viaje.component";
import { TransporteComponent } from "./vista/cliente/reservacion/transporte/transporte.component";
import { RegistradorComponent } from "./vista/cliente/reservacion/registrador/registrador.component";
import { GastoViajeComponent } from "./vista/cliente/reservacion/gastos-viaje/gasto-viaje.component";
import { AlojamientoComponent } from "./vista/cliente/reservacion/alojamiento/alojamiento.component";
import { IndiceComponent } from "./vista/cliente/reservacion/indice/indice.component";
import { TodaCabeceraComponent } from './vista/componente/cabecera/cabecera.component';
import { CabeceraContadorComponent } from './vista/componente/cabecera-contador/cabecera-contador.component';
import { CabeceraClienteComponent } from "./vista/componente/cabecera-cliente/cabecera-cliente.component";
import { CabeceraPreAprobadorComponent } from './vista/componente/cabecera-pre-aprobador/cabecera-pre-aprobador.component';
import { ListaReservacionGlobalComponent } from './vista/componente/lista-reservacion/lista-reservacion.component';
import { MenuComponent } from './vista/componente/menu/menu.component';
import { DetalleReservacionPreAprobadorComponent } from './vista/pre-aprobador/detalle-reservacion/detalle-reservacion.component';
import { ListaReservacionPreAprobadorComponent } from "./vista/pre-aprobador/lista-reservacion/lista-reservacion.component";
import { DetalleViajeComponent } from './vista/registrador-pago/detalle-viaje/detalle-viaje.component';
import { ListaViajesComponent } from './vista/registrador-pago/lista-viajes/lista-viajes.component';
import { ServicioPlantillaCorreoDatafast } from './variable/correo/plantilla-correo-datafast.service';
import { ViaticosJustificadosServicio } from "./controladores/liquidaciones/viaticosJustificados.service";
import { DescuentoRolServicio } from "./controladores/liquidaciones/descuentoRol.service";
import { ViaticosAdicionalesServicio } from "./controladores/liquidaciones/viaticosAdicionales.service";
import { NoViajoServicio } from "./controladores/liquidaciones/noViajo.service";
import { AutorizacionComponent } from './vista/componente/autorizacion/autorizacion.component';
import { SupervidorComponent } from './vista/administrador/supervidor/supervidor.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ".",
  precision: 2,
  prefix: "$ ",
  suffix: "",
  thousands: ",",
};

@NgModule({
  declarations: [
    AppComponent,
    DetalleContadorComponent,
    ListaContadorComponent,
    RegistroContadorComponent,
    AgenciasComponent,
    CategoriasComponent,
    BarraLateralComponent,
    BarraSuperiorComponent,
    ErroresComponent,
    EstadosComponent,
    GestionUsuariosComponent,
    HotelesComponent,
    InicioComponent,
    ListaViajesAdministradorComponent,
    ParametrosComponent,
    RutasComponent,
    TiposDocumentosComponent,
    DetalleReservacionAprobadorComponent,
    ListaReservacionAprobadorCompoenente,
    ErrorComponent,
    RutasComponentVista,
    DetalleReservacionComponent,
    ReporteComponent,
    ListaReservacionComponent,
    ReasignacionTareasComponent,
    TareasComponent,
    VistaTareaComponent,
    SolucionComponent,
    AprobadorComponent,
    ViajeComponent,
    TransporteComponent,
    RegistradorComponent,
    GastoViajeComponent,
    AlojamientoComponent,
    IndiceComponent,
    TodaCabeceraComponent,
    CabeceraContadorComponent,
    CabeceraClienteComponent,
    CabeceraPreAprobadorComponent,
    ListaReservacionGlobalComponent,
    MenuComponent,
    DetalleReservacionPreAprobadorComponent,
    ListaReservacionPreAprobadorComponent,
    DetalleViajeComponent,
    ListaViajesComponent,
    AutorizacionComponent,
    SupervidorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DropDownsModule,
    CurrencyMaskModule,
    InputsModule,
    DateInputsModule,
    PDFModule,
    GridModule,
    ExcelModule,
    IntlModule,
    CalendarModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: ":data", component: RutasComponentVista, pathMatch: "full" },
      { path: "contador/reservacion/detalle/:id", component: DetalleContadorComponent, },
      { path: "contador/reservacion/lista", component: ListaContadorComponent, },
      { path: "contador/registro/:id", component: RegistroContadorComponent },
      { path: "administrador/agencias", component: AgenciasComponent },
      { path: "administrador/categorias", component: CategoriasComponent },
      { path: "administrador/errores", component: ErroresComponent },
      { path: "administrador/estados", component: EstadosComponent },
      { path: "administrador/usuarios", component: GestionUsuariosComponent },
      { path: "administrador/hoteles", component: HotelesComponent },
      { path: "administrador/inicio", component: InicioComponent },
      { path: "administrador/lista/viajes", component: ListaViajesAdministradorComponent, },
      { path: "administrador/parametros", component: ParametrosComponent },
      { path: "administrador/rutas", component: RutasComponent },
      { path: "administrador/tipo/documentos", component: TiposDocumentosComponent, },
      { path: "aprobador/reservacion/detalle/:id", component: DetalleReservacionAprobadorComponent, },
      { path: "aprobador/reservacion/lista", component: ListaReservacionAprobadorCompoenente, },
      { path: "fuera/linea", component: ErrorComponent },
      { path: "cliente/reservacion/detalle/:id", component: DetalleReservacionComponent, },
      { path: "reporte/lista", component: ReporteComponent },
      { path: "cliente/reservacion/lista", component: ListaReservacionComponent, },
      { path: "cliente/reservacion/outoffice", component: ReasignacionTareasComponent, },
      { path: "cliente/reservacion/reasignacion-tareas", component: TareasComponent, },
      { path: "cliente/reservacion/ver-tarea/:id", component: VistaTareaComponent, },
      { path: "cliente/reservacion/solucion/:id", component: SolucionComponent, },
      { path: "cliente/reservacion", component: IndiceComponent },
      { path: "cliente/reservacion/editar/:id", component: IndiceComponent },
      { path: "preaprobador/reservacion/detalle/:id", component: DetalleReservacionPreAprobadorComponent, },
      { path: "preaprobador/reservacion/lista", component: ListaReservacionAprobadorCompoenente, },
      { path: "registrador/pago/viajes/detalle/:id", component: DetalleViajeComponent, },
      { path: "registrador/pago/viajes/lista", component: ListaViajesComponent, },
      { path: "ingreso/autorizacion", component: AutorizacionComponent, },
      { path: "administrador/gestion/supervisores", component: SupervidorComponent },
    ],
    { useHash: true }
    ),
  ],
  providers: [
    ServicioUsuario,
    ServicioApi,
    ServicioSesionExterna,
    ServicioDinamico,
    ServicioGlobales,
    ServicioValidaciones,
    ValidacionesAdministracionService,
    ServicioDataExternos,
    ServicioDataInternos,
    ViaticosJustificadosServicio,
    DescuentoRolServicio,
    ViaticosAdicionalesServicio,
    NoViajoServicio,
    ServicioPlantillaCorreoDatafast,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
