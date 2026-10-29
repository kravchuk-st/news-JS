export enum HttpMethod {
  GET = 'GET',
}

export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  source: Pick<Source, 'id' | 'name'>;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface SourcesResponse {
  status: string;
  sources: Source[];
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type Callback<T> = (data: T) => void;

export type RequestOptions = Partial<Record<string, string>>;

export interface RequestConfig {
  endpoint: Endpoint;
  options?: RequestOptions;
}
