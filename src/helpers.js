export const capitalize = s => `${s[0]?.toUpperCase() || ""}${s?.slice(1)}`

export const prettify = s =>
  s?.trim()?.split(/\s+/)?.map(capitalize)?.join(" ") || ""

export const unslugify = s => s?.split("-")?.map(capitalize)?.join(" ")

export const slugify = s =>
  s
    ?.toString()
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[\s\W-]+/g, "-")
    ?.replace(/^-+|-+$/g, "")

export const greys = (light, dark) => ({ theme }) =>
  theme.palette.type === "light"
    ? theme.palette.grey[light]
    : theme.palette.grey[dark]
