import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, DialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() dataSource: object[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  selectedRow: any;
  dialogVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {}
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  }
  verDetalle(row: any) {
  console.log("CLICK:", row);   // ← probá si esto aparece
  this.selectedRow = row;
  this.dialogVisible = true;
}

}
