import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidades',
  standalone: true
})
export class UnidadesPipe implements PipeTransform {

  transform(value: number, unidad: 'barriles' | 'galones' | 'litros' = 'barriles'): string {
    if (!value && value !== 0) return '';

    switch (unidad) {
      case 'galones':
        // 1 barril ≈ 42 galones
        return (value * 42).toLocaleString() + ' galones';
      case 'litros':
        // 1 barril ≈ 159 litros
        return (value * 159).toLocaleString() + ' litros';
      case 'barriles':
      default:
        return value.toLocaleString() + ' barriles';
    }
  }
}
