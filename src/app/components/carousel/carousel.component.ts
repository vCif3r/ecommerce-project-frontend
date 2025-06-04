import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  items = input<any>([])
  slidesPerView = input<number>(1)
  navigation = input<boolean>(true)
  breakpoints = input<any>({})
  
  swiperOptions = input<any>()
  
  ngOnInit(): void {
  
  }
}
