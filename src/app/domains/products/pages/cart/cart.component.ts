import { Component } from '@angular/core';

import { TableComponent } from "@shared/components/table/table.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [TableComponent]
})
export default class CartComponent {

}
