import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { TopAnimeComponent } from './pages/top-anime/top-anime.component';
import { UpcomingAnimeComponent } from './pages/upcoming-anime/upcoming-anime.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'top-anime', component: TopAnimeComponent },
  { path: 'upcoming-anime', component: UpcomingAnimeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'my-list', component: MyListComponent },
  { path: '**', redirectTo: '' }
];
