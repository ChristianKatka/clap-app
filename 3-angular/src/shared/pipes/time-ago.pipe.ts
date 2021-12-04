import { Pipe, PipeTransform } from '@angular/core';
import { removeLastThreeDigitsOfaNumber } from '@shared/helpers/remove-last-three-digits-of-a-number';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: number | null): string {
    if (!value) {
      return 'no-date';
    }

    const dateNow = removeLastThreeDigitsOfaNumber(Date.now());
    const createdAt = removeLastThreeDigitsOfaNumber(value);

    // difference is in seconds
    const difference = dateNow - createdAt;

    // One second = 1 in UNIX time. One minute = 60 in UNIX time. 10 minutes = 600 in UNIX time.
    if (difference >= 0 && difference < 30) {
      return 'just now';
    }
    if (difference >= 30 && difference < 45) {
      return '30 seconds ago';
    }
    if (difference >= 45 && difference < 60) {
      return '45 seconds ago';
    }
    if (difference >= 60 && difference < 120) {
      return '1 minute ago';
    }
    if (difference >= 120 && difference < 180) {
      return '2 minutes ago';
    }
    // PUUTTUU

    if (difference >= 3600 && difference < 7200) {
      return '1 hour ago';
    }
    if (difference >= 7200 && difference < 10800) {
      return '2 hours ago';
    }

    // PUUTTUU

    if (difference >= 86400 && difference < 172800) {
      return '1 day ago';
    }
    if (difference >= 172800 && difference < 259200) {
      return '2 days ago';
    }
    if (difference >= 259200) {
      return 'over 2 days ago';
    } else {
      return 'something went wrong with date';
    }
  }
}
