import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProducServices } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  banners=[
    {link:'assets/arem/ar5.jpg'},
    {link:'assets/arem/ar00.jpg'},
    {link:'assets/arem/slide1.jpg'},
    {link:'assets/arem/ar2.png'},
    {link:'assets/arem/ar3.jpg'},
    {link:'assets/arem/ar00.jpg'}
  ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['< ',' >'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }
  constructor() { }
  // constructor(private bn: ProducServices) { }
  ngOnInit(): void {
    // this.bn.getBanners().subscribe(res => { this.banners = res; })
  }
}
