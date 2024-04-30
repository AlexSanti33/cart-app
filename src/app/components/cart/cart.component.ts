import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges{

  @Input() items: CartItem[]=[];
  @Input() total: number=0;

  @Output() idProductEventEmitter = new EventEmitter();


  ngOnChanges(changes: SimpleChanges): void {

    let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();

  }

  onDeleteCart(idProduct: number){
    this.idProductEventEmitter.emit(idProduct);
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price,0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }
}
