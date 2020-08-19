import { map, catchError } from 'rxjs/operators';
import { Products } from './products.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMenssage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Products): Observable<Products> {
    return this.http.post<Products>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Products> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Products>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Products): Observable<Products> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Products>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Products> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Products>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

  }

  errorHandler(e: any): Observable<any> {
    this.showMenssage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
