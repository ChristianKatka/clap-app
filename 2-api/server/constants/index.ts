export const CLOUDFRONT_URL = 'https://' + process.env.CF_IMAGES_URL;

// S3
export const S3_MEDIAS_BUCKET = 'clap-app-medias';
export const S3_UPLOAD_SIGNED_URL_EXPIRES = 900;

//  TABLES
export const POSTS_TABLE = 'clap-app-posts';
export const POSTS_LIKES_TABLE = 'clap-app-posts-likes';
export const POSTS_MEDIAS_TABLE = 'clap-app-posts-medias';
export const USERS_TABLE = 'clap-app-users';
export const PROFILE_IMAGES_TABLE = 'clap-app-profile-images';
export const POSTS_COMMENTS_TABLE = 'clap-app-posts-comments';

// INDEX
export const POST_ID_INDEX = 'postId-gsi';
export const USER_ID_INDEX = 'userId-gsi';
