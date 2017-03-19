import { Component } from '@angular/core';
import { User } from './models'

@Component({
  selector: 'my-templater-driven-forms',
  templateUrl: `src/template-driven-forms/template-driven-forms.component.html`
})
export class TemplateDrivenFormsComponent {

  public user: User;

  countries: string[] = [
    'Russian',
    'Argentina',
    'Australia',
    'USA'
  ];

  ngOnInit() {
    this.user = {
      name: '',
      address: {
        street: '',
        zipCode: 230445,
        country: ''
      }
    };
  }

  save(model: User, isValid: boolean) {
    console.log(model, isValid);
  }
}
