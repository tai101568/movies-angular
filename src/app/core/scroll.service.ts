import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScrollService {
  private subject = new Subject<any>();

  constructor() { }

  notifyScroll() {
    this.subject.next("Scroll");
  }

  getNotifyScroll(): Observable<any> {
    return this.subject.asObservable();
  }

}
