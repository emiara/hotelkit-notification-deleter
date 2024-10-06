export async function fetchHK(url: URL, cookies: chrome.cookies.Cookie[], data: string) {
  fetch(url, {
    "headers": {
      //"accept": "application/json, text/plain, */*",
      //"cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      //"pragma": "no-cache",
      //"sec-ch-ua": "\"Chromium\";v=\"129\", \"Not=A?Brand\";v=\"8\"",
      //"sec-ch-ua-mobile": "?0",
      //"sec-ch-ua-platform": "\"macOS\"",
      //"sec-fetch-dest": "empty",
      //"sec-fetch-mode": "cors",
      //"sec-fetch-site": "same-origin",
      //"x-hotelkit-app": "93",
      "x-xsrf-token": "873476dc36c1fb3e210a3014a7ee8145a8a4e2573370a8ab353c0c98c5ef9edde266b04cf7b125827be14fe5ae42a161a2c761653d4ca837eaba7c0da06df772",
      "cookie": "SI=a0dcq4og690ck9qi4sf60rr5d8; XSRF-TOKEN=873476dc36c1fb3e210a3014a7ee8145a8a4e2573370a8ab353c0c98c5ef9edde266b04cf7b125827be14fe5ae42a161a2c761653d4ca837eaba7c0da06df772; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMWJhODFiZi0wNjA5LTRhYWQtYTk2MC1jOGIwZjY2MTAxNWQiLCJpc1JlZnJlc2giOnRydWUsImlhdCI6MTcyODIzMDY5MCwiZXhwIjoxNzI4MzE3MDkwfQ.vNF_Po-LMulJrv9mCN3fV4PHKEC4SrL9RSqM4HJr6Ik",
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
