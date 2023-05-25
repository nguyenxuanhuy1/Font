import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProducServices } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  list: Array<any> = [];
  pageNumber = 1;
  items: any[] = [];
  pageSize = 0;
  total = 0;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl()
  });
  constructor(private producServices: ProducServices) { }
  ngOnInit(): void {
    this.loadPage(1);
  }
  loadPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.producServices.getList1('', pageNumber).subscribe((response) => {
      this.items = response.items;
      this.total = response.total;
      console.log(this.total)
    });
  }
  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  onDelete(id: number) {

    Swal.fire({
      title: 'Xoá nha !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ừ'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Đã xoá',
          'KHông thể khôi phục',
          'success'
        )
        // this.producServices.delete(id).subscribe(res => {
        //   this.producServices.getList().subscribe(res => {
        //     this.list = res;
        //   })
        // })

        this.producServices.delete(id).subscribe(response => {
          this.producServices.getList1('', this.pageNumber).subscribe(response => {
            this.items = response.items;
          })
        })
      }
    })
  }
  onseach() {
    this.producServices.getList1(this.searchForm.value.name, this.pageNumber).subscribe(res => {
      this.items = res.items;
      console.log(this.list)
    })
  }
}
