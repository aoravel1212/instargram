import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function parseDate(date: string) {
  return format(date, 'ko');
}
