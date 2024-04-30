import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent,NavBarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;

  constructor(private service: ProductService){}
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();

  }

  onDeleteCart(id: number): void{
    this.items = this.items.filter(item => item.product.id !== id);
    if(this.items.length == 0){
      sessionStorage.removeItem('cart');
    }
    this.calculateTotal();
    this.saveSession();
  }

  onAddCart(product: Product){
    const hasItem = this.items.find(item => item.product.id == product.id)
    if(hasItem){
      this.items = this.items.map(item => {
        if(item.product.id == product.id){
          return {
            ...item, quantity: item.quantity + 1
          }
        }
        return item;
      });
    }else{
      this.items = [... this.items, {product: {... product},quantity: 1}]
    }
    this.calculateTotal();
    this.saveSession()
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price,0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

}
