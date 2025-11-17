import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, DialogModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() dataSource: object[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  
  selectedRow: any;
  editingRow: any;
  dialogVisible: boolean = false;
  editDialogVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {}
  
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  }
  
  verDetalle(row: any) {
    console.log("Ver detalle:", row);
    this.selectedRow = row;
    this.dialogVisible = true;
    this.onView.emit(row);
  }

  editarItem(row: any) {
    console.log("Editar item:", row);
    this.editingRow = { ...row }; 
    this.editDialogVisible = true;
  }

  editarDesdeDialog() {
    this.dialogVisible = false;
    this.editarItem(this.selectedRow);
  }

  cerrarDialog() {
    this.dialogVisible = false;
    this.selectedRow = null;
  }

  cancelarEdicion() {
    this.editDialogVisible = false;
    this.editingRow = null;
  }

  guardarCambios() {
    if (this.editingRow) {
      this.onEdit.emit(this.editingRow);
      
      Swal.fire({
        title: '¡Éxito!',
        text: 'Los cambios han sido guardados.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0891b2'
      });
      
      this.editDialogVisible = false;
      this.editingRow = null;
    }
  }
}
