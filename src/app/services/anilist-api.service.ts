import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AniListResponse } from '../models/anilist-response.model';

// GraphQL queries as variables
  export const TOP_ANIME_QUERY = `
    query Page($page: Int, $perPage: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, sort: SCORE_DESC) {
          id
          title {
            english
          }
          description
          averageScore
          popularity
          bannerImage
          season
          genres
          siteUrl
          startDate {
            year
            month
            day
          }
          studios {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  export const UPCOMING_ANIME_QUERY = `
    query Page($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(sort: POPULARITY_DESC, type: ANIME, season: $season, seasonYear: $seasonYear) {
          id
          title {
            english
          }
          description
          averageScore
          popularity
          bannerImage
          season
          genres
          siteUrl
          startDate {
            year
            month
            day
          }
          studios {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  export const SEARCH_ANIME_QUERY = `
    query ($search: String!, $page: Int, $perPage: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(search: $search, sort: POPULARITY_DESC, type: ANIME) {
          id
          title {
            english
          }
          description
          averageScore
          popularity
          bannerImage
          season
          genres
          siteUrl
          startDate {
            year
            month
            day
          }
          studios {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

@Injectable({
  providedIn: 'root'
})
export class AnilistApiService {
  private _apiUrl: string = 'https://graphql.anilist.co';

  constructor(private _http: HttpClient) {}

  private postQuery(query: string, variables: { [key: string]: any } = {}): Observable<AniListResponse> {
    return this._http.post<AniListResponse>(this._apiUrl, { query, variables });
  }

  public getAnimePage(query: string, variables: { [key: string]: any }): Observable<AniListResponse> {
    return this.postQuery(query, variables);
  }
}
