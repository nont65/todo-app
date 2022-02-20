import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appUrl = 'http://localhost:3000/api/todo';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.appUrl}`).pipe(map((res: any) => res.data));
  }

  add(text: string) {
    return this.http.post(`${this.appUrl}`, { text });
  }

  update(id: string, text: string) {
    return this.http.patch(`${this.appUrl}/${id}`, { text });
  }

  changeStatus(id: string, newStatus: string) {
    return this.http.patch(`${this.appUrl}/${id}/status`, {
      status: newStatus,
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.appUrl}/${id}`);
  }

  deleteDone() {
    return this.http.delete(`${this.appUrl}/done`);
  }

  deleteAll() {
    return this.http.delete(`${this.appUrl}`);
  }
}
