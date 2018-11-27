import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { GetUsersAction, AppActions, GetUsersActionCompleted, AppState, selectPage } from '../store';

import { Observable } from 'rxjs';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { DaoService } from '../services';

@Injectable()
export class AppEffects {
    @Effect()
    public loadUsers$: Observable<GetUsersActionCompleted> = this.actions$.pipe(
        ofType<GetUsersAction>(AppActions.GET_USERS_ACTION),
        startWith(new GetUsersAction()),
        withLatestFrom(this.store.select(selectPage)),
        switchMap(([action, page]) => {
            return this.dao.getUsers(page);
        }),
        map(users => new GetUsersActionCompleted(users))
    );

    constructor(private store: Store<AppState>, private dao: DaoService, private actions$: Actions) { }
}