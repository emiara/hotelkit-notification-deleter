import * as Cookies from "./cookies.js";

interface Notification {
  headline: string;
  actionTypes: string[];
  texts: string[];
  actions: {
    userID: string;
    text: string;
  }[];
  itemType: string;
  itemID: string;
  timestamp: number;
  kitID: string;
  notificationIDs: string[];
  info: any[];
  priority: number;
  hash: string;
  userID: string;
}

// Shared fetchHK function
async function fetchHK(url: URL, cookies: chrome.cookies.Cookie[], data?: string): Promise<any> {
  let xxsrftoken = cookies.find((cookie) => cookie.name === "XSRF-TOKEN")?.value ?? (() => { throw new Error("XSRF-TOKEN could not be found!"); })();

  const response = await fetch(url, {
    headers: {
      "x-xsrf-token": xxsrftoken,
      "Content-Type": "application/json" // Set content type for JSON
    },
    body: data,
    method: "POST",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(`Response failed with status: ${response.status}. Error: ${JSON.stringify(errorResponse)}`);
  }

  try {

    return await response.json()
  } catch (SyntaxError) {
    console.log("No JSON response recieved, probably a delete POST")
    return undefined
  }
}

// Function to fetch all notifications
export async function fetchAllNotifications(url: URL, cookies: chrome.cookies.Cookie[], data: string): Promise<Notification[]> {
  const jsonResponse = await fetchHK(new URL("/notifications/all", url), cookies, data);
  return jsonResponse.notifications as Notification[];
}

// Function to delete a notification
export async function deleteNotification(url: URL, cookies: chrome.cookies.Cookie[], notificationID: string): Promise<void | { success: boolean; hash: string }> {
  const jsonResponse = await fetchHK(new URL("/notification/delete", url), cookies, JSON.stringify({ notificationID }));

  // Check for success condition
  if (jsonResponse && jsonResponse.success === false) {
    return {
      success: false,
      hash: jsonResponse.hash, // Return hash on failure
    };
  }

  return; // Return nothing on success
}
