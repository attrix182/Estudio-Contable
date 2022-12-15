import { Component } from '@angular/core';
import {
  CarouselAlignMode,
  CarouselConfig,
  CarouselWidthMode,
} from 'ng-carousel-cdk';
declare let $: any;
@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrls: ['./infinite-carousel.component.css'],
})
export class InfiniteCarouselComponent{
  constructor() {}
  itemIndex = 0;

  config: CarouselConfig<CarouselItem> = {
    widthMode: CarouselWidthMode.PX,
    slideWidth: 155,
    transitionDuration: 2500,
    alignMode: CarouselAlignMode.CENTER,
    shouldLoop: true,
    items: this.assignItems(3),
    autoplayEnabled: true,
    dragEnabled: true,
    shouldRecalculateOnResize: true,
    recalculateDebounce: 0,
    autoplayDelay: 2500,
  };

  private assignItems(quantity: number): CarouselItem[] {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({ name: i + 1 });
    }

    return items;
  }

  setItemIndex(newIndex: number): void {
    this.itemIndex = newIndex;
  }
}
interface CarouselItem {
  name: number;
  image: string;
}
