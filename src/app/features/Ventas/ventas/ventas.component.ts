import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService, Venta } from '../../../Servicios/Productos/productos.service';
@Component({
  selector: 'app-ventas',
  imports: [],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{

  Ventas: Venta[] = []
  constructor(private productosService: ProductosService) {}
  ngOnInit(): void {
    this.BuscarVentas();
  }
  BuscarVentas(): void {
    this.productosService.Buscar().subscribe({
      next: (data) => {
        this.Ventas = data;
        console.log(data);
      },
    });
  }

}
