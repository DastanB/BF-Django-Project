import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ProviderService} from '../services/provider.service';
import {AuthService} from '../services/auth.service';
import {Product} from '../models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public idi: string = '';
  public all: boolean = true;
  public products: Product[] = [];
  public categoryOrBrand: boolean = true;

  constructor(private route: ActivatedRoute , private router: Router , private provider: ProviderService , private auth_: AuthService) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id')){
      this.idi = this.route.snapshot.paramMap.get('id');
      this.all = false;
      console.log(this.router.url[1]);
      if(this.router.url[1] == 'c'){
        this.categoryOrBrand = true;
      }
      else{
        this.categoryOrBrand = false;
      }
    }
    this.getProducts();
  }

  getProducts() {
    if(this.all){
      this.provider.getProducts().then(res => {
        this.products = res;
      });
    }
    else{
      if(this.categoryOrBrand){
        this.provider.getProductsForCategory(this.idi).then(res => {
          this.products = res;
        });
      }
      else {
        this.provider.getProductsForBrand(this.idi).then(res => {
          this.products = res;
        });
      }
    }
  }

  order(p: Product) {
    this.provider.order(p.id);
    console.log(p);
  }

}
