import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  //se tiene que definir el tipo de dato de terorno
  //como argumento recivimos el control
  //el tipo de salida es un objeto donde tengo una propiedad string 
  //y esa propiedad tiene un retorno de un boolean
  //por eso se define asi { [s: string]: boolean }
  noMaciel(control: FormControl): { [s: string]: boolean } {
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

//control.value ? control.value.toLowerCase() === 'maciel' : 'maciel'