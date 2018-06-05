import { Directive } from '@angular/core';

/**
 * Generated class for the MenuDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[menu]' // Attribute selector
})
export class MenuDirective {

  constructor() {
    console.log('Hello MenuDirective Directive');
  }

}
