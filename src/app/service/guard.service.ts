/*
  CanActivate es una guardia de rutas para restringit el acceso a ciertas rutas de la aplicacion
  como paginas que requieren autenticacion

  Evalua si el usuario esta autenticado
  si la condicion es true, permite el acceso a la ruta
  si es false, redirige a otra pagina

  Similar al Auth de laravel con el guard


 */

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  //inyeccion de dependencias
  constructor(private apiService: ApiService, private router: Router) {}

  // tiene 2 parametros
  //ActivatedRouteSnapshot = contiene informacion de la ruta actual, incluye parametros y datos
  //RouterStateSnapshot = contiene informacion del estado de la aplicacion y la URL de la ruta solicitada
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiresAdmin = route.data['requiresAdmin'] || false; // en la ruta debe estar definido este parametro data: {requiresAdmin: true}

    if (requiresAdmin) {
      if (this.apiService.isAdmin()) {
        return true;
      } else {
        //redirigmos a otra ruta
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    } else {
      if (this.apiService.isAuthenticated()) {
        return true;
      } else {
        //redirigmos a otra ruta
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }
  }
}
