import { SharingDataService } from './../../services/sharing-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actios';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
products!: Product[];

  constructor(
    private store: Store<{products: any}>,
    private sharingDataService: SharingDataService){
    this.store.select('products').subscribe(state => this.products = state.products);
  }
  ngOnInit(): void {
    this.store.dispatch(load());
  }
  onAddCart(product: Product){
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
