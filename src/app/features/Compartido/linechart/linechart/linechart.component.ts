import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnChanges {

  @Input() labels: string[] = [];
  @Input() data: { label: string, data: number[], color: string }[] = [];

  @ViewChild('chart1', { static: true }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.labels || !this.data || this.labels.length === 0 || this.data.length === 0) {
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy(); // destruir gráfico previo
    }

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.data.map(d => ({
          label: d.label,
          data: d.data,
          borderColor: d.color,
          backgroundColor: d.color + "33",
          fill: true,
          tension: 0.3
        }))
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Ventas por producto"
          }
        }
      }
    });
  }
}
