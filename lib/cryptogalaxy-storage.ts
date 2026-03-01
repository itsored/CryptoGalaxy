const STORAGE_KEYS = {
  registeredEventIds: "cryptogalaxy.registered_event_ids",
} as const

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback

  try {
    const value = window.localStorage.getItem(key)
    if (!value) return fallback
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // No-op: storage can fail in private mode or if quota is exceeded.
  }
}

export function getRegisteredEventIds() {
  return readJson<string[]>(STORAGE_KEYS.registeredEventIds, [])
}

export function saveRegisteredEventIds(ids: string[]) {
  writeJson(STORAGE_KEYS.registeredEventIds, ids)
}
