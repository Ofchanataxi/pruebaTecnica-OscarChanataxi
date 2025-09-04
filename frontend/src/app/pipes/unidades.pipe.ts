import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidades',
  standalone: true
})
export class UnidadesPipe implements PipeTransform {
  transform(value: number, unidad: 'barriles' | 'galones' | 'litros'): number {
    switch(unidad) {
      case 'galones': return value * 42; // 1 barril ≈ 42 galones
      case 'litros': return value * 158.987;
      default: return value;
    }
  }
}
