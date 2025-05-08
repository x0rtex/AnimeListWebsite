import { Component, OnInit } from '@angular/core';
import { AnilistApiService } from '../../services/anilist-api.service';
import { AniListResponse } from '../../models/anilist-response.model';

@Component({
  selector: 'app-upcoming-anime',
  imports: [],
  templateUrl: './upcoming-anime.component.html',
  styleUrl: './upcoming-anime.component.scss'
})
export class UpcomingAnimeComponent implements OnInit {
  upcomingAnime: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: AnilistApiService) {}

  ngOnInit(): void {
    this.fetchUpcomingAnime();
  }

  fetchUpcomingAnime(): void {
    this.loading = true;
    this.apiService.getUpcomingAnime().subscribe({
      next: (response: AniListResponse) => {
        this.upcomingAnime = response.data.Page.media;
        console.log('Upcoming Anime:', this.upcomingAnime);
        this.loading = false;
      },
      error: (error: any) => {
        this.error = `There was an error loading the upcoming anime: ${error.message}`;
        this.loading = false;
      }
    });
  }
}
