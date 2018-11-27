import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, selectUsers, GetUsersAction } from '../../store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public users$: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.users$ = store.select(selectUsers).pipe(tap(console.log));
  }

  public loadMorePeople() {
    this.store.dispatch(new GetUsersAction());
  }

}
