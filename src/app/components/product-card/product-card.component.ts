import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[product-card]',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input()total: number =0;
  @Input() product!: Product;
  @Output() productEventEmmiter: EventEmitter <Product> = new EventEmitter();
  onAddCart(product: Product){
    this.productEventEmmiter.emit(product);
  }
}
