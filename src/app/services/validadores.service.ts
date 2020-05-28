import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  constructor() { }
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    // en caso de que no haya ningun valor, retornamos una promesa resuelta con un null,
    // por que quiero evitar que se ejecute esta validacion si el control no tiene nada para comparar
    if (!control.value) {
      return Promise.resolve(null);
    }
    //es para hacer la validacion de si existe el uusario o no
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'eddzmaciel') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  //se tiene que definir el tipo de dato de terorno
  //como argumento recivimos el control
  //el tipo de salida es un objeto donde tengo una propiedad string 
  //y esa propiedad tiene un retorno de un boolean
  //por eso se define asi { [s: string]: boolean }
  noMaciel(control: FormControl): ErrorValidate {
    if (control.value ? control.value.toLowerCase() === 'maciel' : 'maciel') {
      return {
        noMaciel: true
      }
    }
    return null;
  }

  //aqui vamos a pasarles los nombres de los campos que vamos a comparar
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          noEsIgual: true
        });
      }
    }
  }

}
