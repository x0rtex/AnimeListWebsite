import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import { MyListApiService } from '../../services/my-list-api.service';
import {Anime} from '../../models/anilist-response.model';
import {AnimeCardComponent} from '../../components/anime-card/anime-card.component';
import { AnimeListModalComponent } from '../../components/anime-list-modal/anime-list-modal.component';
import { AnimeListService } from '../../services/anime-list.service';

@Component({
  selector: 'app-my-list',
  imports: [
    NgForOf,
    AnimeCardComponent,
    AnimeListModalComponent
  ],
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  myList: { anime: Anime, status: string }[] = [];
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

  constructor(private myListApi: MyListApiService, private animeListService: AnimeListService) {}

  ngOnInit(): void {
    this.loadMyList();
  }

  loadMyList(): void {
    const username: string | null = localStorage.getItem('username');
    if (!username) {
      this.error = 'You must be logged in to view your list.';
      this.myList = [];
      return;
    }
    this.loading = true;
    this.error = '';
    this.myListApi.getUserList(username).subscribe({
      next: (items: { anime: Anime, status: string }[]): void => {
        this.myList = items;
        this.loading = false;
      },
      error: (err: any): void => {
        this.error = 'Failed to load your list.';
        this.loading = false;
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

  removeFromList(anime: Anime): void {
    this.modalAnime = anime;
    this.modalAction = 'remove';
    this.modalStatus = this.getStatus(anime);
    this.showModal = true;
  }

  editStatus(anime: Anime): void {
    this.modalAnime = anime;
    this.modalAction = 'edit';
    this.modalStatus = this.getStatus(anime);
    this.showModal = true;
  }
}
