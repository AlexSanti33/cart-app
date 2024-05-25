import { ProductService } from './../../services/product.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { findAll, load } from '../products.actios';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

@Injectable()
export class ProductsEffects{

  loadProduct$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      exhaustMap(() => this.productService.findAll())
    ).pipe(
      map(products => (findAll({ products }))),
      catchError(()=> EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ){

  }
}
