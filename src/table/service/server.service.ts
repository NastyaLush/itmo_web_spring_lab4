import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {tap, catchError} from "rxjs/operators";
import {CustomResponse} from "../interface/custom-response";
import {Result} from "../interface/result";
import {RowResult} from "../interface/rowResult";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }


  results$ = <Observable<CustomResponse>>this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )
  save$ = (result: RowResult) => <Observable<CustomResponse>>this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, result)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  delete$ = <Observable<CustomResponse>>this.http.delete<CustomResponse>(`${this.apiUrl}/server/clear`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occured - Error code: ${error.status} ${error.message} ${error.ok}`);
  }
}
