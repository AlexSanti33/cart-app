import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() items: CartItem[]=[];
  @Output() idEventEmitter = new EventEmitter();
  @Output() pulseEventEmitter = new EventEmitter();
  @Input() total: number =0;

  onDeleteCart(id: number){
    this.idEventEmitter.emit(id);
  }
  openCart(){
    this.pulseEventEmitter.emit();
  }



}
