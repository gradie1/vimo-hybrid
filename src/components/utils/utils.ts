import { Component } from '@angular/core';

/**
 * Generated class for the UtilsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'utils',
  templateUrl: 'utils.html'
})
export class UtilsComponent {

  text: string;

  constructor() {
    console.log('Hello UtilsComponent Component');
    this.text = 'Hello World';
  }

}
