export interface Pozo {
  id?: number;
  nombre: string;
  ubicacion: string;
  produccion_diaria: number;
  estado: "activo" | "inactivo";
}