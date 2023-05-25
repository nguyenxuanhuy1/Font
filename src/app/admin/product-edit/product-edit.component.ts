import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProducServices } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  id:number = 0;
  constructor(private prod: ProducServices,
    private route: ActivatedRoute,
    private router: Router) { }
  productFormEdit: FormGroup = new FormGroup({
    name: new FormControl(),
    des: new FormControl(),
    link: new FormControl(),
    price: new FormControl(),
    pricesale: new FormControl()
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
      this.prod.details(this.id).subscribe(data=>{
        this.productFormEdit = new FormGroup({
           name: new FormControl(data.name),
           des: new FormControl(data.des),
           link: new FormControl(data.link),
           price: new FormControl(data.price),
           pricesale: new FormControl(data.pricesale)
         })
       });
  }
  onupdate() {
    this.prod.update(this.id, this.productFormEdit.value).subscribe(data =>{
      console.log(data);
    })
    Swal.fire({
      icon: 'success',
      title: 'Sửa Thành công!',
      showConfirmButton: false,
      timer: 1000
    })
    this.router.navigate(['/admin/product-list']);
  }
}
