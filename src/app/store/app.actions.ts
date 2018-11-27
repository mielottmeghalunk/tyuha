import { Action } from '@ngrx/store';

export type AppAction = GetUsersAction | GetUsersActionCompleted | DeleteUsersAction | DeleteUsersActionCompleted;

export enum AppActions {
  GET_USERS_ACTION = 'Get Users Action',
  GET_USERS_ACTION_COMPLETED = 'Get Users Action Completed',
  DELETE_USERS_ACTION = 'Delete Users Action',
  DELETE_USERS_ACTION_COMPLETED = 'Delete Users Action Completed'
}

export class GetUsersAction implements Action {
  public readonly type: AppActions.GET_USERS_ACTION = AppActions.GET_USERS_ACTION;
  constructor() {}
}

export class GetUsersActionCompleted implements Action {
  public readonly type: AppActions.GET_USERS_ACTION_COMPLETED = AppActions.GET_USERS_ACTION_COMPLETED;
  constructor(public users?: any[]) {}
}

export class DeleteUsersAction implements Action {
  public readonly type: AppActions.DELETE_USERS_ACTION = AppActions.DELETE_USERS_ACTION;
  constructor(public id: number) {}
}

export class DeleteUsersActionCompleted implements Action {
  public readonly type: AppActions.DELETE_USERS_ACTION_COMPLETED = AppActions.DELETE_USERS_ACTION_COMPLETED;
  constructor(public users: any[]) {}
}
