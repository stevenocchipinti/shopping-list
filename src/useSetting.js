export const defaultToggles = {
  plannerEnabled: true,
  emojiSupport: false,
}

const useSetting = key => {
  const setting = JSON.parse(window.localStorage.getItem(key))
  return (
    {
      auto: defaultToggles[key] || false,
      on: true,
      off: false,
    }[setting] ??
    setting ??
    defaultToggles[key]
  )
}

export default useSetting
