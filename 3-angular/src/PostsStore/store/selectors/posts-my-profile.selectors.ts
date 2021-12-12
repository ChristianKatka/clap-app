import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { of } from 'rxjs';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import { getPostsState } from '../reducers';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);

export const getMyOwnPosts = createSelector(
  getPostsState,
  getMyProfileState,
  (state, profileState) => {
    const posts = Object.values(state.entities);
    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const myPosts = posts.filter(
      (post: PostWithoutImage) => post.userId === userId
    );

    return sortByCreatedDate(myPosts);
  }
);

export const getMySavedPosts = createSelector(getPostsState, (state) => {
  return of('in progress');
});
