import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService, Venta } from '../../../Servicios/Productos/productos.service';
import { TableComponent } from "../../Compartido/Tabla/table/table.component";
@Component({
  selector: 'app-ventas',
  imports: [TableComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{

  Ventas: Venta[] = []
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
      this.Ventas = data; // ← directo, sin map
      console.log('Ventas:', this.Ventas);
    }
  });
}

}
