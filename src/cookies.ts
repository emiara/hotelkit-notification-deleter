/**
 * Retrieves the session ID (cookie named "SI") for a given URL.
 * @param {string} url - The URL of the target website.
 * @returns {Promise<chrome.cookies.Cookie | null>} - The session ID cookie (if found), or null.
 */
export async function getSessionId(url: string): Promise<chrome.cookies.Cookie | null> {
  let si = await chrome.cookies.get({ url: url, name: "SI" });
  return si;
}

/**
 * Retrieves all cookies for a given domain.
 * @param {string} url - The URL or domain of the target website.
 * @returns {Promise<chrome.cookies.Cookie[]>} - A list of cookies for the given URL/domain.
 */
export async function getCookie(url: string): Promise<chrome.cookies.Cookie[]> {
  let cookies = await chrome.cookies.getAll({ domain: url });
  return cookies;
}
