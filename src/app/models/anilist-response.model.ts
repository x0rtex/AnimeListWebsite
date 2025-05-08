export interface AnimeTitle {
  english?: string;
  romaji?: string;
  native?: string;
}

export interface StartDate {
  year: number;
  month: number;
  day: number;
}

export interface StudioNode {
  name: string;
}

export interface Studios {
  nodes: StudioNode[];
}

export interface Anime {
  id: number;
  title: AnimeTitle;
  description: string;
  averageScore: number;
  bannerImage: string;
  season: string;
  genres: string[];
  startDate: StartDate;
  studios: Studios;
}

export interface PageData {
  media: Anime[];
}

export interface AniListResponse {
  data: {
    Page: PageData;
  };
}
