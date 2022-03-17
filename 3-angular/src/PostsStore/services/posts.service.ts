import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { CommentLike } from '@shared/models/comment-like.model';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { PostLike } from '@shared/models/post-like.model';
import {
  PostWithMediaApiRes,
  PostWithMediaImageUploaded,
} from '@shared/models/post-with-media.model';
import { PostApiResponse, PostDraft } from '@shared/models/post.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private authHttp: AuthHTTPService) {}

  createPostWithMedia(
    postWithMediaDraft: PostWithMediaImageUploaded
  ): Observable<PostWithMediaApiRes> {
    console.log(postWithMediaDraft);
    
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/with-media`,
      postWithMediaDraft
    );
  }

  createPost(postDraftToDb: PostDraft): Observable<PostApiResponse> {
    return this.authHttp.post(`${environment.apiBaseUrl}/posts`, postDraftToDb);
  }

  giveLikeToPost(postId: string, likeId: string): Observable<PostLike> {
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

  createCommentToPost(
    postCommentDraft: PostCommentDraft
  ): Observable<PostComment> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/comment/${postCommentDraft.postId}/${postCommentDraft.id}`,
      {
        text: postCommentDraft.text,
        commentersProfileImage: postCommentDraft.commentersProfileImage,
        nickname: postCommentDraft.nickname,
      }
    );
  }

  giveLikeToComment(
    commentId: string,
    likeId: string
  ): Observable<CommentLike> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/comment/like/${commentId}/${likeId}`,
      {}
    );
  }

  removeLikeFromComment(likeId: string): Observable<{ likeId: string }> {
    return this.authHttp.delete(
      `${environment.apiBaseUrl}/posts/comment/like/${likeId}`
    );
  }

  getSignedUrlForUploadingPostImage(
    imageName: string,
    mimeType: string
  ): Observable<{
    imageName: string;
    uploadUrl: string;
    s3Key: string;
    mimeType: string;
  }> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/posts/get-signed-url-for-uploading-post-image`,
      { imageName, mimeType }
    );
  }
}
