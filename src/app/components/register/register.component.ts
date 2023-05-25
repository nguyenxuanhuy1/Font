import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProducServices } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regist!: FormGroup;
  constructor(private fb: FormBuilder, private pro: ProducServices, private router: Router) { }
  register = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    phonenumber: ['', [Validators.required]]
  });
  onregister() {
    if (this.register.invalid) {
      Swal.fire(
        'Nhập đủ chưa?',
        'Yêu cầu nhập đầy đủ',
        'question'
      )
      return;
    }
    const { username, password, phonenumber } = this.register.value;
    this.pro.register(username, password, phonenumber).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          showConfirmButton: false,
          timer: 700
        })
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'fail in love!',
          showConfirmButton: false,
          timer: 700
        })
      }
    });


  }
}