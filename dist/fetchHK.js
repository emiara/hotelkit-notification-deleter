var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function formatCookies(cookies) {
    return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}
export function fetchHK(url, cookies, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let xxsrftoken = (_b = (_a = cookies.find((cookie) => {
            return cookie.name == "XSRF-TOKEN";
        })) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : (() => { throw new Error("XSRF-TOKEN could not be found!"); })();
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
                "x-xsrf-token": xxsrftoken,
                "cookie": formatCookies(cookies)
                //"Referer": "https://bgozh.hotelkit.net/",
                //"Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": data,
            "method": "POST"
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`Response failed with status: ${response.status}`);
            }
            return response.json();
        });
    });
}
