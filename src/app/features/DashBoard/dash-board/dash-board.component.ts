import { Component, OnInit } from '@angular/core';
import { BarchartComponent } from "../../Compartido/barchart/barchart/barchart.component";
import { ProductosService } from '../../../Servicios/Productos/productos.service';
import { PiechartComponent } from "../../Compartido/piechart/piechart/piechart.component";
import { LinechartComponent } from "../../Compartido/linechart/linechart/linechart.component";

@Component({
  selector: 'app-dash-board',
  imports: [BarchartComponent, PiechartComponent, LinechartComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{
  constructor(private productosService: ProductosService) {}
  labels: string[] = [];
  values: number[] = [];

  ngOnInit(): void {
    this.traerProductosMasVendidos();
  }

traerProductosMasVendidos(): void {
  /*this.productosService.getProductosMasVendidos().subscribe(data => {
        this.labels = data.map(x => x.nombre);
        this.values = data.map(x => x.total);
      });*/
      this.labels=["Coca-cola","Pepsi","Manaos"]
      this.values=[30,20,5]
}
}
