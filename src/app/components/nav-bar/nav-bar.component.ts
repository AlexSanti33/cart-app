import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() cantidad: number=0;
  @Output() cartVisibleEmmiter: EventEmitter<boolean> = new EventEmitter();

  mostrar():void {
    this.cartVisibleEmmiter.emit();
  }

}
