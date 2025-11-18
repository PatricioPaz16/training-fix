import { Component, OnInit } from '@angular/core';
import {
  ProductosService,
  Producto,
} from '../../../../../Servicios/Productos/productos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import Swal from 'sweetalert2';
import { CarruselComponent } from "../../../../Compartido/Carrusel/carrusel/carrusel.component";
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-productos-main',
  imports: [MatSidenavModule, MatIconModule, CarruselComponent, ButtonModule, MatDialogModule],
  templateUrl: './productos-main.component.html',
  styleUrl: './productos-main.component.css',
})
export class ProductosMainComponent implements OnInit {
  productos: Producto[] = [];
  modal : boolean= false;
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargardg();
  }
agregarProducto(){
  const productoEjemplo: Producto = {
  id: 101,
  nombre: "Auriculares Bluetooth Sony WH-CH510",
  categoriaId: 5,
  precio: 23999,
  stock: 12
};
  this.productosService.RegistrarProducto(productoEjemplo)
  console.log(productoEjemplo);
  this.productos.concat(productoEjemplo);
}

cargardg(){
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
}
}
