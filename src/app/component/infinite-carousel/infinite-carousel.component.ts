import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ng-carousel-cdk';
declare let $: any;
@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrls: ['./infinite-carousel.component.css']
})

export class InfiniteCarouselComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  }
  config: CarouselConfig<CarouselItem> = {
    items: [
        {name: 1},
        {name: 2},
        {name: 3},
    ],
}
  
}
interface CarouselItem {
  name: number;
}