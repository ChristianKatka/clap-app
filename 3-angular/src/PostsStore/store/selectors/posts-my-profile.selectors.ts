import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';
import { PostLike } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { getPostsState } from '../reducers';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import { of } from 'rxjs';

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

    console.log(myPosts);

    return sortByCreatedDate(myPosts);
  }
);

export const getMySavedPosts = createSelector(getPostsState, (state) => {
  return of('in progress');
});
