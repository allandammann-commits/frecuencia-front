const ADMIN_KEY_STORAGE = "funnel_admin_key";
const ADMIN_EXPIRES_STORAGE = "funnel_admin_expires";
const ADMIN_FAILS_STORAGE = "funnel_admin_fails";
const ADMIN_LOCKOUT_STORAGE = "funnel_admin_lockout";

export const ADMIN_SESSION_MS = 4 * 60 * 60 * 1000;
const MAX_FAILS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export const getStoredAdminKey = (): string | null => {
  try {
    const expires = Number(sessionStorage.getItem(ADMIN_EXPIRES_STORAGE) ?? 0);
    if (expires && Date.now() > expires) {
      clearAdminSession();
      return null;
    }
    return sessionStorage.getItem(ADMIN_KEY_STORAGE);
  } catch {
    return null;
  }
};

export const persistAdminSession = (key: string) => {
  sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
  sessionStorage.setItem(ADMIN_EXPIRES_STORAGE, String(Date.now() + ADMIN_SESSION_MS));
  sessionStorage.removeItem(ADMIN_FAILS_STORAGE);
  sessionStorage.removeItem(ADMIN_LOCKOUT_STORAGE);
};

export const clearAdminSession = () => {
  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
  sessionStorage.removeItem(ADMIN_EXPIRES_STORAGE);
};

export const getAdminLockoutRemainingMs = (): number => {
  try {
    const until = Number(sessionStorage.getItem(ADMIN_LOCKOUT_STORAGE) ?? 0);
    return Math.max(0, until - Date.now());
  } catch {
    return 0;
  }
};

export const registerAdminLoginFailure = (): number => {
  const fails = Number(sessionStorage.getItem(ADMIN_FAILS_STORAGE) ?? 0) + 1;
  sessionStorage.setItem(ADMIN_FAILS_STORAGE, String(fails));
  if (fails >= MAX_FAILS) {
    sessionStorage.setItem(ADMIN_LOCKOUT_STORAGE, String(Date.now() + LOCKOUT_MS));
    sessionStorage.setItem(ADMIN_FAILS_STORAGE, "0");
  }
  return fails;
};
