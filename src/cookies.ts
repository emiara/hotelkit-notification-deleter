export async function getAllCookies(): Promise<chrome.cookies.Cookie[]> {
  const cookieNames = ["SI", "XSRF-TOKEN", "refreshToken"];
  const bgozhURL = "https://bgozh.hotelkit.net";

  // Create an array of promises
  const cookiePromises = cookieNames.map((cookie) => {
    return getCookie(bgozhURL, cookie);
  });

  // Wait for all promises to resolve and return the array of cookies
  return Promise.all(cookiePromises);
}

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
