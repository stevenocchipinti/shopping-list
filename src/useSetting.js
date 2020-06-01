import useLocalStorage from "./useLocalStorage"

export const defaultToggles = {
  emojiSupport: false,
}

const useSetting = key => {
  const [setting, setSetting] = useLocalStorage(key, "auto")
  const effectiveSetting = {
    auto: defaultToggles[key] || false,
    on: true,
    off: false,
  }[setting]
  return [effectiveSetting, setting, setSetting]
}

export default useSetting
