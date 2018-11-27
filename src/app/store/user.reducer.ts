import { AppActions, AppAction } from './app.actions';

export class UserState {
  public users: any[];
  public page: number;

  constructor() {
    this.users = [];
    this.page = 1;
  }
}

export function userReducer(state = new UserState(), action: AppAction): UserState {
  switch (action.type) {
    case AppActions.GET_USERS_ACTION: {
      const page = state.page + 1;

      return {
        ...state,
        page
      };
    }

    case AppActions.GET_USERS_ACTION_COMPLETED: {
      return {
        ...state,
        users: [...state.users, ...action.users]
      };
    }

    default:
      return state;
  }
}
