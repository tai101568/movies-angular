import { Component, OnInit, HostListener } from '@angular/core';
import { TmdbService } from '../core/tmdb/tmdb.service';
import { MovieGenreModel } from '../models/movie-genre.model';
import { ScrollService } from '../core/scroll.service';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private tmdbService: TmdbService, private scrollService: ScrollService, private router: Router) { }

  genres: MovieGenreModel[];

  isShowBackTop: boolean;

  _timeout: any;

  @HostListener('window:scroll', ['$event']) scrollHandler(event) {
      const number = window.pageYOffset || document.documentElement.scrollTop;
      if (number >= 50) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }

      this._timeout && clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        if ((window.innerHeight + number) >= document.body.offsetHeight) {
          this.scrollService.notifyScroll();
        }
      }, 500)
  }

  scrollTop() {
    // window.scrollTo(0, 0);
    $('body,html').animate({
      scrollTop: 0
    }, 800);
  } 

  ngOnInit() {
    this.tmdbService.getGenre().subscribe(response => {
      this.genres = response;
    });

    if (this.router.url.indexOf('/movies/genre') != -1) {
      $('#navbarDropdown').addClass('active');
    }
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        console.log(event)
        if (this.router.url.indexOf('/movies/genre') != -1) {
          $('#navbarDropdown').addClass('active');
        } else {
          $('#navbarDropdown').removeClass('active');
        }
      }
    })
  }

}
