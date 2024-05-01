import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { Product } from '../../models/product';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() cantidad: number=0;

  @Input() total: number=0;

  @Input() items!: CartItem[];

  @Input() products: Product[] = [];



}
