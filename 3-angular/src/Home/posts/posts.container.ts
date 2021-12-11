import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PostLike,
  PostLikeDraft,
  PostLikeDraftWithoutId,
} from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { interval, Observable, take } from 'rxjs';
import { MyProfileSelectors } from 'src/MyProfile/store/selectors';
import { PostsActions } from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import {
  PendingSelectors,
  PostsSelectors,
} from 'src/PostsStore/store/selectors';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'clap-app-posts-container',
  templateUrl: 'posts.container.html',
  styleUrls: ['posts.container.scss'],
})
export class PostsContainerComponent implements OnInit {
  postsWithoutImage$: Observable<PostWithoutImage[]> = this.store.select(
    PostsSelectors.getPostsWithoutImage
  );
  loading$: Observable<boolean> = this.store.select(PostsSelectors.isLoading);
  userId$ = this.store.select(MyProfileSelectors.getMyUserId);
  // pendingRequests$ = this.store.select(PendingSelectors.getPendingRequests);

  postsWithoutImage: PostWithoutImage[] = [];
  userId: string | undefined = undefined;
  pendingRequests: { [id: string]: PostLikeDraft | string } = {};

  constructor(private store: Store<PostsExtendedAppState>) {}

  ngOnInit() {}

  onGiveLikeToPost(post: PostWithoutImage) {
    this.store.dispatch(
      PostsActions.giveLikeToPostWithoutId({ postId: post.id })
    );
  }

  // onGiveLikeToPost(post: PostWithoutImage) {
  //   this.getValuesThatAreRightNowInTheState();

  //   if (!this.userId) return;

  //   // Tsekkaa pending tilasta
  //   console.log(this.pendingRequests);

  //   const iHaveAlreadyLikedThisPost = false;
  //   console.log(iHaveAlreadyLikedThisPost);

  //   if (iHaveAlreadyLikedThisPost) {
  //     console.log('olen tykännyt aiemmin');
  //     // this.store.dispatch(
  //     //   PostsActions.giveLikeToPost({
  //     //     postLikeDraft: {
  //     //       id: iHaveAlreadyLikedThisPost.id,
  //     //       postId,
  //     //       userId: this.userId,
  //     //     },
  //     //   })
  //     // );
  //   } else {
  //     console.log('en ole tykännyt aiemmin');

  //     const id = uuid();
  //     this.store.dispatch(
  //       PostsActions.giveLikeToPost({
  //         postLikeDraft: { id, postId: post.id, userId: this.userId },
  //       })
  //     );
  //   }
  // }

  // getValuesThatAreRightNowInTheState() {
  //   this.postsWithoutImage$.pipe(take(1)).subscribe({
  //     next: (postsWithoutImage) => (this.postsWithoutImage = postsWithoutImage),
  //     error: (e) => console.error(e),
  //     complete: () => console.info('complete'),
  //   });

  //   this.userId$.pipe(take(1)).subscribe({
  //     next: (userId) => {
  //       if (!userId) return;
  //       this.userId = userId;
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => console.info('complete'),
  //   });

  //   // this.pendingRequests$.pipe(take(1)).subscribe({
  //   //   next: (pendingRequests) => {
  //   //     this.pendingRequests = pendingRequests;
  //   //   },
  //   //   error: (e) => console.error(e),
  //   //   complete: () => console.info('complete'),
  //   // });
  // }

  // // onGiveLikeToPost(postId: string) {
  // //   // jos postId ja userId löytyy jo postLikesistä olen jo tykännyt postauksesta
  // //   this.postsWithoutImage$.subscribe({
  // //     next: (postsWithoutImage: PostWithoutImage[]) => {
  // //       this.userId$.subscribe({
  // //         next: (userId) => {
  // //           if (!userId) return {};

  // //           const postThatImGivingTheLikeTo = postsWithoutImage.filter(
  // //             (postWithoutImage: PostWithoutImage) =>
  // //               postWithoutImage.id === postId
  // //           )[0];

  // //           const iHaveAlreadyLikedThisPost =
  // //             postThatImGivingTheLikeTo.postLikes.filter(
  // //               (postLike) =>
  // //                 postLike.postId === postId && postLike.userId === userId
  // //             )[0];

  // //           if (iHaveAlreadyLikedThisPost) {
  // //             console.log('olen tykännyt aiemmin');
  // //             // this.store.dispatch(
  // //             //   PostsActions.giveLikeToPost({
  // //             //     postLikeDraft: {
  // //             //       id: iHaveAlreadyLikedThisPost.id,
  // //             //       postId,
  // //             //       userId,
  // //             //     },
  // //             //   })
  // //             // );

  // //             return {};
  // //           } else {
  // //             console.log('en ole tykännyt aiemmin');

  // //             const id = uuid();
  // //             this.store.dispatch(
  // //               PostsActions.giveLikeToPost({
  // //                 postLikeDraft: { id, postId, userId },
  // //               })
  // //             );
  // //             return {};
  // //           }
  // //         },
  // //       });
  // //     },
  // //   });
  // // }

  onRemoveLikeFromPost(like: PostLike | PostLikeDraft) {
    this.store.dispatch(PostsActions.removeLikeFromPost({ like }));
  }
}
