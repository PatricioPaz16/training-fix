import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent{

  @ViewChild('chart1', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  ngAfterViewInit(): void {
    const ctx = this.chartRef.nativeElement.getContext('2d');

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: [1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2018],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
          },
          {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: "North America",
            borderColor: "#c45850",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "World exports of mangoes"
          }
        }
      }
    });
  }
}
