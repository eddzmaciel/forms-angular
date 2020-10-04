import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

export function ThingFormGroup(formBuilder: FormBuilder) {
  return formBuilder.group({
    skill: [],
    exp: []
  });
}

@Component({
  selector: 'app-date-validators',
  templateUrl: './date-validators.component.html',
  styleUrls: ['./date-validators.component.css']
})
export class DateValidatorsComponent implements OnInit {
  title = 'FormArray Example in Angular Reactive forms';
  skillsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.skillsForm = this.formBuilder.group({
      name: '',
      skills: this.formBuilder.array([]),
    });

  }
  get skills(): FormArray {
    return this.skillsForm.get("skills") as FormArray
  }
  ngOnInit() {
    const defaultSkills = [
      {
        skill: 'play futbol',
        exp: '2 years'
      },
      {
        skill: 'play basket',
        exp: '1 years'
      },
      {
        skill: 'play baseball',
        exp: '3 years'
      }
    ];

    for (const item of defaultSkills) {
      this.skills.push(this.formBuilder.group(item));
    }
    console.log('this.skills: ', this.skills.value);
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  newSkill(): FormGroup {
    return this.formBuilder.group(
      {
        skill: '',
        exp: '',
      }
    );
  }

  addSkills() {
    this.skills.push(this.newSkill());
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
    console.log(this.skillsForm.value);
  }


}
