import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appEstadoPozo]',
  standalone: true
})
export class EstadoPozoDirective implements OnChanges {
  @Input() appEstadoPozo: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor =
      this.appEstadoPozo === 'activo' ? 'lightgreen' : 'lightcoral';
  }
}
