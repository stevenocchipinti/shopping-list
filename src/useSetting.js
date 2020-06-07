import useLocalStorage from "./useLocalStorage"

export const defaultToggles = {
  emojiSupport: true,
  cutePlaceholders: true,
}

const useSetting = key => {
  const [rawSetting, setSetting] = useLocalStorage(key, "auto")
  const effectiveSetting =
    {
      auto: defaultToggles[key] || false,
      on: true,
      off: false,
    }[rawSetting] ?? rawSetting

  return [effectiveSetting, setSetting, rawSetting]
}

export default useSetting
