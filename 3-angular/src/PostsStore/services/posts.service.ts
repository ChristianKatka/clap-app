import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { LikeHelperService } from './like-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private likeHelperService: LikeHelperService,
    private authHttp: AuthHTTPService
  ) {}

  createPost(
    post: PostWithImageDraft | PostWithoutImageDraft
  ): Observable<any> {
    return this.authHttp.post(`${environment.apiBaseUrl}/posts`, post);
  }

  giveLikeToPost(postId: string): Observable<any> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/like/${postId}`,
      {}
    );
  }

  removeLikeFromPost(postId: string, userId: string): Observable<any> {
    console.log(postId);
    console.log(userId);

    const likeId = this.likeHelperService.getMyPostLike(postId, userId);
    console.log(likeId);
    
    return this.authHttp.delete(
      `${environment.apiBaseUrl}/posts/like/${likeId}`
    );
  }
}
