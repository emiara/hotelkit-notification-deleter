var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Shared fetchHK function
function fetchHK(url, cookies, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let xxsrftoken = (_b = (_a = cookies.find((cookie) => cookie.name === "XSRF-TOKEN")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : (() => { throw new Error("XSRF-TOKEN could not be found!"); })();
        const response = yield fetch(url, {
            headers: {
                "x-xsrf-token": xxsrftoken,
                "Content-Type": "application/json" // Set content type for JSON
            },
            body: data,
            method: "POST",
        });
        if (!response.ok) {
            const errorResponse = yield response.json();
            throw new Error(`Response failed with status: ${response.status}. Error: ${JSON.stringify(errorResponse)}`);
        }
        try {
            return yield response.json();
        }
        catch (SyntaxError) {
            console.warn("No JSON response recieved, probably a delete POST");
            return undefined;
        }
    });
}
// Function to fetch all notifications
export function fetchAllNotifications(url, cookies, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonResponse = yield fetchHK(new URL("/notifications/all", url), cookies, data);
        return jsonResponse.notifications;
    });
}
// Function to delete a notification
export function deleteNotification(url, cookies, notificationID) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonResponse = yield fetchHK(new URL("/notification/delete", url), cookies, JSON.stringify({ notificationID }));
        // Check for success condition
        if (jsonResponse && jsonResponse.success === false) {
            return {
                success: false,
                hash: jsonResponse.hash, // Return hash on failure
            };
        }
        return; // Return nothing on success
    });
}
