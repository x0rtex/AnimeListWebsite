import {Component, OnInit} from '@angular/core';
import {AnilistApiService} from '../../services/anilist-api.service';
import {AniListResponse} from '../../models/anilist-response.model';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchedAnime: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: AnilistApiService) {}

  ngOnInit(): void {
    this.searchAnime();
  }

  searchAnime(): void {
    this.loading = true;
    this.apiService.searchAnime("Naruto").subscribe({
      next: (response: AniListResponse) => {
        this.searchedAnime = response.data.Page.media;
        console.log('Searched Anime:', this.searchedAnime);
        this.loading = false;
      },
      error: (error: any) => {
        this.error = `There was an error loading the upcoming anime: ${error.message}`;
        this.loading = false;
      }
    });
  }
}
