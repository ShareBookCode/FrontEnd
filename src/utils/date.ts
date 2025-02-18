export const getMembershipTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"} с ShareBook`;
  }
  if (months > 0) {
    return `${months} ${months === 1 ? "месяц" : months < 5 ? "месяца" : "месяцев"} с ShareBook`;
  }
  return `${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"} с ShareBook`;
};
