/**
 * Retrieves the given cookiegiven cookie  for a given URL.
 * @param {string} url - The URL of the target website.
 * @param {string} cookieName - The name of the cookie
 * @returns {Promise<string>} - The cookie value (if found), or null.
 */
export async function getCookie(url: string, cookieName: string): Promise<chrome.cookies.Cookie> { //TODO: Figure out if it is possible to get Session ID from @function getCookie()
  console.log("cookiename: " + cookieName)
  let cookie = await chrome.cookies.get({ url: url, name: cookieName });
  if (!cookie) {
    throw new Error("Could not get cookie named " + cookieName);
  }
  return cookie
}
