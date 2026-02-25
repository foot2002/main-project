const ADMIN_STORAGE_KEY = "wisein_admin_authenticated";

const ADMIN_ID = "wisein";
const ADMIN_PW = "wise1004!@";

export function checkAdminCredentials(id: string, password: string): boolean {
  return id === ADMIN_ID && password === ADMIN_PW;
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
}

export function clearAdminAuth(): void {
  sessionStorage.removeItem(ADMIN_STORAGE_KEY);
}
