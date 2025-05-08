import {Component, OnInit} from '@angular/core';
import {AnilistApiService} from '../../services/anilist-api.service';
import {AniListResponse} from '../../models/anilist-response.model';

@Component({
  selector: 'app-top-anime',
  imports: [],
  templateUrl: './top-anime.component.html',
  styleUrl: './top-anime.component.scss'
})
export class TopAnimeComponent implements OnInit {
  topAnime: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: AnilistApiService) {}

  ngOnInit(): void {
    this.fetchTopAnime();
  }

  fetchTopAnime(): void {
    this.loading = true;
    this.apiService.getTopAnime().subscribe({
      next: (response: AniListResponse) => {
        this.topAnime = response.data.Page.media;
        console.log('Upcoming Anime:', this.topAnime);
        this.loading = false;
      },
      error: (error: any) => {
        this.error = `There was an error loading the top anime: ${error.message}`;
        this.loading = false;
      }
    });
  }
}
