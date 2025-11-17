import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService, Venta } from '../../../Servicios/Productos/productos.service';
import { TableComponent } from "../../Compartido/Tabla/table/table.component";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  imports: [TableComponent, CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{

  Ventas: Venta[] = [];
  displayedColumns: string[] = [
    'id',
    'producto.nombre',
    'cliente.nombre',
    'cantidad',
    'fecha'
  ];

  columnHeaders = {
    id: 'ID',
    'producto.nombre': 'Producto',
    'cliente.nombre': 'Cliente',
    cantidad: 'Cantidad',
    fecha: 'Fecha'
  };

  constructor(private productosService: ProductosService) {}
  
  ngOnInit(): void {
    this.BuscarVentas();
  }

  BuscarVentas(): void {
    this.productosService.Buscar().subscribe({
      next: (data) => {
        this.Ventas = data;
        console.log('Ventas:', this.Ventas);
        if (this.Ventas.length === 0) {
          Swal.fire({
            title: 'Sin ventas',
            text: 'No hay ventas registradas.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0891b2'
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener ventas', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar las ventas.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#6b7280'
        });
      }
    });
  }

  editarVenta(venta: Venta): void {
    console.log('Editando venta:', venta);
    Swal.fire({
      title: '¡Editado!',
      text: `Venta #${venta.id} actualizada correctamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0891b2'
    });
  }

  verVenta(venta: Venta): void {
    console.log('Viendo detalles de la venta:', venta);
  }

  getTotalVentas(): number {
    return this.Ventas.reduce((total, venta) => {
      const precioProducto = venta.producto?.precio || 0;
      return total + (precioProducto * venta.cantidad);
    }, 0);
  }

  getVentasHoy(): number {
    const hoy = new Date().toISOString().split('T')[0];
    return this.Ventas.filter(venta => venta.fecha.startsWith(hoy)).length;
  }

  getPromedioVenta(): number {
    if (this.Ventas.length === 0) return 0;
    return this.getTotalVentas() / this.Ventas.length;
  }
}
