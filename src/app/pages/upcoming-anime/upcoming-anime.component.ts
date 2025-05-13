import { Component, OnInit } from '@angular/core';
import { AnimePaginationService } from '../../services/anime-pagination.service';
import { UPCOMING_ANIME_QUERY } from '../../services/anilist-api.service';
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-upcoming-anime',
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
    NgOptimizedImage
  ],
  templateUrl: './upcoming-anime.component.html',
  styleUrls: ['./upcoming-anime.component.scss']
})
export class UpcomingAnimeComponent implements OnInit {
  upcomingAnime: any[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;

  constructor(private pagination: AnimePaginationService) {}

  ngOnInit(): void {
    this.loadUpcomingAnime();
  }

  loadUpcomingAnime(page: number = 1): void {
    this.pagination.fetchPaginated(
      UPCOMING_ANIME_QUERY,
      { page, perPage: this.perPage, season: 'SPRING', seasonYear: 2025 },
      (data: any[]): any[] => this.upcomingAnime = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }
}
