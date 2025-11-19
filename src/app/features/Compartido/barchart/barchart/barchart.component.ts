import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef, 
  Input, 
  input
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [],
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements AfterViewInit {

  @Input() data!: number[];
  @Input() variables!:string[];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: this.variables,
        datasets: [
          {
            label: "cantidad",
            backgroundColor: ["lightblue", "lightgreen", "pink", "yellow"],
            data: this.data,
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          y2: {
            beginAtZero: true,
            position: 'right',
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }
}
