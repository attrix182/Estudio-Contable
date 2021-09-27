import { Component, OnInit } from '@angular/core';
import { CarouselAlignMode, CarouselConfig,CarouselWidthMode  } from 'ng-carousel-cdk';
declare let $: any;
@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrls: ['./infinite-carousel.component.css']
})

export class InfiniteCarouselComponent implements OnInit {
  constructor() { }
  itemIndex = 0;
  ngOnInit(): void {
    
  }
  config: CarouselConfig<CarouselItem> = {
    slideWidth: 18,
    transitionDuration: 2500,
    alignMode: CarouselAlignMode.CENTER,
    shouldLoop: true,
    items: this.assignItems(3),
    autoplayEnabled: true,
    dragEnabled: true,
    shouldRecalculateOnResize: true,
    recalculateDebounce: 300,
};
  
private assignItems(quantity: number): CarouselItem[] {
  const items = [];
  for (let i = 0; i < quantity; i++) {
      items.push({name: i + 1, image: `url(https://via.placeholder.com/150)`});
  }

  return items;
}

setItemIndex(newIndex: number): void {
  this.itemIndex = newIndex;
}
  
}
interface CarouselItem {
  name: number;
  image:string;
}