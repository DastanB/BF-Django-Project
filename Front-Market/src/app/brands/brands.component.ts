import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {AuthService} from '../services/auth.service';
import {Brand} from '../models/models';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  public brands: Brand[] = [];

  constructor(private provider: ProviderService,
    private auth_:AuthService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.provider.getBrands().then(res => {
      this.brands = res;
      console.log(this.brands);
    });
  }

}
