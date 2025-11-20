import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BarchartComponent } from "../../Compartido/barchart/barchart/barchart.component";
import { ProductosService } from '../../../Servicios/Productos/productos.service';
import { PiechartComponent } from "../../Compartido/piechart/piechart/piechart.component";
import { LinechartComponent } from "../../Compartido/linechart/linechart/linechart.component";
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-dash-board',
  providers: [provideNativeDateAdapter()],
  imports: [
    BarchartComponent, 
    PiechartComponent, 
    LinechartComponent, 
    FormsModule, 
    MatSidenavModule,  
    MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{

FechaDesde: Date | null = null;
FechaHasta: Date | null = null;
  constructor(private productosService: ProductosService) {}
  labels: string[] = [];
  values: number[] = [];
  lineLabels: string[] = [];
  lineDatasets: { label: string, data: number[], color: string }[] = [];


  ngOnInit(): void {
    this.traerProductosMasVendidos();
    this.traerventasporfecha();
  }

traerProductosMasVendidos(): void {
  this.productosService.getProductosMasVendidos().subscribe(data => {
        this.labels = data.map(x => x.nombre);
        this.values = data.map(x => x.total);
      });
}

traerventasporfecha(dateDesde?:string, dateHasta?:string):void{
  this.productosService.BuscarPorFecha(dateDesde, dateHasta).subscribe(data => {

    this.lineLabels = data.map(x => x.fecha);

    this.lineDatasets = [
      {
        label: "Ventas totales",
        data: data.map(x => x.cantidad),
        color: '#2afabc'
      }
    ];
  });
}



private formato(fecha: Date | null): string | undefined {
  if (!fecha) return undefined;
  return fecha.toISOString().substring(0, 10);
}

AplicarFiltro(): void {
  const desde = this.formato(this.FechaDesde);
  const hasta = this.formato(this.FechaHasta);

  this.traerventasporfecha(desde, hasta);
}

}
