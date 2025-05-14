import {Component, OnInit} from '@angular/core';
import {AnimePaginationService} from '../../services/anime-pagination.service';
import {SEARCH_ANIME_QUERY} from '../../services/anilist-api.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Anime} from '../../models/anilist-response.model';
import {MyListApiService} from '../../services/my-list-api.service';
import {AnimeCardComponent} from '../../components/anime-card/anime-card.component';
import {AnimeListModalComponent} from '../../components/anime-list-modal/anime-list-modal.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    AnimeCardComponent,
    AnimeListModalComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedAnime: Anime[] = [];
  expandedAnimeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 18;
  searchTerm: string = '';
  myList: any[] = [];
  username: string | null = null;
  selectedStatus: string = 'Watching';
  statusOptions: string[] = ['Watching', 'Watched', 'Unwatched'];

  // Modal state
  showModal: boolean = false;
  modalAnime: Anime | null = null;
  modalAction: 'add' | 'edit' | 'remove' | null = null;
  modalStatus: string = 'Watching';

  constructor(private pagination: AnimePaginationService, private myListApi: MyListApiService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.searchAnime();
    this.loadMyList();
  }

  searchAnime(page: number = 1): void {
    if (!this.searchTerm.trim()) return;
    this.pagination.fetchPaginated(
      SEARCH_ANIME_QUERY,
      { page, perPage: this.perPage, search: this.searchTerm },
      (data: Anime[]): Anime[] => this.searchedAnime = data,
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

  loadMyList(): void {
    if (!this.username) {
      this.myList = [];
      return;
    }
    this.myListApi.getUserList(this.username).subscribe({
      next: (items: any[]) => {
        this.myList = items || [];
      }
    });
  }

  isInMyList(anime: Anime): boolean {
    return this.myList.some(item => item.anime && item.anime.id === anime.id);
  }

  getStatus(anime: Anime): string {
    const entry = this.myList.find(item => item.anime && item.anime.id === anime.id);
    return entry?.status || 'Watching';
  }

  // Show modal before add/remove
  confirmToggleAnime(anime: Anime): void {
    if (!this.username) return;
    this.modalAnime = anime;
    this.modalAction = this.isInMyList(anime) ? 'remove' : 'add';
    // Set default or current status
    if (this.modalAction === 'add') {
      this.modalStatus = 'Watching';
    } else {
      // Get current status
      const entry = this.myList.find(item => item.anime && item.anime.id === anime.id);
      this.modalStatus = entry?.status || 'Watching';
    }
    this.showModal = true;
  }

  handleModalConfirm(selectedStatus: string): void {
    if (!this.username || !this.modalAnime || !this.modalAction) return;
    if (this.modalAction === 'remove') {
      this.myListApi.removeFromUserList(this.username, this.modalAnime.id).subscribe(() => {
        this.loadMyList();
        this.closeModal();
      });
    } else if (this.modalAction === 'add') {
      this.myListApi.addToUserList(this.username, this.modalAnime, selectedStatus).subscribe(() => {
        this.loadMyList();
        this.closeModal();
      });
    } else if (this.modalAction === 'edit') {
      this.myListApi.updateUserListStatus(this.username, this.modalAnime.id, selectedStatus).subscribe(() => {
        this.loadMyList();
        this.closeModal();
      });
    }
  }

  // New method: open edit modal for status
  editStatus(anime: Anime): void {
    if (!this.username) return;
    this.modalAnime = anime;
    this.modalAction = 'edit';
    const entry = this.myList.find(item => item.anime && item.anime.id === anime.id);
    this.modalStatus = entry?.status || 'Watching';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalAnime = null;
    this.modalAction = null;
  }
}
