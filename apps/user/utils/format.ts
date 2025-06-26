import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function formatNumberToK(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatNumberToKm(num: number): string {
  if (num >= 1_000_000) {
    return parseFloat((num / 1_000_000).toFixed(1)).toString() + 'm';
  }
  if (num >= 1_000) {
    return parseFloat((num / 1_000).toFixed(1)).toString() + 'k';
  }
  return num.toString();
}

export function formatAmount(amount: number, unit: string): string {
  return amount.toLocaleString('ko-KR') + unit;
}

export function categorizeAndFormatDate(dateString: string) {
  const targetDate = dayjs(dateString);
  const today = dayjs();
  const diffDays = today.diff(targetDate, 'day');
  
  let category = '';
  let timeAgo = '';
  
  if (targetDate.isToday()) {
    category = '오늘';
    timeAgo = '오늘';
  } else if (targetDate.isYesterday()) {
    category = '어제';
    timeAgo = '1일 전';
  } else if (diffDays <= 7) {
    category = '최근 7일';
    timeAgo = `${diffDays}일 전`;
  } else if (diffDays <= 30) {
    category = '최근 30일';
    timeAgo = `${diffDays}일 전`;
  } else {
    category = '이전 활동';
    timeAgo = `${diffDays}일 전`;
  }
  
  return { category, timeAgo };
}

export function formatTimeAgo(dateString: string) {
  const targetDate = dayjs(dateString);
  const today = dayjs();
  const diffDays = today.diff(targetDate, 'day');

  if (diffDays === 0) {
    const hours = targetDate.hour();
    const minutes = targetDate.minute().toString().padStart(2, '0');
    const isAM = hours < 12;

    const formattedHour = isAM
      ? hours === 0 ? 12 : hours
      : hours > 12 ? hours - 12 : hours;

    const ampm = isAM ? '오전' : '오후';

    return `${ampm} ${formattedHour}:${minutes}`;
  } else if (diffDays === 1) {
    return '어제';
  } else {
    return `${diffDays}일 전`;
  }
}

export function shortString(str: string, maxLength: number = 10) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

export function shortUnreadCount(count: number) {
  if (count > 300) {
    return '300+';
  }
  return count.toString();
}

export function getDaysFromToday(dateString: string): number {
  const today = dayjs().startOf('day');
  const targetDate = dayjs(dateString).startOf('day');
  return today.diff(targetDate, 'day');
}
