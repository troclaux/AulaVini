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

  updateComment(form, id): Observable<any>{
    return this.http.put(this.apiURL + 'updateComment/' + id , form);
  }

  showRepublicWithComments(id): Observable<any>{
    return this.http.get(this.apiURL + 'showRepublicWithComments/' + id);
  }

}
