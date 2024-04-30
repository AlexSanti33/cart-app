import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() cantidad: number=0;


}
