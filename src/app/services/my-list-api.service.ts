import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Anime } from '../models/anilist-response.model';

@Injectable({
  providedIn: 'root'
})
export class MyListApiService {
  private _usersUrl: string = environment.ApiUrlUsers;
  private _userListsUrl: string = environment.ApiUrlUserLists;

  constructor(private _http: HttpClient) { }

  /**
   * Register a new user if username does not exist.
   */
  register(username: string, password: string): Observable<{ success: boolean; message: string }> {
    return this._http.get<any>(`${this._usersUrl}?username=${username}`)
      .pipe(
        switchMap(user => {
          if (user) {
            return of({ success: false, message: 'Username already exists.' });
          } else {
            return this._http.post<any>(this._usersUrl, { username, password }).pipe(
              map(() => ({ success: true, message: 'Account created.' }))
            );
          }
        }),
        catchError(() => of({ success: false, message: 'Registration failed.' }))
      );
  }

  /**
   * Login: check if user exists and password matches.
   */
  login(username: string, password: string): Observable<{ success: boolean; message: string }> {
    return this._http.get<any>(`${this._usersUrl}?username=${username}`)
      .pipe(
        map(user => {
          if (!user) {
            return { success: false, message: 'User not found.' };
          } else if (user.password !== password) {
            return { success: false, message: 'Incorrect password.' };
          } else {
            return { success: true, message: 'Login successful.' };
          }
        }),
        catchError(err => of({ success: false, message: 'Login failed.' }))
      );
  }

  /**
   * Get all list items for a user by username.
   */
  getUserList(username: string): Observable<any[]> {
    return this._http.get<any[]>(`${this._userListsUrl}?username=${encodeURIComponent(username)}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  /**
   * Add anime to user list with status.
   */
  addToUserList(username: string, anime: Anime, status: string): Observable<any> {
    return this._http.post<any>(this._userListsUrl, { username, anime, status });
  }

  /**
   * Update status for an anime in user list.
   */
  updateUserListStatus(username: string, animeId: number, status: string): Observable<any> {
    return this._http.get<any[]>(`${this._userListsUrl}?username=${encodeURIComponent(username)}&id=${animeId}`)
      .pipe(
        switchMap(entries => {
          if (entries && entries.length > 0 && entries[0]._id) {
            return this._http.patch<any>(`${this._userListsUrl}/${entries[0]._id}`, { status });
          } else {
            return of(null);
          }
        })
      );
  }

  /**
   * Remove anime from user list.
   */
  removeFromUserList(username: string, animeId: number): Observable<any> {
    return this._http.get<any[]>(`${this._userListsUrl}?username=${encodeURIComponent(username)}&id=${animeId}`)
      .pipe(
        switchMap(entries => {
          if (entries && entries.length > 0 && entries[0]._id) {
            return this._http.delete<any>(`${this._userListsUrl}/${entries[0]._id}`);
          } else {
            return of(null);
          }
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`MyListApiService: ${error.message}`);
    return throwError(() => error);
  }
}
