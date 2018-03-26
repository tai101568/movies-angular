import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { PageNotFoundComponent } from './not-found.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';

const routes: Routes = [
  { path: 'movies', component: HomeComponent, children: [
    { path: ':category', component: MovieListComponent },
    { path: 'genre/:id', component: MovieListComponent }
  ]},
  { path: '', redirectTo: 'movies/popular', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
