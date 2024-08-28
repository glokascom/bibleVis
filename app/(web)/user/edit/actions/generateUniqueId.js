// TODO может удалить, не используется
export function generateUniqueId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
