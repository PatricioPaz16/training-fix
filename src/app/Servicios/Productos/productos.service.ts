import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  Buscar(ventaId: number = 1): Observable<Venta>
  {
    return this.http.get<Venta>(`http://localhost:3000/ventas/${ventaId}?_expand=producto&_expand=cliente`);
  }
}
