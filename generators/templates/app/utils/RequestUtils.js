import $ from 'jquery';


export default class RequestUtils {
  static buildQueryParam(obj) {
    if(!obj) return "";

    return $.param(obj);
  }
}
