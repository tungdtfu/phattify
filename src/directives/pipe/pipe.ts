import { Directive } from '@angular/core';

/**
 * Generated class for the PipeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[pipe]' // Attribute selector
})
export class PipeDirective {

  constructor() {
    console.log('Hello PipeDirective Directive');
  }

}
