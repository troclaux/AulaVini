import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  createComment(form): Observable<any>{
    return this.http.post(this.apiURL + 'createComment', form);
  }

}