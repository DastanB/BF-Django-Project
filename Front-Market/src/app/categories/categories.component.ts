import { Component, OnInit } from '@angular/core';
import {Category} from '../models/models';
import {ProviderService} from '../services/provider.service';
import {AuthService} from '../services/auth.service'; 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];

  constructor(private provider: ProviderService,
    private auth_:AuthService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.provider.getCategories().then(res => {
      this.categories = res;
    });
  }

}
