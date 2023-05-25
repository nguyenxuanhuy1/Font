import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProducServices } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  id: number = 0;
  carts: any = this.pro.getcarts();
  cats: any = [];
  product!: Product;
  cartform: FormGroup = new FormGroup({ quantity: new FormControl(), });

  constructor(private route: ActivatedRoute, private pro: ProducServices) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.pro.details(this.id).subscribe(data => (this.product = data)
    );
  }
  addtocart(product: any) {
    Swal.fire({
      icon: 'success',
      title: 'Thêm vào giỏ thành công',
      showConfirmButton: false,
      timer: 700
    })
    let index = this.carts.findIndex((item: any) => {
      return item.id == product.id
    });

    if (index >= 0) {
      this.carts[index].quantity += 1;
    } else {
      let cartitem: any = {
        id: product.id,
        name: product.name,
        pricesale: product.pricesale,
        anh: product.link,
        quantity: 1,
      }
      this.carts.push(cartitem);
    }
    this.pro.savecartss(this.carts);
  }
}
