import {Component, OnInit} from '@angular/core';
import {TOP_ANIME_QUERY} from '../../services/anilist-api.service';
import {NgForOf, NgIf, SlicePipe} from '@angular/common';
import {AnimePaginationService} from '../../services/anime-pagination.service';

@Component({
  selector: 'app-top-anime',
  imports: [
    NgForOf,
    SlicePipe,
    NgIf
  ],
  templateUrl: './top-anime.component.html',
  styleUrls: ['./top-anime.component.scss']
})
export class TopAnimeComponent implements OnInit {
  topAnime: any[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;

  constructor(private pagination: AnimePaginationService) {}

  ngOnInit(): void {
    this.loadTopAnime();
  }

  loadTopAnime(page: number = 1): void {
    this.pagination.fetchPaginated(
      TOP_ANIME_QUERY,
      {page, perPage: this.perPage},
      (data: any[]): any[] => this.topAnime = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }
}
