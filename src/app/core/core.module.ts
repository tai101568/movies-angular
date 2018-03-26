import { NgModule } from '@angular/core';

import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { TmdbService } from './tmdb/tmdb.service';
import { ScrollService } from './scroll.service';

@NgModule({
  imports: [
  ],
  providers: [
    AuthGuard,
    AuthService,
    TmdbService,
    ScrollService
  ]
})
export class CoreModule { }
