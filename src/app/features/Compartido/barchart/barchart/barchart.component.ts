import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [],
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnChanges {

  @Input() data!: number[];
  @Input() variables!: string[];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) this.chart.destroy();
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: this.variables,
        datasets: [
          {
            label: 'Cantidad',
            backgroundColor: ['rgba(250, 42, 136, 0.2)',
              'rgba(125, 42, 250, 0.2)',
              'rgba(42, 226, 250, 0.2)',
              'rgba(42, 250, 80, 0.2)',
              'rgba(243, 250, 42, 0.2)',
            ],
            borderWidth: 2,
            borderColor: [
              'rgba(250, 42, 136)',
              'rgba(125, 42, 250)',
              'rgba(42, 226, 250)',
              'rgba(42, 250, 80)',
              'rgba(243, 250, 42)',
            ],
            data: this.data
          }
        ]
      },
      options: { responsive: true }
    });
  }
}
