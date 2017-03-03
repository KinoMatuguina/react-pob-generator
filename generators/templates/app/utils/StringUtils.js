/**
* StringUtils
*/

export default class StringUtils {
  static getLettersForAvatar(string) {
    const splittedText = string.split(" ");

    if (splittedText.length >= 2) {
      return splittedText[0].charAt(0) + "" + splittedText[1].charAt(0);
    } else if(splittedText.length === 1) {
      return splittedText[0].charAt(0);
    } else {
      return "?";
    }

  }
}
