import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
//import { Observable, Subscription } from 'rxjs/Rx'; // esto es para no traer todo de la importación de Rx

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription; // para manejar las subscripciones a los observables

  constructor() { 

    this.subscription = this.regresaObservable()
      .subscribe( 
        numero => console.log('Subscribe', numero),
        error => console.error('Error en el obs (dos veces)', error),
        () => console.log('El observador terminó!')
      );
  }

  ngOnInit() {
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any> {

    return new Observable(observer => {

      let contador = 0;
      let intervalo = setInterval(() => {

        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   observer.error('Auxilio...!!!');
        // }

      }, 500);

    }).retry(2)
      .map((resp: any) => {
        return resp.valor;
      })
      .filter( (valor, index) => {

        if ((valor % 2) === 1) {
          return true;

        } else {

          return false;
        }
      
      });

  }

}
