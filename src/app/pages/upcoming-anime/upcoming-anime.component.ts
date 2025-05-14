import { Component, OnInit } from '@angular/core';
import { AnimePaginationService } from '../../services/anime-pagination.service';
import { UPCOMING_ANIME_QUERY } from '../../services/anilist-api.service';
import {NgForOf, NgIf} from '@angular/common';
import {Anime} from '../../models/anilist-response.model';
import {AnimeCardComponent} from '../../components/anime-card/anime-card.component';
import {AnimeListModalComponent} from '../../components/anime-list-modal/anime-list-modal.component';
import { AnimeListService } from '../../services/anime-list.service';
import { MyListApiService } from '../../services/my-list-api.service';

@Component({
  selector: 'app-upcoming-anime',
  imports: [
    NgForOf,
    NgIf,
    AnimeCardComponent,
    AnimeCardComponent,
    AnimeListModalComponent
  ],
  templateUrl: './upcoming-anime.component.html',
  styleUrls: ['./upcoming-anime.component.scss']
})
export class UpcomingAnimeComponent implements OnInit {
  upcomingAnime: Anime[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;
  showModal: boolean = false;
  modalAnime: Anime | null = null;
  modalAction: 'add' | 'edit' | 'remove' | null = null;
  modalStatus: string = 'Watching';
  statusOptions: string[] = ['Watching', 'Watched', 'Unwatched'];
  myList: any[] = [];

  constructor(private pagination: AnimePaginationService, private animeListService: AnimeListService, private myListApi: MyListApiService) {}

  ngOnInit(): void {
    this.loadUpcomingAnime();
    this.loadMyList();
  }

  loadUpcomingAnime(page: number = 1): void {
    this.pagination.fetchPaginated(
      UPCOMING_ANIME_QUERY,
      { page, perPage: this.perPage, season: 'SPRING', seasonYear: 2025 },
      (data: Anime[]): Anime[] => this.upcomingAnime = data,
      (current: number, total: number): void => {
        this.currentPage = current;
        this.totalPages = total;
      },
      (loading: boolean): boolean => this.loading = loading,
      (error: string): string => this.error = error
    );
  }

  loadMyList(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      this.myList = [];
      return;
    }
    this.myListApi.getUserList(username).subscribe({
      next: (items: any[]) => {
        this.myList = items;
      },
      error: () => {
        this.myList = [];
      }
    });
  }

  handleModalConfirm(selectedStatus: string): void {
    if (!this.modalAnime || !this.modalAction) {
      this.closeModal();
      return;
    }
    const username = localStorage.getItem('username');
    if (!username) {
      this.error = 'You must be logged in to modify your list.';
      this.closeModal();
      return;
    }
    if (this.modalAction === 'add') {
      this.myListApi.addToUserList(username, this.modalAnime, selectedStatus).subscribe({
        next: () => this.loadMyList(),
        error: () => { this.error = 'Failed to add anime.'; }
      });
    } else if (this.modalAction === 'edit') {
      this.myListApi.updateUserListStatus(username, this.modalAnime.id, selectedStatus).subscribe({
        next: () => this.loadMyList(),
        error: () => { this.error = 'Failed to update status.'; }
      });
    } else if (this.modalAction === 'remove') {
      this.myListApi.removeFromUserList(username, this.modalAnime.id).subscribe({
        next: () => this.loadMyList(),
        error: () => { this.error = 'Failed to remove anime.'; }
      });
    }
    this.closeModal();
  }

  closeModal(): void {
    this.showModal = false;
    this.modalAnime = null;
    this.modalAction = null;
  }

  isInMyList(anime: Anime): boolean {
    return this.animeListService.isInMyList(anime, this.myList);
  }

  getStatus(anime: Anime): string {
    return this.animeListService.getStatus(anime, this.myList);
  }

  confirmToggleAnime(anime: Anime): void {
    if (this.isInMyList(anime)) {
      this.modalAnime = anime;
      this.modalAction = 'remove';
      this.modalStatus = this.getStatus(anime);
    } else {
      this.modalAnime = anime;
      this.modalAction = 'add';
      this.modalStatus = 'Watching';
    }
    this.showModal = true;
  }

  editStatus(anime: Anime): void {
    this.modalAnime = anime;
    this.modalAction = 'edit';
    this.modalStatus = this.getStatus(anime);
    this.showModal = true;
  }
}
