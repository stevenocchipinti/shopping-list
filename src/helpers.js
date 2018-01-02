export function capitalize(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`
}

export function format(string) {
  if (!string) return ''
  return string
    .trim()
    .split(/\s+/)
    .map(capitalize)
    .join(' ')
}

export function slugify(string) {
  return string
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
