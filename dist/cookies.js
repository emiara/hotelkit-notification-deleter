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
 * Retrieves the given cookiegiven cookie  for a given URL.
 * @param {string} url - The URL of the target website.
 * @param {string} cookieName - The name of the cookie
 * @returns {Promise<string>} - The cookie value (if found), or null.
 */
export function getCookie(url, cookieName) {
    return __awaiter(this, void 0, void 0, function* () {
        let cookie = yield chrome.cookies.get({ url: url, name: cookieName });
        if (!cookie) {
            throw new Error("Could not get cookie named " + cookieName);
        }
        return cookie;
    });
}
