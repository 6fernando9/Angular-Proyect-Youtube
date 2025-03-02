/*
En rutas lo que haremos sera agregar le guard
que configuramos
y los componentes que renderizaremos
a la hora de ir a esa ruta


en las rutas definimos objetos de ese tipo

entonces usamos el atributo redirectTo . colocamos la ruta

CONCEPTO redirectTo

quiere decir que si accedemos a ese path nos redirige automatico a la otra ruta

Concepto pathMach

el pathMach puede tener valores de prefix o full

si es prefix, quiere decir que a ese path

digamos /
localhost:5050/ -> funciona
localhost:5050/algo -> funciona

ambas me redirigen a lo que tenga redirectTo

en cambio si es full
localhost:5050/ -> funciona
localhost:5050/algo -> no funciona

en full, la ruta debe ser exacta

 */

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { GuardService } from './service/guard.service';
import { SupplierComponent } from './supplier/supplier.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SellComponent } from './sell/sell.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },

  {
    path: 'supplier',
    component: SupplierComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },
  {
    path: 'edit-supplier/:supplierId',
    component: AddEditProductComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },
  {
    path: 'add-supplier',
    component: AddEditProductComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },
  {
    path: 'edit-product/:productId',
    component: AddEditProductComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },
  {
    path: 'add-product',
    component: AddEditProductComponent,
    canActivate: [GuardService],
    data: { requiresAdmin: true },
  },

  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [GuardService],
  },
  { path: 'sell', component: SellComponent, canActivate: [GuardService] },

  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [GuardService],
  },
  // {
  //   path: 'transaction/:transactionId',
  //   component: TransactionDetailComponent,
  //   canActivate: [GuardService],
  // },

  { path: 'profile', component: ProfileComponent, canActivate: [GuardService] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardService],
  },

  //   WIDE CARD
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
