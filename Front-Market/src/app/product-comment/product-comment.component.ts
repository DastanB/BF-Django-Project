import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../services/provider.service';
import {AuthService} from '../services/auth.service';
import { Product , Comment } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss']
})
export class ProductCommentComponent implements OnInit {
  public product: Product;
  public productId: string = '';
  public comments: Comment[] = [];
  public commentAddText: string = '';
  public changeComment: boolean[] = [];
  public changeCommentMessages: string[] = [];

  constructor(private provider: ProviderService , private auth_: AuthService , private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.getComments();
    for(var i=0 ; i<this.comments.length ; ++i){
      this.changeCommentMessages[i] = this.comments[i].message;
    }
  }

  getProduct(){
    this.provider.getProduct(this.productId).then(res => {
      this.product = res;
      console.log(res);
    });
  }

  get Product() {
    return this.product;
  }

  updateComment(c: Comment) {
    var arrayId = this.getArrayIdForComment(c);
    if(this.changeComment[arrayId]){
      this.provider.updateComment(this.productId , c.id , this.changeCommentMessages[arrayId]).then(res =>{
        this.comments[arrayId] = res;
      });
      this.changeComment[arrayId] = false;
    }
    else {
      this.changeComment[arrayId] = true;
    }
  }

  getComments() {
    this.provider.getComments(this.productId).then(res => {
      this.comments = res;
      console.log(res);
    });
  }

  addComment() {
    this.provider.addComment(this.productId ,this.commentAddText).then(res => {
      this.comments.push(res);
    });
  }

  getArrayIdForComment(c : Comment) {
    var i=0;
    for(i=0 ; i<this.comments.length ; ++i) {
      if(this.comments[i].id == c.id) break;
    }
    return i;
  }

  deleteComment(c: Comment) {
    for(var i = 0 ; i<this.comments.length ; ++i) {
      if(this.comments[i].id == c.id) {
        this.comments.splice(i , 1);
        break;
      }
    }
    this.provider.deleteComment(this.productId , c.id);
  }
}
