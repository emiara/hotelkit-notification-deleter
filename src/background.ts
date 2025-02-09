import { getAllCookies } from "./cookies.js";
import { deleteNotification, fetchFirstPageNotifications, Notification } from "./fetchHK.js";

const MAX_DELETED = 2048;
const FETCH_SIZE = 99;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const COOKIES = await getAllCookies(new URL(request.hotelkitURL));

  if (request.action === 'deleteAll') {
    const notifications: Notification[] = await fetchFirstPageNotifications(request.hotelkitURL, COOKIES, FETCH_SIZE);
    deleteNotificationsByID(() => true, request.hotelkitURL).then(deletedCount => {
      sendResponse({ deletedCount });
    });
    return true; // Indicating we will send a response asynchronously
  }

  if (request.action === 'deleteNonMentioned') {
    deleteNotificationsByID((notification) =>
      !notification.actionTypes.some(type => type.endsWith("MentionUser"))
      , request.hotelkitURL).then(deletedCount => {
        sendResponse({ deletedCount });
      });
    return true;
  }
});

async function deleteNotificationsByID(
  filterFn: (notification: Notification) => boolean,
  hotelkitURL: string

): Promise<number> {
  const COOKIES = await getAllCookies(new URL(hotelkitURL));
  let notifications: Notification[] = await fetchFirstPageNotifications(new URL(hotelkitURL), COOKIES, FETCH_SIZE);
  let deletedCount = 0;

  notifications = notifications.filter(filterFn);

  while (deletedCount < MAX_DELETED && notifications.length > 0) {
    const notificationIdStrings = notifications.map(notification =>
      notification.notificationIDs.join("|") // NotificationIDString format: "abc|xyz"
    );

    for (const idString of notificationIdStrings) {
      await deleteNotification(new URL(hotelkitURL), COOKIES, idString);
      deletedCount++;
      if (deletedCount >= MAX_DELETED) break;
    }

    // Fetch the next batch of notifications
    notifications = await fetchFirstPageNotifications(new URL(hotelkitURL), COOKIES, FETCH_SIZE);
    notifications = notifications.filter(filterFn); // Reapply the filter for the new batch
  }

  return deletedCount;
}
