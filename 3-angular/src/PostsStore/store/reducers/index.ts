import {
  ActionReducerMap, createFeatureSelector, createSelector
} from '@ngrx/store';
import { AppState } from '../../../app/store/reducers';
import * as fromPending from './pending.reducer';
import * as fromPosts from './posts.reducer';

export const featureKey = 'post';
export interface PostsFeatureState {
  posts: fromPosts.PostsState;
  pending: fromPending.PendingState;
}

export interface PostsExtendedAppState extends AppState {
  post: PostsFeatureState;
}

export const reducers: ActionReducerMap<PostsFeatureState> = {
  posts: fromPosts.reducer,
  pending: fromPending.reducer,
};

const getPostsFeatureState =
  createFeatureSelector<PostsFeatureState>(featureKey);

export const getPosts = createFeatureSelector<fromPosts.PostsState>('posts');
export const getPostsState = createSelector(getPostsFeatureState, getPosts);

export const getPending =
  createFeatureSelector<fromPending.PendingState>('pending');
export const getPendingState = createSelector(getPostsFeatureState, getPending);
