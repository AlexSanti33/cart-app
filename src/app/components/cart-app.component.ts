import { SharingDataService } from './../services/sharing-data.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private router: Router,private service: ProductService,private sharingDataService: SharingDataService){}
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculateTotal();
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
          this.items = this.items.filter(item => item.product.id !== id);
          if(this.items.length == 0){
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=> {
            this.router.navigate(['/cart'],{state:{items: this.items,total: this.total}});
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
      this.router.navigate(['/cart'],{state:{items: this.items,total: this.total}});

      Swal.fire({
        title: "Shopping" ,
        text: "Nuevo producto agregado" ,
        icon: "success"
      });
    });

  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price,0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

}
