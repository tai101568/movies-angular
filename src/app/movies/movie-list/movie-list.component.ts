import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { TmdbService } from '../../core/tmdb/tmdb.service';

import { MovieCategoryModel } from '../../models/movie-category.model';
import { MovieModel } from '../../models/movie.model';
import { ScrollService } from '../../core/scroll.service';
import { MovieGenreModel } from '../../models/movie-genre.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  request: any;
  movies: MovieModel[];

  genres: MovieGenreModel[];
  
  currentPage: number;
  parameter: any;
  totalPages: number;
  isLoadingResults: boolean;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private scrollService: ScrollService) { }

  getMore(param: any) {
    if (this.totalPages && this.currentPage >= this.totalPages) { return; }
    ++this.currentPage;

    this.request = null;

    if (typeof param === 'string') {
        this.request = this.tmdbService.getMovie(this.currentPage, param);
    }

    if (typeof param === 'number') {
      this.request = this.tmdbService.getGenreMovie(param, this.currentPage);
    }

    if (this.request) {
      this.isLoadingResults = true;
      this.request.subscribe(response => {
        this.isLoadingResults = false;
        this.totalPages = response.total_pages;

        if (this.movies) {
          this.movies = [...this.movies, ...response.results]
        } else {
          this.movies = response.results;
        }
       
      });
    }
  }

  getGenresNameByMovie(movie: MovieModel) {
    const genre_ids: any = movie.genre_ids;

    let _result = this.genres.filter((data: MovieGenreModel) => {
      if (genre_ids.indexOf(data.id) != -1) {
        return true;
      }
      return false;
    }).map(data => " " + data.name)
    
    return _result;
  }

  ngOnInit() {
    this.scrollService.getNotifyScroll().subscribe(() => {
      this.getMore(this.parameter);
    });

    this.tmdbService.getGenre().subscribe(response => {
      this.genres = response;
    });

    this.route.params.subscribe((params: Params) => {
      this.currentPage = 0;
      this.movies = null;
      
      if (params['category']) {
        this.parameter = params['category'];
      } else if (params['id']) {
        this.parameter = +params['id'];
      }

      this.getMore(this.parameter);
    });
  }

}
