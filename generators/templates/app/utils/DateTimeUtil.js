'use strict';

import moment from 'moment';

const fullMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const shortMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

const fullDaysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
const shortDaysOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

export default class DateTimeUtil {

  static getFullMonthList() {
    return fullMonths;
  }

  static getShortMonthList() {
    return shortMonths;
  }

  static getDaysInMonth(date) {
    const num = moment(date).daysInMonth();
    return num;
  }

  static getFirstDayOfMonth(date) {
    const newDate = moment(date).startOf('month');
    return newDate.toDate();
  }

  static getEndOfMonth(date) {
    const newDate = moment(date).endOf('month');
    return newDate.toDate();
  }

  static getLastDateOfMonth(date) {
    const newDate = this.getEndOfMonth(date);
    return newDate.getDate();
  }

  static getFirstDayOfWeek(date) {

    const firstWeekDay = moment(this.getFirstDayOfMonth(date)).day();
    return firstWeekDay;
  }

  static getFullMonth(date, uppercase = false, zeroIndexed = true) {

    if (typeof date === 'undefined' || date === null || date === "") {
      return "";
    } else {

      const month = moment(date).month();
      return (uppercase) ? fullMonths[month].toUpperCase() : fullMonths[month];
    }

  }

  static getShortMonth(date, uppercase = false, zeroIndex = true) {

    if (typeof date === 'undefined' || date === null || date === "") {
      return "";
    } else {
      const month = moment(date).month();
      return (uppercase) ? shortMonths[month].toUpperCase() : shortMonths[month];
    }

  }

  static getFullMonthByNum(month, uppercase = false, zeroIndexed = true) {

    if (typeof month === 'undefined' || month === null || month === "") {
      return "";
    } else {

      if (!zeroIndexed) {
        month--;
      }
      return (uppercase) ? fullMonths[month].toUpperCase() : fullMonths[month];
    }

  }

  static getShortMonthByNum(month, uppercase = false, zeroIndexed = true) {

    if (typeof month === 'undefined' || month === null || month === "") {
      return "";
    } else {

      if (!zeroIndexed) {
        month--;
      }

      return (uppercase) ? shortMonths[month].toUpperCase() : shortMonths[month];
    }

  }

  static getFullDayOfWeek(day, uppercase = false, zeroIndexed = true) {

    if (typeof day === 'undefined' || day === null || day === "") {
      return "";
    } else {

      if (!zeroIndexed) {
        day--;
      }

      return (uppercase) ? fullDaysOfWeek[day].toUpperCase() : fullDaysOfWeek[day];
    }

  }

  static getShortDayOfWeek(day, uppercase = false, zeroIndexed = true) {

    if (typeof day === 'undefined' || day === null || day === "") {
      return "";
    } else {

      if (!zeroIndexed) {
        day--;
      }

      return (uppercase) ? shortDaysOfWeek[day].toUpperCase() : shortDaysOfWeek[day];
    }

  }

  static cloneDate(date) {
    return new Date(date.getTime());
  }

  static cloneAsDate(date) {
    const cloned = this.cloneDate(date);
    cloned.setHours(0, 0, 0, 0);
    return cloned;
  }

//=========================================================
// DATE MANIPULATIONS
//=========================================================

  static addDays(date, days) {
    const newDate = moment(date).add(days, 'days');
    return newDate.toDate();
  }


  static addWeeks(date, weeks) {
    const newDate = moment(date).add(weeks, 'weeks');
  }

  static addMonths(date, months) {
    const newDate = moment(date).add(months, 'months');
    return newDate.toDate();
  }

  static addYears(date, years) {
    const newDate = moment(date).add(years, 'years');
    return newDate.toDate();
  }

  static substractDays(date, days) {
    const newDate = moment(date).substract(days, 'days');
    return newDate.toDate();
  }


  static substractWeeks(date, weeks) {
    const newDate = moment(date).substract(weeks, 'weeks');
  }

  static substractMonths(date, months) {
    const newDate = moment(date).substract(months, 'months');
    return newDate.toDate();
  }

  static substractYears(date, years) {
    const newDate = moment(date).substract(years, 'years');
    return newDate.toDate();
  }

  //=========================================================
  // SETTERS
  //=========================================================

  static setHours(date, hour) {
    const newDate = moment(date).hour(hour);
    return newDate.toDate();
  }

  static setMinutes(date, minute) {
    const newDate = moment(date).minute(minute);
    return newDate.toDate();
  }

  static setDay(date, day) {
    const newDate = moment(date).date(day);
    return newDate.toDate();
  }

  static setMonth(date, month) {
    const newDate = moment(date).month(month);
    return newDate.toDate();
  }

  static setYear(date, year) {
    const newDate = moment(date).year(year);
    return newDate.toDate();
  }

//=========================================================
// VALIDATIONS
//=========================================================

  static isDateDisabled(minDate, maxDate, date, inc = 'both') {

    let disabled = false;

    let inclusion = '[]';

    if (inc === 'min') {
      inclusion = '[)';
    } else if (inc === 'max') {
      inclusion = '(]';
    } else if (inc === 'none') {
      inclusion = '()'
    }

    if(
      minDate && typeof minDate !== 'undefined' && moment(minDate).isValid() &&
      maxDate && typeof maxDate !== 'undefined' && moment(maxDate).isValid()
    ) {

      disabled = !moment(date).isBetween(minDate, maxDate, null, inclusion);

    } else if (minDate && typeof minDate !== 'undefined' && moment(minDate).isValid()) {
      if (inc === 'min' || inc === 'both') {
        disabled = moment(date).isBefore(minDate);
      } else {
        disabled = moment(date).isSameOrBefore(minDate);
      }

    } else if (maxDate && typeof maxDate !== 'undefined' && moment(maxDate).isValid()) {

      if (inc === 'max' || inc === 'both') {
        disabled = moment(date).isAfter(minDate);
      } else {
        disabled = moment(date).isSameOrAfter(minDate);
      }
    }

    return disabled;
  }

  static isYearDisabled(minDate, maxDate, year, inc = 'both') {
    let disabled = false;

    if(
      minDate && typeof minDate !== 'undefined' && moment(minDate).isValid() &&
      maxDate && typeof maxDate !== 'undefined' && moment(maxDate).isValid()
    ) {

      if (inc === 'min') {
        disabled = !(year >= minDate.getFullYear() && year < maxDate.getFullYear());
      } else if (inc === 'max') {
        disabled = !(year > minDate.getFullYear() && year <= maxDate.getFullYear());
      } else if (inc === 'none') {
        disabled = !(year > minDate.getFullYear() && year < maxDate.getFullYear());
      } else {
        disabled = !(year >= minDate.getFullYear() && year <= maxDate.getFullYear());
      }

    } else if (minDate && typeof minDate !== 'undefined' && moment(minDate).isValid()) {

      if (inc === 'min' || inc === 'both') {
        disabled = year < minDate.getFullYear();
      } else {
        disabled = year <= minDate.getFullYear();
      }

    } else if (maxDate && typeof maxDate !== 'undefined' && moment(maxDate).isValid()) {

      if (inc === 'max' || inc === 'both') {
        disabled = year > minDate.getFullYear();
      } else {
        disabled = year >= minDate.getFullYear();
      }
    }

    return disabled;
  }

  static isValidDate(date) {

    return moment(date).isValid();
  }

}
