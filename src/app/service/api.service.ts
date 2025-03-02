/*
  IMPORTACIONES Y SUS UTILIDADES

  HttpClient  permite hacer peticiiones GET,POST,PUT,DELETE

  EventEmitter permite la comunicacion entre componentes mediante eventos personalizados
     Ejemplo enviar datos del componente hijo al padre

   Observable  permite manejar datos asincronos en angular, por ejemplo peticiones HTTP eventos o timers
      manejar datos en tiempo real, procesar apis, escuchar eventos de usuario o WebSockets

      CryptoJs //agregado usando npm i --save-dev @types/crypto-js
 */





import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import CryptoJs from "crypto-js"; //agregado usando npm i --save-dev @types/crypto-js
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static BASE_URL = 'http://localhost:5050/api';
  private static ENCRIPTION_KEY = 'my-encryption-key';

  authStatusChanged = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  //Metodo para encriptar y guardar en el LocalStorage
  // la clave de este sera la palabra token
  // el valor sera el jwt, pero encriptado, para mayor seguridad
  encryptAndSaveTpStorage(key: string, value: string) {
    const encryptedValue = CryptoJs.AES.encrypt(
      value,
      ApiService.ENCRIPTION_KEY
    ).toString();
    localStorage.setItem(key, encryptedValue);
  }

  // para obtener el valor encriptado en localStorage
  private getFromStorageAndDecrypt(key: string): string | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      return CryptoJs.AES.decrypt(
        encryptedValue,
        ApiService.ENCRIPTION_KEY
      ).toString(CryptoJs.enc.Utf8);
    } catch (error) {
      return null;
    }
  }

  //borra el token y el rol del usuario en localStorage, cerrando la sesion
  private clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  //recupera el token desencriptado y lo devuelve con la cabecera Bearer
  private getHeader(): HttpHeaders {
    const token = this.getFromStorageAndDecrypt('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  //AUTHENTICATION CHECKER

  logout() {
    this.clearAuth();
  }

  //devuevle un true si hay un token valido, false si no
  isAuthenticated(): boolean {
    const token = this.getFromStorageAndDecrypt('token');
    return !!token;
  }

  isAdmin() {
    const role = this.getFromStorageAndDecrypt('role');
    return role === 'ADMIN';
  }

  //Auth & Users API methods
  //LLLAMADAS AL BACKEND PARA REGISTRO Y LOGIN

  registerUser(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/auth/register`, body);
  }

  loginUser(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/auth/login`, body);
  }

  //le mandamos la cabecera que seria el token
  getLoggedInUserinfo(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/users/current`, {
      headers: this.getHeader(),
    });
  }

  /**CATEGOTY ENDPOINTS */
  //para las categorias

  createCategory(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/categories/add`, body, {
      headers: this.getHeader(),
    });
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/categories/all`, {
      headers: this.getHeader(),
    });
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/categories/${id}`, {
      headers: this.getHeader(),
    });
  }

  updateCategory(id: string, body: any): Observable<any> {
    return this.http.put(
      `${ApiService.BASE_URL}/categories/update/${id}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/categories/delete/${id}`, {
      headers: this.getHeader(),
    });
  }





  /** SUPPLIER API */
  addSupplier(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/suppliers/add`, body, {
      headers: this.getHeader(),
    });
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/suppliers/all`, {
      headers: this.getHeader(),
    });
  }

  getSupplierById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/suppliers/${id}`, {
      headers: this.getHeader(),
    });
  }

  updateSupplier(id: string, body: any): Observable<any> {
    return this.http.put(
      `${ApiService.BASE_URL}/suppliers/update/${id}`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/suppliers/delete/${id}`, {
      headers: this.getHeader(),
    });
  }





  /**PRODUCTS ENDPOINTS */
  addProduct(formData: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/products/add`, formData, {
      headers: this.getHeader(),
    });
  }

  updateProduct(formData: any): Observable<any> {
    return this.http.put(`${ApiService.BASE_URL}/products/update`, formData, {
      headers: this.getHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/products/all`, {
      headers: this.getHeader(),
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/products/${id}`, {
      headers: this.getHeader(),
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${ApiService.BASE_URL}/products/delete/${id}`, {
      headers: this.getHeader(),
    });
  }


  /**Transactions Endpoints */

  purchaseProduct(body: any): Observable<any> {
    return this.http.post(
      `${ApiService.BASE_URL}/transactions/purchase`,
      body,
      {
        headers: this.getHeader(),
      }
    );
  }

  sellProduct(body: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/transactions/sell`, body, {
      headers: this.getHeader(),
    });
  }

  getAllTransactions(searchText: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/all`, {
      params: { searchText: searchText },
      headers: this.getHeader(),
    });
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/${id}`, {
      headers: this.getHeader(),
    });
  }

  updateTransactionStatus(id: string, status: string): Observable<any> {
    return this.http.put(
      `${ApiService.BASE_URL}/transactions/update/${id}`,
      JSON.stringify(status),
      {
        headers: this.getHeader().set('Content-Type', 'application/json'),
      }
    );
  }

  getTransactionsByMonthAndYear(month: number, year: number): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/transactions/by-month-year`, {
      headers: this.getHeader(),
      params: {
        month: month,
        year: year,
      },
    });
  }


}
