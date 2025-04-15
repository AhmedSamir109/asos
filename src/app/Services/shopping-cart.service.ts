import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private baseUrl = environment.apiUrl;

  constructor(private _Http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getCartProducts(): Observable<any> {
    return this._Http.get(`${this.baseUrl}/Cart/products`, {
      headers: this.getHeaders()
    }).pipe(
      tap({
        next: (response) => console.log('Cart Response:', response),
        error: (error) => console.error('Cart Error:', error)
      })
    );
  }

  addToCart(productId: string): Observable<any> {
    return this._Http.post(`${this.baseUrl}/Cart/products/${productId}`, {}, {
      headers: this.getHeaders()
    });
  }

  removeFromCart(productId: string): Observable<any> {
    return this._Http.delete(`${this.baseUrl}/Cart/products/${productId}`, {
      headers: this.getHeaders()
    });
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this._Http.put(`${this.baseUrl}/Cart/products/${productId}/${quantity}`, {}, {
      headers: this.getHeaders()
    });
  }
}
