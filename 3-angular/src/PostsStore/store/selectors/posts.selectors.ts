import { createSelector } from '@ngrx/store';
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { getPostsState } from '../reducers';

export const getPosts = createSelector(getPostsState, (state) =>
  Object.values(state.entities)
);

export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);

export const getPostsWithoutImage = createSelector(
  getPosts,
  getSortBy,
  (posts, sortBy) => {
    const postsWithoutImage: PostWithoutImage[] = posts.filter(
      (post: PostWithoutImage) => post.postType === 'withoutImage'
    );

    if (sortBy === 'latest') {
      const sortedPosts: PostWithoutImage[] =
        sortByCreatedDate(postsWithoutImage);
      return sortedPosts;
    } else {
      return postsWithoutImage;
    }
  }
);
