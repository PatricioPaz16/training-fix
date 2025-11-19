import { 
  Component, 
  Input, 
  AfterViewInit, 
  ViewChild, 
  ElementRef, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements AfterViewInit, OnChanges {

  @Input() data!: string[];
  @Input() amount!: number[];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  ngAfterViewInit(): void {
    this.tryRender();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tryRender();
  }

  private tryRender(): void {
    if (!this.chartCanvas) return;
    if (!this.data || !this.amount) return;
    if (this.data.length === 0 || this.amount.length === 0) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.data.labels = this.data;
      this.chart.data.datasets[0].data = this.amount;
      this.chart.update();
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.data,
        datasets: [
          {
            label: "Cantidad",
            backgroundColor: [
              "#FF7D59", "#9980ED", "#3cba9f", 
              "#e8c3b9", "#c45850", "#6EE7B7"
            ],
            data: this.amount
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}
