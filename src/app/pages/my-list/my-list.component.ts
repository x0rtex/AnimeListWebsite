import {Component, OnInit} from '@angular/core';
import {AnimePaginationService} from '../../services/anime-pagination.service';
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-my-list',
  imports: [
    NgIf,
    NgForOf,
    SlicePipe,
    NgOptimizedImage
  ],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss'
})
export class MyListComponent implements OnInit {
  myList: any[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;

  constructor(private pagination: AnimePaginationService) {}

  ngOnInit(): void {
    this.loadMyList();
  }

  loadMyList(page: number = 1): void {
    this.pagination.fetchPaginated(
      "TODO",
      {page, perPage: this.perPage},
      (data: any[]): any[] => this.myList = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }
}
