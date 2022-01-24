import { Component, OnInit } from '@angular/core';
import { Campaign, PriceRange, Product, PromocodeProduct, Provider, SummarizedProduct } from './entities/classes';
import { FibreService } from './services/fibre.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mweb-fibre-products';
  

}
