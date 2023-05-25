import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
const _API = 'http://localhost:3000/products';
@Injectable({
  providedIn: 'root'
})
export class ProducServices {

  constructor(private http: HttpClient) { }

  getList1(q: string = '', pageNumber: number): Observable<any> {
    return this.http.get<any>(_API, { params: { q, pageNumber } });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${_API}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(_API, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${_API}/${id}`, data);
  }

  details(id: number) {
    return this.http.get<Product>(`${_API}/${id}`)
  }

  getcarts() {
    let cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  savecartss(carts: any) {
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart', cartJson);
  }

  gettotalprice() {
    let carts = this.getcarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity * item.pricesale;
    });
    return total;
  }

  gettotalsanpham() {
    let carts = this.getcarts();
    let total: number = 0;
    carts.forEach((item: any) => {
      total += item.quantity;
    });
    return total;
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post('http://localhost:3000/users/login', body);
  }

  register(username: any, password: any, phonenumber: any): Observable<any> {
    const body = { username, password, phonenumber };
    return this.http.post('http://localhost:3000/users/register', body);
  }

}
