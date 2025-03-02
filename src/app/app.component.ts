/*
ChangeDetectorRef
  es una clase de angular que controla la deteccion de cambios en los componentes
  se usa para forzar,detener o detectar manualmente cambios en la UI

  casi no es indispensable usar esa clase
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet , RouterLink , CommonModule , ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-front';
  constructor(private apiService: ApiService,
     private router: Router,
    private cdr: ChangeDetectorRef){

  }

  isAuth(){
    return this.apiService.isAuthenticated();
  }
  isAdmin(){
    return this.apiService.isAdmin();
  }
  logout(){
    this.apiService.logout();
    this.router.navigate(["/login"]);
    this.cdr.detectChanges();
  }
}
