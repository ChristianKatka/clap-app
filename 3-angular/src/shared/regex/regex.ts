// Allows a string that starts or ends with white spaces and will not allow a string containing only white spaces

export const noOnlyWhiteSpacePattern = /^(\s+\S+\s*)*(?!\s).*$/;

//Cognito password regex
export const noWhiteSpaceAtStartOrEndPattern = /^[\S]+.*[\S]+$/;

export const urlPattern =
  /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9-.]+\.[a-z]+(\/[a-zA-Z0-9#-]+\/?)*$/;
