import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AniListResponse } from '../models/anilist-response.model';

@Injectable({
  providedIn: 'root'
})
export class AnilistApiService {
  private _apiUrl: string = 'https://graphql.anilist.co';

  constructor(private _http: HttpClient) {}

  public getTopAnime(): Observable<AniListResponse> {
    const query = `
      query Page {
        Page(perPage: 16, page: 1) {
          media(sort: SCORE_DESC, type: ANIME, format: TV) {
            id
            title {
              english
            }
            description
            averageScore
            bannerImage
            season
            genres
            startDate {
              year
              month
              day
            }
            studios(isMain: true) {
              nodes {
                name
              }
            }
          }
        }
      }
    `;

    return this._http.post<AniListResponse>(this._apiUrl, { query });
  }

  public getUpcomingAnime(): Observable<AniListResponse> {
    const query = `
      query Page {
        Page(perPage: 16, page: 1) {
          media(
            sort: START_DATE,
            type: ANIME,
            format: TV,
            season: SPRING,
            seasonYear: 2025
          ) {
            id
            title {
              english
            }
            description
            averageScore
            bannerImage
            season
            genres
            startDate {
              year
              month
              day
            }
            studios(isMain: true) {
              nodes {
                name
              }
            }
          }
        }
      }
    `;
    return this._http.post<AniListResponse>(this._apiUrl, { query });
  }
}
