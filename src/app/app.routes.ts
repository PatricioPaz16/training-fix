import { Routes } from '@angular/router';
import { ProductosMainComponent } from './features/productos/pages/productosMain/productos-main/productos-main.component';
import { ListaClientesComponent } from './features/clientes/pages/ListaClientes/lista-clientes/lista-clientes.component';

export const routes: Routes = [
  {
    path: 'productos',
    component: ProductosMainComponent
  },
  {
    path: 'clientes',
    component: ListaClientesComponent
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  }
];
