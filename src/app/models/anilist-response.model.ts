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
  popularity: number;
  bannerImage: string;
  season: string;
  genres: string[];
  startDate: StartDate;
  studios: Studios;
  siteUrl: string;
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface PageData {
  media: Anime[];
  pageInfo: PageInfo;
}

export interface AniListResponse {
  data: {
    Page: PageData;
  };
}
