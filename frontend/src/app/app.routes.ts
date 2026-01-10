import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },

  { path: 'suppliers', component: SuppliersComponent },

  { path: 'suppliers/:id', component: SupplierDetailsComponent },
];
