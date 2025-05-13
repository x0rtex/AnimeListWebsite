import {Component, OnInit} from '@angular/core';
import {AnimePaginationService} from '../../services/anime-pagination.service';
import {SEARCH_ANIME_QUERY} from '../../services/anilist-api.service';
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SlicePipe,
    NgOptimizedImage,
    FormsModule
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
  searchTerm: string = '';

  constructor(private pagination: AnimePaginationService) {}

  ngOnInit(): void {
    this.searchAnime();
  }

  searchAnime(page: number = 1): void {
    if (!this.searchTerm.trim()) return;
    this.pagination.fetchPaginated(
      SEARCH_ANIME_QUERY,
      { page, perPage: this.perPage, search: this.searchTerm },
      (data: any[]): any[] => this.searchedAnime = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }

  onSearchSubmit(): void {
    this.currentPage = 1;
    this.searchAnime();
  }
}
