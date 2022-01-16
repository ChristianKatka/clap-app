import { createAction } from '@ngrx/store';

export const showNewMessagesBelowPopUp = createAction(
  '[Post Comment UI] Show New Messages Below Pop Up'
);

export const hideNewMessagesBelowPopUp = createAction(
  '[Post Comment UI] Hide New Messages Below Pop Up'
);

export const iCreatedNewComment = createAction(
  '[Post Comment UI] I Created New Comment (scroll bottom after)'
);
