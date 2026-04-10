/**
 * Возвращает инициалы пользователя для аватара-плейсхолдера.
 *
 * Алгоритм:
 * - Тримим имя, разбиваем по whitespace
 * - 0 слов → '?'
 * - 1 слово → первая буква (Анна → А)
 * - 2+ слов → первая буква первого + первая буква последнего, без отчества
 *   (Иван Иванович Иванов → ИИ)
 * - Результат в верхнем регистре
 */
export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase()

  const first = words[0].slice(0, 1)
  const last = words[words.length - 1].slice(0, 1)
  return (first + last).toUpperCase()
}
