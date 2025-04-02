import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnilistApiService {
  private _apiUrl: string = 'https://graphql.anilist.co';

  constructor(private _http: HttpClient) {}

    query(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this._http.post<any>(this._apiUrl, { query }, { headers });
  }
}
