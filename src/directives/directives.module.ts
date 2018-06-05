import { NgModule } from '@angular/core';
import { MenuDirective } from './menu/menu';
import { PipeDirective } from './pipe/pipe';
@NgModule({
	declarations: [MenuDirective,
    PipeDirective],
	imports: [],
	exports: [MenuDirective,
    PipeDirective]
})
export class DirectivesModule {}
