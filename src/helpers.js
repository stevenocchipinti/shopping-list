export const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`

export const prettify = s =>
  s ? s.trim().split(/\s+/).map(capitalize).join(" ") : ""

export const unslugify = s => s.split("-").map(capitalize).join(" ")

export const slugify = s =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "")
