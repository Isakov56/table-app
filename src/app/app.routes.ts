import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    { path: 'table', component: TableComponent },
    { path: 'form', component: FormComponent },
    { path: 'form/:id', component: FormComponent },
    { path: '', redirectTo: '/table', pathMatch: 'full' }, // Default route
];