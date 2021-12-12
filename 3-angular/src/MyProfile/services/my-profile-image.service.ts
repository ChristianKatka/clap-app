import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyProfileImageService {
  constructor(private http: HttpClient) {}

  public getSignedUrlForUploadingProfileImage(image: {
    name: string;
    mimeType: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/user/image/get-signed-url-for-uploading-profile-image`,
      image
    );
  }

  public storeUploadedProfileImageInformationToDB(
    name: string,
    mimeType: string,
    s3Key: string,
    userId: string,
  ): Observable<any> {
    console.log(      { name, mimeType, s3Key, userId }
      );
    
    return this.http.post(
      `${environment.apiBaseUrl}/user/image/store-uploaded-profile-image-information`,
      { name, mimeType, s3Key, userId }
    );
  }
}
