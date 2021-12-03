import { createAction, props } from '@ngrx/store';
import { Post, PostDraft } from '@shared/models/post.model';

// GET ALL
export const getAllPosts = createAction(
  '[Posts] Get All Posts'
);
export const getAllPostsSuccess = createAction(
  '[Posts] Get All Posts Success',
  props<{ posts: Post[] }>()
);
export const getAllPostsFailure = createAction(
  '[Posts] Get All Posts Failure',
  props<{ error: string }>()
);

// CREATE
export const createPost = createAction(
  '[Posts] Create Post',
  props<{ postDraft: PostDraft }>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ post: Post }>()
);
export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{ error: string }>()
);
