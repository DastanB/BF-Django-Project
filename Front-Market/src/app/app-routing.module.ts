import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LogedinComponent } from './logedin/logedin.component';
import { MyloginComponent } from './mylogin/mylogin.component';
import { MyregisterComponent } from './myregister/myregister.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { ProductCommentComponent } from './product-comment/product-comment.component';
import { BasketComponent } from './basket/basket.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: IndexComponent },
  {path: 'welcome', component: LogedinComponent},
  {path: 'login', component: MyloginComponent},
  {path: 'register', component: MyregisterComponent},
  {path: 'categories' , component: CategoriesComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-comment/:id', component: ProductCommentComponent},
  {path: 'basket', component:BasketComponent},
  {path: 'categories/:id/products' , component: ProductsComponent},
  {path: 'brands/:id/products' , component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes) , HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
