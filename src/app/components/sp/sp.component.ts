import { Component } from '@angular/core';
import { ProducServices } from 'src/app/services/product.service';
@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.css']
})
export class SpComponent {
  items: any[] = [];
  total = 0;
  pageNumber = 1;
  pageSize = 0;
  constructor(private producServices: ProducServices) { }

  loadPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.producServices.getList1('', pageNumber).subscribe((response) => {
      this.items = response.items;
      this.total = response.total;
    });

  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnInit() {
    this.loadPage(1);

  }
}
