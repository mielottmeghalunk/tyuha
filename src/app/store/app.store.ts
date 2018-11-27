import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState, userReducer } from './user.reducer';

export interface AppState {
    user: UserState;
}

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUsers = createSelector(selectUserState, (state: UserState) => state.users);
export const selectPage = createSelector(selectUserState, (state: UserState) => state.page);


export const appReducers = {
    user: userReducer
};
