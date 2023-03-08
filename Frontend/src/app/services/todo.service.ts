import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Todo } from './todo.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public apiUrl = 'http://localhost:7002/api/todoItems'

  public constructor(private http: HttpClient) { }

  public getAllTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, httpOptions).pipe(shareReplay(1));
  }

  public addTodoData(body: unknown): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, body, httpOptions);
  }

  public getSingleTodoData(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl + "/" + id, httpOptions);
  }

  public deleteSingleTodoData(id: string): Observable<unknown> {
    return this.http.delete(this.apiUrl + "/" + id, httpOptions);
  }

  public updateSingleTodoData(id: string, todoObj: unknown): Observable<unknown> {
    return this.http.put(this.apiUrl + "/" + id, todoObj, httpOptions);
  }
}
