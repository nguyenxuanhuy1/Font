import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProducServices } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private pro: ProducServices) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire(
        'Nhập đủ chưa?',
        'Yêu cầu nhập đầy đủ',
        'question'
      )
      return;
    }
    const { username, password } = this.loginForm.value;
    this.pro.login(username, password).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          showConfirmButton: false,
          timer: 7000
        })
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Làm gì có tài khoản mật khẩu nào như này!',
          showConfirmButton: false,
          timer: 7000
        })
      }
    });
  }
}
