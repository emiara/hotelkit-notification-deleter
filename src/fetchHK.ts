function formatCookies(cookies: chrome.cookies.Cookie[]): string {
  return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}
export async function fetchHK(url: URL, cookies: chrome.cookies.Cookie[], data: string) {
  let xxsrftoken = cookies.find((cookie) => {
    return cookie.name == "XSRF-TOKEN"
  })?.value ?? (() => { throw new Error("XSRF-TOKEN could not be found!") })();

  fetch(url, {
    "headers": {
      //"accept": "application/json, text/plain, */*",
      //"cache-control": "no-cache",
      //"content-type": "application/json;charset=UTF-8",
      //"pragma": "no-cache",
      //"sec-ch-ua": "\"Chromium\";v=\"129\", \"Not=A?Brand\";v=\"8\"",
      //"sec-ch-ua-mobile": "?0",
      //"sec-ch-ua-platform": "\"macOS\"",
      //"sec-fetch-dest": "empty",
      //"sec-fetch-mode": "cors",
      //"sec-fetch-site": "same-origin",
      //"x-hotelkit-app": "93",
      "x-xsrf-token": xxsrftoken,
      //"cookie": formatCookies(cookies)
      //"Referer": "https://bgozh.hotelkit.net/",
      //"Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": data,
    "method": "POST"
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Response failed with status: ${response.status}`);
    }
    return response.json()
  })
}
