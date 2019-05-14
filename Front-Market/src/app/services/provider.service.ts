import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Product, Category , IAuthResponse, IUser, Brand , Order , Comment} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getBrands(): Promise<Brand[]> {
    return this.get(`http://localhost:8000/brands/`, {});
  }

  getCategories(): Promise<Category[]> {
    return this.get(`http://localhost:8000/categories/`, {})
  }

  getProducts(): Promise<Product[]>{
    return this.get(`http://localhost:8000/`, {})
  }
  getProductsForCategory(id: any): Promise<Product[]>{
    return this.get(`http://localhost:8000/categories/`+id+'/products/', {})
  }

  getProductsForBrand(id: any):Promise<Product[]> {
    return this.get(`http://localhost:8000/brands/`+id+'/products/', {})
  }

  getOrders():Promise<Order[]> {
    return this.get(`http://localhost:8000/orders/`, {})
  }

  deleteOrder(id: number) {
    return this.delete(`http://localhost:8000/orders/`+id+'/', {})
  }

  order(id: number) {
    return this.post(`http://localhost:8000/orders/product/`+id+'/', {})
  }

  getProduct(id: any) {
    return this.get('http://localhost:8000/'+id+'/' , {});
  }
  
  getComments(id: any):Promise<Comment[]> {
    return this.get('http://localhost:8000/'+id+'/comments/' , {});
  }

  addComment(id:any ,text: string): Promise<Comment> {
    return this.post('http://localhost:8000/'+id+'/comments/' , {
      "message": text
    });
  }

  deleteComment(productId: any , commentId: any){
    return this.delete('http://localhost:8000/'+productId+'/comments/'+commentId+'/' , {});
  }

  updateComment(productId:any , commentId: any , message: any) {
    return this.put('http://localhost:8000/'+productId+'/comments/'+commentId+'/' , {
      "message": message
    });
  }
}