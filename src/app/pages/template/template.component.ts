import { PaisService } from './../../services/pais.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Edson ',
    apellido: 'Maciel',
    correo: 'edson.maciel@gmail.com',
    pais: 'MEX',
    genero: 'M'
  }

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe(resp => {
      console.log(resp);
      this.paises = resp;
      this.paises.unshift({
        nombre: ' -- Seleccione País --',
        codigo: '',
      });
      console.log(this.paises);
    });
  }

  guardar(forma: NgForm) {
    console.log('submit disparado: ', forma);
    console.log(forma.value);
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  }

  restaurarForm(forma: NgForm) {
    //hacemos la referencia al formulario del template para resetear sus valores
    //podemos pasarle nuevos valores o limpiar todo el objeto desde cero
    const newUsuario = {
      nombre: 'Tayde ',
      apellido: 'Rumbo',
      correo: 'tayde.rumbo@gmail.com',
      pais: 'MEX',
      genero: 'M'
    }
    //forma.reset(newUsuario);
    forma.reset();
  }

}
