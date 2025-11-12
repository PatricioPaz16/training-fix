import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-carrusel',
  imports: [CarouselModule, ButtonModule, TagModule, CardModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit{

  @Input() Datos :Object[]=[];
  ngOnInit(): void {
    
  }
}
