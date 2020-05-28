import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private formBuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit() {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreInvalido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoInvalido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoInvalido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get ciudadInvalida() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  // para comparar si el pass1 es igual al pass2, ponemos este getter
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  //yo propongo mejor usar este
  campoInvalido = (campo) => (this.forma.get(campo).invalid && this.forma.get(campo).touched)


  crearFormulario() {
    //esta es la definicion de un form control
    this.forma = this.formBuilder.group({
      //[--valorPorDefault--,--validadoresSync--,--validadorAsync--]
      //como hacer las validaciones
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      //aqui ponemos nuestro validador personalizado que creamos,
      //pero no se ejecuta solo colocamos la referencia de la funcion
      apellido: ['', [Validators.required, this.validadores.noMaciel]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: [Validators.required],
      pass2: [Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    },
      //aqui vamos a poner los validadores syncronos o asyncronos a nivel formulario,
      {
        //llamamos al validador  y les pasamos los nombres de los campos a validar
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')]

      });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  cargarDataAlFormulario() {
    //si usas reset, puedes poner solo algunas propiedades del objeto
    this.forma.reset({
      nombre: "Edson",
      apellido: "Maciel2",
      correo: "edson.maciel@gmail.com",
      direccion: {
        distrito: "Buenos Aires",
        ciudad: "Lázaro Cárdenas"
      },
    });

    //una forma de ***cargar los valores de default al array, pero hay que ver que mas formas hay de hacerlo
    ['pasatiempo 1', 'pasatiempo 2'].forEach((valor) => this.pasatiempos.push(this.formBuilder.control(valor)));


    //si usas setValue, tiene que contener todas las propiedades del objeto
    // this.forma.setValue({
    //   nombre: "Edson",
    //   apellido: "Maciel",
    //   correo: "edson.maciel@gmail.com",
    //   direccion: {
    //     distrito: "Buenos Aires",
    //     ciudad: "Lázaro Cárdenas"
    //   },
    //   pasatiempos: [[], [], [], [], []]
    // }
    // );


  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }
    //posteo de la informacion
    else {
      this.forma.reset({ nombre: 'reseteado' });
    }

  }

}
