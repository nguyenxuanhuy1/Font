import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ProducServices } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent {

  constructor(private prod: ProducServices, private router: Router, private fb: FormBuilder) { }

  create = this.fb.group({
    "name": ["", [Validators.required]],
    'link': ['', [Validators.required]],
    'des': [''],
    'price': ['', [Validators.required]],
    'pricesale': ['']

  });
  ngOnInit(): void { }
  oncreate() {
    if (this.create.invalid) {
      Swal.fire(
        'Nhập đủ chưa?',
        'Yêu cầu nhập đầy đủ',
        'question'
      )
      return;
    }
    this.prod.create(this.create.value).subscribe()
    Swal.fire({
      icon: 'success',
      title: 'Thêm mới thành công!',
      showConfirmButton: false,
      timer: 7000
    })
    this.router.navigate(['/admin/product-list']);
  }
};