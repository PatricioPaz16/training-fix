import { Component, OnInit } from '@angular/core';
import {
  ProductosService,
  Producto,
} from '../../../../../Servicios/Productos/productos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CarruselComponent } from "../../../../Compartido/Carrusel/carrusel/carrusel.component";
import { TableComponent } from "../../../../Compartido/Tabla/table/table.component";

@Component({
  selector: 'app-productos-main',
  imports: [MatSidenavModule, MatIconModule, CarruselComponent, TableComponent, CommonModule],
  templateUrl: './productos-main.component.html',
  styleUrl: './productos-main.component.css',
})
export class ProductosMainComponent implements OnInit {
  productos: Producto[] = [];
  displayedColumns = ['id', 'nombre', 'precio', 'stock'];
  columnHeaders = {
    id: 'ID',
    nombre: 'Nombre del Producto',
    precio: 'Precio',
    stock: 'Stock Disponible'
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;

        if (this.productos.length === 0) {
          Swal.fire({
            title: 'Sin productos',
            text: 'No hay productos disponibles.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0891b2'
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los productos.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#6b7280'
        });
      },
    });
  }

  editarProducto(producto: Producto): void {
    console.log('Editando producto:', producto);
    Swal.fire({
      title: '¡Editado!',
      text: `Producto ${producto.nombre} actualizado correctamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0891b2'
    });
  }

  verProducto(producto: Producto): void {
    console.log('Viendo detalles del producto:', producto);
  }

  getPromedioPrecios(): number {
    if (this.productos.length === 0) return 0;
    const total = this.productos.reduce((sum, p) => sum + p.precio, 0);
    return total / this.productos.length;
  }

  getProductosBajoStock(): number {
    return this.productos.filter(p => p.stock < 10).length;
  }
}
