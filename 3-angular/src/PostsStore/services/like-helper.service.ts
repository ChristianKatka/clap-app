import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { Store } from '@ngrx/store';
import { PostsExtendedAppState } from '../store/reducers';
import { PostsSelectors } from '../store/selectors';
import { PostLike } from '@shared/models/post-like.model';

@Injectable({
  providedIn: 'root',
})
export class LikeHelperService {
  private post: any;

  constructor(private store: Store<PostsExtendedAppState>) {}

  getMyPostLike(postId: string, userId: string) {
    this.store.select(PostsSelectors.getPostById(postId)).subscribe({
      next: (post: any) => (this.post = post),
    });

    const like = this.post.likes.filter(
      (like: PostLike) => like.userId === userId
    )[0];

    console.log(this.post);
    console.log(postId);
    console.log(userId);
    console.log(like);
    
    
    
    return like.id;
  }
}
