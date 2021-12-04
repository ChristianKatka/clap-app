import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';

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

  giveLikeToPost(postId: string): Observable<any> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/like/${postId}`,
      {}
    );
  }

  removeLikeFromPost(likeId: string): Observable<any> {
    return this.authHttp.delete(
      `${environment.apiBaseUrl}/posts/like/${likeId}`
    );
  }
}
