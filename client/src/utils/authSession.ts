const SESSION_FLAG = "has_auth_session";

export const setSession = () => localStorage.setItem(SESSION_FLAG, "1");
export const clearSession = () => localStorage.removeItem(SESSION_FLAG);
export const hasSession = () => localStorage.getItem(SESSION_FLAG) === "1";
