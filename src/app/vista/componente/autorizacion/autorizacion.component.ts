import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      window.location.href = environment.urlPrincipal;
    }, 10000);
  }

  public Redireccionar(){
    window.location.href = environment.urlPrincipal;
  }
}
