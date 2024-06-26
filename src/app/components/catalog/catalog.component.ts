import { ProductService } from './../../services/product.service';
import { SharingDataService } from './../../services/sharing-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
products!: Product[];

  constructor(private productService: ProductService,private router: Router, private sharingDataService: SharingDataService){
  }
  ngOnInit(): void {
    if(!this.products){
      this.products = this.productService.findAll();
    }
  }
  onAddCart(product: Product){
  //this.productEventEmitter.emit(product);
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
