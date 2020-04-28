import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[componentLoading]'
})
export class ComponentLoadingDirective {

  constructor(public viewContainer : ViewContainerRef) { }

}
