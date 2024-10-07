import * as Cookies from "./cookies.js";
import * as HK from "./fetchHK.js";

async function getAllCookies(): Promise<chrome.cookies.Cookie[]> {
  const cookieNames = ["SI", "XSRF-TOKEN", "refreshToken"];
  const bgozhURL = "https://bgozh.hotelkit.net";

  // Create an array of promises
  const cookiePromises = cookieNames.map((cookie) => {
    return Cookies.getCookie(bgozhURL, cookie);
  });

  // Wait for all promises to resolve and return the array of cookies
  return Promise.all(cookiePromises);
}

const deleteAll = document.getElementById("deleteAll");

if (!deleteAll) {
  throw new Error("Delete all button doesn't exist: " + deleteAll);
}

deleteAll.onclick = async function(event) {
  console.log("Get all cookies:");
  const cookies = await getAllCookies(); // Wait for the cookies to be retrieved
  console.log(cookies);


  // Get the Notifcations
  const bgozhURL = new URL("https://bgozh.hotelkit.net");
  const payload = { type: "notifications" };

  const notifications = await HK.fetchAllNotifications(bgozhURL, cookies, JSON.stringify(payload));

  // Get the notificationIDs
  let notificationIDs = [];

  for (const noti of notifications) {
    notificationIDs.push(...noti.notificationIDs);
  }

  console.log("NotificationIds: " + notificationIDs);

  // Delete the notifications 

  notificationIDs.forEach(id => {
    const response = HK.deleteNotification(bgozhURL, cookies, id);
    console.log("response: " + response)
  });


}
