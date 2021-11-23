// TODO: Remove this class and move these messages into authentication effect with i18n translations

export class CognitoMessages {
  public static getLoginErrorMessageByCode(code: string): string {
    switch (code) {
      case 'UserNotFoundException':
        return 'Valitettavasti käyttäjätunnus on virheellinen.';

      case 'NotAuthorizedException':
        return 'Salasana on virheellinen.';

      default:
        return code;
    }
  }

  public static getRegisterErrorMessageByCode(code: string): string {
    switch (code) {
      case 'InvalidPasswordException':
        return 'Salasanan tulee olla vähintään 6 merkkiä pitkä sisältäen isoja ja pieniä kirjaimia sekä numeroita.';

      case 'UsernameExistsException':
        return 'Käyttäjätunnus on jo käytössä';

      default:
        return code;
    }
  }
}
