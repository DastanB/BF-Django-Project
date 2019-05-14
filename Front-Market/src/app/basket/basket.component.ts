import { Component, OnInit } from '@angular/core';
import {Product , Order} from '../models/models';
import {ProviderService} from '../services/provider.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  
  orders: Order[] = [];

  constructor(private provider: ProviderService , private auth_: AuthService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.provider.getOrders().then(res => {
      this.orders = res;
    });
  }

  deleteOrder(o: Order) {
    for(var i = 0 ; i<this.orders.length ; ++i) {
      if(this.orders[i].id == o.id) {
        this.orders.splice(i , 1);
        break;
      }
    }
    this.provider.deleteOrder(o.id);
  }
}
