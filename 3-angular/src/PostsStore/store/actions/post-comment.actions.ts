import { createAction, props } from '@ngrx/store';
import {
  PostCommentApiResponse,
  PostCommentDraft
} from '@shared/models/post-comment.model';

export const createCommentToPostWithoutId = createAction(
  '[Post Comment] Create Comment To Post Without Id',
  props<{ postId: string; text: string }>()
);

export const createCommentToPost = createAction(
  '[Post Comment] Create Comment To Post',
  props<{ postCommentDraft: PostCommentDraft }>()
);
export const createCommentToPostSuccess = createAction(
  '[Post Comment] Create Comment To Post Success',
  props<{ postComment: PostCommentApiResponse }>()
);
export const createCommentToPostFailure = createAction(
  '[Post Comment] Create Comment To Post Failure',
  props<{ error: string }>()
);

export const newPostCommentHappenedViaSocket = createAction(
  '[Post Comment] New Post Comment Happened Via Socket',
  props<{ postComment: PostCommentApiResponse }>()
);
