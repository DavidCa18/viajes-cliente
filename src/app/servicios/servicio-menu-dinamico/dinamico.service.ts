import { BehaviorSubject, Observable } from "rxjs";

const row = {
  id: "",
};

export class ServicioDinamico {
  private readonly menuConfiguracion = new BehaviorSubject<Identificador>(row);
  menuConfig$: Observable<any>;
  constructor() {
    this.menuConfig$ = this.menuConfiguracion.asObservable();
  }
  public setMenu(menuConfig: any) {
    this.menuConfiguracion.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfiguracion.value;
  }
}
interface Identificador {
  id: string;
}
