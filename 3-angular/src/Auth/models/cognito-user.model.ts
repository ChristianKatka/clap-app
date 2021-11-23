export type CognitoUserType = {
  userName: string;
  attributes: { name: string; value?: string }[];
  userCreateDate: string;
  userLastModifiedDate: string;
  enabled: boolean;
  userStatus:
    | 'UNCONFIRMED'
    | 'CONFIRMED'
    | 'ARCHIVED'
    | 'COMPROMISED'
    | 'UNKNOWN'
    | 'RESET_REQUIRED'
    | 'FORCE_CHANGE_PASSWORD'
    | string;
  mfaOptions?: [{ deliveryMedium?: string; attributeName?: string }];
  preferredMfaSetting?: string;
  userMFASettingList?: string[];
};

export interface CognitoUserWithGroups extends CognitoUserType {
  groups: string[];
}
