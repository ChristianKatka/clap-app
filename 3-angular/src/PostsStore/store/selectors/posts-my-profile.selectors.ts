import { createSelector } from '@ngrx/store';
import { of } from 'rxjs';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import { getPostsState } from '../reducers';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);

export const getMyOwnPosts = createSelector(
  getPostsState,
  getMyProfileState,
  (state, profileState) => {
    // const posts = Object.values(state.entities);
    // const userId = profileState.myProfile?.id;
    // if (!userId) return [];

    // const myPosts = posts.filter(
    //   (post: PostWithoutImage) => post.userId === userId
    // );

    // return sortByCreatedDate(myPosts);
    return [];
  }
);

export const getMySavedPosts = createSelector(getPostsState, (state) => {
  return of('in progress');
});
