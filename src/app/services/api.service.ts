// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }

// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/messages'; // Update if deployed

  constructor(private http: HttpClient) { }

  sendMessage(data: { name: string; email: string; message: string }) {
    return this.http.post(this.apiUrl, data);
  }
}
