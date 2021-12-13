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
    if (difference >= 180 && difference < 240) {
      return '3 minutes ago';
    }
    if (difference >= 240 && difference < 300) {
      return '4 minutes ago';
    }
    if (difference >= 300 && difference < 360) {
      return '5 minutes ago';
    }
    if (difference >= 360 && difference < 420) {
      return '6 minutes ago';
    }
    if (difference >= 420 && difference < 480) {
      return '7 minutes ago';
    }
    if (difference >= 480 && difference < 540) {
      return '8 minutes ago';
    }
    if (difference >= 540 && difference < 600) {
      return '9 minutes ago';
    }
    if (difference >= 600 && difference < 660) {
      return '10 minutes ago';
    }
    if (difference >= 660 && difference < 720) {
      return '11 minutes ago';
    }
    if (difference >= 720 && difference < 780) {
      return '12 minutes ago';
    }
    if (difference >= 780 && difference < 840) {
      return '13 minutes ago';
    }
    if (difference >= 840 && difference < 900) {
      return '14 minutes ago';
    }
    if (difference >= 900 && difference < 960) {
      return '15 minutes ago';
    }
    if (difference >= 960 && difference < 1020) {
      return '16 minutes ago';
    }
    if (difference >= 1020 && difference < 1080) {
      return '17 minutes ago';
    }
    if (difference >= 1080 && difference < 1140) {
      return '18 minutes ago';
    }
    if (difference >= 1140 && difference < 1200) {
      return '19 minutes ago';
    }
    if (difference >= 1200 && difference < 1260) {
      return '20 minutes ago';
    }
    if (difference >= 1260 && difference < 1320) {
      return '21 minutes ago';
    }
    if (difference >= 1320 && difference < 1380) {
      return '22 minutes ago';
    }
    if (difference >= 1380 && difference < 1440) {
      return '23 minutes ago';
    }
    if (difference >= 1440 && difference < 1500) {
      return '24 minutes ago';
    }
    if (difference >= 1500 && difference < 1560) {
      return '25 minutes ago';
    }
    if (difference >= 1560 && difference < 1620) {
      return '26 minutes ago';
    }
    if (difference >= 1620 && difference < 1680) {
      return '27 minutes ago';
    }
    if (difference >= 1680 && difference < 1740) {
      return '28 minutes ago';
    }
    if (difference >= 1740 && difference < 1800) {
      return '29 minutes ago';
    }
    if (difference >= 1800 && difference < 1800) {
      return '30 minutes ago';
    }
    if (difference >= 1800 && difference < 1920) {
      return '31 minutes ago';
    }
    if (difference >= 1920 && difference < 1980) {
      return '32 minutes ago';
    }
    if (difference >= 1980 && difference < 2040) {
      return '33 minutes ago';
    }
    if (difference >= 2040 && difference < 2100) {
      return '34 minutes ago';
    }
    if (difference >= 2100 && difference < 2160) {
      return '35 minutes ago';
    }
    if (difference >= 2160 && difference < 2220) {
      return '36 minutes ago';
    }
    if (difference >= 2220 && difference < 2280) {
      return '37 minutes ago';
    }
    if (difference >= 2280 && difference < 2340) {
      return '38 minutes ago';
    }
    if (difference >= 2340 && difference < 2400) {
      return '39 minutes ago';
    }
    if (difference >= 2400 && difference < 2460) {
      return '40 minutes ago';
    }
    if (difference >= 2460 && difference < 2520) {
      return '41 minutes ago';
    }
    if (difference >= 2520 && difference < 2580) {
      return '42 minutes ago';
    }
    if (difference >= 2580 && difference < 2640) {
      return '43 minutes ago';
    }
    if (difference >= 2640 && difference < 2700) {
      return '44 minutes ago';
    }
    if (difference >= 2700 && difference < 2760) {
      return '45 minutes ago';
    }
    if (difference >= 2760 && difference < 2820) {
      return '46 minutes ago';
    }
    if (difference >= 2820 && difference < 2880) {
      return '47 minutes ago';
    }
    if (difference >= 2880 && difference < 2940) {
      return '48 minutes ago';
    }
    if (difference >= 2940 && difference < 3000) {
      return '49 minutes ago';
    }
    if (difference >= 3000 && difference < 3060) {
      return '50 minutes ago';
    }
    if (difference >= 3060 && difference < 3120) {
      return '51 minutes ago';
    }
    if (difference >= 3120 && difference < 3180) {
      return '52 minutes ago';
    }
    if (difference >= 3180 && difference < 3240) {
      return '53 minutes ago';
    }
    if (difference >= 3240 && difference < 3300) {
      return '54 minutes ago';
    }
    if (difference >= 3300 && difference < 3360) {
      return '55 minutes ago';
    }
    if (difference >= 3360 && difference < 3420) {
      return '56 minutes ago';
    }
    if (difference >= 3420 && difference < 3480) {
      return '57 minutes ago';
    }
    if (difference >= 3480 && difference < 3540) {
      return '58 minutes ago';
    }
    if (difference >= 3540 && difference < 1140) {
      return '59 minutes ago';
    }
    if (difference >= 3600 && difference < 7200) {
      return '1 hour ago';
    }
    if (difference >= 7200 && difference < 10800) {
      return '2 hours ago';
    }
    if (difference >= 10800 && difference < 14400) {
      return '3 hours ago';
    }
    if (difference >= 14400 && difference < 18000) {
      return '4 hours ago';
    }
    if (difference >= 18000 && difference < 21600) {
      return '5 hours ago';
    }
    if (difference >= 21600 && difference < 25200) {
      return '6 hours ago';
    }
    if (difference >= 25200 && difference < 28800) {
      return '7 hours ago';
    }
    if (difference >= 28800 && difference < 32400) {
      return '8 hours ago';
    }
    if (difference >= 32400 && difference < 36000) {
      return '9 hours ago';
    }
    if (difference >= 36000 && difference < 39600) {
      return '10 hours ago';
    }
    if (difference >= 39600 && difference < 43200) {
      return '11 hours ago';
    }
    if (difference >= 43200 && difference < 46800) {
      return '12 hours ago';
    }
    if (difference >= 46800 && difference < 50400) {
      return '13 hours ago';
    }
    if (difference >= 50400 && difference < 54000) {
      return '14 hours ago';
    }
    if (difference >= 54000 && difference < 57600) {
      return '15 hours ago';
    }
    if (difference >= 57600 && difference < 61200) {
      return '16 hours ago';
    }
    if (difference >= 61200 && difference < 64800) {
      return '17 hours ago';
    }
    if (difference >= 64800 && difference < 68400) {
      return '18 hours ago';
    }
    if (difference >= 68400 && difference < 72000) {
      return '19 hours ago';
    }
    if (difference >= 72000 && difference < 75600) {
      return '20 hours ago';
    }
    if (difference >= 75600 && difference < 79200) {
      return '21 hours ago';
    }
    if (difference >= 79200 && difference < 82800) {
      return '22 hours ago';
    }
    if (difference >= 82800 && difference < 86400) {
      return '23 hours ago';
    }
    if (difference >= 86400 && difference < 172800) {
      return '1 day ago';
    }
    if (difference >= 172800 && difference < 259200) {
      return '2 days ago';
    }
    if (difference >= 259200 && difference < 345600) {
      return '3 days ago';
    }
    if (difference >= 345600 && difference < 432000) {
      return '4 days ago';
    }
    if (difference >= 432000 && difference < 518400) {
      return '5 days ago';
    }
    if (difference >= 518400 && difference < 604800) {
      return '6 days ago';
    }
    if (difference >= 604800 && difference < 691200) {
      return '7 days ago';
    }
    if (difference >= 691200 && difference < 777600) {
      return '8 days ago';
    }
    if (difference >= 777600 && difference < 864000) {
      return '9 days ago';
    }
    if (difference >= 864000 && difference < 950400) {
      return '10 days ago';
    }
    if (difference >= 950400 && difference < 1036800) {
      return '11 days ago';
    }
    if (difference >= 1036800 && difference < 1123200) {
      return '12 days ago';
    }
    if (difference >= 1123200 && difference < 1209600) {
      return '13 days ago';
    }
    if (difference >= 1209600 && difference < 1296000) {
      return '14 days ago';
    }
    if (difference >= 1296000 && difference < 1382400) {
      return '15 days ago';
    }
    if (difference >= 1382400 && difference < 1468800) {
      return '16 days ago';
    }
    if (difference >= 1468800 && difference < 1555200) {
      return '17 days ago';
    }
    if (difference >= 1555200 && difference < 1641600) {
      return '18 days ago';
    }
    if (difference >= 1641600 && difference < 1728000) {
      return '19 days ago';
    }
    if (difference >= 1728000 && difference < 1814400) {
      return '20 days ago';
    }
    if (difference >= 1814400 && difference < 1900800) {
      return '21 days ago';
    }
    if (difference >= 1900800 && difference < 1987200) {
      return '22 days ago';
    }
    if (difference >= 1987200 && difference < 2073600) {
      return '23 days ago';
    }
    if (difference >= 2073600 && difference < 2160000) {
      return '24 days ago';
    }
    if (difference >= 2160000 && difference < 2246400) {
      return '25 days ago';
    }
    if (difference >= 2246400 && difference < 2332800) {
      return '26 days ago';
    }
    if (difference >= 2332800 && difference < 2419200) {
      return '27 days ago';
    }
    if (difference >= 2419200 && difference < 2505600) {
      return '28 days ago';
    }
    if (difference >= 2505600 && difference < 2592000) {
      return '29 days ago';
    }
    if (difference >= 2592000 && difference < 5184000) {
      return '1 month ago';
    }
    if (difference >= 5184000 && difference < 7776000) {
      return '2 months ago';
    }
    if (difference >= 7776000 && difference < 10368000) {
      return '3 months ago';
    }
    if (difference >= 10368000 && difference < 12960000) {
      return '4 months ago';
    }
    if (difference >= 12960000 && difference < 15552000) {
      return '5 months ago';
    }
    if (difference >= 15552000 && difference < 18144000) {
      return '6 months ago';
    }
    if (difference >= 18144000 && difference < 20736000) {
      return '7 months ago';
    }
    if (difference >= 20736000 && difference < 23328000) {
      return '8 months ago';
    }
    if (difference >= 23328000 && difference < 25920000) {
      return '9 months ago';
    }
    if (difference >= 25920000 && difference < 28512000) {
      return '10 months ago';
    }
    if (difference >= 28512000 && difference < 5184000) {
      return '11 months ago';
    }
    if (difference >= 5184000 && difference < 631138519) {
      return '1 year ago';
    }
    if (difference >= 631138519 && difference < 946707779) {
      return '2 years ago';
    }
    if (difference >= 946707779 && difference < 31556952) {
      return '3 years ago';
    }
    if (difference >= 31556952) {
      return 'over 3 years ago';
    } else {
      return 'error in converting time';
    }
  }
}
