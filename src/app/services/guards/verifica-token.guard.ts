import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioDervice: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('Inicio de verifica token guard');

    let token = this._usuarioDervice.token;
    let payload = JSON.parse( atob(token.split('.')[1]) );
    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva ( fechaExp: number): Promise<boolean> {
    
    return new Promise( (resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioDervice.renuevaToken()
              .subscribe( () => {
                resolve(true);
              }, () => {
                this.router.navigate(['/login']);
                reject(false);
              });
      }

    });
  }

  expirado( fechaExp: number ) {
    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }


}
