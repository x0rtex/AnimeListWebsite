import { Injectable } from '@angular/core';
import { Anime } from '../models/anilist-response.model';

@Injectable({ providedIn: 'root' })
export class AnimeListService {
  /**
   * Checks if the anime is in the user's list
   */
  isInMyList(anime: Anime, myList: any[]): boolean {
    return myList.some(item => (item.anime ? item.anime.id : item.id) === anime.id);
  }

  /**
   * Gets the user's status for a given anime
   */
  getStatus(anime: Anime, myList: any[]): string {
    const entry = myList.find(item => (item.anime ? item.anime.id : item.id) === anime.id);
    return entry?.status || 'Watching';
  }
}
