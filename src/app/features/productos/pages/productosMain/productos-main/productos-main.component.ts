import { Component, OnInit } from '@angular/core';
import {
  ProductosService,
  Producto,
} from '../../../../../Servicios/Productos/productos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-main',
  imports: [MatSidenavModule, MatIconModule],
  templateUrl: './productos-main.component.html',
  styleUrl: './productos-main.component.css',
})
export class ProductosMainComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;

        if (this.productos.length === 0) {
          Swal.fire({
            title: 'Sin productos',
            text: 'No hay productos disponibles.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
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
        });
      },
    });

    this.BuscarVentas();
  }

  BuscarVentas(): void {
    this.productosService.Buscar(1).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
