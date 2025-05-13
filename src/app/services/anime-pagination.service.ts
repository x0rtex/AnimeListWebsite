import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {AniListResponse, PageData} from '../models/anilist-response.model';
import { AnilistApiService } from './anilist-api.service';

@Injectable({ providedIn: 'root' })
export class AnimePaginationService {
  constructor(private api: AnilistApiService) {}

  fetchPaginated(
    query: string,
    variables: { [key: string]: any },
    setData: (data: any[]) => void,
    setPageInfo: (currentPage: number, totalPages: number) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void
  ): void {
    setLoading(true);
    this.api.getAnimePage(query, variables)
      .pipe(finalize((): void => setLoading(false)))
      .subscribe({
        next: (res: AniListResponse): void => {
          const page: PageData = res.data.Page;
          setData(page.media);
          setPageInfo(page.pageInfo.currentPage, page.pageInfo.lastPage);
        },
        error: (): void => setError('Failed to load data.')
      });
  }
}
