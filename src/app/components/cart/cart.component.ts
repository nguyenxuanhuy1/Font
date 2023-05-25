import { Component, OnInit } from '@angular/core';
import { ProducServices } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  gioh: any = [];
  totalsanpham :number = this.pro.gettotalsanpham();
  totalprice:number = this.pro.gettotalprice();
  constructor(private pro: ProducServices) { }
  ngOnInit() {
    this.gioh = this.pro.getcarts();
    if(this.gioh.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Bạn chưa thêm sản phẩm nào!',
        text: 'Hãy quay lại và Mua',
      })
    }
  }
  total(cart: any) {
    return cart.quantity * cart.pricesale;
  }
  updateq(index: any, event:any) {
    let newquantity = event.target.value;
    if(newquantity<=0){
      return newquantity;
    }
    this.gioh[index].quantity =event.target.value;
    this.pro.savecartss(this.gioh);
    this.totalsanpham = this.pro.gettotalsanpham();
    this.totalprice = this.pro.gettotalprice();
  }
  removecaet(index:number){
    Swal.fire({
      title: 'Bạn có chắc không',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn'
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Bỏ khỏi giỏ hàng thành công',
          'Muốn mua lại hãy quay lại trang sản phẩm',
          'success'
        )
        this.gioh.splice(index,1);
        this.pro.savecartss(this.gioh);
        this.totalsanpham = this.pro.gettotalsanpham();
        this.totalprice = this.pro.gettotalprice();
      }
    })
  }
}
