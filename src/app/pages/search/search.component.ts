import {Component, OnInit} from '@angular/core';
import {AnimePaginationService} from '../../services/anime-pagination.service';
import {AnilistApiService} from '../../services/anilist-api.service';
import {SEARCH_ANIME_QUERY} from '../../services/anilist-api.service';
import {AniListResponse} from '../../models/anilist-response.model';
import {NgForOf, NgIf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    NgIf,
    NgForOf,
    SlicePipe
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedAnime: any[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;
  searchTerm: string = 'Naruto';

  constructor(private pagination: AnimePaginationService) {}

  ngOnInit(): void {
    this.searchAnime();
  }

  searchAnime(page: number = 1): void {
    this.pagination.fetchPaginated(
      SEARCH_ANIME_QUERY,
      { search: this.searchTerm, page, perPage: this.perPage },
      (data: any[]): any[] => this.searchedAnime = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }
}
