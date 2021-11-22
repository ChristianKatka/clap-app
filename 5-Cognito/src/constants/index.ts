const DOMAIN: string = `${process.env.DOMAIN}`;
const SUB_DOMAIN: string = `partner.${DOMAIN}`;
const LOGIN_URL: string = `https://${SUB_DOMAIN}/login`;

const USERS_TABLE = 'clap-app-users';

export {
  USERS_TABLE,
  DOMAIN,
  SUB_DOMAIN,
  LOGIN_URL
}
