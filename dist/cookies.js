var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Retrieves the session ID (cookie named "SI") for a given URL.
 * @param {string} url - The URL of the target website.
 * @returns {Promise<chrome.cookies.Cookie | null>} - The session ID cookie (if found), or null.
 */
export function getSessionId(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let si = yield chrome.cookies.get({ url: url, name: "SI" });
        return si;
    });
}
/**
 * Retrieves all cookies for a given domain.
 * @param {string} url - The URL or domain of the target website.
 * @returns {Promise<chrome.cookies.Cookie[]>} - A list of cookies for the given URL/domain.
 */
export function getCookie(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let cookies = yield chrome.cookies.getAll({ domain: url });
        return cookies;
    });
}
