export interface MyProfile {
  id: string;
  email: string;
  nickname: string;
  bio: string;
  selectedLocation: string;
}

export interface MyProfileWithProfileImage {
  id: string;
  email: string;
  nickname: string;
  bio: string;
  selectedLocation: string;
  profileImageUrl: string;
}
