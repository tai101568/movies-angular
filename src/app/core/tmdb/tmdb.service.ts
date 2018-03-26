import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MovieCategoryModel } from '../../models/movie-category.model';
import { MovieDetailsModel } from '../../models/movie-details.model';
import { MovieGenreModel } from '../../models/movie-genre.model';

@Injectable()
export class TmdbService {
  private api_key = 'f32af157b80fd4b8733bcd5b90568d73';
  private url_movie = 'https://api.themoviedb.org/3/movie';
  private url_genre = 'https://api.themoviedb.org/3/genre';

  private lang = 'en-US';

  constructor(private http: HttpClient) { }

  getMovie(page: number, category: string) {
    switch (category) {
      case 'popular': return this.getPopular(page);
      case 'upcoming': return this.getUpComing(page);
      case 'top_rated': return this.getTopRated(page);
    }
  }

  getUpComing(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/upcoming?api_key=${this.api_key}&language=${this.lang}&page=${page}`);
  }
  getPopular(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/popular?api_key=${this.api_key}&language=${this.lang}&page=${page}`);
  }
  getTopRated(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/top_rated?api_key=${this.api_key}&language=${this.lang}&page=${page}`);
  }
 
  getDetailsMovie(movie_id: number): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(`${this.url_movie}/${movie_id}?api_key=${this.api_key}&language=${this.lang}`);
  }

  getGenre(): Observable<MovieGenreModel[]> {
    return this.http.get<MovieGenreModel[]>(`${this.url_genre}/movie/list?api_key=${this.api_key}&language=${this.lang}`)
      .map((data: any) => data.genres);
  }
  
  getGenreMovie(genre_id: number, page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`
      ${this.url_genre}/${genre_id}/movies?api_key=${this.api_key}&language=${this.lang}&page=${page}
    `);
  }

}
