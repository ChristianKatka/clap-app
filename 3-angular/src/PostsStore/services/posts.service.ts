import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { PostCommentDraft } from '@shared/models/post-comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private authHttp: AuthHTTPService) {}

  createPost(
    post: PostWithImageDraft | PostWithoutImageDraft
  ): Observable<any> {
    return this.authHttp.post(`${environment.apiBaseUrl}/posts`, post);
  }

  giveLikeToPost(postId: string, likeId: string): Observable<any> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/like/${postId}/${likeId}`,
      {}
    );
  }

  removeLikeFromPost(likeId: string): Observable<{ likeId: string }> {
    return this.authHttp.delete(
      `${environment.apiBaseUrl}/posts/like/${likeId}`
    );
  }

  createCommentToPost(postCommentDraft: PostCommentDraft): Observable<any> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/comment/${postCommentDraft.postId}/${postCommentDraft.id}`,
      {
        text: postCommentDraft.text,
        likersProfileImage: postCommentDraft.likersProfileImage,
      }
    );
  }
}
