var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cookies from "./cookies.js";
import * as HK from "./fetchHK.js";
function getAllCookies() {
    return __awaiter(this, void 0, void 0, function* () {
        const cookieNames = ["SI", "XSRF-TOKEN", "refreshToken"];
        const bgozhURL = "https://bgozh.hotelkit.net";
        // Create an array of promises
        const cookiePromises = cookieNames.map((cookie) => {
            return cookies.getCookie(bgozhURL, cookie);
        });
        // Wait for all promises to resolve and return the array of cookies
        return Promise.all(cookiePromises);
    });
}
const deleteAll = document.getElementById("deleteAll");
if (!deleteAll) {
    throw new Error("Delete all button doesn't exist: " + deleteAll);
}
deleteAll.onclick = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Get all cookies:");
        const cookies = yield getAllCookies(); // Wait for the cookies to be retrieved
        console.log(cookies);
        const bgozhURL = "https://bgozh.hotelkit.net/notifications";
        // Use the unwrapped cookies directly here
        const notifications = yield HK.fetchHK(new URL(bgozhURL + "/all"), cookies, '{"type":"Notifications"}');
        console.log(notifications);
    });
};
