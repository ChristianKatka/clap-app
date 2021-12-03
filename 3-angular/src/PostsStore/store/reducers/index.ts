import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';
import * as fromPosts from './posts.reducer';
import { AppState } from '../../../app/store/reducers';


export const featureKey = 'post';
export interface PostsFeatureState {
  posts: fromPosts.PostsState;
}

export interface PostsExtendedAppState extends AppState {
  post: PostsFeatureState;
}

export const reducers: ActionReducerMap<PostsFeatureState> = {
  posts: fromPosts.reducer,
};

const getPostsFeatureState =
  createFeatureSelector<PostsFeatureState>(featureKey);

export const getPosts = createFeatureSelector<fromPosts.PostsState>('posts');
export const getPostsState = createSelector(getPostsFeatureState, getPosts);
