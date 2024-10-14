import { getAllCookies } from "./cookies.js";
import { deleteNotification, fetchFirstPageNotifications } from "./fetchHK.js";


const MAX_DELETED = 2048
const FETCH_SIZE = 99
// TODO: Generalize url to any hotelkit subdomain
const BGOZHURL = new URL("https://bgozh.hotelkit.net");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'deleteAll') {
    deleteAbsolutelyAll().then(total => {
      sendResponse({ total });
    });
    return true; // Indicating we will send a response asynchronously
  }

  if (request.action === 'deleteNonMentioned') {
    deleteNonMentioned().then(total => {
      sendResponse({ total });
    });
    return true;
  }
});

async function deleteAbsolutelyAll(): Promise<number> {
  const COOKIES = await getAllCookies();
  let deletedCount: number = 0
  while (deletedCount < MAX_DELETED) {
    const notifications = await fetchFirstPageNotifications(BGOZHURL, COOKIES, FETCH_SIZE);
    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      return deletedCount
    }
    let notificationIdStrings = notifications.map((notification) => {
      return notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    })

    notificationIdStrings.forEach(idString => {
      const response = deleteNotification(BGOZHURL, COOKIES, idString);
      deletedCount++;
    })
  }
  return deletedCount
}
async function deleteNonMentioned(): Promise<number> {
  const COOKIES = await getAllCookies();
  let deletedCount: number = 0
  while (deletedCount < MAX_DELETED) {
    let notifications = await fetchFirstPageNotifications(BGOZHURL, COOKIES, FETCH_SIZE);

    if (notifications.length <= 0) {
      console.log("No more notifications! Great Success 😎")
      return deletedCount
    }

    // Filters notifications that mention user
    notifications = notifications.filter((notification) => !notification.actionTypes.some((type) => type.endsWith("MentionUser")))

    let notificationIdStrings = notifications.map((notification) => {
      return notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    })

    notificationIdStrings.forEach(idString => {
      deleteNotification(BGOZHURL, COOKIES, idString);
      deletedCount++;
    })
  }
  return deletedCount
}
