export interface User {
  userName: string;
  sub?: string;
  email: string;
  marketingPermission: boolean;
  created_at?: string;
  updated_at?: string;
  confirmed?: boolean;
}

