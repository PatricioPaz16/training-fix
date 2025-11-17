import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../Compartido/Tabla/table/table.component";
import { Cliente, ClientesService } from '../../../../../Servicios/Clientes/clientes.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule, TableComponent],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent implements OnInit{
  clientes: Cliente[] = [];
  displayedColumns = ['id', 'nombre'];
  columnHeaders = {
    id: 'ID',
    nombre: 'Nombre del Cliente'
  };

  constructor(private clientesService: ClientesService){}

  ngOnInit(): void{
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        if (this.clientes.length === 0) {
          Swal.fire({
            title: 'Sin clientes',
            text: 'No hay clientes registrados.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0891b2'
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener clientes', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los clientes.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#6b7280'
        });
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    console.log('Editando cliente:', cliente);
    Swal.fire({
      title: '¡Editado!',
      text: `Cliente ${cliente.nombre} actualizado correctamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0891b2'
    });
  }

  verCliente(cliente: Cliente): void {
    console.log('Viendo detalles del cliente:', cliente);
  }
}
