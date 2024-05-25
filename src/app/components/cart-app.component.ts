import { SharingDataService } from './../services/sharing-data.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actios';
import { state } from '@angular/animations';

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

  constructor(
    private store: Store <{items: ItemsState}>,
    private router: Router,
    private sharingDataService: SharingDataService){
      this.store.select('items').subscribe(state => {
        this.items = state.items,
        this.saveSession();
      })
    }
  ngOnInit(): void {
    this.onAddCart();
    this.onDeleteCart();

  }

  onDeleteCart(): void{
    this.sharingDataService.idProductEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el item se eliminara del carro de compras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=> {
            this.router.navigate(['/cart']);
          })
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras",
            icon: "success"
          });
        }
      });


    });

  }

  onAddCart(){
    this.sharingDataService.productEventEmitter.subscribe(product => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      this.router.navigate(['/cart'],{state:{items: this.items}});

      Swal.fire({
        title: "Shopping" ,
        text: "Nuevo producto agregado" ,
        icon: "success"
      });
    });

  }

  saveSession(): void {
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

}
