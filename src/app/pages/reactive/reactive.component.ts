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
    // llamamos esta function para suscribirnos a un observable
    // que va a estar escuchando los cambios en los valores, estado del formulario o controles especificos (camposs)
    this.crearListeners();
  }

  ngOnInit() {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get clientes() {
    return this.forma.get('clientes') as FormArray;
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

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
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
      //[--valorPorDefault--,--validadoresSync--,--validadorAsync--]s
      /* 
        en el orden de ejecucion primero se ejecutan las validaciones syncronas 
        y al final se ejecutan las asyncronas
      */
      //como hacer las validaciones
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      //aqui ponemos nuestro validador personalizado que creamos,
      //pero no se ejecuta solo colocamos la referencia de la funcion
      apellido: ['', [Validators.required, this.validadores.noMaciel]],
      //aqui colocamos un validador por patron
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      //aqui estamos agregando una validacion asyncrona, 
      //siempre debe ser el 3er elemento que se coloca en la configuracion
      usuario: ['', [], this.validadores.existeUsuario],
      pass1: [Validators.required, Validators.minLength(5)],
      pass2: [Validators.required],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([]),
      clientes: this.formBuilder.array([this.createClient()])
    },
      //aqui vamos a poner los validadores syncronos o asyncronos a nivel formulario,
      {
        //llamamos al validador  y les pasamos los nombres de los campos a validar
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')]
      });
  }

  //crear un objeto dinamico en un formBuilderArray
  createClient(): FormGroup {
    return this.formBuilder.group({
      nombre: '',
      telefono: '',
    });
  }

  //asi es como agregamos un nuevo cliente aqui
  agregarClientes() {
    this.clientes.push(this.createClient());
  }

  borrarCliente(i: number) {
    this.pasatiempos.removeAt(i);
  }


  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  crearListeners() {
    //se va a ejecutar este observable cada que haya un cambio de valor en el formulario
    // this.forma.valueChanges.subscribe((valores) => {
    //   console.log({ valores })
    // });

    //se va a ejecutar a este observable cada que haya un cambio en el estatus del formulario
    // this.forma.statusChanges.subscribe((status) => {
    //   console.log({ status });
    // });

    //este observable es cuando  un valor  (control ) espefico del formulario changes
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarDataAlFormulario() {
    //si usas reset, puedes poner solo algunas propiedades del objeto
    this.forma.reset({
      nombre: "Edson",
      apellido: "Maciel2",
      correo: "edson.maciel@gmail.com",
      pass1: '12345',
      pass2: '12345',
      direccion: {
        distrito: "Buenos Aires",
        ciudad: "Lázaro Cárdenas"
      },
    })
    const defaultPasatiempos = [
      { titulo: 'Jugar Futbol', descripcion: 'Ir a jugar futbol con mis amigos' },
      { titulo: 'Hacer Ejercicio', descripcion: 'Ir a hacer ejercicio al gimnasio' }
    ];

    //una forma de ***cargar los valores de default al array, pero hay que ver que mas formas hay de hacerlo
    ['pasatiempo 1', 'pasatiempo 2'].forEach((valor) => this.pasatiempos.push(this.formBuilder.control(valor)));
    //['pasatiempo1','pasatiepo 2'].forEach((objeto) => this.pasatiempos.push(this.formBuilder.control(objeto)));

    // for (let i = 0; i < defaultPasatiempos.length; i++) {
    //   console.log('defaultPasatiempos[i] ', defaultPasatiempos[i]);
    //   this.pasatiempos.push(this.formBuilder.control(defaultPasatiempos[i]))
    // }
    //this.pasatiempos.removeAt(0);

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
    //esta parte nos ayuda para modificar el estatus del input y cambiarlo a Touched
    // y asi poder mostrar los mensajes de error que tenemos en la condicion
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
      console.info('el formulario es invalido, por que no has cumplido con las condiciones de llenado!');
    }
    //posteo de la informacion
    else {
      this.forma.reset({ nombre: 'reseteado' });
    }

  }

}
