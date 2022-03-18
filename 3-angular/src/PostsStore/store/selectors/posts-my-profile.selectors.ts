import { createSelector } from '@ngrx/store';
import { sortByCreatedAtDateAscending } from '@shared/helpers/sort-by-created-at-date-ascending';
import { of } from 'rxjs';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import { getPostsState } from '../reducers';
import { getAllPosts } from './posts.selectors';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);

export const getMyOwnPosts = createSelector(
  getAllPosts,
  getMyProfileState,
  (allPosts, profileState) => {
    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const myPosts = allPosts.filter((post) => post.userId === userId);

    return sortByCreatedAtDateAscending(myPosts);
  }
);

export const getMySavedPosts = createSelector(getPostsState, (state) => {
  return of('in progress');
});
