import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { Post, PostDraft } from '@shared/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private authHttp: AuthHTTPService) {}

  getAllPosts(): Observable<any> {
    return this.authHttp.get(`${environment.apiBaseUrl}/posts`);
  }

  createPost(post: PostDraft): Observable<any> {
    return this.authHttp.post(`${environment.apiBaseUrl}/posts`, post);
  }
}
