export const CLOUDFRONT_URL = 'https://' + process.env.CF_IMAGES_URL;

// S3
export const S3_IMAGES_BUCKET = 'image-upload-s3-test123';
export const S3_UPLOAD_SIGNED_URL_EXPIRES = 900;

//  TABLES
export const POSTS_TABLE = 'clap-app-posts';
export const POSTS_LIKES_TABLE = 'clap-app-posts-likes';
export const USERS_TABLE = 'clap-app-users';
export const PROFILE_IMAGES = 'clap-app-profile-images';

// INDEX
export const POST_ID_INDEX = 'postId-gsi';
export const USER_ID_INDEX = 'userId-gsi';
