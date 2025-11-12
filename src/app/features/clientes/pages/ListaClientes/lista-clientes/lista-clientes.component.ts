import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../Compartido/Tabla/table/table.component";
import { Cliente, ClientesService } from '../../../../../Servicios/Clientes/clientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule, TableComponent],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent implements OnInit{
  clientes:Cliente[] = [];
  displayedColumns = ['id', 'nombre'];
  columnHeaders = {
  id: 'ID',
  nombre: 'Nombre del Cliente'
};

  constructor(private clientesService: ClientesService){}

  ngOnInit(): void{
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data;
    })
  }
}
