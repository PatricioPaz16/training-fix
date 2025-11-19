import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Producto{
  id?: number;
  nombre: string;
  categoriaId?: number;
  precio: number;
  stock: number;
}

export interface Cliente {
  id: number;
  nombre: string;
}

export interface Venta {
  id: number;
  productoId: number;
  clienteId: number;
  cantidad: number;
  fecha: string;
  producto: Producto;
  cliente: Cliente;
}


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiURL = 'http://localhost:3000/productos'; 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiURL);
  }

  Buscar(): Observable<Venta[]> {
  return this.http.get<Venta[]>(
    'http://localhost:3000/ventas?_expand=producto&_expand=cliente'
  );
}
  RegistrarProducto(Producto:Producto){
    return this.http.post(this.apiURL, Producto)
  }

  getProductosMasVendidos(): Observable<{ nombre: string; total: number }[]> {
  return this.Buscar().pipe(
    map((ventas: Venta[]) => {
      const contador: Record<string, number> = {};

      ventas.forEach(v => {
        const nombre = v.producto.nombre;
        contador[nombre] = (contador[nombre] || 0) + v.cantidad;
      });

      return Object.entries(contador)
        .map(([nombre, total]) => ({ nombre, total }))
        .sort((a, b) => b.total - a.total);
    })
  );
}

}
/* Buscar(): Observable<Venta[]> {
  return this.http.get<Venta[]>(
    'http://localhost:3000/ventas?_expand=producto&_expand=cliente'
  );*/

