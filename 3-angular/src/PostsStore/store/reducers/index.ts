import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AppState } from '../../../app/store/reducers';
import * as fromPendingPostLikes from './pending-posts-likes.reducer';
import * as fromPostsLikes from './posts-likes.reducer';
import * as fromPosts from './posts.reducer';

export const featureKey = 'post';
export interface PostsFeatureState {
  posts: fromPosts.PostsState;
  postsLikes: fromPostsLikes.PostsLikesState;
  pendingPostLikes: fromPendingPostLikes.PendingPostLikesState;
}

export interface PostsExtendedAppState extends AppState {
  post: PostsFeatureState;
}

export const reducers: ActionReducerMap<PostsFeatureState> = {
  posts: fromPosts.reducer,
  postsLikes: fromPostsLikes.reducer,
  pendingPostLikes: fromPendingPostLikes.reducer,
};

const getPostsFeatureState =
  createFeatureSelector<PostsFeatureState>(featureKey);

export const getPosts = createFeatureSelector<fromPosts.PostsState>('posts');
export const getPostsState = createSelector(getPostsFeatureState, getPosts);

export const getPostsLikes =
  createFeatureSelector<fromPostsLikes.PostsLikesState>('postsLikes');
export const getPostsLikesState = createSelector(
  getPostsFeatureState,
  getPostsLikes
);

export const getPending =
  createFeatureSelector<fromPendingPostLikes.PendingPostLikesState>(
    'pendingPostLikes'
  );
export const getPendingPostLikesState = createSelector(
  getPostsFeatureState,
  getPending
);
