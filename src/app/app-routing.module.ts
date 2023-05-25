import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: 'product-edit/:id', component: ProductEditComponent },
      { path: 'product-create', component: ProductCreateComponent },
      { path: 'product-list', component: ProductListComponent }
    ]
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   