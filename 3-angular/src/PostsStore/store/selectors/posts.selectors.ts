import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';
import { PostLike } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { getPostsState } from '../reducers';
import { getMyProfileState } from '../../../MyProfile/store/reducers';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);

export const getPostsWithoutImage = createSelector(
  getPostsState,
  getMyProfileState,
  getSortBy,
  (postsState, profileState, sortBy) => {
    const posts = Object.values(postsState.entities);
    const postsLikes = Object.values(postsState.postsLikes);
    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const postsWithLikes: PostWithoutImage[] | [] = posts.map((post: PostWithoutImage) => {
      const postLikes: PostLike[] = postsLikes.filter(
        (postLike: PostLike) => post.id === postLike.postId
      );

      const iLikeThisPost: PostLike | undefined = postLikes.filter(
        (postLike: PostLike) => postLike.userId === userId
      )[0];

      if (iLikeThisPost) {
        return { ...post, postLikes, iLikeThisPost: iLikeThisPost.id };
      } else {
        return { ...post, postLikes, iLikeThisPost: undefined };
      }
    });

    if (sortBy === 'latest') {
      const sortedPosts: PostWithoutImage[] = sortByCreatedDate(postsWithLikes);
      return sortedPosts;
    } else {
      return postsWithLikes;
    }
  }
);

export const isLoading2 = createSelector(
  getPostsState,
  getMyProfileState,
  (state, state2) => state.loading
);

export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);

// export const getPostsWithoutImage = createSelector(
//   getPosts,
//   getSortBy,
//   (posts, sortBy) => {
//     const postsWithoutImage: PostWithoutImage[] = posts.filter(
//       (post: PostWithoutImage) => post.postType === 'withoutImage'
//     );

//     if (sortBy === 'latest') {
//       const sortedPosts: PostWithoutImage[] =
//         sortByCreatedDate(postsWithoutImage);
//       return sortedPosts;
//     } else {
//       return postsWithoutImage;
//     }
//   }
// );
